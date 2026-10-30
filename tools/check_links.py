"""Check that internal links and #anchors resolve.

Usage, from this folder:
  python3 tools/check_links.py site site/en/*.html site/*.html
"""
import pathlib
import re
import sys
import urllib.parse

site = pathlib.Path(sys.argv[1]).resolve()
ids = {}


def ids_of(path):
    if path not in ids:
        ids[path] = set(re.findall(r'\sid="([^"]+)"', path.read_text())) if path.exists() else None
    return ids[path]


bad = 0
for name in sys.argv[2:]:
    page = pathlib.Path(name).resolve()
    for href in re.findall(r'href="([^"]+)"', page.read_text()):
        if re.match(r'(https?:|mailto:|tel:|//)', href) or href == '#':
            continue
        path_part, _, frag = href.partition('#')
        path_part = urllib.parse.unquote(path_part.split('?')[0])
        target = (page.parent / path_part).resolve() if path_part else page
        found = ids_of(target)
        if found is None:
            print(f'{page.relative_to(site)}: missing file {href}')
            bad += 1
        elif frag and frag not in found:
            print(f'{page.relative_to(site)}: missing anchor {href}')
            bad += 1
print('problems:', bad)
sys.exit(1 if bad else 0)
