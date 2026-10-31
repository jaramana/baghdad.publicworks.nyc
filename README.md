# Amanat Baghdad — website case study

Private prototype. A redesign of the Mayoralty of Baghdad's website, built as a case study in digital government. Local only. No remote, no public hosting, no Artifact publishing, because it uses a real government's name and seal.

Not part of the publicworks.nyc suite.

## Decisions (30 Oct 2026)

| Decision | Choice |
| --- | --- |
| Client | Amanat Baghdad (Mayoralty), not the national government |
| Language | Arabic-first for residents, right to left. The English site is the working version (see next row) |
| Working language | English first, because the owner reviews in English. Arabic pages are frozen until the English settles, then translated |
| English structure | `site/en/`, one English file per page with the same filename as its Arabic counterpart in `site/` |
| Kurdish | Sorani (`lang="ckb"`, Arabic script, right to left) in `site/ku/`, same filenames as `site/en/`, translated from the English. Pilot of four pages: home, Services, Building permit, Report a problem. The rest follow once the English settles, alongside the Arabic pass |
| Language links | Every paired page lists the other two languages in fixed order: العربية, کوردی, English. A page with no Kurdish twin sends کوردی to the Kurdish home. Kurdish pages link to the English page wherever no Kurdish page exists yet |
| English name | "Mayoralty of Baghdad", the English text on the seal's ring. "Amanat" appears only once, in About, to give the Arabic name |
| Site map | Five sections: Services, Report a problem, Districts, Projects, About. Each has an index page listing everything under it. Every page has a breadcrumb and a highlighted nav item. The footer lists the whole site |
| Projects | Replaces "The City". A register of 14 real public works: what, who runs it, status, whether the status is verified, sources |
| Census | Off the home page. One population line on each district page; the full table lives at About › Open data |
| Realism | Real studies, projects and sources only; no invented plans or studies. Illustrative live data (alerts, case numbers, report counts) stays, labelled |
| The Tigris page | `city-tigris.html` and its outfall plan stay as they are, in Arabic. No further work on it. No English or Kurdish page links to it |
| Reporting in one place | Report links live only in the nav, the home's Report block, the Report and Track pages, the Services index and About › Contact. Track a report is headlined at the top of the Report page; a number entered there opens `track.html?n=` |
| Side columns | Allowed, but never as cards. Side blocks are plain text under a 2px green rule (`.start`, `.side-card`, `.help section`) |
| No hand-kept counts | No totals that someone must update by hand (e.g. "6 projects run by the Mayoralty"). Lists show their own size |
| No side roads | No cards or links that send readers to unrelated pages they can reach from the nav |
| Disclaimers | Scarce. Keep the illustrative label on made-up figures and verified/unverified on project statuses. No research-method notes on public pages. The prototype notice is off the footer and About until a fuller draft; it must return before anyone outside sees the site |
| No reveal-on-select | Choosing something navigates to a page; it never makes new content appear on the current one. The home district picker is a list of links |
| Language swap | On every paired page (`shared/lang-swap.css`, `shared/lang-swap.js`). Every page, home included, sweeps in from the new page's reading direction. The swap keeps the reader's place. A mirror glide (seal, language links and home cards travelling to their mirrored place), Settle and the lab panel were tried and dropped |
| Location | This folder, git with no remote |
| Research | Four parallel agents; findings in `research/` |
| Home direction | `site/i-blend.html` (30 Oct): the B + C blend revised. Green stays primary but only as lines, text and outlines. Grounded (E) rejected |
| Client package (31 Oct) | About becomes an index with five child pages: Leadership and structure, News, Tenders and auctions, Laws and plans, Open data. They carry what the Mayoralty expects (the Mayor, departments, statements, notices, laws) without putting news on the home page |
| Complaints | The 5628 hotline and the Citizen Voice app are real and shown wherever reporting is. Our Report flow presents every channel as feeding one complaints system with one kind of number |
| Deputy mayors | Shown by role only until the Mayoralty confirms names. Posts disagree on who holds Technical and Administrative |
| News page | Real statements, newest first, with English headlines written from the Arabic and a link to each original. Headlines lead with what changed, not with who attended |

## Visual system

- Green `#1b6435` (from the seal) is the primary, used as lines, text and outline buttons. No green fills
- Teal `#1484a9` (the seal's ring) is a quiet second accent for water and walking
- Sticky white glass masthead on desktop, between a 4px green line on top and a 1px green line below. It holds the seal, the name, "Official website · Republic of Iraq" and the nav. The language links stack at the nav's end in grey, behind a thin rule. On phones the masthead scrolls away, and the nav moves into a full-screen menu behind a Menu button (the browser's `popover`, no script). The languages end that menu below a thin rule. Under 480px the button shows only its icon
- Hero: the Tigris band, with the search card and Today ledger set over its lower edge. No dark wash
- Image ratios: hero band 3:1 (16:9 on phones, capped at 26rem tall); every other photo 3:2, equal widths in a row
- Type roles in Arabic: Noto Kufi Arabic for the institution; Noto Naskh Arabic for story voice only; IBM Plex Sans Arabic for everything people read and use. English swaps in IBM Plex Sans and IBM Plex Serif through `shared/en.css`. Kurdish keeps the Arabic roles unchanged; all three Arabic-script fonts carry the Kurdish letters (ڕ ڵ ۆ ێ ە), checked against the font files
- The answer slot has a reserved height; answers never move the page
- Report a problem offers the web form and WhatsApp side by side
- Districts are listed by bank, each on its own side of the river as on a map: Karkh (west) on the left in English
- Shared rules live in `site/shared/base.css`. Inner pages add `shared/page.css`. English pages add `shared/en.css` last. Page files hold only their own layout
- Maps are Leaflet on OpenStreetMap at 3:2, with wheel zoom off so the page scrolls past them. Marker positions come from OSM place lookups and are approximate
- Earlier variants stay in `site/` for reference

Preview: `baghdad-site` in this folder's `.claude/launch.json` (port 4321), or `python3 -m http.server 4321 --directory site`. Start at `site/index.html` or go straight to `site/en/index.html`.

## Principles

- The home page is a service counter. Most visitors finish their task in one or two taps.
- Pages are organized by task, not by org chart.
- No news feed. Announcements appear only when they change what a resident does.
- AI routes requests to real pages and pre-filled forms, and cites its source. No chatbot persona.
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
| Home | `en/index.html` | Search, Today, most requested, report, districts by bank, three projects |
| Services | `en/services.html` | Five service guides (`service-*.html`), Alerts |
| Report a problem | `en/report.html` | Track a report |
| Districts | `en/districts.html` | Karrada; the other 14 open their row in the index. Baghdad Governorate is one more row, under Around the city |
| Projects | `en/projects.html` | 14 projects in four groups |
| About | `en/about.html` | Leadership and structure (`leadership.html`), News (`news.html`), Tenders and auctions (`tenders.html`), Laws and plans (`laws.html`), Open data (`data.html`). About itself keeps mandate, who does what, contact, search, accessibility, privacy |

Each English page's العربية link goes to its Arabic counterpart. Projects has none yet, so it links to the Arabic home. Arabic pages' English link goes to their English page; `city-tigris.html` goes to Projects. Every کوردی link goes to the Kurdish twin, or to the Kurdish home when there is none. `site/en.html` is a redirect stub.

## Page types

| Type | Example | Notes |
| --- | --- | --- |
| Home | `en/index.html` | Fixed structure above |
| Index | Services, Districts | Ruled list of every child page, tagged by where the task happens |
| Service | Building permit | What you need, cost, time, steps, "Start on Ur" button, office fallback |
| Report | Report a problem | Track box under the title, then photo, map pin, category, case number, status page |
| District | Karrada | Office, contacts, works map, one census line |
| Register | Projects | Entry per project: what, who, status, verified or not, sources |

## Data rules

- Census 2024 population and our own satellite heat, green and NO2 maps are sourced. Everything else is labelled illustrative.
- Project statuses carry "Status verified" or "Status unverified".
- Live air quality only if a working feed is confirmed.

## Open items

- The prototype notice must return to the footer and About before the client or anyone outside sees the site
- WhatsApp "Open the chat" has no target, because no Mayoralty WhatsApp number exists
- Pay-bill links to nothing, because the payment site's operator is unverified
- The Arabic pages are behind the English: old nav (المدينة, no Projects or About), district dropdown on the home, no Projects page, no tenders or contact sections in About
- The other 14 district pages, once the official boundary and office list exist
- Bank of the Tigris for Al-Ghadeer, Al-Shula and the Green Zone municipality is unverified
- Deputy mayors' names, and whether Citizen Voice gives residents a case number
- Tenders and auctions show only notice numbers, because the subject sits inside each Word or image file
- The district mobile numbers in `current-site-deep.md` date from 2024 and are untested, so they are not on the site
- News, tenders and laws are a snapshot from 31 Oct 2026. A live site would read them from the Mayoralty's own feed
- The four new About pages have no Arabic or Kurdish twin yet; their language links go to the Arabic About and the Kurdish home
- Search and the fee lookup still answer in a reserved slot on the same page. Owner to confirm this is acceptable under the no-reveal rule
- The Kurdish text is a draft translation by Claude. It needs a native Sorani reader before anyone relies on it
- The Kurdish name ئەمانەتی بەغدا and the Kurdish Ur service name are unverified
## Next session

State on 30 Oct 2026: the English site (`site/en/`, 15 pages) and the language swap are committed on `main`. A Kurdish pilot (`site/ku/`, 4 pages) and a three-language switcher on every paired page followed. The owner is reviewing the English pages and will send feedback.

### Owner preferences

- Reviews in English only. Anything still in Arabic is invisible to review, so build and settle English first.
- Real over invented. Use real studies, projects and sources; label demo data as illustrative.
- No reveal-on-select. Choosing something takes you to a page. Content never pops into the current one.
- Nobody gets lost. Every page shows its place in the site, and every index lists all its children.
- Each section must earn its place with real substance, not a placeholder.
- Watch for code bloat. Prefer the plain CSS or browser feature over a script, and drop experiments once a choice is made.

### Start here

1. Read this README, then `research/current-site.md` or `research/urban-context.md` if a question touches today's site or a project.
2. Run `baghdad-site` from `.claude/launch.json` (port 4321). Open `site/en/index.html`.
3. Take feedback one page at a time. For an open design question, build two or three variants behind a switch, then remove the switch and the losing variants once the owner picks.

### Likely next work

1. Owner feedback on the English pages
2. The open question on search and the fee lookup (same-page slot or results page)
3. The Arabic pass, once the English settles: new nav, Projects, About sections, district links, translated from the English. The remaining 11 Kurdish pages go in the same pass
4. The other 14 district pages (blocked until the official boundary and office list exist)

### When editing

- Pages are plain static HTML with no build step. The masthead and footer are copied into every page, so a change to either goes into every page of that language in the same edit.
- New inner pages load `shared/base.css`, `shared/page.css`, then `shared/en.css` for English or `shared/ku.css` for Kurdish, and reuse their classes before adding page styles.
- When a Kurdish page is added, point the کوردی link on its English and Arabic twins at it, add `hreflang="ckb"` alternates, and switch Kurdish links that went to the English page.
- Every paired page loads `shared/lang-swap.css` and `shared/lang-swap.js`, and keeps the same element IDs as its counterpart so a swap lands in the same place.
- Report links use the Arabic category as the key (`report.html?cat=انقطاع الماء`) in both languages; the English form shows English labels.
- Green is never a fill. Photos are 3:2, the hero band 3:1. Answers and lookups fill a fixed-height slot.
- Every number needs a source line or the illustrative label. Project statuses say verified or unverified.
- Map markers need OSM coordinates from a place lookup. Guessed positions landed on the wrong bank once.

### Before committing

- Links: `python3 tools/check_links.py site site/en/*.html site/ku/*.html site/*.html` reports 0 problems
- No page scrolls sideways at 375px
- The browser console shows no errors
- View transitions only run in a visible tab. If the browser pane is hidden, the swap is skipped, so check it with the pane open

## Folders

- `research/` — benchmark scan, current-site inventory and its deep dive (`current-site-deep.md`), identity and images, urban context, 2024 census by subdistrict
- `site/` — Arabic pages, earlier home variants and the prototype hub (`index.html`)
- `site/en/` — the English site
- `site/ku/` — the Kurdish (Sorani) pilot
- `site/shared/` — shared styles and scripts
- `tools/` — `check_links.py`, the internal link and anchor check
