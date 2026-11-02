# Amanat Baghdad — website case study

A design prototype for the Mayoralty of Baghdad's website, built as a case study in digital government. Live demo: https://baghdad.publicworks.nyc, served by GitHub Pages from `docs/`. It uses a real government's name and seal, so every page carries a sticky prototype bar (`docs/shared/prototype.js`) that links to the real site. No Artifact publishing.

Not part of the publicworks.nyc suite.

## Decisions (30 Oct 2026)

| Decision | Choice |
| --- | --- |
| Client | Amanat Baghdad (Mayoralty), not the national government |
| Language | Arabic-first for residents, right to left. The English site is the working version (see next row) |
| Working language | English first, because the owner reviews in English. Arabic and Kurdish pages are built from the English by `tools/i18n/build.py` (1 Nov) |
| English structure | `docs/en/`, one English file per page with the same filename as its Arabic counterpart in `docs/` |
| Kurdish | Sorani (`lang="ckb"`, Arabic script, right to left) in `docs/ku/`, same filenames as `docs/en/`, translated from the English. Every English page has a Kurdish twin (1 Nov) |
| Language links | Every page lists the other two languages in fixed order: العربية, کوردی, English, each linking to the same page in that language. The build script writes them |
| English name | "Mayoralty of Baghdad", the English text on the seal's ring. "Amanat" appears only once, in About, to give the Arabic name |
| Site map | Four sections: Services, Report a problem, News, The Mayoralty. Contact sits under The Mayoralty. Each has an index page listing everything under it. Every page has a breadcrumb and a highlighted nav item. The footer lists the whole site |
| Dropdowns (31 Oct) | Services and The Mayoralty open a dropdown of their children on hover or keyboard focus, in CSS only. The parent label stays a link to its index. The panel hangs from the masthead's green line, its text aligned under the label. In the phone menu the children show indented under their parent |
| Section tabs (31 Oct) | Retired after owner review. The Mayoralty overview lists its four pages under "In this section"; the dropdown and phone menu list them too |
| Projects (31 Oct) | The status register is retired, because nobody can keep 14 statuses current. Progress on the Mayoralty's own works appears in News, tagged Works. Who runs each major project is one table on The Mayoralty overview (`about.html#works`). `projects.html` redirects there |
| Census | Off the home page. The full table lives at The Mayoralty › Open data |
| Realism | Real studies, projects and sources only; no invented plans or studies. Illustrative live data (alerts, case numbers, report counts) stays, labelled |
| The Tigris page | `city-tigris.html` and its outfall plan stay as they are, in Arabic. No further work on it. No English or Kurdish page links to it |
| Reporting in one place | Report links live only in the nav, the home's Report block, the Report and Track pages, the Services index and Contact. Track a report is headlined at the top of the Report page; a number entered there opens `track.html?n=` |
| Side columns (31 Oct) | None, after owner review; they may return later. Each page is one reading column, 50rem wide. A service's Start block sits above its guide; contacts and help sit at the end |
| Facts in one place (2 Nov) | A fact that can change lives in one home. The hotline and its hours sit in the footer and on Contact; Home and Report give the number alone, as a way to report. The municipality count appears once, in The Mayoralty's "What the Mayoralty does". Municipality office hours appear once, on Contact. Other pages link to Contact instead of repeating details. Legend lines such as "— means no public email" are gone; the language note lives on Using this website |
| No hand-kept counts | No totals that someone must update by hand (e.g. "6 projects run by the Mayoralty"). Lists show their own size |
| No side roads | No cards or links that send readers to unrelated pages they can reach from the nav |
| Disclaimers | Scarce. Keep the illustrative label on made-up figures. The model pages role-play the real site: no comparisons with the Mayoralty's current website, and no research-method or sourcing notes on public pages (`research/service-claims.md` holds those). The prototype notice lives only in the sticky bar, outside the page design |
| No reveal-on-select | Choosing something navigates to a page; it never makes new content appear on the current one. |
| Language swap | On every paired page (`shared/lang-swap.css`, `shared/lang-swap.js`). Every page, home included, sweeps in from the new page's reading direction. The swap keeps the reader's place. A mirror glide (seal, language links and home cards travelling to their mirrored place), Settle and the lab panel were tried and dropped |
| Location | This folder; `github.com/jaramana/baghdad.publicworks.nyc`, public. Pages serves `docs/` at baghdad.publicworks.nyc. The root sends visitors to the English home |
| Research | Four parallel agents; findings in `research/` |
| Home direction | `home.html` (30 Oct, first built as the "i-blend" variant): the B + C blend revised. Green stays primary but only as lines, text and outlines. Grounded (E) rejected |
| The Mayoralty (31 Oct) | About is renamed The Mayoralty. Its overview leads with the Mayor, then duties, responsibilities in Baghdad, major projects and contact. Its four children are Leadership and structure, Tenders and auctions, Laws and plans, Open data |
| Districts (2 Nov) | No district pages. The current site's municipality subsites are mostly dormant since 2024, and our district content was illustrative. The municipalities are listed by bank on Contact. `districts.html` and `district-karrada.html` redirect there in all three languages, keeping `#karkh`-style anchors. The home page lost its district block |
| Contact (2 Nov) | One page, `contact.html`, under The Mayoralty, holds every email: hotline and app, municipality offices, enquiries (media, tenders, legal, staff complaints, meeting the Mayor, website) and all departments. Leadership is structure only, with no emails. Tenders, Laws and News link to their Contact row instead of giving the address |
| Report tool (2 Nov) | The four steps sit on a raised white sheet labelled "New report", with a step counter, a grey footer bar and a solid dark Next. The dark Next is the only filled button on the site. Panel (A) was chosen over an official-form sheet (B) and a full-width workspace band (C) |
| News (31 Oct) | News is a top-level nav item. The home page shows the three latest headlines, each linking to its item on the News page |
| Site information (31 Oct) | Privacy, accessibility and how search works live on `site.html` ("Using this website"), linked from the footer only. The Mayoralty pages say nothing about the website itself |
| Headshots (31 Oct) | The Mayor's portrait (Wikimedia Commons, CC0, January 2026) leads the overview and Leadership, at 3:2. Deputy mayors have no licensed photo and unconfirmed names, so they stay by role |
| Photos for authority (2 Nov) | Licensed photos only (Commons); the Mayoralty's own press photos are copyrighted (PD-Iraq covers body-corporate work only before 1980). The home page has a small Mayor band after Report: portrait, name, title, links to The Mayoralty and Leadership. Major projects shows two 2014 photos of the Mayoralty's own works, Zawraa Park and the Abu Nuwas corniche gardens. Leadership names directors general where a post names them (Projects, Relations and Media). No silhouettes or placeholders |
| Complaints | The 5628 hotline and the Citizen Voice app are real and shown wherever reporting is. Our Report flow presents every channel as feeding one complaints system with one kind of number |
| Deputy mayors | Shown by role only until the Mayoralty confirms names. Posts disagree on who holds Technical and Administrative |
| News page | Real statements, newest first, with English headlines written from the Arabic and a link to each original. Headlines lead with what changed, not with who attended |
| Audit (31 Oct) | `independent-audit-2026-10-31.md` reviewed the English site. The rows below record what was fixed. Its open decisions are under Open items |
| Report location (31 Oct) | A typed address or landmark completes the Where step. The map pin is optional |
| Report demo (31 Oct) | The sample case is B-48213 (sewage, Karrada). A report sent in the demo gets B-48492, and Track shows it with the chosen problem, municipality and update channel, read from `sessionStorage`. Message updates need a phone number |
| Phone layout (31 Oct) | Fact strips keep their qualifiers on phones, and "On this page" shows under the action block |
| Search (31 Oct) | A plain form that opens `en/search.html`, which ranks pages and pre-filled report forms by title, key words and summary. No AI label and no answer slot. The fee lookup opens `en/fees-account.html` the same way |
| Breadcrumbs (31 Oct) | Ancestors only, never the current page or an in-page group. No kicker above the title |
| WhatsApp (31 Oct) | Hidden until the Mayoralty has a number. Reporting offers the web form, the 5628 hotline and the Citizen Voice app; updates come by text message |
| Social links (31 Oct) | Facebook, Instagram and X as icons beside the footer hotline, each with a label for screen readers |
| Voice (1 Nov) | Formal and institutional, the register of an Iraqi government site in translation. The Mayoralty is "the Mayoralty", not "we"; instructions address "you". No asides that explain or defend the institution ("not elected", "isn't always clear"), no conversational openers ("Can't find…?", "Prefer to…?"), no contractions. Headings are labels, except form steps and the Track questions. Pages carry no review date |
| Claims (31 Oct) | `research/service-claims.md` lists every service and reporting claim as verified, illustrative, proposed or unsourced. Each service guide says everything but its Ur destination is illustrative |
| Arabic and Kurdish pass (1 Nov) | Both languages translated from the settled English, page for page, with the same IDs, layout and scripts. Arabic and Kurdish text uses Eastern Arabic digits, Iraqi month names and «» quotes. Ur service names are quoted in Arabic exactly as Ur shows them. Report numbers read ب-٤٨٢١٣ |
| Banks in right-to-left (1 Nov) | Karkh stays on the left, as on a map: the build puts Rusafa first in the source of right-to-left pages |

## Visual system

- Green `#1b6435` (from the seal) is the primary, used as lines, text and outline buttons. No green fills
- Teal `#1484a9` (the seal's ring) is a quiet second accent for water and walking
- Sticky white glass masthead on desktop, between a 4px green line on top and a 1px green line below. It holds the seal, the name, "Official website · Republic of Iraq" and the nav. The language links stack at the nav's end in grey, behind a thin rule. On phones the masthead scrolls away, and the nav moves into a full-screen menu behind a Menu button (the browser's `popover`, no script). The languages end that menu below a thin rule. Under 480px the button shows only its icon
- Hero: the Tigris band, with the search card and Today ledger set over its lower edge. No dark wash
- Image ratios: hero band 3:1 (16:9 on phones, capped at 26rem tall); every other photo 3:2, equal widths in a row
- Type roles in Arabic: Noto Kufi Arabic for the institution; Noto Naskh Arabic for story voice only; IBM Plex Sans Arabic for everything people read and use. English swaps in IBM Plex Sans and IBM Plex Serif through `shared/en.css`. Kurdish keeps the Arabic roles unchanged; all three Arabic-script fonts carry the Kurdish letters (ڕ ڵ ۆ ێ ە), checked against the font files
- Report a problem offers the web form beside the 5628 hotline and the Citizen Voice app
- Municipalities are listed by bank on Contact, Karkh first
- Shared rules live in `docs/shared/base.css`. Inner pages add `shared/page.css`. English pages add `shared/en.css` last. Page files hold only their own layout. The footer grid takes any number of columns
- Maps are Leaflet on OpenStreetMap at 3:2, with wheel zoom off so the page scrolls past them. Marker positions come from OSM place lookups and are approximate

Preview: `baghdad-site` in this folder's `.claude/launch.json` (port 4321), or `python3 -m http.server 4321 --directory docs`. The root redirects to `en/index.html`; the Arabic home is `home.html`.

## Principles

- The home page is a service counter. Most visitors finish their task in one or two taps.
- Pages are organized by task, not by org chart.
- News has its own page. The home page carries only the three latest headlines.
- Search lists real pages and pre-filled report forms, best match first.
- Authority comes from the seal, one official color, strong type and consistency.
- The template is the product. New pages are built from a small set of page types.
- Nobody gets lost. Every page shows where it sits, and every index lists all its children.

## What the research found

| Finding | Consequence for the design | Source |
| --- | --- | --- |
| Current home page has 447 links, ~160 say «اضغط هنا», `/en` shows Arabic | The bar is low; the case study shows the gap | `research/current-site.md` |
| A municipal hotline (5628) and a complaints app (Citizen Voice) exist; the home page loads ~173 MB of images; the site was built by UoITC, not the University of Baghdad | Show the hotline and app; Report feeds them rather than competing | `research/current-site-deep.md` |
| Real transactions (permits, property statements, water) run on the national Ur portal behind login | Don't rebuild transactions. Own the front door, plain-language service pages and a clean handoff to Ur | `current-site.md` §3 |
| Complaints are the one transaction Amanat owns, split across four channels with no tracking | Report-a-problem with a case number and status is the flagship | `current-site.md` §3 |
| Overpasses are run by the national ministry and the PM's office | Projects says who runs each project and who to ask | `urban-context.md` §2–3 |
| Seal is the Round City over Tigris waves, "مدينة السلام" | Use the seal small and unchanged. Leave the national eagle off | `identity-images.md` §1 |
| Syria's ministry sites are template-made and unfinished; no evidence they are AI-generated | Our standard: no placeholder, loading state or untranslated string ever ships | `benchmarks.md` Syria |

## Site map (English)

| Section | Index | Pages under it |
| --- | --- | --- |
| Home | `en/index.html` | Search (opens `search.html`), Today, most requested, report, the Mayor, three latest news |
| Services | `en/services.html` | Five service guides (`service-*.html`), Alerts. The fee lookup opens `fees-account.html` |
| Report a problem | `en/report.html` | Track a report |
| News | `en/news.html` | Statements newest first, each tagged Planning, Parks, Services or Works |
| The Mayoralty | `en/about.html` | Leadership and structure (`leadership.html`), Tenders and auctions (`tenders.html`), Laws and plans (`laws.html`), Open data (`data.html`), Contact (`contact.html`). The overview holds the Mayor, duties, responsibilities in Baghdad and major projects |
| Footer only | `en/site.html` | Privacy, accessibility, how search works |

Every page links to its twin in the other two languages. The Arabic home is `home.html`; every other Arabic page has its English filename. `city-tigris.html` links to Projects. `docs/index.html` is a redirect to the English home.

## Page types

| Type | Example | Notes |
| --- | --- | --- |
| Home | `en/index.html` | Fixed structure above |
| Index | Services, The Mayoralty | Ruled list of every child page, tagged by where the task happens |
| Service | Building permit | What you need, cost, time, steps, "Start on Ur" button, office fallback |
| Report | Report a problem | Track box under the title, then photo, map pin, category, case number, status page |

## Data rules

- Census 2024 population and our own satellite heat, green and NO2 maps are sourced. Everything else is labelled illustrative.
- Project statuses carry "Status verified" or "Status unverified".
- Live air quality only if a working feed is confirmed.

## Open items

- No Mayoralty WhatsApp number exists, so WhatsApp is hidden
- Pay-bill links to nothing, because the payment site's operator is unverified
- Contact lists departments in English alphabetical order, so the Arabic and Kurdish tables are not alphabetical
- Bank of the Tigris for Al-Ghadeer, Al-Shula and the Green Zone municipality is unverified
- Deputy mayors' names and photos, and whether Citizen Voice gives residents a case number
- The Mayor's message exists only as a JPG of text (Feb 2025, `Show/49a27d6f…`). Transcribe it under the home portrait once the official site can be read
- The 9 director bios (scanned PDFs) could name more directors general on Leadership
- The Arabic and Kurdish spellings of the two directors' names are transliterated back from English. Check them against the posts
- No licensed daylight photo of the Abu Nuwas gardens; the one used is a 2014 night view with the hotels in frame
- Tenders and auctions show only notice numbers, because the subject sits inside each Word or image file
- The district mobile numbers in `current-site-deep.md` date from 2024 and are untested, so they are not on the site
- News, tenders and laws are a snapshot from 31 Oct 2026. A live site would read them from the Mayoralty's own feed
- The Arabic and Kurdish text is a draft translation by Claude, in `tools/i18n/text/`. Arabic needs an Iraqi reader for register; Kurdish needs a native Sorani reader before anyone relies on it
- Arabic law and plan titles on Laws and plans are rendered from the English, not copied from each document. Check each against its PDF
- The Arabic name of the Building Permits Regulation (نظام إجازات البناء) is unverified
- A report sent in one language and tracked in another shows its problem type and municipality in the language it was sent in
- The Kurdish name ئەمانەتی بەغدا and the Kurdish Ur service name are unverified
- Audit decisions for the owner: whether Report keeps saying every channel feeds one complaints system (S01); what the page-feedback Yes/No buttons do, given the no-reveal rule (U07); which licence covers Mayoralty data (S06)
- The fee lookup shows a balance for any account number. Decide what needs identity checks before making any privacy promise (S04)
- The Report page warns about danger to life but gives no emergency number. Add one only from a verified source (S12)
- "Problem still there?" pre-fills a new report with the old number. A true reopen path needs an owner and a reviewer (S08)
- The privacy text describes the intended service. Retention, recipients, and the fonts, images and map tiles loaded from other hosts are not covered (S10)
- `tel:5628` links are untested on Iraqi phones
## Next session

State on 1 Nov 2026: the English site (`docs/en/`, 21 pages including the redirect stub) is settled. Every English page now has an Arabic twin in `docs/` and a Kurdish twin in `docs/ku/`, built by `tools/i18n/build.py`. Both translations are drafts awaiting native review.

### Owner preferences

- Reviews in English only. Anything still in Arabic is invisible to review, so build and settle English first.
- Real over invented. Use real studies, projects and sources; label demo data as illustrative.
- No reveal-on-select. Choosing something takes you to a page. Content never pops into the current one.
- Nobody gets lost. Every page shows its place in the site, and every index lists all its children.
- Each section must earn its place with real substance, not a placeholder.
- Watch for code bloat. Prefer the plain CSS or browser feature over a script, and drop experiments once a choice is made.

### Start here

1. Read this README, then `research/current-site.md` or `research/urban-context.md` if a question touches today's site or a project.
2. Run `baghdad-site` from `.claude/launch.json` (port 4321). Open `en/index.html`.
3. Take feedback one page at a time. For an open design question, build two or three variants behind a switch, then remove the switch and the losing variants once the owner picks.

### Likely next work

1. Native review of the Arabic and Kurdish text in `tools/i18n/text/`
2. Owner feedback on the English pages, carried to Arabic and Kurdish through the build

### When editing

- Pages are plain static HTML. Edit English pages by hand; never edit Arabic or Kurdish pages directly, because the build overwrites them.
- After any English change, run `python3 tools/i18n/build.py extract` to list new or changed text, add its Arabic and Kurdish to `tools/i18n/text/` (`_common.txt` for text on several pages, otherwise the page's own file), then run `python3 tools/i18n/build.py build`. It reports any text still untranslated.
- Script strings and link query strings are `raw:` entries in the same files. The build warns when a `raw:` source no longer appears in the page.
- The build also writes the language links and `hreflang` alternates on every page, English included.
- New inner pages load `shared/base.css`, `shared/page.css`, then `shared/en.css` (English only), and reuse their classes before adding page styles.
- Every page loads `shared/lang-swap.css` and `shared/lang-swap.js`. The build keeps element IDs identical across languages, so a swap lands in the same place.
- Report links use the Arabic category as the key (`report.html?cat=انقطاع الماء`) in both languages; the English form shows English labels.
- Green is never a fill. Photos are 3:2, the hero band 3:1. Search and lookups open their own result page.
- Every number needs a source line or the illustrative label. Project statuses say verified or unverified.
- A new service claim goes into `research/service-claims.md` with its status.
- Every English page starts with a skip link to `<main id="main">`. Phone numbers are `tel:` links.
- Map markers need OSM coordinates from a place lookup. Guessed positions landed on the wrong bank once.

### Before committing

- Links: `python3 tools/check_links.py docs docs/en/*.html docs/ku/*.html docs/*.html` reports 0 problems
- No page scrolls sideways at 375px
- The browser console shows no errors
- View transitions only run in a visible tab. If the browser pane is hidden, the swap is skipped, so check it with the pane open

## Folders

- `research/` — benchmark scan, current-site inventory and its deep dive (`current-site-deep.md`), identity and images, urban context, 2024 census by subdistrict
- `docs/` — the published site: Arabic pages (home is `home.html`), the root redirect and `CNAME`
- `docs/en/` — the English site, the source for the other two
- `docs/ku/` — the Kurdish (Sorani) site
- `docs/shared/` — shared styles and scripts
- `tools/` — `check_links.py`, the internal link and anchor check; `i18n/build.py` and `i18n/text/`, the Arabic and Kurdish build and its translations
