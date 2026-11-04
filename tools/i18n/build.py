"""Build the Arabic and Kurdish pages from the English ones.

The English pages in docs/en/ are the source. Each page's text is split into
units: a run of text and inline tags inside one block element. Inline tags
inside a unit become numbered placeholders, so <a href="x">permit</a> in
"Apply for a <a href="x">permit</a>" is written "Apply for a <0>permit</0>".

Translations live in tools/i18n/text/: _common.txt for the masthead, footer
and anything used on more than one page, and one file per page. Each entry is
an "en:" line followed by "ar:" and "ku:" lines, separated by blank lines.
"raw:" entries replace a literal, quotes included, in the finished page: script
strings, and query strings in links. A "\\n" in a raw translation is a line break.

Usage, from the repository root:
  python3 tools/i18n/build.py extract [page.html ...]   print untranslated units
  python3 tools/i18n/build.py build [page.html ...]     write docs/*.html and docs/ku/*.html
"""
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
DOCS = ROOT / 'docs'
EN = DOCS / 'en'
TEXT = pathlib.Path(__file__).resolve().parent / 'text'

# English-only redirect stubs are not translated

SKIP_PAGES = {'projects.html', 'districts.html', 'district-karrada.html'}

INLINE = {'a', 'strong', 'em', 'b', 'i', 'span', 'code', 'abbr', 'time', 'small', 'br', 'sup', 'sub', 'mark', 'bdi', 'q', 'cite', 's', 'u'}
VOID = {'br', 'img', 'input', 'meta', 'link', 'hr', 'source', 'wbr'}
RAW = {'script', 'style'}
ATTRS = ('alt', 'aria-label', 'title', 'placeholder', 'label', 'content', 'data-label')

LANGS = {
    'ar': {'dir': DOCS, 'name': 'العربية', 'home': 'home.html'},
    'ckb': {'dir': DOCS / 'ku', 'name': 'کوردی', 'home': 'index.html'},
}
KEY = {'ar': 'ar', 'ckb': 'ku'}

FONTS = ('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700'
         '&family=Noto+Kufi+Arabic:wght@600;700;800&family=Noto+Naskh+Arabic:wght@600;700&display=swap')

TOKEN = re.compile(r'<!--.*?-->|<!doctype[^>]*>|</?[a-zA-Z][^>]*>', re.S | re.I)
ATTR = re.compile(r'([\w:-]+)(?:\s*=\s*"([^"]*)")?')


# ---------- Tokens ----------

def tokens(html):
    """Yield ('text', s) and ('tag', raw, name, closing) pieces; script and style bodies are text of kind 'raw'."""
    out, pos, raw_until = [], 0, None
    for m in TOKEN.finditer(html):
        if raw_until:
            if not re.match(rf'</{raw_until}\s*>', m.group(0), re.I):
                continue
            out.append(('raw', html[pos:m.start()]))
            raw_until = None
        elif m.start() > pos:
            out.append(('text', html[pos:m.start()]))
        raw = m.group(0)
        tm = re.match(r'<(/?)([a-zA-Z][\w-]*)', raw)
        if tm:
            name, closing = tm.group(2).lower(), tm.group(1) == '/'
            out.append(('tag', raw, name, closing))
            if name in RAW and not closing:
                raw_until = name
        else:
            out.append(('other', raw))
        pos = m.end()
    out.append(('text', html[pos:]))
    return out


def is_inline(t):
    return t[0] == 'text' or (t[0] == 'tag' and t[2] in INLINE)


def has_words(s):
    """Text with Latin letters, other than a bare email address."""
    text = re.sub(r'<[^>]+>', '', s).strip()
    return re.search(r'[A-Za-z]', text) is not None and not re.fullmatch(r'[\w.+-]+@[\w.-]+', text)


# ---------- Units ----------

def peel(run):
    """Strip one inline element that wraps the whole run, repeatedly. Returns (before, core, after)."""
    before, after = [], []
    blank = lambda t: t[0] == 'text' and not t[1].strip()
    while run and blank(run[0]):
        before.append(run.pop(0))
    while run and blank(run[-1]):
        after.insert(0, run.pop())
    while len(run) >= 2 and run[0][0] == 'tag' and not run[0][3] and run[0][2] not in VOID \
            and run[-1][0] == 'tag' and run[-1][3] and run[-1][2] == run[0][2]:
        depth = 0
        for i, t in enumerate(run):
            if t[0] == 'tag' and t[2] == run[0][2] and t[2] not in VOID:
                depth += -1 if t[3] else 1
                if depth == 0:
                    break
        if i != len(run) - 1:
            break
        before.append(run[0])
        after.insert(0, run[-1])
        run = run[1:-1]
    return before, run, after


def placeholders(core):
    """Return the unit key and the tag for each placeholder number."""
    parts, tags, stack, n = [], {}, [], 0
    for t in core:
        if t[0] == 'text':
            parts.append(t[1])
        elif t[2] in VOID:
            tags[n] = t
            parts.append(f'<{n}/>')
            n += 1
        elif not t[3]:
            tags[n] = t
            stack.append((t[2], n))
            parts.append(f'<{n}>')
            n += 1
        else:
            name, k = stack.pop()
            tags[f'/{k}'] = t
            parts.append(f'</{k}>')
    key = re.sub(r'\s+', ' ', ''.join(parts)).strip()
    return key, tags


def split_unmatched(run):
    """An inline tag left open or closed by a block inside it (an <a> around a <p>) ends the run."""
    stack, unmatched = [], set()
    for i, t in enumerate(run):
        if t[0] != 'tag' or t[2] in VOID:
            continue
        if not t[3]:
            stack.append(i)
        elif stack and run[stack[-1]][2] == t[2]:
            stack.pop()
        else:
            unmatched.add(i)
    unmatched |= set(stack)
    part = []
    for i, t in enumerate(run):
        if i in unmatched:
            if part:
                yield from split_siblings(part)
                part = []
            yield ('tok', t)
        else:
            part.append(t)
    if part:
        yield from split_siblings(part)


def split_siblings(run):
    """Side-by-side elements with no loose text between them (<strong>Title</strong><span>Note</span>) are separate units."""
    depth, pieces, current = 0, [], []
    for t in run:
        if depth == 0 and t[0] == 'text':
            if t[1].strip():
                yield ('run', run)
                return
            pieces.append(('tok', t))
            continue
        if t[0] == 'tag' and t[2] in VOID and depth == 0:
            yield ('run', run)
            return
        current.append(t)
        if t[0] == 'tag' and t[2] not in VOID:
            depth += -1 if t[3] else 1
        if depth == 0:
            pieces.append(('run', current))
            current = []
    yield from pieces


def units(html):
    """Split tokens into runs; yield ('run', tokens) or ('tok', token)."""
    run = []
    for t in tokens(html):
        if is_inline(t):
            run.append(t)
            continue
        if run:
            yield from split_unmatched(run)
            run = []
        yield ('tok', t)
    if run:
        yield from split_unmatched(run)


def attr_units(raw):
    for name, value in ATTR.findall(raw):
        if name in ATTRS and value and has_words(value):
            if name == 'content' and 'name="description"' not in raw:
                continue
            yield value


def keys_of(html):
    """Every translatable key in a page, in order: text units, attribute values."""
    for kind, x in units(html):
        if kind == 'run':
            for t in x:
                if t[0] == 'tag':
                    yield from attr_units(t[1])
            text = ''.join(t[1] for t in x)
            if has_words(text):
                yield placeholders(peel(x)[1])[0]
        elif x[0] == 'tag':
            yield from attr_units(x[1])


# ---------- Translation files ----------

def load(path):
    entries, raw = {}, {}
    if not path.exists():
        return entries, raw
    for block in re.split(r'\n\s*\n', path.read_text()):
        lines = {}
        for line in block.strip().splitlines():
            m = re.match(r'(en|raw|ar|ku): ?(.*)', line)
            if m:
                lines[m.group(1)] = m.group(2)
        if 'en' in lines:
            entries[lines['en']] = lines
        elif 'raw' in lines:
            raw[lines['raw']] = {k: v.replace('\\n', '\n') for k, v in lines.items()}
    return entries, raw


# ---------- Rewriting ----------

def to_eastern(text):
    """Eastern Arabic digits, except in words with Latin letters, @ or // (emails, URLs, codes) and numbers after a Latin word."""
    def word(m):
        w = m.group(0)
        if re.search(r'[A-Za-z@\u00a0]|//', w):
            return w
        w = re.sub(r'(?<=\d)\.(?=\d)', '٫', w)
        w = re.sub(r'(?<=\d),(?=\d)', '٬', w).replace('%', '٪')
        return w.translate(str.maketrans('0123456789', '٠١٢٣٤٥٦٧٨٩'))
    out = []
    for part in re.split(r'(<[^>]+>|&[#\w]+;)', text):
        if not part.startswith(('<', '&')):
            part = re.sub(r'[^ \t\n\r]+', word, re.sub(r'([A-Za-z]) (\d)', '\\1\u00a0\\2', part))
        out.append(part)
    return ''.join(out)


def link(href, lang):
    """Rewrite an English-page link for a page in the target language."""
    if re.match(r'(https?:|mailto:|tel:|#|//|data:)', href):
        return href
    if href.startswith(('../shared/', '../img/')):
        return href[3:] if lang == 'ar' else href
    if href.startswith('../'):
        return href
    page, sep, rest = re.match(r'([^?#]*)([?#]?)(.*)', href).groups()
    if page == 'index.html':
        page = LANGS[lang]['home']
    return page + sep + rest


def rewrite_tag(raw, lang, tr):
    def attr(m):
        name, value = m.group(1), m.group(2)
        if name in ('href', 'src', 'action'):
            value = link(value, lang)
        elif name in ATTRS and has_words(value) and not (name == 'content' and 'name="description"' not in raw):
            value = to_eastern(tr(value))
        return f'{name}="{value}"'
    return re.sub(r'([\w:-]+)="([^"]*)"', attr, raw)


def fill(key, tags, translation, lang, tr):
    def put(m):
        close, n, void = m.group(1), m.group(2), m.group(3)
        t = tags[f'/{n}'] if close else tags[int(n)]
        return t[1] if close else rewrite_tag(t[1], lang, tr)
    return re.sub(r'<(/?)(\d+)(/?)>', put, translation)


def build_page(name, common, lang):
    html = (EN / name).read_text()
    own, own_raw = load(TEXT / name.replace('.html', '.txt'))
    entries = {**common[0], **own}
    raw = {**common[1], **own_raw}
    k = KEY[lang]
    missing = []

    def tr(key):
        e = entries.get(key)
        if not e or not e.get(k):
            missing.append(key)
            return key
        return e[k]

    out = []
    for kind, x in units(html):
        if kind == 'tok':
            t = x
            if t[0] == 'tag':
                out.append(rewrite_tag(t[1], lang, tr))
            else:
                out.append(t[1])
            continue
        text = ''.join(t[1] for t in x)
        if not has_words(text):
            out.append(''.join(rewrite_tag(t[1], lang, tr) if t[0] == 'tag' else to_eastern(t[1]) for t in x))
            continue
        before, core, after = peel(x)
        key, tags = placeholders(core)
        raw_core = ''.join(t[1] for t in core)
        lead = re.match(r'\s*', raw_core).group(0)
        trail = re.search(r'\s*$', raw_core).group(0)
        body = to_eastern(fill(key, tags, tr(key), lang, tr))
        out.append(''.join(rewrite_tag(t[1], lang, tr) for t in before) + lead + body + trail
                   + ''.join(t[1] for t in after))
    page = finish(''.join(out), name, lang)
    for src, e in sorted(raw.items(), key=lambda kv: -len(kv[0])):
        if src not in page:
            print(f'{lang} {name}: raw entry not found: {src}')
        elif e.get(k):
            page = page.replace(src, e[k])
        else:
            missing.append(src)
    return page, missing


def finish(page, name, lang):
    """Language attributes, alternates, language links, fonts and stylesheets."""
    other = 'ckb' if lang == 'ar' else 'ar'
    up = '' if lang == 'ar' else '../'
    ar_name = 'home.html' if name == 'index.html' else name
    href = {'ar': f'{up}{ar_name}' if lang == 'ckb' else ar_name,
            'ckb': f'ku/{name}' if lang == 'ar' else name,
            'en': f'{"en/" if lang == "ar" else "../en/"}{name}'}

    page = page.replace('<html lang="en" dir="ltr">', f'<html lang="{lang}" dir="rtl">', 1)
    page = re.sub(r'<link rel="alternate" hreflang="[^"]+" href="[^"]*">\n', '', page)
    alternates = ''.join(f'<link rel="alternate" hreflang="{h}" href="{href[h]}">\n' for h in (other, 'en'))
    page = page.replace('<link rel="preconnect"', alternates + '<link rel="preconnect"', 1)
    page = re.sub(r'https://fonts\.googleapis\.com/css2\?[^"]*', FONTS, page, count=1)
    page = re.sub(r'<link rel="stylesheet" href="(\.\./)?shared/en\.css">\n', '', page)

    names = {'ar': ('ar', 'العربية'), 'ckb': ('ckb', 'کوردی'), 'en': ('en', 'English')}
    links = []
    for h in ('ar', 'ckb', 'en'):
        if h == lang:
            continue
        code, label = names[h]
        d = 'ltr' if h == 'en' else 'rtl'
        links.append(f'<a href="{href[h]}" lang="{code}" hreflang="{code}" dir="{d}">{label}</a>')
    page = re.sub(r'<li class="lang">.*?</li>', f'<li class="lang">{"".join(links)}</li>', page, count=1, flags=re.S)

    page = page.replace('font-family: "IBM Plex Sans", ', 'font-family: "IBM Plex Sans Arabic", ')
    page = swap_banks(page)

    # The Arabic name beside an English one is dropped on Arabic pages

    if lang == 'ar':
        page = re.sub(r'\s*<span class="ar" lang="ar">[^<]*</span>', '', page)
    return page


def swap_banks(page):
    """Karkh stays west (left) on right-to-left pages: Rusafa comes first in the source."""
    m = re.search(r'<div class="banks">', page)
    if not m:
        return page
    spans, depth, start = [], 0, None
    for t in re.finditer(r'</?(div|section)\b[^>]*>', page[m.end():]):
        if t.group(0).startswith('</'):
            depth -= 1
            if depth == 0:
                spans.append((start, t.end()))
            if depth < 0:
                break
        else:
            if depth == 0:
                start = t.start()
            depth += 1
        if len(spans) == 2:
            break
    (a0, a1), (b0, b1) = [(m.end() + x, m.end() + y) for x, y in spans]
    return page[:a0] + page[b0:b1] + page[a1:b0] + page[a0:a1] + page[b1:]


# ---------- Commands ----------

def pages():
    return sorted(p.name for p in EN.glob('*.html') if p.name not in SKIP_PAGES)


def extract(names):
    common = load(TEXT / '_common.txt')[0]
    for name in names or pages():
        own = load(TEXT / name.replace('.html', '.txt'))[0]
        seen = set()
        todo = [k for k in keys_of((EN / name).read_text())
                if k not in common and k not in own and not (k in seen or seen.add(k))]
        if todo:
            print(f'### {name} ({len(todo)})')
            for k in todo:
                print(f'en: {k}')
            print()


def link_english(name):
    """Point an English page's alternates and language links at its Arabic and Kurdish twins."""
    path = EN / name
    page = path.read_text()
    ar = '../home.html' if name == 'index.html' else f'../{name}'
    ku = f'../ku/{name}'
    page = re.sub(r'(<link rel="alternate" hreflang="[^"]+" href="[^"]*">\n)+',
                  f'<link rel="alternate" hreflang="ar" href="{ar}">\n<link rel="alternate" hreflang="ckb" href="{ku}">\n',
                  page, count=1)
    links = (f'<a href="{ar}" lang="ar" hreflang="ar" dir="rtl">العربية</a>'
             f'<a href="{ku}" lang="ckb" hreflang="ckb" dir="rtl">کوردی</a>')
    page = re.sub(r'<li class="lang">.*?</li>', f'<li class="lang">{links}</li>', page, count=1, flags=re.S)
    path.write_text(page)


def build(names):
    common = load(TEXT / '_common.txt')
    total = 0
    for name in names or pages():
        link_english(name)
        for lang in LANGS:
            page, missing = build_page(name, common, lang)
            target = LANGS[lang]['dir'] / (LANGS[lang]['home'] if name == 'index.html' else name)
            target.write_text(page)
            for m in dict.fromkeys(missing):
                print(f'{lang} {name}: untranslated: {m}')
            total += len(set(missing))
    print('untranslated:', total)


if __name__ == '__main__':
    cmd = sys.argv[1] if len(sys.argv) > 1 else 'build'
    if cmd == 'extract':
        extract(sys.argv[2:])
    else:
        build(sys.argv[2:])
