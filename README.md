# Amanat Baghdad — website case study

Private prototype. A redesign of the Mayoralty of Baghdad's website, built as a case study in digital government. Local only. No remote, no public hosting, no Artifact publishing, because it uses a real government's name and seal.

Not part of the publicworks.nyc suite.

## Decisions (30 Oct 2026)

| Decision | Choice |
| --- | --- |
| Client | Amanat Baghdad (Mayoralty), not the national government |
| Language | Arabic-first, right to left, with an English mirror |
| Location | This folder, git with no remote |
| Research | Four parallel agents; findings in `research/` |
| Home direction | `site/i-blend.html` (30 Oct): the B + C blend revised. Green stays primary but only as lines, text and outlines. Grounded (E) rejected |

## Visual system

- Green `#1b6435` (from the seal) is the primary, used as lines, text and outline buttons. No green fills
- Teal `#1484a9` (the seal's ring) is a quiet second accent for water and walking
- Sticky white glass masthead on desktop, between a 4px green line on top and a 1px green line below. It holds the seal, "الموقع الرسمي · جمهورية العراق" and the nav. No separate official banner. On phones it scrolls away
- Hero: the Tigris band, with the search card and Today ledger set over its lower edge. No dark wash
- Image ratios: hero band 3:1 (16:9 on phones, capped at 26rem tall); every other photo 3:2, equal widths in a row
- Type roles: Noto Kufi Arabic for the institution (wordmark, headings, large figures); Noto Naskh Arabic for The City story voice only; IBM Plex Sans Arabic for everything people read and use
- The answer slot has a reserved height; answers never move the page
- Report a problem offers the web form and WhatsApp side by side
- Shared rules (tokens, masthead, buttons, section heads, status dots, footer) live in `site/shared/base.css`. Inner pages add `site/shared/page.css` (crumbs, page head, facts strip, two-column layout, checklist, steps, side cards, alerts, data tables, maps, index lists). Page files hold only their own layout
- Masthead and footer links are identical on every Arabic page: الخدمات → `services.html`, بلّغ → `report.html`, البلديات → `districts.html`, المدينة → `city-tigris.html`, English → `en.html`
- Maps are Leaflet on OpenStreetMap at 3:2, with wheel zoom off so the page scrolls past them. Marker positions come from OSM place lookups and are approximate
- Three marks on The City: «مصدر» (sourced, with a source line), «توضيحي» (illustrative), «رؤية» (vision)
- Earlier variants stay in `site/` for reference

Preview: `python3 -m http.server 4321 --directory site`, or `baghdad-site` in the workspace launch config (`baghdad-site-alt` serves on 4322 when 4321 is taken).

## Principles

- The home page is a service counter. Most visitors finish their task in one or two taps.
- Pages are organized by task, not by org chart.
- No news feed. Announcements appear only when they change what a resident does.
- AI routes requests to real pages and pre-filled forms, and cites its source. No chatbot persona.
- Authority comes from the seal, one official color, strong Arabic type and consistency.
- The template is the product. New pages are built from a small set of page types.
- The vision layer ("The City") uses real places. Data is labeled illustrative unless sourced.

## What the research found

| Finding | Consequence for the design | Source |
| --- | --- | --- |
| Current home page has 447 links, ~160 say «اضغط هنا», no hotline, `/en` shows Arabic | The bar is low; the case study shows the gap | `research/current-site.md` |
| Real transactions (permits, property statements, water) run on the national Ur portal behind login | Don't rebuild transactions. Own the front door, plain-language service pages and a clean handoff to Ur | `current-site.md` §3 |
| Complaints are the one transaction Amanat owns, split across four channels with no tracking | Report-a-problem with a case number and status is the flagship | `current-site.md` §3 |
| Overpasses are run by the national ministry and the PM's office | The City layer focuses on what Amanat owns: streets, river edge, trees, heritage | `urban-context.md` §2 |
| Seal is the Round City over Tigris waves, "مدينة السلام" | Use the seal small and unchanged. Leave the national eagle off | `identity-images.md` §1 |
| Syria's ministry sites are template-made and unfinished; no evidence they are AI-generated | Our standard: no placeholder, loading state or untranslated string ever ships | `benchmarks.md` Syria |

## Home page, top to bottom

1. Official-site banner ("الموقع الرسمي لأمانة بغداد")
2. Seal, name, language switch
3. Question as hero: «ماذا تحتاج؟» over one search box, labelled as AI-assisted, answering only from site pages
4. Today card: water cuts, road closures, rain alerts, collection, each with a status badge
5. Six top tasks: report a problem, building permit, water account, property statement, find your district office, pay a fee
6. Your district: pick or locate, then office, hours, phone, open works
7. The City: one story card (the Tigris) and a link to open data
8. Footer: hotline, offices, Ur portal link, accessibility statement

## Page types

| Type | Example | Notes |
| --- | --- | --- |
| Home | `/` | Fixed structure above |
| Service | Building permit | What you need, cost, time, steps, "Start on Ur" button, office fallback |
| Report | Report a problem | Photo, map pin, category, case number, status page |
| District | Karrada | Office, contacts, works map, district facts from the 2024 census |
| Story | The Tigris | Real places, sourced data, aspiration labelled |

## Data rules

- Census 2024 population and our own satellite heat, green and NO2 maps are sourced. Everything else is labelled illustrative.
- Live air quality only if a working feed is confirmed.

## Page templates built

| Page | File | Notes |
| --- | --- | --- |
| Home | `site/i-blend.html` | Chosen direction |
| Service | `site/service-permit.html` | Building permit. Guide on one side, sticky "Start on Ur" card on the other. Ur location verified; documents, steps, time and cost illustrative |
| Report | `site/report.html` | Four steps (problem, place on an OpenStreetMap pin, photo and note, review) then a receipt with a case number. Help column beside the form. Nothing is sent |
| Track | `site/track.html` | Look up a case number; timeline of who did what and when. One sample case (ب-٤٨٢١٣) |
| Services index | `site/services.html` | Grouped by task. Each service tagged: this site, Ur portal or district office |
| Service | `site/service-water.html`, `service-property.html`, `service-sewer.html`, `service-fees.html` | Same template as the permit page. Fees adds a lookup by account number in a fixed-height slot, and explains why fee-payer lists are no longer published |
| Districts index | `site/districts.html` | All 15 municipalities by bank, each with a pre-filled report link (`report.html?d=slug`). Outer districts point to the Governorate |
| District | `site/district-karrada.html` | Census figure (Karrada ash-Sharqiyah subdistrict, 105,507), alerts, map, works, report table, neighbourhoods, office card. Two works are sourced; the rest is illustrative |
| Story | `site/city-tigris.html` | The Tigris. Sourced figures, illustrative outfall map and table, projects under way with who runs them, three "what if" ideas, precedents, 14 sources |
| About | `site/about.html` | Mandate (Law 16/1995), who does what, departments, how search works, accessibility, privacy |
| Alerts | `site/alerts.html` | Today and this week. Illustrative |
| Open data | `site/data.html` | Dataset list with honest status, and the full 2024 census table by subdistrict |
| English home | `site/en.html` | Mirror of the Arabic home. `shared/home.js` switches strings and search rules on `<html lang>` |

## v0.1 scope

All five are built (30 Oct 2026).

1. Home page, Arabic with English mirror
2. Service page template (building permit)
3. Report-a-problem flow
4. District page template (one district)
5. City page (the Tigris)

## Open items

- WhatsApp «افتح المحادثة» has no target, because no Amanat number exists
- Ur buttons link to the verified Ur service pages. Pay-bill links to nothing, because the payment site's operator is unverified
- Inner pages are Arabic only. The English home says so
- The other 14 district pages, once the official boundary and office list exist
- Bank of the Tigris for Al-Ghadeer, Al-Shula and the Green Zone municipality is unverified
- Arabic subdistrict names on the census table are our transliteration from the source's Latin spelling

## Folders

- `research/` — benchmark scan, current-site inventory, identity and images, urban context, 2024 census by subdistrict
- `site/` — the prototype
