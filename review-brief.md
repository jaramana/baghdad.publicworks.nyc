# Review brief: Mayoralty of Baghdad website prototype

## What this is

- A design prototype for the website of the Mayoralty of Baghdad (Amanat Baghdad), the city's municipal government.
- A case study in digital government by publicworks.nyc. The Mayoralty has not commissioned it and has no part in it.
- Live at https://baghdad.publicworks.nyc. The English home page is `/en/index.html`.
- Static HTML and CSS with no build step. Every page includes a strip at the top that marks the site as a prototype.

## Audience

- Residents of Baghdad. The real site would be Arabic first, right to left, with a Kurdish (Sorani) version.
- Secondary readers include journalists, contractors bidding on tenders, and researchers.
- The English pages are the working draft. The Arabic and Kurdish pages will be translated from the English once it is settled.

## In scope: English pages

| Page | Path |
| --- | --- |
| Home | `/en/index.html` |
| All services | `/en/services.html` |
| Building permit | `/en/service-permit.html` |
| Water account | `/en/service-water.html` |
| Property statement | `/en/service-property.html` |
| Sewer connection | `/en/service-sewer.html` |
| Municipal fees | `/en/service-fees.html` |
| Alerts | `/en/alerts.html` |
| Report a problem | `/en/report.html` |
| Track a report | `/en/track.html` |
| Districts | `/en/districts.html` |
| Karrada municipality | `/en/district-karrada.html` |
| News | `/en/news.html` |
| The Mayoralty | `/en/about.html` |
| Leadership and structure | `/en/leadership.html` |
| Tenders and auctions | `/en/tenders.html` |
| Laws and plans | `/en/laws.html` |
| Open data | `/en/data.html` |
| Using this website | `/en/site.html` |

## Out of scope

- Arabic pages (`/*.html`) and Kurdish pages (`/ku/`). Both are built from the English.
- The prototype strip at the top of each page.
- `/city-tigris.html`.

## Facts to keep fixed

- The site uses real sources for names, titles, emails, phone numbers, laws, news statements, tender notices and census figures. Don't change them. If one looks wrong, flag it.
- Some figures are made up for the demonstration and labelled "Illustrative". These include the Today panel, alerts, report numbers and the Karrada works.
- Permits, property statements and water accounts are handled on Ur, the national government portal. The Mayoralty doesn't run Ur, so the site sends users there to apply.
- The official English name is "Mayoralty of Baghdad", as printed on the seal.
- These gaps are already logged:
  - The Mayoralty has no WhatsApp number.
  - The pay-bill link has no destination.
  - Karrada is the only district with its own page.
  - The deputy mayors' names are unconfirmed.
- Search, the report map and the district maps need JavaScript. The rest of each page works without it.

## Tasks

Keep the three tasks separate.

1. **Copy edit.** Rewrite any English that reads as machine-written so it reads as the work of a careful human editor at a city government. Keep the meaning and facts the same, and keep the length about the same.
2. **UI and UX review.** Look at layout, navigation, wayfinding, page structure, interaction, accessibility, and how the site behaves on phones and desktops.
3. **Content and strategy review.** Look at what the site includes and leaves out, how it is organized, how it fits its audience, and how credible it is as an official government site.

## How to report

- For the copy edit, give before-and-after pairs. Label each pair with its page and section.
- For the reviews, give one finding per item, with these fields:
  - page and location
  - what you observed
  - why it matters
  - suggested change
  - severity (high, medium or low)
- Keep what you observed separate from what you recommend.
- Say what you could not check, such as hover menus, scripts or phone layouts.
