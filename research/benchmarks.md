# Benchmarks — government and city websites

Research for the Amanat Baghdad redesign. Checked 30 Oct 2026.

## Method and limits

- Link counts are anchors in the loaded page, desktop width, unless marked "server HTML". They are rough.
- "Taps to task" is an estimate from the home page to the start of a common task. It is not a timed test.
- Mobile ratings come from layout and markup at about 800px wide. No site was tested on a phone.
- Some sites did not load from here. These are marked "not loaded". Nothing is filled in for them.
- Award facts come from the award body or its press release where possible. Gaps are marked.

## Top 10 ideas to steal

| # | Idea | Seen on | Why it fits Baghdad |
| --- | --- | --- | --- |
| 1 | A "Today" status card on the home page. Rows such as "trash pickup on schedule" or "schools open", each with a state badge. | NYC.gov home; DSNY | Answers the most common question before anyone searches. Water cuts, road closures and collection days map directly. |
| 2 | A question as the hero. Egypt asks "أى خدمة؟" ("Which service?") over one search box, with popular-service chips under it. | digital.gov.eg | Arabic-first, task-first, one line. No slogan. |
| 3 | Label the AI. Helsinki puts "The search uses artificial intelligence" under the box, with a link explaining how. | hel.fi | Builds trust and sets limits. Matches the "no chatbot persona" principle. |
| 4 | AI that answers only from the site's own pages. GOV.UK Chat draws on GOV.UK guidance and says it can make mistakes. | GOV.UK app | The model for routing to real service pages and citing the page. |
| 5 | A short "Direct to" list of 6 to 8 top tasks, including "report a problem". | amsterdam.nl ("Doe een melding") | The home page as a service counter. |
| 6 | Life moments as a second index ("When your baby is born", "moving house"). | LifeSG, Hukoomi ("لحظات الحياة") | A task index that does not mirror the org chart. Hukoomi proves it works in Arabic. |
| 7 | An official-site banner at the very top. | GOV.UK crown, NYC "Official website", Seoul (KRDS), Saudi "official website of the Kingdom" | Authority and anti-phishing in one line. Baghdad needs both. |
| 8 | One typeface owned by the government, Arabic drawn first. | Dubai Font (Arabic drawn before Latin), Qatar's Lusail on Hukoomi | The strongest identity signal after the seal. Commission or choose one Arabic face and use it everywhere. |
| 9 | Report-a-problem with a photo first. TAMM has "Take Photo and Report". LifeSG lists "Report an issue in your neighbourhood" as a top service. | TAMM, LifeSG, NYC 311 | Photo plus map pin is the fastest 311 input on a phone. |
| 10 | Publish the design system and the standard. GOV.UK Service Standard, Japan's DADS, Helsinki HDS, Korea KRDS, Saudi Platform Code. | GDS, Digital Agency, Helsinki, MOIS, DGA | "The template is the product." A public system keeps districts and departments from drifting. |

## Patterns to avoid

| Pattern | Seen on | Problem |
| --- | --- | --- |
| Officials' portraits in the hero | maharashtra.gov.in (Governor, Chief Minister, two deputies) | Puts the government before the resident. 870 links on one page. |
| News carousel as the first screen | seoul.go.kr (317 links), paris.fr, mot.gov.sy | Pushes tasks below the fold. Seoul's hero is a promo slider. |
| Each department with its own header and logo | NYC.gov agency pages (DSNY green brand, HPD old template, DOT a "We're Sorry" page) | Residents cannot tell what is official. Costs grow per agency. |
| The page title in the wrong language | dubai.ae Arabic home (English H1 "Home \| The Official City Portal of Dubai", `lang="ar-SA"`) | Screen readers and search get it wrong. A Saudi locale on a Dubai page. |
| Latin punctuation in Arabic copy | absher.sa ("وقطاعاتها, لخدمة") | Small, but it signals nobody proofread in Arabic. |
| A splash page with three doors and no tasks | absher.sa (4 links), americabydesign.gov (7 links) | Forces a choice before any value. |
| Login before information | eesti.ee lists e-services that all need sign-in | Fine for Estonia's ID cards. Wrong for a city where many visitors have no account. |
| Celebration effects | moed.gov.sy throws confetti over the home page | Startling. Hides content. |
| Brand manifesto instead of service | americabydesign.gov, ndstudio.gov | Copy about the brand, not the task. |

## Scorecard

Link counts as measured. Taps are estimates. Mobile 1–5 (5 best), from markup and responsive layout. Governance means one shared system vs many.

| Site | Home links | Taps to common task | Mobile | RTL | Governance | Steal |
| --- | --- | --- | --- | --- | --- | --- |
| GOV.UK | 107 (server HTML) | 2 (search or topic, then guide) | 5 | n/a | One system, one domain | Service Standard; Chat cites guidance |
| gov.sg | 63 | 2 | 4 | n/a | One system (Isomer theme) | Isomer, a shared site builder for agencies |
| LifeSG | 48 | 1 (popular services on home) | 5 | n/a | One app and site | "Popular on LifeSG" list with report-an-issue |
| eesti.ee | 60 | 2 plus login | 4 | n/a | One portal | Personal dashboard after login |
| digital.go.jp | 61 | n/a (agency site) | 4 | n/a | DADS design system | Open design system with tokens and Figma |
| hel.fi | 190 | 2 | 4 | n/a | One system (HDS) | Labelled AI search |
| borger.dk | 125 (server HTML) | 2 | 4 | n/a | One national portal | Plain topic index, MitID entry |
| london.gov.uk | 271 | 3 | 3 | n/a | City Hall only | Not much. Too many links |
| tfl.gov.uk | 161 (server HTML) | 1 (status, journey planner) | 4 | n/a | One brand, very strong | Live status first |
| seoul.go.kr | 317 | 3 | 3 | n/a | KRDS banner, own layout | Official-site banner |
| paris.fr | 154 | 2 (search by type: service, place, démarche) | 4 | n/a | One city brand | Search scoped by type |
| metro.tokyo.lg.jp | 614 | 3+ | 2 | n/a | Many campaigns | Avoid |
| nyc.gov (home) | 71 | 1 (Today card) | 4 | n/a | New home, old agency sites | Today card |
| barcelona.cat | 158 (server HTML) | 2 | 4 | n/a | One city brand | Not checked in depth |
| amsterdam.nl | 67 | 1 (Direct naar list) | 5 | n/a | One system | Short top-task list with report |
| TAMM | 76 (English) | 1 (search; 1,100+ services) | 4 | Arabic URL `/ar` errored | One platform for Abu Dhabi | Photo report; voice in Arabic |
| dubai.ae | 27 | 2 | 3 | RTL set, H1 in English, `ar-SA` | City brand, Dubai Font | Dubai Font |
| my.gov.sa | Not loaded (blocked) | — | — | — | DGA Platform Code | Platform Code |
| absher.sa | 4 | 2 plus login | 3 | Latin comma in Arabic | One MOI platform | Audience split (people, business, government) |
| hukoomi.gov.qa | 149 | 2 | 4 | Good. `dir="rtl"`, Lusail | One national portal | Life moments in Arabic; voice search |
| jordan.gov.jo | Not loaded | — | — | — | — | — |
| digital.gov.eg | 255 | 1 to 2 (chips under search) | 4 | Good. `dir="rtl"`, Noto Sans Arabic | One national portal | "Which service?" hero |
| u.ae | 635 (server HTML) | 3 | 3 | `dir="rtl"` set | Federal portal | Avoid the link count |
| gov.cn | 190 (server HTML) | n/a (news portal) | 2 | n/a | State news portal | Avoid |
| Diia (diia.gov.ua) | 225 (server HTML) | 1 to 2 in app | 5 (app) | n/a | One app, one portal | Diia.AI acts on registers, not just answers |
| india.gov.in | 218 | 2 ("Trending searches" chips) | 3 | n/a | Portal of portals | Trending searches |
| maharashtra.gov.in | 870 | 3+ | 2 | n/a | Own template | Avoid |
| americabydesign.gov | 7 | none (no service) | 4 | n/a | NDS single-page sites | Avoid |
| ndstudio.gov | 37 | none | 4 | n/a | NDS | Avoid |

## Per-site notes

### GOV.UK and GDS

- One domain, one design system, one Service Standard (14 points). The standard is the governance tool.
- The home page is search plus topics. No news carousel.
- GOV.UK app went to public beta in July 2025.
- GOV.UK Chat soft-launched in the app on 26 Mar 2026. GDS announced it on 14 May 2026. It answers from GOV.UK guidance and warns it can make mistakes.
- Over 7,800 people asked over 15,000 questions after the soft launch (GDS figure).
- Tax bodies called it a useful signpost, not advice. Web rollout was planned for later in 2026; not confirmed.
- Steal the scope rule. The AI answers only from published pages.

### Singapore (gov.sg, LifeSG)

- gov.sg runs on Isomer (`data-theme="isomer-next"` in the HTML). Agencies build on one shared builder.
- LifeSG home lists nine popular services. "Report an issue in your neighbourhood" is one of them.
- Life moments ("When your baby is born") sit below.
- Links to Chat.gov.sg from the home page.
- GovTech ran Digital Services Awards 2025 with 32 winners (Nov 2025).

### Estonia (eesti.ee)

- Opens on "Citizen / Entrepreneur", then a list of e-services. Most need login.
- Works because nearly everyone has a state digital ID. Do not copy the login-first order for Baghdad.

### Japan Digital Agency (digital.go.jp, DADS)

- The design system beta site went live May 2024. Figma data since Nov 2022.
- Won a Good Design Best 100 in 2024.
- An accessibility audit to JIS X 8341-3 AA was published 10 Dec 2025.
- Tokens, HTML samples and Figma are published separately. A good model for a small team.

### Helsinki (hel.fi, HDS)

- Helsinki Design System is open source and used across city services.
- Search carries a plain AI notice and a link explaining it.
- 190 links. The home page is heavier than the system deserves.
- Trilingual switch (Finnish, Swedish, English) in the header. A model for Arabic, Kurdish and English.

### Denmark (borger.dk)

- National citizen portal. Topic index, MitID sign-in.
- Denmark's Digital Post won a GovTech Prize award at the World Governments Summit, Feb 2026 (simplification category).

### London (london.gov.uk, TfL)

- london.gov.uk has 271 links. It mixes Mayor's news, policy and services.
- TfL leads with live status and the journey planner. One brand across signs, app and web. Strongest governance signal of any city here.

### Seoul

- Korean home page has 317 links and a promo slider.
- The header carries the KRDS official-site line ("this is an official e-government site of the Republic of Korea").
- KRDS (Korea Design System) launched April 2024. Government-wide service began January 2025.

### Paris

- Search with a type selector (information, news, activity, place, event, service, démarche).
- First screen was news on the day checked (protests, cemetery hours).

### Tokyo Metropolitan Government

- 614 links. Many campaign banners. Category tabs work, but the page is a directory, not a counter.

### NYC.gov

- New home page in place on 30 Oct 2026. "Official website" banner, Clash Grotesk type, a "Find what you need" hero and a "Today" card (alternate side parking, trash and recycling, public schools, transit).
- I found no press release dating the refresh. Treat the date as unknown.
- Agency sites have not moved. DSNY has its own green brand and seal. HPD uses the old 2013-era template with the NYC logo. The DOT home URL returned a "We're Sorry" page in the old template.
- Lesson. Ship the system and migrate departments on a schedule, or the sprawl outlives the redesign.

### Barcelona, Amsterdam

- Barcelona: 158 links in server HTML. Not reviewed in depth.
- Amsterdam: "Direct naar" list of eight tasks. Moving house, report a problem, parking, waste, ID, notices, taxes, city offices. News sits under it. The best city home page in this scan.

### Abu Dhabi TAMM

- English home: "Abu Dhabi Government Services", "1,100+ government services", one search box. 76 links.
- Typeface stack is "AED Display", CircularStd, then Noto Kufi Arabic.
- The `/ar` URL returned an error page here. The error page itself was bilingual and well set.
- TAMM 3.0 launched at GITEX Oct 2024 with an Arabic and English voice assistant. GITEX 2025 added what Abu Dhabi called an "AI public servant".
- Vendor case study (LangChain) mentions "Take Photo and Report". Vendor source.

### Dubai (dubai.ae, DubaiNow)

- Arabic home has 27 links and four doors (invest, visit, work, live).
- The H1 is the English page title. `lang="ar-SA"` on a Dubai page.
- Uses Dubai Font. Launched 2017 with Microsoft. The Executive Council told all Dubai government bodies to use it. The Arabic was drawn first.
- DubaiNow app not reviewed.

### Saudi (my.gov.sa, Absher)

- my.gov.sa blocked access from this location (Cloudflare). Not loaded.
- Absher landing is three audience doors (individuals, business, government) and a sign-in for each. 4 links.
- No `dir` attribute on the root. A Latin comma in the Arabic intro.
- DGA's Platform Code (launched about March 2025) is an open national design system. Entities are scored on a Digital Experience Maturity Index. The closest Arabic-first equivalent of the GOV.UK system. Official documentation not reviewed.

### Qatar Hukoomi

- Arabic home is well set. `dir="rtl"`, `lang="ar"`, the Lusail typeface.
- Hero is a welcome line plus search with a voice button. Then life moments, categories and statistics.
- 149 links. Cookie banner covers the lower third on first load.

### Jordan

- portal.jordan.gov.jo did not load. Not assessed.

### Egypt (digital.gov.eg)

- Hero asks "أى خدمة؟" over one search field. Popular-service chips below (housing, insurance, supply, traffic and more).
- Two big cards follow. "Open an account or sign in" and "Browse all services".
- `dir="rtl"`, Noto Sans Arabic. Clean RTL. Uses Egyptian spelling (ى for ي).
- 255 links overall. The first screen is light. The footer is heavy.

### China (gov.cn)

- A state news portal. 190 links in server HTML. Not a service counter. Avoid as a model.

### Ukraine Diia

- App first. Portal has 225 links in server HTML.
- Diia.AI launched Sept 2025 and is connected to state registers. It can complete some services, not just answer.
- Won the EU Best Cases Awards 2025 (Solutions for Citizens) per Ukrainian reporting. User counts in sources conflict.
- Voice added later.

### India (india.gov.in, UMANG, Maharashtra)

- india.gov.in has 218 links and "Trending searches" chips (Aadhaar, DigiLocker, voter registration, passport).
- UMANG web is a JS app. Not counted.
- Maharashtra state portal is the cautionary case. 870 links, 52 images, a live clock, and four officials' portraits in the hero.

### US National Design Studio

- Created by Executive Order 14338, "Improving Our Nation Through Better Design", signed 21 Aug 2025.
- Sits in the White House Office. Joe Gebbia, Airbnb co-founder, is the first Chief Design Officer. The studio is set to close three years after the order.
- Agencies were to produce initial results by 4 July 2026.
- Sites include americabydesign.gov and ndstudio.gov. ndstudio.gov lists TrumpRx, Real Food, Genesis Mission, Trump Accounts, Tech Force and OPM Retirements as selected work.
- americabydesign.gov is a 7-link manifesto over a waving flag. Its copy opens by calling Trump "the biggest brand in the world".
- Reported criticism. Ars Technica (30 Jun 2026) said the studio launched mostly single-page sites with heavy AI-generated content. NOTUS reported three sites failed an accessibility audit. The Guardian (28 Jun 2026) reported tracking set to evade browser privacy tools. Fast Company reported use of Figma Make. Ars reported the order's design-standards duty was dropped.
- Lesson for Baghdad. Brand polish without services reads as campaign material.

## Award signals 2023–2026

| Award | Year | Winner | Note |
| --- | --- | --- | --- |
| World Governments Summit GovTech Prize | Feb 2026 | Germany, Federal Ministry for Digital Transformation (AI infrastructure-permit platform) | Best use of AI |
| WGS GovTech Prize | Feb 2026 | Denmark, Digital Post | Simplification |
| WGS GovTech Prize | Feb 2026 | Rwanda, IremboGov | Best government service |
| GovTech Award, Best Government Service | 2025 | Finland, Suomi.fi | Per Suomi.fi |
| EU Best Cases Awards | 2025 | Ukraine, Diia.AI | Solutions for Citizens |
| Good Design Best 100 (Japan) | 2024 | Digital Agency design system | |
| Singapore Digital Services Awards | Nov 2025 | 32 winners | National award |
| Webby, Government & Civil Innovation | 2025, 2026 | Not confirmed | The official 2025 press release names no government site. Category winners not found. |
| Red Dot, iF, D&AD, Awwwards | 2023–2026 | No government or city portal winner found | Only Red Dot hit was the German UNESCO Commission site, per its agency. |

## Syria — new identity and government sites

### The identity

- Unveiled 3 July 2025 at the People's Palace, Damascus. A gold eagle with three stars. Fourteen wing feathers for fourteen governorates.
- Commissioned by the Ministry of Information. Designer Mohamed Selwaya has described the process. Reporting also credits artist Khaled Al-Asali.
- Ministry sites share the eagle lockup and a dark green and gold palette. The Culture ministry code uses `#002723` and `#B9A779`.

### What critics said

- Online claims that the eagle was copied from a liquor brand. Al Majalla's author called the theft claims untrue.
- Legal objection. Dr Ahmed Al-Qurabi noted the constitutional declaration says the emblem is set by law.
- Political objection. Writer Malik al-Hafez called it an imposed political front.
- I found no reporting or commentary claiming the emblem or the sites were AI-generated. Searches in English and Arabic returned nothing.

### What I saw on the sites (30 Oct 2026)

| Site | Stack | Evidence |
| --- | --- | --- |
| moi.gov.sy (Interior) | Static HTML, Arial | The whole home page is one background JPEG reading "قيد الانشاء.." (under construction). The HTML holds a commented-out empty H1 and paragraph. |
| moed.gov.sy (Education) | Next.js | Page title is the generic "بوابة الخدمات الحكومية" (government services portal), not the ministry name. Confetti falls over the home page. Facebook posts are pasted in whole, with 🔹️ and 📌 bullets and hashtags. Exam results are linked as a Google Drive folder. |
| moc.gov.sy (Culture) | Next.js, Tailwind | CSS comments in the explanatory voice of a coding assistant, e.g. "Transform-only entrance: never hides the text (no opacity: 0)". Hard-coded hex values in classes. Pill nav, pill eyebrow over a centred H2 with a diamond divider. Four rotating hero slogans. English alt text on an Arabic page ("Heritage Background", "Syria Cultural Panorama"). Nine images share one alt text. A blank white band appeared on scroll. 44 links. |
| mot.gov.sy (Transport) | Next.js | The hero headline misspells cars ("السيارت"). Two logos side by side, the new eagle and the old ministry mark. "جاري التحميل..." (loading) placeholders for stats and the library. A blank section on scroll. |
| mofa.gov.sy and about 20 other gov.sy domains | — | Not loaded. Connection refused or empty. |

### Assessment

- Signs of AI-assisted building are real but modest. The Culture site's code comments read like assistant output. The layouts follow the default Tailwind landing-page kit that code generators produce.
- The imagery I saw looked like photography. I saw no generated images I could identify as such.
- The bigger problem is not AI. It is unfinished work shipped as official. Placeholder pages, loading states, typos, pasted social posts and one-off effects.
- Verdict. "Visibly AI-made" is too strong as a claim of fact. "Template-made and unfinished, probably with AI help" is supported.

### Critique

The Interior Ministry has built the leanest government website in the world. It is one JPEG. No links, no services, no bugs. GOV.UK spent a decade removing clutter. Damascus went straight to the end.

Education greets you with confetti, as if you had won something. You have. Your exam result is in a Google Drive folder.

Culture's stylesheet explains itself, politely, in the voice of a helpful assistant. It promises the text is never hidden. Then a white band hides everything below the fold.

Transport spells "cars" wrong in its biggest headline. It also wears two logos, in case one of them is wrong.

The eagle is good. The colour is consistent. The lockup is used everywhere. Syria has the identity. What it lacks is the boring part, a template, a proofreader and a rule that a page ships when it works.

For Baghdad, the lesson is simple. The seal earns attention. The service earns trust.

## Sources

### Best in class
- GOV.UK — https://www.gov.uk
- GOV.UK Chat launch (GDS, 14 May 2026) — https://gds.blog.gov.uk/2026/05/14/gov-uk-chat-launches/
- Testing GOV.UK Chat — https://insidegovuk.blog.gov.uk/2026/03/16/5-things-we-learned-testing-gov-uk-chat-an-ai-assistant-for-government/
- GOV.UK app (public beta) — https://roadmap-for-modern-digital-government.campaign.gov.uk/join-up-services/govuk-app
- CIOT on GOV.UK Chat — https://www.tax.org.uk/gov-uk-chat-useful-signpost-but-not-a-substitute-for-professional-judgement
- gov.sg — https://www.gov.sg
- LifeSG — https://www.life.gov.sg
- GovTech Singapore Digital Services Awards 2025 — https://www.tech.gov.sg/media/govtech-singapore-celebrates-digital-services-excellence-at-digital-services-awards-2025/
- eesti.ee — https://www.eesti.ee/en
- Digital Agency design system — https://www.digital.go.jp/en/policies/servicedesign/designsystem
- Helsinki — https://www.hel.fi/en
- borger.dk — https://www.borger.dk
- KRDS — https://designcompass.org/en/2025/01/22/krds-start/ and https://www.krds.go.kr/html/eng/utility/utility_01.html

### Cities
- london.gov.uk — https://www.london.gov.uk
- TfL — https://tfl.gov.uk
- Seoul — https://www.seoul.go.kr
- Paris — https://www.paris.fr
- Tokyo — https://www.metro.tokyo.lg.jp
- NYC.gov — https://www.nyc.gov/main
- DSNY — https://www.nyc.gov/site/dsny/index.page
- HPD — https://www.nyc.gov/site/hpd/index.page
- DOT — https://www.nyc.gov/site/dot/index.page
- Barcelona — https://www.barcelona.cat/ca/
- Amsterdam — https://www.amsterdam.nl

### Regional and Arabic-language
- TAMM — https://www.tamm.abudhabi
- TAMM 3.0 launch — https://dge.gov.ae/en/news/dge-abu-dhabi-launches-tamm-3/
- TAMM AI public servant (GITEX 2025) — https://www.dubaieye1038.com/news/local/abu-dhabi-unveils-worlds-first-ai-public-servant
- LangChain TAMM case study (vendor) — https://www.langchain.com/blog/customers-abu-dhabi-government
- dubai.ae — https://www.dubai.ae/ar
- Dubai Font — https://www.wam.ae/en/article/hszr5d7a-hamdan-bin-mohammed-introduces-dubai-font and https://enterprise.monotype.com/resources/case-studies/dubai
- Absher — https://www.absher.sa
- my.gov.sa (blocked) — https://www.my.gov.sa
- Saudi Platform Code — https://cxpaglobal.org/resources/platforms-code-national-design-system-governmental-entities-saudi
- Hukoomi — https://hukoomi.gov.qa/ar
- Egypt Digital — https://digital.gov.eg
- UAE portal — https://u.ae

### Emerging and other
- gov.cn — https://www.gov.cn
- Diia — https://diia.gov.ua
- Diia.AI award — https://razomua.media/en/news/tekhnolohiyi/ukrayinskyy-shi-diia-ai-peremih-na-best-cases-awards-2025-sered-derzhposluh
- Diia.AI launch — https://www.kmu.gov.ua/en/news/ukraina-vstanovyla-svitovyi-rekord-diiaai-vyznaly-pershym-natsionalnym-shi-asystentom-iz-derzhavnykh-posluh
- india.gov.in — https://www.india.gov.in
- UMANG — https://web.umang.gov.in
- Maharashtra — https://maharashtra.gov.in

### US National Design Studio
- National Design Studio (Wikipedia, with cited reporting) — https://en.wikipedia.org/wiki/National_Design_Studio
- americabydesign.gov — https://americabydesign.gov
- ndstudio.gov — https://ndstudio.gov
- Fox Business on Gebbia appointment — https://www.foxbusiness.com/politics/white-house-taps-airbnb-co-founder-1st-government-design-head-lead-huge-web-overhaul
- Print, Daily Heller — https://www.printmag.com/daily-heller/the-daily-heller-this-is-not-a-joke/

### Syria
- Arab News on the emblem — https://arab.news/662f8
- Enab Baladi on the identity — https://english.enabbaladi.net/archives/2025/07/syria-launches-new-national-visual-identity/amp/
- Al-Monitor — https://app.al-monitor.com/originals/2025/07/syria-unveils-gold-eagle-emblem-what-it-means
- The New Arab — https://www.newarab.com/news/what-syrias-new-national-emblem-says-about-post-assad-era
- Mohamed Selwaya interview — https://menastartupdigest.com/?p=44038
- Al Majalla on the debate — https://www.majalla.com/node/326332
- Syria TV on the identity — https://www.syria.tv/ (article "سردية ونهج جديدان: إلى ماذا ترمز الهوية البصرية الجديدة للدولة السورية؟")
- Interior — https://moi.gov.sy
- Education — https://moed.gov.sy
- Culture — https://moc.gov.sy
- Transport — https://mot.gov.sy
- SANA — https://www.sana.sy

### Awards
- WGS GovTech Prize 2026 — https://www.mediaoffice.ae/en/news/2026/february/04-02/mohammed-bin-rashid-bin-mohammed-honours-the-winners-of-the-government-technology-award
- Suomi.fi GovTech Award 2025 — https://www.suomi.fi/news/suomi-fi-awarded-as-the-best-government-service-in-the-world
- Webby 2025 winners release — https://www.webbyawards.com/press/press-releases/29th-annual-webby-awards-announce-2025-winners/
- Red Dot (German UNESCO Commission, agency claim) — https://3pc.de/en/news/3pc-wins-red-dot-design-award/
