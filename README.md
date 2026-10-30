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
- Shared rules (tokens, masthead, buttons, section heads, status dots, footer) live in `site/shared/base.css`. Page files hold only their own layout
- Earlier variants stay in `site/` for reference

Preview: `python3 -m http.server 4321 --directory site`, or `baghdad-site` in the workspace launch config.

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

## v0.1 scope

1. Home page, Arabic with English mirror
2. Service page template (building permit)
3. Report-a-problem flow
4. District page template (one district)
5. City page (the Tigris)

## Folders

- `research/` — benchmark scan, current-site inventory, identity and images, urban context
- `site/` — the prototype
