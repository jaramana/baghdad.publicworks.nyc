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
| English name | "Mayoralty of Baghdad", the English text on the seal's ring. "Amanat" appears only once, in About, to give the Arabic name |
| Site map | Five sections: Services, Report a problem, Districts, Projects, About. Each has an index page listing everything under it. Every page has a breadcrumb and a highlighted nav item. The footer lists the whole site |
| Projects | Replaces "The City". A register of 14 real public works: what, who runs it, status, whether the status is verified, sources |
| Census | Off the home page. One population line on each district page; the full table lives at About › Open data |
| Realism | Real studies, projects and sources only; no invented plans or studies. Illustrative live data (alerts, case numbers, report counts) stays, labelled |
| The Tigris page | `city-tigris.html` and its outfall plan stay as they are, in Arabic. No further work on it. Projects links to it |
| No reveal-on-select | Choosing something navigates to a page; it never makes new content appear on the current one. The home district picker is a list of links |
| Language swap | On every paired page (`shared/lang-swap.css`, `shared/lang-swap.js`). The masthead glides everywhere: the seal and language link travel to their mirrored place. The home's cards glide too. Every other page's body sweeps in the new reading direction. The swap keeps the reader's place. Settle and the lab panel were tried and dropped |
| Location | This folder, git with no remote |
| Research | Four parallel agents; findings in `research/` |
| Home direction | `site/i-blend.html` (30 Oct): the B + C blend revised. Green stays primary but only as lines, text and outlines. Grounded (E) rejected |

## Visual system

- Green `#1b6435` (from the seal) is the primary, used as lines, text and outline buttons. No green fills
- Teal `#1484a9` (the seal's ring) is a quiet second accent for water and walking
- Sticky white glass masthead on desktop, between a 4px green line on top and a 1px green line below. It holds the seal, the name, "Official website · Republic of Iraq" and the nav. On phones it scrolls away
- Hero: the Tigris band, with the search card and Today ledger set over its lower edge. No dark wash
- Image ratios: hero band 3:1 (16:9 on phones, capped at 26rem tall); every other photo 3:2, equal widths in a row
- Type roles in Arabic: Noto Kufi Arabic for the institution; Noto Naskh Arabic for story voice only; IBM Plex Sans Arabic for everything people read and use. English swaps in IBM Plex Sans and IBM Plex Serif through `shared/en.css`
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
| Current home page has 447 links, ~160 say «اضغط هنا», no hotline, `/en` shows Arabic | The bar is low; the case study shows the gap | `research/current-site.md` |
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
| Districts | `en/districts.html` | Karrada; the other 14 open their row in the index |
| Projects | `en/projects.html` | 14 projects in four groups; links to the Arabic Tigris story |
| About | `en/about.html` | Mandate, who does what, leadership, tenders, contact, Open data (`en/data.html`), search, accessibility, privacy |

Each English page's العربية link goes to its Arabic counterpart. Projects has none yet, so it links to the Arabic home. Arabic pages' English link goes to their English page; `city-tigris.html` goes to Projects. `site/en.html` is a redirect stub.

## Page types

| Type | Example | Notes |
| --- | --- | --- |
| Home | `en/index.html` | Fixed structure above |
| Index | Services, Districts | Ruled list of every child page, tagged by where the task happens |
| Service | Building permit | What you need, cost, time, steps, "Start on Ur" button, office fallback |
| Report | Report a problem | Photo, map pin, category, case number, status page |
| District | Karrada | Office, contacts, works map, one census line |
| Register | Projects | Entry per project: what, who, status, verified or not, sources |

## Data rules

- Census 2024 population and our own satellite heat, green and NO2 maps are sourced. Everything else is labelled illustrative.
- Project statuses carry "Status verified" or "Status unverified".
- Live air quality only if a working feed is confirmed.

## Open items

- WhatsApp "Open the chat" has no target, because no Mayoralty number exists
- Pay-bill links to nothing, because the payment site's operator is unverified
- No public phone line exists; About says so
- The Arabic pages are behind the English: old nav (المدينة, no Projects or About), district dropdown on the home, no Projects page, no tenders or contact sections in About
- The other 14 district pages, once the official boundary and office list exist
- Bank of the Tigris for Al-Ghadeer, Al-Shula and the Green Zone municipality is unverified
- `info@amanatbaghdad.gov.iq` is inferred from the current site's address list (`info@` plus the site's domain)
- Search and the fee lookup still answer in a reserved slot on the same page. Owner to confirm this is acceptable under the no-reveal rule

## Next session: owner review of the English site

State on 30 Oct 2026: the English site is built in `site/en/` (15 pages) and the language swap is settled. The owner is reviewing the English pages.

Start here:

1. Read this README, then `research/current-site.md` or `research/urban-context.md` if a question touches today's site or a project.
2. Run `baghdad-site`. Open `site/en/index.html`.
3. Take feedback one page at a time. For an open design question, build two or three variants behind a switch rather than describing them.

When editing:

- The masthead and footer are copied into every page. A change to either goes into all 15 English pages (or all 15 Arabic pages) in the same edit.
- New inner pages load `shared/base.css`, `shared/page.css`, then for English `shared/en.css`, and reuse their classes before adding page styles.
- Every paired page loads `shared/lang-swap.css` and `shared/lang-swap.js`, and keeps the same element IDs as its counterpart so a swap lands in the same place. The home glide finds its cards by class (`.hero .ask`, `.hero .ledger`, `.tasks` tiles by position); renaming those classes turns the glide into a plain crossfade.
- Report links use the Arabic category as the key (`report.html?cat=انقطاع الماء`) in both languages; the English form shows English labels.
- Green is never a fill. Photos are 3:2, the hero band 3:1. Answers and lookups fill a fixed-height slot.
- Every number needs a source line or the illustrative label.
- Map markers need OSM coordinates from a place lookup. Guessed positions landed on the wrong bank once.

Before committing, check that:

- every internal link and `#anchor` resolves
- no page scrolls sideways at 375px
- the browser console shows no errors

## Folders

- `research/` — benchmark scan, current-site inventory, identity and images, urban context, 2024 census by subdistrict
- `site/` — Arabic pages, earlier home variants and the prototype hub (`index.html`)
- `site/en/` — the English site
- `site/shared/` — shared styles and scripts
