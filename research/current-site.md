# Amanat Baghdad: current site inventory

Checked 30 Oct 2026 from outside Iraq. Load times are from that connection, not from Baghdad. "Unverified" means no official source was found.

## Summary

- Official site: `amanatbaghdad.gov.iq`. It is a client-rendered Nuxt app. With JavaScript off, the page is blank.
- The home page has 447 links: 443 unique, 171 images, and about 15 phone screens of scrolling.
- Real transactions run on the national Ur portal (`ur.gov.iq`, `eservice.ur.gov.iq`) and require a login. The Amanat site links to them through news posts and an "e-services" page.
- No phone number appears on the home page, the contact page or the e-services page. Complaints go to a web form or by email.
- The English version (`/en`) shows the Arabic content in a left-to-right layout.
- Most of the home page is news about the Mayor, PDFs and lists of fee payers.

## 1. Domains and related channels

| Channel | URL | Status | Notes |
| --- | --- | --- | --- |
| Main site | https://amanatbaghdad.gov.iq | 200 | `www.` also works. Nuxt SPA with `ssr:false`. Built by "UoITC-BIC" according to the footer |
| API / file store | https://api.amanatbaghdad.gov.iq | 404 at root | Hosts every PDF, DOCX, JPG and HTML attachment |
| Department and district subsites | `*.amanatbaghdad.gov.iq` (24, listed below) | All 200 | Each serves the same app shell against the same API |
| Ur national portal | https://ur.gov.iq | 200 | Run by the PM's Office / National Center for Digital Transformation. Hosts Amanat services |
| Ur e-services | https://eservice.ur.gov.iq | 200 | Applications require an Ur login |
| Water bill payment | https://water.jabi.iq | 200 | Third-party payment site linked for water bills. Operator unverified |
| Tenders platform | https://itp.iq | 200 | Linked as the unified tenders and ads platform |
| "Citizen e-government" | https://ca.iq | **404** | Still linked from a home-page card |
| "Baghdad – Citizen Voice" app (تطبيق بغداد صوت المواطن) | Link goes to a `poplme.co` QR/link-hub URL with a Facebook tracking parameter | Unverified | No App Store or Play listing found. Publisher unverified |
| Social media | Footer icons link to bare `https://twitter.com`, `https://facebook.com`, `https://www.instagram.com/` | **Placeholders** | The site gives no real social handles. Official accounts are unverified |
| Radio and newspaper | `/radio`, `/newspaper` | Live | إذاعة صوت بغداد and جريدة صوت بغداد |
| Baghdad Governorate (separate body) | https://baghdad.gov.iq | 200 | Title: «الموقع الرسمي لمحافظة بغداد» |

Subdomains linked from the home page: `parks`, `sewage`, `water`, `factories`, `estate`, `bobalsham`, `media`, `designs`, `project`, `rusafa`, `karrada`, `adhamiya`, `dora`, `shaab`, `baghdadg`, `kadhimiya`, `mansour`, `sader1`, `sader2`, `gzone`, `rasheed`, `shuala`, `ghadeer`, `karkh`.

### Amanat vs Governorate vs Provincial Council

| Body | Arabic | Role | Basis |
| --- | --- | --- | --- |
| Amanat Baghdad | أمانة بغداد | Municipal services inside the city's design boundary: water, sewerage, roads, bridges, cleaning, parks, building permits, municipal fees | Law 16 of 1995 (amended), Art. 1, quoted on `/ar/about-us` |
| Baghdad Governorate | محافظة بغداد | Province-wide administration headed by the Governor. Covers the outer districts beyond the Amanat boundary | Law 21 of 2008 (governorates not in a region). Scope split from Amanat is **unverified** in detail |
| Provincial Council | مجلس محافظة بغداد | Elected council. Elects the Governor, approves the provincial budget and oversees local government | Law 21 of 2008. Its oversight of Amanat is **unverified** |

- The Mayor (أمين بغداد) is appointed at the federal level. An IraqiNews search snippet (27 Sep 2026) reports that parliament voted to confirm Ammar Moussa as Mayor. The article itself returned 403, so the exact date is unverified.
- Design implication: residents often cannot tell which body handles their issue. A redesign should route outer-district issues to the Governorate.

## 2. Main site map

### Top navigation (identical in header and footer)

| Arabic label | English | Path | What it contains |
| --- | --- | --- | --- |
| الرئيسية | Home | `/ar` | Hero carousel, tickers, news, cards |
| من نحن | About | `/ar/about-us` | One paragraph of history plus Law 16/1995 Art. 1 |
| المناقصات | Tenders | `/ar/tenders` | Tender list |
| المزايدات | Auctions | `/ar/bids` | Auction list |
| الهيكل التنظيمي | Org chart | `/ar/tree` | **Renders empty** (logo and an SVG only, no chart text) |
| المتحف البغدادي | Baghdadi Museum | `/ar/museum` | Museum page |
| الخدمات الالكترونية | E-services | `/ar/forms` | 9 form cards (listed below) |
| اذاعة صوت بغداد | Radio | `/ar/radio` | Radio stream |
| جريدة صوت بغداد | Newspaper | `/ar/newspaper` | Newspaper issues |
| تواصل معنا | Contact | `/contact-us` | A message form with an attachment field. No phone, address or hours |
| English | — | `/en` | The same Arabic content in an LTR layout |

### Home page sections, in order

1. Hero: «أمـانة بغـداد / بغداد مدينة السلام». A 10-slide carousel of render images.
2. Ticker 1: about 17 mixed items (World Bank PDFs, the complaint email, the 2025 statistics PDF, 3 Ur service links, DOCX forms, an MP4).
3. Ticker 2: about 45 news headlines, most starting «امين بغداد…». It includes a duplicate link: two different headlines point to the same news ID.
4. A second ticker of documents: the laws RAR file on MediaFire, an officials' travel JPG, the 2023 revenue law, the 2016 building-permit regulation (hosted on the Mosul municipality site, returns 403), the water payment link and a satisfaction survey.
5. كلمة أمين بغداد (Mayor's message).
6. اخر الاخبار (latest news): 10 cards.
7. اليوم الوطني العراقي (National Day).
8. قوانين وتعليمات البلديات (laws and regulations): 11 posts.
9. بوسترات توعوية (awareness posters): this card set also holds service links (Ur links, the Citizen Voice app, building permit, the 2030 master plan, a ministries directory with about 30 external links, and the street map JPG).
10. Email directory: 49 `mailto:` addresses for offices, departments and districts.
11. الدوائر والاقسام (departments): 10 posts.
12. المكلفين المشمولين برسم المهنة والاعلان والنظافة (fee payers subject to trade, advertising and cleaning fees): about 140 «اضغط هنا» links to raw `.html` and `.jpg` files listing people and businesses by district.
13. السيرة الذاتية (bios), then a grid of links to the 24 subsites.
14. Promos for the newspaper, museum and radio, then the footer.

### Counts (home, `/ar`, desktop)

| Metric | Value |
| --- | --- |
| Links | 447 (443 unique) |
| Links labelled only «اضغط هنا» (click here) | about 160 |
| Images | 171 (93 with no `alt`) |
| `h1` elements | 14 |
| Resources loaded | 121, about 1.1 MB transferred (cached fonts excluded) |
| `load` event | about 1.5 s from this connection |
| Mobile page height (375 px wide) | 12,539 px, about 15 screens |

## 3. Services: what exists and where it runs

| Service | Arabic | Where | Online? |
| --- | --- | --- | --- |
| Building permit (all types) | منح إجازة البناء بمختلف انواعها | Ur `applyService/10671` | **Yes**, needs an Ur login. Verified |
| Residential building permits | اجازات البناء للمناطق السكنية | Ur `new-service/10330` | Linked. Service text not checked |
| Property statement | فتح بيان عقار | Ur `applyService/10928` | **Yes**, needs an Ur login. Verified |
| Personal statement | طلب فتح بيان شخصي | Ur `applyService/10935` | Linked. Not checked |
| Sewer connection | ايصال انابيب الصرف الصحي | Ur `show-eservice/51171` | **Yes**, needs a login. Page says «تحتاج تحقق وحضور» (verification and an in-person visit required) |
| Water services: new account, meter install or replace, change account name | خدمات دائرة ماء بغداد | Ur `new-service/10364`, `10322`, `12` | 10364 is live (provider: Amanat / Baghdad Water Dept). Others not checked |
| Merge water accounts | دمج اكثر من حساب ماء | Ur `show-eservice/20157` | **Closed**: «انتهاء التقديم» |
| Pay water bill | تسديد اجور الماء | water.jabi.iq | Yes (third party) |
| Suggestion or complaint to the Technical Deputy | استمارة مقترح او شكوى | `/ar/forms/708d…` | Web form |
| Complaints and reports, Audit dept | قسم الشكاوي والبلاغات | `/ar/forms/5b8c…` and email `shakawi.alrkaba@amanatbaghdad.gov.iq` | Web form and email |
| Request a meeting (citizen) | استمارة مقابلة مواطن | `/ar/forms/d9a7…` | Web form |
| Request a meeting (employee) | استمارة مقابلة موظفي امانة بغداد | `/ar/forms/cbba…` | Web form |
| Building-permit satisfaction survey | استبانة قياس جودة خدمة منح اجازة بناء | `/ar/forms/9c18…` | Web form |
| Trade, advertising and cleaning fees | رسم المهنة والاعلان والنظافة | Lists only (HTML and JPG per district) | **No.** Lookup by scrolling lists; no payment |
| Tenders and auctions | المناقصات / المزايدات | `/ar/tenders`, `/ar/bids`, itp.iq | Read only |
| Planning rules, 2030 master plan, permit controls | الضوابط التخطيطية، المخطط الانمائي 2030 | DOCX and PDF downloads | Read only |

Not found online: road and pothole reports, waste pickup or bulky-item requests, a street-light report path, flood reports, cemetery services, parks booking, and status tracking for any request.

### Contact channels

- Phone or hotline: **none published** on home, contact or e-services. No verified municipal hotline was found. A search for "139" returned only Kuwait's municipal line.
- Email: 49 addresses on the home page, including `info@`, `alshakaw@` (complaints), `bagh.mayor@` and `mayor.office@`, the three deputies (`wakelbaladi@`, `wakeledari@`, `wakelfani@`) and one per district (for example `karkh@`, `alsader1@`).
- Web forms: the contact form plus the 4 complaint and meeting forms above.
- In person: meeting-request forms only. No addresses or hours are published.

### Languages

- Arabic only in practice. `/en` swaps the layout to LTR but keeps the Arabic text, and `lang` stays `ar`.
- Ur page titles show «Language will be provided soon» and «translation soon».

## 4. Organization

### Leadership

| Role | Arabic | Name | Source |
| --- | --- | --- | --- |
| Mayor | أمين بغداد | Eng. Ammar Moussa Kadhim (المهندس عمار موسى كاظم) | Site news posts. Wikipedia lists his tenure as 2022–present |
| Deputy, Municipal Affairs | وكيل الأمانة للشؤون البلدية | Name unverified | Email `wakelbaladi@` |
| Deputy, Administrative Affairs | وكيل الأمانة للشؤون الإدارية | Name unverified | Email `wakeledari@` |
| Deputy, Technical Affairs | وكيل الأمانة للشؤون الفنية | Name unverified | Email `wakelfani@`. Receives the suggestion and complaint form |

### Departments (دوائر), from Arabic Wikipedia and site links

- Mayor's Office (مكتب أمين بغداد) and Security Clearances Office (مكتب التصاريح الأمنية)
- Water (دائرة ماء بغداد), Sewerage (دائرة مجاري بغداد), Solid Waste and Environment (دائرة المخلفات الصلبة والبيئة)
- Designs (دائرة التصاميم), Projects (دائرة المشاريع), Planning and Follow-up (دائرة التخطيط والمتابعة), Real Estate (دائرة العقارات)
- Parks and Afforestation (دائرة المتنزهات والتشجير), Production Units (دائرة الوحدات الانتاجية), Factories section (قسم المعامل)
- Audit and Control (دائرة الرقابة والتدقيق), Admin and Finance (الدائرة الإدارية والمالية), Legal (الدائرة القانونية), Guards and Security (المديرية العامة للحراسات والأمن), Relations and Media (المديرية العامة للعلاقات والإعلام)
- Companies: Water Projects Execution Co. (شركة تنفيذ مشاريع الماء) and Ibn Rushd General Co. (شركة ابن رشد العامة)
- Sections named on the site: IT, Investment, Electricity and Decorations, Contracts, Quality Management, and Bob al-Sham (قسم بوب الشام)

### Municipal districts (دوائر بلدية): 14, plus 1 special-zone municipality

| # | Arabic | English | Bank of the Tigris | Subdomain | Side source |
| --- | --- | --- | --- | --- | --- |
| 1 | بلدية مركز الرصافة | Rusafa Center | East (Rusafa) | rusafa | Wikipedia |
| 2 | بلدية الأعظمية | Adhamiya | East | adhamiya | Wikipedia |
| 3 | بلدية الشعب | Al-Shaab | East | shaab | Wikipedia (under Adhamiya) |
| 4 | بلدية الصدر الأولى | Sadr 1 | East | sader1 | Wikipedia (Sadr City) |
| 5 | بلدية الصدر الثانية | Sadr 2 | East | sader2 | Wikipedia (Sadr City) |
| 6 | بلدية الغدير | Al-Ghadeer | East | ghadeer | **Unverified** |
| 7 | بلدية بغداد الجديدة | New Baghdad | East | baghdadg | Wikipedia |
| 8 | بلدية الكرادة | Karrada | East | karrada | Wikipedia |
| 9 | بلدية مركز الكرخ | Karkh Center | West (Karkh) | karkh | Wikipedia |
| 10 | بلدية الكاظمية | Kadhimiya | West | kadhimiya | Wikipedia |
| 11 | بلدية المنصور | Mansour | West | mansour | Wikipedia |
| 12 | بلدية الشعلة | Al-Shula | West | shuala | **Unverified** |
| 13 | بلدية الرشيد | Al-Rasheed | West | rasheed | Wikipedia |
| 14 | بلدية الدورة | Dora | West | dora | Wikipedia (under Rashid) |
| + | بلدية المنطقة الخضراء وطريق المطار | Green Zone and Airport Road | West | gzone | **Unverified** |

- Count: 8 east and 6 west, plus the Green Zone municipality. The names come from Arabic Wikipedia and are matched by the site's own subdomains and district emails.
- Boundary maps by district were not found on the site. The site has only one JPG of neighbourhood and street boundaries (حدود خارطة محلات وشوارع بغداد).

## 5. Existing 311-style and e-government systems

- **Ur portal** (`ur.gov.iq`): the national single sign-on and service catalogue. It has Android, iOS and HarmonyOS apps and a hotlines page (not checked for an Amanat number). Amanat's building permit, property statement, sewer and water services are listed there.
- **Complaints**: split across 4 places (Technical Deputy form, Audit form, Audit email, `alshakaw@` email) and the contact form. None gives a ticket number or status tracking that could be seen.
- **"Citizen Voice" app**: promoted in 2 posts. The download link is a third-party link hub. No store listing was found. Status unverified.
- **World Bank**: the home page carries the World Bank Environmental and Social Commitment Plan PDFs, which suggests a WB-financed project. The project name is unverified.
- Nothing like a 311 exists: there is no single number, no map-based report, no case ID and no public resolution data.

## 6. Quality assessment

| Area | Finding | Severity |
| --- | --- | --- |
| Rendering | Client-only SPA (`ssr:false`). Blank without JS, and weak for search engines and slow phones | High |
| Mobile | No horizontal overflow at 375 px. The first screen is a hero image only, with no task visible. The page is about 15 screens long | High |
| Weight | 121 requests and about 1.1 MB, with 171 images on one page | Medium |
| Accessibility | 93 images without `alt`. 9 links or buttons without names. 14 `h1`s. About 160 «اضغط هنا» links. The contact form's file input has no label. Auto-scrolling tickers | High |
| RTL / language | `<html>` has no `dir` attribute, and `lang` is set only by JS. `/en` shows Arabic text in an LTR layout | Medium |
| Arabic typography | Cairo font at 16 px base. Headings use tatweel (أمـانة بغـداد). Hamza is used inconsistently (امين/أمين, اجازة/إجازة). Dot-leader filler appears in labels («......لمزيد من التفاصيل») | Low |
| Broken links | `ca.iq` returns 404. The Mosul-hosted building regulation PDF returns 403. Social icons are placeholders. The org chart is empty. One Ur service is closed but still linked | Medium |
| Link hygiene | Internal links mix `/ar/news`, `/news`, `www.` and the bare domain. One duplicate target. Laws are shipped as a RAR on MediaFire | Medium |
| Privacy | Fee-payer lists (names and businesses by district) are published as raw HTML and JPG. GA tag (`G-3XD9M5NHDB`) has `initialConsent:true` | Medium (check content before citing) |
| Filler | Most of the home page is Mayor-centric news, holiday greetings, award ceremonies, travel lists and promos for radio, newspaper and museum | High |

## Top tasks residents likely come for (ranked)

These rankings are inferred from the service mix, the law's mandate and the links on the home page. No analytics data was available.

1. **Report a problem** (water cut, sewage overflow, garbage, flooding, potholes, street lights). Water, sewerage and cleaning are the core mandate, and rain-season news recurs. Today this means four channels and no tracking.
2. **Apply for or track a building permit.** It is the most promoted service: a launch video, a survey and 2 Ur links. It is high-value and required by law.
3. **Water account tasks** (pay a bill, new account, meter, name change). Every household is a customer. The links are spread across a ticker, a poster card and the forms page.
4. **Property and personal statements** (بيان عقار / بيان شخصي). These are needed for sales, inheritance and permits, and they are already live on Ur.
5. **Find the right office**: which district, which email, opening hours, and whether the issue belongs to Amanat or the Governorate. Today there are 49 emails, no map and no phones.

Next tier: municipal fees (trade, advertising, cleaning), tenders and auctions for contractors, planning rules and the 2030 master plan, and the sewer connection.

## What to keep / what to cut

| Keep (restructure) | Cut or demote |
| --- | --- |
| Deep links to live Ur services, as task pages with eligibility, documents and fees, then the Ur button | Hero render carousel and both auto-scrolling tickers |
| Complaint intake, merged into one form with a category, location and case ID | Mayor's message, bios, «امين بغداد…» news on the home page (move to a Newsroom) |
| District directory: 14 districts plus Green Zone, each with side, email, address and map | Holiday greetings, award ceremonies, officials' travel JPG |
| Law 16/1995 mandate, as plain "what we do / what the Governorate does" | Embassy-style list of about 30 ministry links |
| Planning rules, permit controls, 2030 plan, as an indexed, searchable document library | RAR on MediaFire; regulations hosted on the Mosul site |
| Tenders and auctions (contractor audience) | Raw HTML and JPG fee-payer lists (replace with a lookup by ID, after a privacy review) |
| Water bill payment link | Radio, newspaper and museum promos on the home page (move to footer) |
| Statistics report 2025 (PDF), as an open-data page | Placeholder social icons; dead `ca.iq` link; closed Ur service |

## Open questions (unverified)

- Is there a municipal hotline number? None was published or found.
- Who publishes the "Citizen Voice" app, and is it still running?
- What are the names of the three deputies?
- Which bank of the Tigris are Al-Ghadeer, Al-Shula and the Green Zone municipality on? This is assumed above and not confirmed by an official source.
- How exactly do Amanat and Governorate responsibilities split for outer districts (Abu Ghraib, Taji, Mahmudiya and others)?
- What are the official social media handles?

## Sources

- Main site, home, rendered: https://amanatbaghdad.gov.iq/ar
- About (Law 16/1995 Art. 1): https://amanatbaghdad.gov.iq/ar/about-us
- E-services: https://amanatbaghdad.gov.iq/ar/forms
- Contact: https://amanatbaghdad.gov.iq/contact-us
- Org chart (empty): https://amanatbaghdad.gov.iq/ar/tree
- Complaints email post: https://amanatbaghdad.gov.iq/ar/news/52616c5f-765a-43ef-83b1-3dc488703054
- Citizen Voice post: https://amanatbaghdad.gov.iq/ar/news/60ed6af1-5c48-4e5c-8a92-5222493009d3
- Ur building permit: https://eservice.ur.gov.iq/customer/applyService/10671
- Ur property statement: https://eservice.ur.gov.iq/customer/applyService/10928
- Ur water services: https://eservice.ur.gov.iq/index/new-service/10364
- Ur sewer connection: https://ur.gov.iq/index/show-eservice/51171/10046/org
- Ur closed water-merge service: https://ur.gov.iq/index/show-eservice/20157/10046/org
- Ur portal: https://ur.gov.iq
- Baghdad Governorate: https://baghdad.gov.iq
- Arabic Wikipedia, أمانة بغداد (departments, districts): https://ar.wikipedia.org/wiki/أمانة_بغداد
- Wikipedia, Baghdad districts by bank: https://en.wikipedia.org/wiki/List_of_neighborhoods_and_districts_in_Baghdad
- Wikipedia, List of mayors of Baghdad: https://en.wikipedia.org/wiki/List_of_mayors_of_Baghdad
- IraqiNews, Mayor confirmation (search snippet only; page returned 403): https://www.iraqinews.com/?p=225040
- Law 21/2008 second amendment (governorates): https://constitutionnet.org/sites/default/files/the_second_amendment_law_for_the_for_non-regional_provinces_no._21_the_year_2008.pdf
