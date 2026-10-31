# Amanat Baghdad: current site, in depth

Checked 31 Oct 2026 from outside Iraq. This extends `current-site.md` (30 Oct). Where it corrects that file, the row says **Correction**. "Unverified" means no source was found. Interpretations are labelled as such.

## Summary

1. The site is a Nuxt 3 single-page app (May 2024 build) that reads everything from a public JSON API at `api.amanatbaghdad.gov.iq`. The API made a near-complete inventory possible without scraping pages.
2. The main site holds 212 posts (Oct 2023 to Oct 2026), 63 tenders, 295 auctions, 260 newspaper issues, 9 forms and a 68-item ticker. The 24 department and district subsites hold about 4,130 more posts, mostly from 2024.
3. **Correction:** a municipal hotline exists: **5628** (08:30–14:00), listed on the Ur portal and in two Mayoralty posts. Complaints also go through the Mayoralty's "Baghdad – Citizen Voice" app, which it says it is upgrading with case tracking.
4. **Correction:** the home page loads about **173 MB** of images, not 1.1 MB. Each law card is an 11.7 MB image. No image has useful alt text.
5. **Correction:** the org chart is not empty. It draws 48 boxes, hard-coded in the script, but none of the lines between them.
6. Real substance worth keeping: a laws library (27 PDFs), a 49-address email directory, district complaint phone numbers, office map pins, live tenders and auctions, the 2030 master plan and a 2025 statistics report.
7. A lot is leftover or test content: "تجربة" ("test") and "TESTTTT…" on department pages, empty bio cards, an empty Green Zone subsite, placeholder social links, a broken Google Map, and a radio page with no stream.
8. Most posts are about the Mayor: 95 of 138 news headlines name him in their opening words. District sites went quiet after 2024 and now point to Facebook.
9. Developer: the footer credits "UoITC-BIC". That points to the University of Information Technology and Communications (its College of Business Informatics), **not the University of Baghdad**.
10. `/en` is the Arabic content in a left-to-right layout. There is no Kurdish version.

## Method

| Step | What | Count |
| --- | --- | --- |
| Shell and bundles | `curl` of the app shell and 75 JS chunks (main site and one subsite) | ~80 requests |
| API | List endpoints for news, categories, municipalities, ticker, forms, tenders, newspaper, site config; per-subsite config, gallery, ticker and news per category | ~290 requests at about 1 per second |
| Rendered pages | Built-in browser: home (desktop and 375 px), `/en`, about, contact, radio, museum, newspaper, tenders, tree, search, a 404, the Karrada subsite | ~15 page loads |
| Sizes | `HEAD` requests for the 97 API images on the home page and 25 other files | ~120 requests |
| External links | One request each to 55 linked domains | 55 requests |

Nothing was submitted, and no login was attempted. Raw files are in the session scratch folder only. The API host often reset TLS connections; retries were needed (see Build). One fee-payer list was opened to describe its columns; no names are reproduced here.

## 1. Site map

### Main site routes

Found in the router table of `https://www.amanatbaghdad.gov.iq/_nuxt/entry.739c28fa.js`. Every route exists three times: `/ar/…`, `/en/…` and unprefixed.

| Path | Content | Data source | Reached from |
| --- | --- | --- | --- |
| `/ar` | Home: hero, tickers, 9 post sections, subsite grid, promos | `/api/SiteConfig/ar`, `/api/Category/ar`, `/api/Hotnews`, `/api/Municipality/ar` | Nav, logo |
| `/ar/about-us` | One paragraph: history and Law 16/1995 Art. 1 | Site config | Nav |
| `/ar/tenders`, `/ar/tenders/{id}` | 63 tenders, all expired | `/api/Tenders/ar` | Nav |
| `/ar/bids`, `/ar/bids/{id}` | 295 auction notices, all expired | `/api/Tenders/ar?isBids=true` | Nav |
| `/ar/tree` | Org chart, 48 boxes, no lines | Hard-coded in `index.fdad96a8.js` | Nav |
| `/ar/museum` | 26 photos, no text | `/api/Museum` | Nav, home promo |
| `/ar/forms`, `/ar/forms/{id}` | 9 cards: 5 forms, 4 link cards | `/api/Forms` | Nav |
| `/ar/radio` | One paragraph of history; no player | i18n string | Nav, home promo |
| `/ar/newspaper`, `/ar/newspaper/{id}` | 260 issues, each about 12 page scans | `/api/Newspaper` | Nav, home promo |
| `/contact-us` | Message form and a Google Map that fails to load | — | Nav |
| `/ar/news`, `/ar/news/{id}` | All 212 posts on one page | `/api/News/ar` | Home "all" links, ticker |
| `/ar/category/{id}` | Posts in one home section | `/api/News/ar/All/{id}` | Home section links |
| `/ar/search?q=` | Site-wide search, including subsite posts | `/api/SiteConfig/search?q=` | Search box only |

- Depth is two levels at most: index, then item. Every post is one click below a list.
- The nav links to `/contact-us` without `/ar`, so the language prefix drops on that page.
- `robots.txt` and `sitemap.xml` return the app shell (HTTP 200, 2,292 bytes). There is no sitemap. Source: `https://www.amanatbaghdad.gov.iq/robots.txt`.
- Unknown paths return HTTP 200 from the server, then Nuxt's default English "Page not found" screen. Source: `https://www.amanatbaghdad.gov.iq/ar/xyz-not-a-page`.

### Reachable only from the home page

- The 9 post sections (laws, departments, fee payers, bios, posters, "More", Mayor's message, National Day, latest news). No nav item leads to them.
- Ticker items: the 2025 statistics report, two World Bank ESCP PDFs, the "internal" and "external" form DOCX files, the permit launch video and the MediaFire laws archive. Source: `https://api.amanatbaghdad.gov.iq/api/Hotnews?pageSize=1000`.
- The 24 subsites, through the "الدوائر" grid.

### Orphans and empty structure

- 290 categories exist. 119 belong to no subsite. Only 9 of those 119 hold main-site posts. The rest are empty leftovers such as "قسم ٢", "عرض القسم ٢" and "النظافة/10/3/2024z". Source: `https://api.amanatbaghdad.gov.iq/api/Category/ar`.
- Of the 171 subsite categories, 52 are empty (computed from `/api/News/ar/{subsite}/{category}`).

### Subsites

Each `*.amanatbaghdad.gov.iq` host runs a second Nuxt build (`entry.244b8014.js`, built 18 May 2024). It has five routes: home, news, category, gallery and contact. The host name is matched to a municipality ID in the script.

| Subsite | Arabic | Posts | First | Last | Notes |
| --- | --- | --- | --- | --- | --- |
| baghdadg | بلدية بغداد الجديدة | 1,760 | 2024-03 | 2025-03 | Most active district. 15 categories |
| project | دائرة المشاريع | 626 | 2024-03 | 2026-02 | Only subsite posting in 2026. Road and building works by bank |
| karrada | بلدية الكرادة | 416 | 2023-12 | 2025-02 | 29 categories, incl. complaints and e-payment |
| bobalsham | قسم بوب الشام | 399 | 2024-05 | 2025-04 | |
| adhamiya | بلدية الاعظمية | 390 | 2023-11 | 2024-10 | |
| media | مديرية العلاقات والاعلام | 183 | 2023-12 | 2025-06 | Holds the real social accounts |
| mansour | بلدية المنصور | 147 | 2024-03 | 2024-10 | |
| sader2 | بلدية الصدر الثانية | 47 | 2024-04 | 2024-07 | |
| dora | بلدية الدورة | 45 | 2024-05 | 2025-03 | |
| sewage | دائرة مجاري بغداد | 28 | 2024-03 | 2024-10 | |
| rasheed | دائرة بلدية الرشيد | 25 | 2024-02 | 2024-06 | |
| water | دائرة ماء بغداد | 13 | 2024-06 | 2024-10 | |
| kadhimiya | بلدية الكاظمية | 12 | 2024-02 | 2024-03 | 9 of 11 categories empty |
| sader1 | بلدية الصدر الاولى | 11 | 2024-03 | 2024-07 | |
| parks | دائرة المنتزهات والتشجير | 8 | 2024-07 | 2024-07 | Map pin at 0,0 |
| rusafa | بلدية الرصافة | 8 | 2024-03 | 2024-06 | |
| karkh | بلدية الكرخ | 4 | 2024-03 | 2024-07 | |
| shaab | بلدية الشعب | 3 | 2024-03 | 2024-03 | |
| shuala | بلدية الشعلة | 2 | 2025-02 | 2025-02 | |
| factories | قسم المعامل | 2 | 2024-03 | 2024-03 | Footer text is "." |
| ghadeer | بلدية الغدير | 1 | 2024-05 | 2024-05 | About text is "نص حولنا" ("about text") |
| designs | دائرة التصاميم | 1 | 2024-03 | 2024-03 | |
| estate | دائرة العقارات | 0 | — | — | 2 empty categories |
| gzone | بلدية المنطقة الخضراء وطريق المطار | 0 | — | — | No categories, no hero image |

Source: `https://api.amanatbaghdad.gov.iq/api/Municipality/ar` and `/api/News/ar/{municipalityId}/{categoryId}` for each category. By year: 3 posts in 2023, 2,924 in 2024, 1,183 in 2025, 21 in 2026.

### English and Kurdish

- The i18n config defines two locales only, `ar` and `en`. There is no Kurdish locale or route. Source: `https://www.amanatbaghdad.gov.iq/_nuxt/i18n.config.0ecce321.js`.
- `/en` translates interface strings only ("Read More", "Others"). All content stays Arabic: 15,293 Arabic letters against 2,860 Latin letters on `/en`, most of the Latin being ministry URLs. `lang` stays `ar`. Confirms `current-site.md`.
- The English API returns the same Arabic posts (`/api/News/en`, 212 items). `/api/Tenders/en` returns a different, older set of 10 tenders (Dec 2023 to Dec 2024), still in Arabic.
- The English strings contain an unedited template line, "This is an example text that could be replaced in the same space…", and a mistranslation, "Minister of Baghdad Word" for كلمة أمين بغداد. Not seen rendered; both are in the bundle.

## 2. Contents

### Main site, by section

| Section | Type | Count | Range | Cadence | Source |
| --- | --- | --- | --- | --- | --- |
| اخر الاخبار (latest news) | Press releases, one photo each | 138 | 2023-10-17 to 2026-10-21 | About 5–15 a month in 2024 and from Jul 2026; **none from Aug 2024 to Nov 2025** (2 in Dec 2025, 4 in Apr–Jun 2026) | `/api/News/ar` |
| قوانين وتعليمات البلديات (laws) | Law or regulation, PDF attached | 28 (27 with PDF) | Sep 2025 to Aug 2026 | Loaded in one batch on 22 Sep 2025 | `/api/News/ar/Show/{id}` |
| الدوائر والاقسام (departments) | Department pages | 13 | Nov 2023 to Sep 2026 | Rare | `/api/News/ar` |
| المكلفين… (fee payers) | Lists of trade, sign and cleaning fee payers, as HTML and JPG files | 10 posts linking about 140 files | Jan to Sep 2024 | Stopped Sep 2024 | `/api/News/ar` |
| السيرة الذاتية (bios) | Scanned CV PDFs of directors | 9 (8 with PDF) | 22–24 Sep 2026 | One batch | `/api/News/ar/Show/{id}` |
| المزيد (more) | Email directory, ministries list, street map, World Bank notices, Citizen Voice, 2030 plan, permit rules | 9 | Oct 2023 to Feb 2024 | Not updated since | `/api/News/ar` |
| بوسترات توعوية (posters) | Service posters with QR codes | 3 | Jul 2024 | — | `/api/News/ar` |
| كلمة أمين بغداد (Mayor's message) | One JPG of text | 1 | Feb 2025 | — | `/api/News/ar/Show/49a27d6f-…` |
| اليوم الوطني العراقي (National Day) | 9 poster images | 1 | Oct 2025 | — | `/api/News/ar/Show/782f9452-…` |
| Ticker | Links to posts, PDFs, DOCX, Ur services | 68 (62 marked urgent) | Oct 2023 to Oct 2026 | 17, 36, 6 and 9 a year | `/api/Hotnews?pageSize=1000` |
| Tenders | Notice with image scans or DOC | 63, all expired | Oct 2023 to Apr 2026 | 42 in 2024, 4 in 2025, 2 in 2026 | `/api/Tenders/ar` |
| Auctions | Numbered notice plus DOC file | 295, all expired | Nov 2023 to Aug 2026 | 154 in 2026 so far; about 10–47 a month | `/api/Tenders/ar?isBids=true` |
| Newspaper | Issue number plus about 12 page JPGs | 260 issues (nos. 1929–2192) | Feb 2024 to Oct 2026 | About weekly | `/api/Newspaper` |
| Forms | 5 web forms, 4 link cards | 9 | Oct 2023 to Jun 2025 | — | `/api/Forms` |
| Museum | Photos | 26 | — | — | `/api/Museum` |

Notes on the data:

- 56 of the 138 news posts have the whole article pasted into the title field (up to 2,780 characters), and no body. This is the pattern for almost all 2026 posts.
- Auction titles carry only a number, such as "م/ إعلان ( 166 )". The subject is inside a DOC file (210 DOC, 17 PDF attachments). Nothing is searchable.
- 19 tenders embed scanned images as base64 text inside the description: 14.2 million characters. This makes `/api/Tenders/ar` a 14.2 MB download every time the Tenders page opens.
- The fee-payer HTML files are tables with these columns: name, trade name, mahalla, alley, house, branch, profession, sign fee, cleaning fee, debts, amount paid. They name private individuals and their debts. One Adhamiya file has 229 rows. File links are left out here because they name individuals.

### Forms

| Form | Goes to | Fields | Source |
| --- | --- | --- | --- |
| Suggestion or complaint to the Technical Deputy | `shakawi.wakelfani@` | 9, incl. a dropdown of the 11 technical departments | `/api/Forms` id `708d4f27…` |
| Complaints and reports, Audit Dept | `shakawi.alrkaba@` | 10; "against an employee or a department" | id `5b8c5c20…` |
| Building-permit satisfaction survey | `astibana@` | 16 rating questions | id `9c18dc15…` |
| Citizen meeting request (to the Mayor) | `Connection@` | 4 | id `d9a76a51…` |
| Employee meeting request | `connection@` | 7 | id `cbbaac3a…` |
| Pay water bill (link card) | — | The URL is in the title text, not a link | id `d0c60e44…` |
| Sewer connection (link card) | Ur service 51171 | — | id `baadb8ba…` |
| Residential building permits (link card) | Ur service 10330 | — | id `e96012b0…` |
| Water Department services (link card) | Ur services 10364, 10322, 12 | — | id `95504ad7…` |

- Every form forwards to an email inbox (`forwardTo`). No form returns a reference number.
- The permit survey asks residents to rate "a way to track your transaction without visiting the office". So the Mayoralty already measures demand for tracking.

### Contact facts found (new)

| Fact | Value | Source |
| --- | --- | --- |
| Municipal hotline | **5628**, "inquiries or complaints", 08:30–14:00 | Ur hotlines page `https://ur.gov.iq/index/hot-line`; posts `d283abef-3507-4003-b384-74f7fa876ab5` (Jun 2024) and `0ca9db53-35a1-4cbc-9baa-8f545f5bb4d9` (Sep 2026) |
| Baghdad Governorate hotline | 5635, same hours | `https://ur.gov.iq/index/hot-line` |
| Citizen Voice app | "بغداد - صوت المواطن", iOS App Store id 1669088018, developer "TECHNICAL CREATIVITY SPACE COMPANY". The Google Play ID `com.alghafiqi.baghdadapp` returned Not Found | Link hub `https://poplme.co/hash/B3ke8fRb/1/dashqr1676325412611`; `https://apps.apple.com/iq/app/id1669088018` |
| Citizen Voice upgrade | Intake, classification, referral, follow-up, closure and performance tracking; AI classification; to be offered inside the SuperQi app | Post `fe6fc46a-074c-4e73-8071-d69dda3947f1` (4 Sep 2026) |
| Household waste pickup | Free. Report anyone charging, with the truck number, via Citizen Voice or 5628 | Post `0ca9db53-…` (26 Sep 2026) |
| Official social accounts | facebook.com/mayoralty.baghdad, instagram.com/mayoralty_baghdad, twitter.com/mayoralty_bd, YouTube channel `UC2-OC_V_sQy_v13ZorbLKFQ` | Media subsite config `/api/SiteConfig/ar/436b0d5e-…` |
| Email directory | 49 addresses with their office names | Post `376aea29-8072-48af-ab4f-246928e1391b` |

District and department complaint numbers, as published in subsite footers or posts. They are mobile numbers from 2024 configs and were not tested.

| Subsite | Number | Source |
| --- | --- | --- |
| Sewerage Dept | 0776 220 1455 | `/api/SiteConfig/ar/e62c0ff4-…` |
| Dora | 07815332009 | `/api/SiteConfig/ar/d59cf152-…` |
| New Baghdad | 07712188862 | `/api/SiteConfig/ar/58b8a941-…` |
| Sadr 2 | 07736558957 | `/api/SiteConfig/ar/0a519b08-…` |
| Al-Ghadeer | 07818828820 | `/api/SiteConfig/ar/96f8eb87-…` |
| Karkh | 07738294289 | `/api/SiteConfig/ar/093276f4-…` |
| Al-Rasheed | 07831118311 | Rasheed subsite post, 2024 |

**Correction (emails):** the directory gives district addresses with an `al` prefix: `alkarrada@`, `alkarkh@`, `aladmia@`, `aldora@`, `almansor@`, `alrusafa@`, `alsader1@`, `alsader2@`, `alshaab@`, `alshuala@`, `algader@`, `green@`, plus `kadhimiya@` and `baghdadg@`. `current-site.md` gave `karkh@` as an example, and our prototype uses `karrada@`. Both differ from the directory. `info@` is listed as "the website", so it is confirmed, not inferred.

### Leadership named in posts

| Role | Name in posts | Source | Status |
| --- | --- | --- | --- |
| Mayor | Eng. Ammar Moussa Kadhim | Most posts; i18n | Consistent |
| Deputy, Municipal Affairs | Ali Kamel al-Saadi (علي كامل الساعدي) | `5d0a72bf-…` (Sep 2026), `3922b475-…`, `f922520c-…` (Oct 2026) | Consistent in 3 posts |
| Deputy, Technical Affairs | Dr Ali Hassan Lafta (علي حسن لفتة) | `a18727e8-…` (Aug 2026), `7d06abe2-…` (Sep 2026) | Conflicts with the next row |
| Deputy, Administrative Affairs | Eng. Safaa Mohammed Mahmoud (صفاء محمد محمود) | `bdd082f9-…` (8 Oct 2026) | The post of 21 Oct (`f8c1ed6f-…`) calls him the Technical deputy. **Unresolved** |
| DG, Relations and Media | Eng. Mohammed al-Rubaie | `90340243-…`, `bdd082f9-…` | |
| DG, Projects Dept | Eng. Yaqdhan Adnan al-Waili | Projects subsite ticker, Feb 2026 | |

### Reporting lines (org chart)

The chart is hard-coded in `https://www.amanatbaghdad.gov.iq/_nuxt/index.fdad96a8.js`. It is the only place that shows who reports to whom.

| Reports to | Units |
| --- | --- |
| Mayor directly | Mayor's Office; Security Permits Office; Contracts; Investment; Quality Management; IT; World Bank unit; Electricity and Decorations |
| Technical Deputy | Planning and Follow-up; Water; Sewerage; Projects; Designs; Production Units; Water Projects Execution Co.; Parks and Afforestation; Ibn Rushd Co. |
| Administrative Deputy | Admin and Finance; Real Estate; Guards and Security; Relations and Media; Legal; Audit and Control |
| Municipal Deputy | The 15 municipalities (incl. Green Zone and Airport); Solid Waste and Environment; Highways; House Numbering (الترقيم); Municipal Factories; Cemeteries; Bob al-Sham |

### Office map pins

The Municipality API gives a latitude and longitude for each subsite. They are not checked against OpenStreetMap. Water, Sewerage, Real Estate and Designs share about 33.335, 44.403, which looks like one headquarters site. The Media pin equals the default map centre hard-coded in the subsite footer, so it may not be a real location.

| District | Lat, Lng | | District | Lat, Lng |
| --- | --- | --- | --- | --- |
| Rusafa | 33.3446, 44.4080 | | Karkh | 33.3320, 44.3907 |
| Adhamiya | 33.3905, 44.3624 | | Kadhimiya | 33.3751, 44.3423 |
| Shaab | 33.3863, 44.4125 | | Mansour | 33.3287, 44.3441 |
| Sadr 1 | 33.3650, 44.4301 | | Shuala | 33.3612, 44.2908 |
| Sadr 2 | 33.3654, 44.4297 | | Rasheed | 33.2729, 44.3549 |
| Ghadeer | 33.4183, 44.4144 | | Dora | 33.2553, 44.3989 |
| New Baghdad | 33.3245, 44.4953 | | Green Zone | 33.2885, 44.3284 |
| Karrada | 33.3186, 44.4205 | | | |

On these pins, Ghadeer sits east of the river, and Shuala and the Green Zone sit west. That supports the banks assumed in `current-site.md`, but a pin is not a boundary.

### Documents worth naming

| Document | URL | Size |
| --- | --- | --- |
| Statistical report 2025 | `https://api.amanatbaghdad.gov.iq/files/2bcd79ee-b221-4c17-9c4e-73edb58a814a.pdf` | 7.4 MB (contents not opened) |
| Baghdad comprehensive development plan 2030 | `https://api.amanatbaghdad.gov.iq/files/ab1eb9d9-a999-4bac-884c-fa84ca7e391d.pdf` | 9.5 MB (not opened) |
| Mayoralty of Baghdad Law (PDF) | `https://api.amanatbaghdad.gov.iq/images/34d5ece7-7578-4671-8a49-0ca0c6330549.pdf` | — |
| Building Permits Regulation 2/2016 (PDF) | `https://api.amanatbaghdad.gov.iq/images/93dff663-2150-474c-84ac-8ce8f571f56f.pdf` | — |
| Trade fees for shops | `https://api.amanatbaghdad.gov.iq/files/3acdac4e-18c4-4941-8bf0-f0dd3f67d59a.pdf` | — |
| Car-wash and parking rules | Posts `c8f365ae…`, `ece7e06c…` | — |
| Neighbourhood and street boundary map | `https://api.amanatbaghdad.gov.iq/images/bfeea80c-715b-4b12-b176-66ffc5a16434.jpg` | 0.9 MB, 2000×2828 |
| World Bank ESCP, Oct 2026 | `https://api.amanatbaghdad.gov.iq/files/41a227f1-a3f3-4274-a4c6-d16e6436d214.pdf` | — |

The other laws in the library: Municipal Revenues Law 1/2023, Municipal Administration Law 165/1964, Street Paving Law 85/1963 and its four amendments, Roads and Buildings Regulation 44/1935, State Property Sale and Lease Law 21/2013, Investment Law 13/2006, Industrial Services Law 30/2000, encroachment removal decision 154/2001, decision 296/1990 on defacing public space, and a plot-subdivision rule. Source: category `9443bd01-9c2a-4152-bb9e-095dd113cfbb`.

## 3. Links

### Home page counts (desktop, rendered)

| Metric | Value | Note |
| --- | --- | --- |
| Links | 447 | Same as `current-site.md` |
| Unique targets | 415 | **Correction:** 443 before; this count resolves each URL first |
| «اضغط هنا» ("click here") links | 162 | |
| Internal hosts | www (149), api (154), bare domain (2), 24 subsites (1 each) | Links mix `www.` and the bare domain |
| External domains | 47 | Listed below |

### External destinations

| Domain | Used for | Status from outside Iraq |
| --- | --- | --- |
| `eservice.ur.gov.iq`, `ur.gov.iq` | Building permit, property and personal statements, water and sewer services, Ur login | 200. Service 50687 (permits for commercial and industrial buildings) shows «انتهاء التقديم», applications closed |
| `water.jabi.iq` | Water bill payment | 200. Operator still unverified |
| `itp.iq` | Unified tenders and ads platform | 200 |
| `ca.iq` | "Citizen e-government" card | **Correction:** 200 now (title «تقديم طلب», "submit a request"); 404 on 30 Oct. Purpose unclear |
| `poplme.co` | Citizen Voice app link hub | 200. Leads to the App Store and a dead Play listing |
| `mediafire.com` | All laws as one RAR file | 200. Now redundant with the PDF library |
| `mosulbaladiya.gov.iq` | 2016 permit regulation | 403 (bot-check page). Redundant: the same regulation is in the library |
| 28 ministry and federal sites (`cabinet.iq`, `pmo.iq`, `parliament.iq`, `ihec.iq`, `hjc.iq`, `mof.gov.iq`, `moi.gov.iq` and others) | "Websites of Iraqi ministries" list on the home page | Mixed. 5 loaded, 6 failed to connect, 7 returned 403 or 530, `mof.gov.iq/Pages/MainMof.aspx` returned 404, and 9 redirect to a "verify" bot-check page. May work from inside Iraq |
| `twitter.com`, `facebook.com`, `instagram.com` | Footer social icons | Placeholders (bare domains). The config also sets YouTube to `youtube.com` and TikTok to `facebook.com` |
| `facebook.com` (many pages) | District and department pages; subsite tickers link to Facebook posts | Real accounts; not checked one by one |
| `sg.docworkspace.com` | 14 shared documents in the Media subsite ticker | Not checked |
| `maps.googleapis.com` | Contact page map | Fails: "This page didn't load Google Maps correctly" |
| `api.iconify.design`, `googletagmanager.com`, `google-analytics.com` | Icons, analytics | Loaded on every page |

### Broken, placeholder and duplicated links

| Problem | Where | Source |
| --- | --- | --- |
| Same news ID behind two different headlines | Ticker: "12 sectors in Sadr City" and "Parliament committee praises rain response" both open `2428148d…` | `/api/Hotnews` |
| Same headline twice | Ticker: `2a329bc9…` (Apr 2024) and `de3cc590…` (Jan 2024) | `/api/Hotnews` |
| Links without the language prefix | 6 ticker items point to `/news/…`, not `/ar/news/…` | `/api/Hotnews` |
| Admin host exposed | A Projects ticker item links to `admin.amanatbaghdad.gov.iq/hotline` (not visited) | Projects subsite `/api/Hotnews/{id}` |
| Water payment "link" is plain text | Forms page card title holds the URL | `/api/Forms` |
| Bio card with nothing behind it | "بلدية المنصور" in bios: no text, no file | `/api/News/ar/Show/984c4f95-…` |
| Radio page with no stream | `/ar/radio` | Rendered page |
| Soft 404 | Every unknown URL returns HTTP 200 | `curl` |

## 4. Images and media

| Kind | Where | Typical size | Example |
| --- | --- | --- | --- |
| Hero carousel | Home, 10 slides; renders and city views (one checked: a tower render) | 49 KB – 1.3 MB; up to 4842×2126 | `api…/images/a393610c-15ae-4a9f-b123-c0ae83aa1448.jpg` (1.2 MB) |
| Law cards | Home laws section; one generic card uploaded separately 28 times | **11.7 MB each**, 7086×2953 | `api…/images/5ee92a1e-e6ca-4d01-a276-d06c2ee63ffb.jpg` |
| Service posters with QR codes | Home posters | Up to 13500×11702, 5.2 MB | `api…/images/fbea2806-ed31-47fb-8ef6-00c286b3e9fe.jpg` |
| News photos | One per post (event photos, the Mayor at openings and meetings) | 640–800 px wide, ~100–200 KB | `api…/images/027553ea-8ead-4932-90ce-78afedac2568.jpg` (113 KB) |
| Leadership | Mayor's message is a 640×302 JPG of text; bios are scanned PDFs | 98 KB | `api…/images/4744085a-54a4-48b9-9e9f-410f941a5fae.jpg` |
| Subsite cards | Home "الدوائر" grid, 24 images | Up to 2 MB | `api…/images/33631a01-8c66-4b6d-a054-4e3131a042dd.jpg` (1.98 MB) |
| Newspaper scans | About 12 per issue, about 3,100 in all | ~540 KB per page | `api…/images/d90442a4-2a5a-4c6f-9305-a862ed0a5032.jpg` |
| Museum photos | `/ar/museum`, 26 | ~90 KB, ~709×531 | `api…/images/175aa928-dd65-4065-aa46-aa78d6d22007.jpeg` |
| Seal | `/logo.png`, 415×415, 182 KB; shown at 32 px as the ticker bullet more than 60 times | | `https://www.amanatbaghdad.gov.iq/logo.png` |
| Decorative SVGs | `sindbad.svg` (200 KB), `buildings.svg` (87 KB), `culture.svg` | | Site root and `/_nuxt/` |
| Infographic map | Neighbourhood and street boundaries | 931 KB | See Documents |

- **Weight (Correction):** the 97 distinct API images on the home page total **172.6 MB** by `Content-Length` (24 are over 1 MB; median 176 KB). None is lazy-loaded. The 1.1 MB in `current-site.md` counted only same-origin files, because the browser hides cross-origin sizes.
- API images send no `Cache-Control` header, only an ETag. Repeat visits must revalidate each one.
- Alt text: 78 images have `alt="name"`, 81 have `alt=""` and 12 have none. None of the 171 has a meaningful description. **Correction** to "93 with no alt": the true gap is all 171.
- Video: no embeds and no `<video>` elements. One 12.8 MB MP4 (the e-permit launch) is linked from the ticker: `https://api.amanatbaghdad.gov.iq/files/165c54c6-dbca-4c14-baac-a4d766cb70e7.mp4`. The YouTube channel exists, but no page embeds it.
- On a 375 px screen the first view shows a National Day poster (Oct 2025) and the first hero slide. No service is visible. The page is 12,539 px tall, about 15 screens, with no sideways scroll.

## 5. Build and developer

### Stack

| Layer | Finding | Evidence |
| --- | --- | --- |
| Framework | Nuxt 3, client-only (`ssr:false`), Vue 3 | `x-powered-by: Nuxt`; `__NUXT_DATA__` with `data-ssr="false"` in the shell |
| Build date | 18 May 2024, main site and subsites | `Last-Modified` on `/_nuxt/entry.739c28fa.js` (22:57 GMT) and `entry.244b8014.js` (22:59 GMT) |
| Styling | Tailwind CSS (`dark:` variants, `z-[200]`) | Class names in the rendered DOM |
| Libraries | Swiper, Vue Flow (org chart), Iconify (`api.iconify.design`), `@nuxt/image`, nuxt-storage, ua-parser, dayjs, nuxt-i18n, nuxt-gtag | Chunk names and contents |
| Font | Cairo, self-hosted woff2 | `document.fonts` |
| Back end | Custom JSON API on its own host, responses shaped `{page, pageSize, total, totalPages, result, statusCode, hasError}` with GUIDs and soft-delete flags. List calls ask for `pageSize=9999`, so there is no paging | API responses. Framework not identifiable from the headers |
| Editor | Post bodies use TinyMCE's default colour palette (`rgb(224, 62, 45)`, `rgb(186, 55, 42)`, `rgb(35, 111, 161)`) and Word paste markup (`MsoNormal`) | Post HTML |
| Server | nginx/1.18.0 (Ubuntu); HSTS with preload; `X-Frame-Options`; a `cookiesession1` cookie on every response | Response headers. The cookie name suggests a Fortinet appliance in front (unverified). Frequent TLS resets during the crawl may come from it |
| Analytics | Google Analytics 4, `G-3XD9M5NHDB ` (with a trailing space), `initialConsent: true`, no consent banner | Shell config |
| Placeholder fallbacks | `https://fakeimg.pl/600x400` when a subsite card has no image; Arabic and English template sentences in i18n | `index.1556ff4f.js`, `i18n.config.0ecce321.js` |
| Weight, besides images | JS entry 361 KB, Swiper 155 KB, CSS 59 KB. Category JSON 403 KB on home; News JSON 758 KB on `/ar/news`; Tenders JSON 14.2 MB on `/ar/tenders`; Newspaper JSON 1.2 MB | Performance entries and `curl` |
| Load | `load` at 6.8 s on this connection (1.5 s on 30 Oct). Blank without JavaScript | Browser |
| Accessibility | 14 `h1`s and no `h2` on home; 9 links or buttons without names, including the phone menu button; contact form inputs have no labels; `<html>` has no `dir` | Browser |

### Who built it

- The footer says «تم التطوير بواسطة UoITC-BIC» ("developed by UoITC-BIC"). It is plain text with no link. It is hard-coded in the i18n file under the key `our_copy`, so it ships with the code rather than being typed into the CMS. Source: `https://www.amanatbaghdad.gov.iq/_nuxt/i18n.config.0ecce321.js`.
- UoITC is the University of Information Technology and Communications in Baghdad. The Ministry of Higher Education founded it in 2014. It is a separate university from the University of Baghdad, and it has a College of Business Informatics. Source: https://en.wikipedia.org/wiki/University_of_Information_Technology_and_Communications.
- A developer's LinkedIn profile, seen only as a search-result snippet, describes building the Amanat Baghdad website as a collaboration with "UoITC – Business Informatics College". The page itself returned HTTP 999. The profile is not named here, to keep a private person out of the record (unverified).
- **Verdict:** the evidence points to UoITC's College of Business Informatics, not the University of Baghdad. We cannot tell whether it was a contract, a student project or staff work, or who maintains the site now. Content is clearly entered by Mayoralty staff through the CMS.
- No HTML comments, `generator` tag or author meta exists, because the shell is generated by Nuxt.

## 6. Interpretation

These are judgments. Each says what it rests on.

| Feature | Label | Why it is there | Evidence |
| --- | --- | --- | --- |
| Mayor-led news (95 of 138 headlines name him) | Client demand | Visibility of the appointed head; the Relations and Media DG writes the posts | Post sign-off «المديرية العامة للعلاقات والإعلام»; post count |
| Mayor's message as a JPG | Client demand | Wanted on the home page; easier to upload an image than text | `Show/49a27d6f…` |
| National Day and religious occasion posters | Client demand | Official messaging calendar | `Show/782f9452…`, Arbaeen post Aug 2026 |
| Bios as scanned CVs | Client demand | Directors asked for a presence; added in one batch | 9 posts on 22–24 Sep 2026 |
| Department subsites (24) | Client demand, built as a developer template | Each directorate wants its own page; the template made this cheap | Same build for every host |
| Newspaper, radio, museum | Client demand | They are Mayoralty institutions under Relations and Media | Media subsite footer lists the radio and newspaper sections |
| World Bank ESCP PDFs in the ticker | Client demand (an obligation) | Bank-financed projects require public disclosure | Ticker items Oct 2026; WB-funded Habibiya and Khadra stations (`942b0d0f-…`) |
| Ministries link list | Client demand or habit | Common on Iraqi government sites | Post `d068c3e1…` |
| Two auto-scrolling tickers | Developer default | Template component (`MovingSlider`) filled with whatever is marked "urgent": 62 of 68 | `index.1556ff4f.js`; `/api/Hotnews` |
| Home built from category sections | Developer default | Every category with a sequence number becomes a home block | 290 categories, 14 `h1`s |
| «اضغط هنا» links, dot leaders, red text | Editor habit | TinyMCE colour picker and Word paste | Post HTML |
| Placeholder social links, `fakeimg.pl`, lorem text, Nuxt 404 | Developer leftover | Never configured before launch | Site config; bundles |
| "تجربة" and "TESTTTT…" on department pages | Developer or editor leftover | Test entries published and never removed | `e1ea6275…`, `a878eeb3…`, `cf6a0086…` |
| Org chart without lines | Developer bug | Edges point to node IDs that do not exist (`4`, `5`, `6` against `t4`, `t5`, `t6`) and all share one ID | `index.fdad96a8.js` |
| Base64 scans inside tenders | Editor habit enabled by the editor | Pasting scans into the rich-text box | `/api/Tenders/ar` |
| Ur service links | Real resident need | Permits, property statements and water accounts are the main transactions | Ticker and Forms |
| Complaint forms, 5628, Citizen Voice | Real resident need | Complaints are the one transaction the Mayoralty owns | Forms; posts; Ur hotlines |
| Email directory, district phones | Real resident need | People need the right office | Post `376aea29…`; subsite configs |
| Laws library | Real resident need and client demand | Lawyers, developers and owners need the texts; the Mayoralty must publish them | 27 PDFs |
| Fee-payer lists | Client demand (collections pressure); a privacy problem | Naming debtors to push payment | Column headers above |
| Auctions (295) | Real need for a niche audience | Leases and sales of municipal property run continuously | 154 notices in 2026 |
| District posts of daily field work | Client demand | Directors report activity upward; residents get little from it | 1,760 New Baghdad posts by section |

## Bring over

Ordered by consequence. "Where" uses our five sections.

| # | Item | Where | Why |
| --- | --- | --- | --- |
| 1 | **Hotline 5628 (08:30–14:00) and the Citizen Voice app** | Report a problem (beside the web form and WhatsApp); About › Contact; footer | It exists. Our About says there is no phone line, which is wrong. Report a problem should hand off to or feed Citizen Voice, not compete with it |
| 2 | **Real contact directory**: the 49 emails with their office names, district complaint numbers, office map pins | Each district page (office, email, phone); About › Contact for the central offices | Replaces our inferred addresses. Fix `karrada@` to `alkarrada@`. Pins help the district maps once checked against OSM |
| 3 | **Laws and plans library**: 27 law PDFs, the 2030 master plan, permit rules, fee schedule, car-wash and parking rules, the boundary map | New page: About › Laws and plans, linked from each service guide that relies on it (permit, fees, sewer) | Real, citable substance. A resident or lawyer needs the text, and it replaces the MediaFire RAR |
| 4 | **Tenders and auctions as listings**: number, subject, dates, status, file | About › Tenders and auctions, as its own index page | The Mayoralty posts about 20 auction notices a month on its own site. Linking only to itp.iq understates this. Titles need a subject line, which the source lacks |
| 5 | **Projects evidence**: the Projects Dept feed (626 posts to Feb 2026); the World Bank-funded Habibiya and Khadra stations (`942b0d0f-…`); the Dora sewage pumping station tender (`4cfbdd78-…`); 7 sewage treatment units opened Aug 2026 (`66a05014-…`) | Projects: as sources and status dates for the register | Lets us mark statuses "verified" with a dated official source |
| 6 | Reporting lines (three deputies and who reports to each) | About › Who does what | Only the org chart script has it; our page lists departments without a structure |
| 7 | Facts that change what residents do: free household waste pickup and how to report a charge; the rain-season operations room | Services (waste guide) and Alerts | They are announcements that change behaviour, which our principles allow |
| 8 | Official social accounts | Footer | Replaces nothing; the live site uses placeholders |
| 9 | Statistical report 2025 | About › Open data | An official dataset. Contents not yet read |
| 10 | The permit survey's questions | Building permit guide, "after you apply" | Shows what the Mayoralty already measures, including demand for tracking |

## Leave behind

| Item | Reason |
| --- | --- |
| Two auto-scrolling tickers | Unreadable, inaccessible, and filled with anything marked urgent |
| Posts as the home page's structure | Fourteen `h1`s and 15 phone screens. Tasks get buried |
| Fee-payer lists with names and debts | A privacy problem. A lookup by account number would do the job |
| Base64 scans in tenders; title-only auctions | 14 MB per page view, and nothing is searchable |
| The ministries link list | Off-mandate, and many links fail |
| MediaFire RAR and the Mosul-hosted PDF | Replaced by the library |
| Empty and test pages (bios with no file, "تجربة", "TESTTTT", the Green Zone and Real Estate subsites) | Placeholders erode trust |
| Full-size uploads (11.7 MB cards, a 13,500 px poster) | About 173 MB on one page. Resize on upload |
| Mayor's message as an image of text | Unreadable to screen readers and search |
| Google Map on the contact page | Broken. A static OSM map or an address does the job |

## Client must-haves

What the Mayoralty will likely expect in any proposal, and how we can carry it without becoming a news site.

| Expectation | How to carry it |
| --- | --- |
| The Mayor: name, photo, message | About › Leadership, with a short text message (not an image) and a dated photo. One line on the home page footer band at most |
| News and statements | A Newsroom under About, reverse-chronological and paged. The home page shows only announcements that change what residents do (our "Today" ledger), at most two |
| Deputies and directors | About › Leadership lists the three deputies and the directors general by unit, with CVs as text |
| A page for every department and district | Districts already gives each municipality a page. Departments get a templated page under About › Who does what: mandate, services, contact, recent works. That meets each director's wish for a presence without 24 separate sites |
| Newspaper, radio, museum | Footer links and an About › Our institutions page. The newspaper archive stays a list of issues |
| National occasions | A dated notice in the Newsroom. Optionally a thin banner on the home page for the day itself, then removed |
| World Bank disclosures | About › Open data or a "World Bank projects" page. It is an obligation and should be easy to find |
| Laws and decisions | The library (Bring over 3) |
| Digital transformation (Ur, e-payment, Citizen Voice) | Already central to Services and Report a problem. Name the systems so the client sees its own programmes reflected |

## Open questions

- Who is the Technical deputy now: Dr Ali Hassan Lafta or Eng. Safaa Mohammed Mahmoud? And who is the Administrative deputy?
- Does Citizen Voice give residents a case number and a public status? The app is on the App Store, but the Play listing is gone and SuperQi integration is "to be offered".
- Are the district mobile numbers still answered? They come from configs last edited in 2024.
- What do the office pins mark (headquarters, or a point in the district)? Several departments share one point.
- What is `ca.iq` now, and should it stay linked?
- Who maintains the site today, and under what agreement with UoITC?
- What does the 2025 statistical report contain? It was not opened (7.4 MB).
- Why did main-site news stop between Aug 2024 and Nov 2025?
- Are the failing ministry links reachable from inside Iraq?

## Sources

- Main site shell: https://www.amanatbaghdad.gov.iq/ar
- Router and bundles: https://www.amanatbaghdad.gov.iq/_nuxt/entry.739c28fa.js, https://www.amanatbaghdad.gov.iq/_nuxt/i18n.config.0ecce321.js, https://www.amanatbaghdad.gov.iq/_nuxt/index.fdad96a8.js
- Subsite bundle: https://karrada.amanatbaghdad.gov.iq/_nuxt/entry.244b8014.js
- API: https://api.amanatbaghdad.gov.iq/api/News/ar, /api/Category/ar, /api/Municipality/ar, /api/Hotnews?pageSize=1000, /api/Forms, /api/Tenders/ar, /api/Tenders/ar?isBids=true, /api/Newspaper, /api/SiteConfig/ar, /api/SiteConfig/ar/{municipalityId}, /api/Gallery/{municipalityId}, /api/Hotnews/{municipalityId}, /api/News/ar/{municipalityId}/{categoryId}, /api/News/ar/Show/{id}
- News posts are cited by ID. Open them at `https://www.amanatbaghdad.gov.iq/ar/news/{id}`
- Ur hotlines: https://ur.gov.iq/index/hot-line
- Ur closed service: https://ur.gov.iq/index/show-eservice/50687/10044/cat
- Citizen Voice link hub: https://poplme.co/hash/B3ke8fRb/1/dashqr1676325412611
- App Store listing: https://apps.apple.com/iq/app/id1669088018
- UoITC: https://en.wikipedia.org/wiki/University_of_Information_Technology_and_Communications
