# Independent audit: Mayoralty of Baghdad prototype

Reviewed 31 October 2026 against `review-brief.md`. Repository revision: `17a320f`. Website files were not changed.

## Assessment

The product has a sound foundation: recognisable municipal identity, useful service guides, clear handoffs to Ur, an unusually helpful division of responsibilities, and a restrained visual system. The English is generally readable. It does not need a wholesale rewrite.

The most conspicuous “Claude-tell” is **the author explaining and congratulating the design**. Pages repeatedly tell residents how carefully the website was made: “Arranged by what you want to do, not by department”; “We don't publish a number whose source we don't know”; “Every link says where it takes you”; “written with care, not machine-translated.” These sound like a design presentation that has leaked into a public service. Residents need the service, its requirements and its limitations, not the author's editorial philosophy.

A second pattern is **over-neat reassurance**: every channel feeds one system, every report reaches the right team, every update arrives, no one else can see an account. These are more serious than stylistic mannerisms because some are unverified or contradicted by the implementation. They must be resolved as product/content decisions, not polished into more convincing claims.

A third pattern is **plain English pushed into unnatural English**: “pin the place,” “follow it with,” “Staff, money, property,” and “what happened.” Short familiar words are useful, but precision matters more than making every word short.

These are editorial observations, not evidence that a particular model wrote a passage. Em dashes, three-item lists, contractions and concise headings are not reliable authorship tests. Keep useful distinctions such as “A property statement is not a title deed” and “Surface temperature is not air temperature”: they prevent specific misunderstandings.

## Scope and verification

- Read the README, review brief, all 19 in-scope English pages, shared CSS and interaction scripts, and relevant research on services and complaints. Arabic, Sorani, the prototype strip and the Tigris page were excluded from editorial review.
- Attempted the published English home page. The browser returned `net::ERR_CERT_COMMON_NAME_INVALID`. Did not bypass the warning. Public deployment parity and the cause of that error remain unverified.
- Inspected the local site in the browser. All 19 pages had document width equal to viewport width at 375px. Nine representative pages also passed that check at 1280px: Home, Services, Building permit, Report, Karrada, About, Tenders, Laws and Open data. This is a page-overflow check, not full visual QA of every element.
- Visually inspected representative desktop and phone layouts; opened and closed the phone menu; tested report category selection and the location-step validation; tested search for “sewer connection” and “tenders.” Inspected implementation for receipt, tracking, fee lookup and feedback behavior.
- Ran `python3 tools/check_links.py docs docs/en/*.html`: **0 problems**. This checks local destinations and anchors; it does not establish that a button works, that an external service is available, or that a linked document supports a claim.
- Sampled browser error logs during local inspection: no errors returned. Did not run a full console/network capture on every interaction.
- Did not complete a real transaction, send a report, contact an office, test geolocation/camera permissions, or authenticate to Ur. Did not independently reverify names, laws, phone numbers, census figures or every external document. Those remain fixed as the brief requests; factual concerns below are flags, not corrections.
- Did not run a full screen-reader audit, physical-device testing, 200–400% zoom testing, old-browser testing, or a complete hover/keyboard-dropdown audit. JavaScript-disabled behavior was assessed from source rather than a browser session with JavaScript disabled. No WCAG conformance conclusion is claimed.

Severity: **high** means a core task is blocked or a material trust claim is unsupported; **medium** means meaningful friction, ambiguity or a content gap; **low** means polish or a limited inconsistency. An intentionally simulated backend is not itself a defect. Findings about demonstrations concern internal consistency and what the interface promises.

## 1. Copy edit

These are proposed replacements, not applied edits. Facts, proper names and service destinations stay fixed. Where the underlying claim needs verification, it appears in the strategy review instead of receiving a cosmetic rewrite. Length is kept broadly similar, except where removing redundant editorial commentary makes a sentence materially better.

### C01 — Home / search empty state

**Before:** “Say what you need and we point you to the right page. The answer appears here.”

**After:** “Enter the service or problem you need help with. A link to the relevant page will appear here.”

**Reason:** Replaces the assistant-like “we point you” with a concrete instruction.

### C02 — Home / Building permit card

**Before:** “What you need, what it costs, how long it takes, then apply.”

**After:** “Check the documents, fees and processing time before you apply.”

**Reason:** Removes the rehearsed cadence and awkward final phrase.

### C03 — Home / Track a report card

**Before:** “Enter your report number to see where it stands.”

**After:** “Enter your report number to check its status.”

**Reason:** “Status” is ordinary, precise service language.

### C04 — Home / district note

**Before:** “Karrada has a full page with its office, works and reports. The others open their entry in the districts index until their pages are built.”

**After:** “Karrada's page includes office details, local works and reports. For other municipalities, the district list currently provides contact details.”

**Reason:** Explains what readers can find without narrating the development backlog.

### C05 — All services / introduction

**Before:** “Arranged by what you want to do, not by department. Each service has a guide that explains what you need, then takes you to where you apply.”

**After:** “Choose a service to find out what you need and where to apply. Each guide explains whether to use the Ur portal, this website or your district office.”

**Reason:** The clearest example of design rationale replacing useful public copy.

### C06 — All services / Report a problem description

**Before:** “Water, sewage, waste, lights, roads. A photo, a place and a report number.”

**After:** “Report problems with water, sewage, waste, street lights or roads, and get a report number.”

**Reason:** Replaces a slogan-like sequence of fragments with an actual task.

### C07 — All services / Track a report description

**Before:** “Enter your report number to see who has it and what happened.”

**After:** “Enter your report number to see the responsible team and the latest update.”

**Reason:** “Who has it” and “what happened” are unnecessarily vague.

### C08 — Building permit / introduction

**Before:** “You need a building permit before you build, or add to a building, on property inside the Mayoralty's boundary. You apply online on the Ur portal and follow your application there.”

**After:** “You need a permit to build or extend a building on property inside the Mayoralty's boundary. Apply online through the Ur portal and track your application there.”

**Reason:** Removes interrupted syntax and uses familiar transaction language.

### C09 — Building permit / documents introduction

**Before:** “Have these ready before you start. You upload clear photos of each on the Ur portal.”

**After:** “Have these documents ready before you apply. Upload a clear photo of each on the Ur portal.”

**Reason:** Names the object and uses the imperative for an instruction. The documents remain illustrative as currently labelled.

### C10 — Building permit / receive the permit

**Before:** “It is issued online. Post it on the site for as long as work goes on.”

**After:** “The permit is issued online. Display it at the building site throughout the work.”

**Reason:** “Post it on the site” can mean uploading it to a website. Retains the existing instruction without independently validating that requirement.

### C11 — Property statement / title-deed copy

**Before:** “Clear, both sides.”

**After:** “A clear copy of both sides.”

**Reason:** The fragment is too compressed even for checklist copy.

### C12 — Property statement / application action

**Before:** “Applying takes about 10 minutes if you have the deed in front of you.”

**After:** “Allow about 10 minutes to apply. Have your title deed ready.”

**Reason:** More natural instruction. The time estimate is preserved, not verified; see S03.

### C13 — Water account / introduction, second sentence

**Before:** “Pay your bill, open a new account or replace your meter, all starting here.”

**After:** “Find out how to pay your bill, open an account or replace a meter.”

**Reason:** Removes the landing-page flourish and better describes a guide.

### C14 — Water account / change-of-name heading

**Before:** “Move the account to your name”

**After:** “Transfer the account to your name”

**Reason:** Natural English does not require avoiding “transfer.” Apply consistently to the matching link.

### C15 — Sewer connection / facts strip

**Before:** “Needs checks and a visit”

**After:** “Document checks and an office visit”

**Reason:** Specifies what is checked and where the visit is.

### C16 — Municipal fees / trade-fee explanation

**Before:** “On every shop, office or workshop inside the Mayoralty's boundary. It depends on the kind of business and where it is.”

**After:** “Applies to every shop, office or workshop inside the Mayoralty's boundary. The amount depends on the business type and location.”

**Reason:** Replaces vague pronouns without adding a policy claim.

### C17 — Alerts / introduction

**Before:** “Only what changes your day: scheduled water cuts, road closures, rain warnings and changes to waste collection. No news here.”

**After:** “Check scheduled water cuts, road closures, rain warnings and changes to waste collection. Other Mayoralty announcements are on the News page.”

**Reason:** Removes the slogan and unnecessary negative assertion; make “News” a link.

### C18 — Report a problem / introduction

**Before:** “Four short steps. At the end you get a report number to follow it with.”

**After:** “Complete the four steps to receive a report number. Use it to track your report.”

**Reason:** Removes an awkward pronoun chain. The separate WhatsApp sentence needs a product decision, not a copy edit.

### C19 — Report a problem / location instruction

**Before:** “Tap the map or drag the pin to the place.”

**After:** “Tap the location of the problem on the map, or drag the pin there.”

**Reason:** Specifies what “the place” means. An accessible alternative is still needed; see U03.

### C20 — Report a problem / what happens next, second item

**Before:** “It goes to your municipality and the right section.”

**After:** “Your report is sent to the responsible section in your municipality.”

**Reason:** Makes the subject explicit. This preserves the proposed workflow, not evidence of a working integration.

### C21 — Track a report / introduction

**Before:** “Enter your report number to see what has happened to it and who is working on it now. No account needed.”

**After:** “Enter your report number to see its progress and the team handling it. You do not need an account.”

**Reason:** Removes conversational padding while retaining useful reassurance.

### C22 — Karrada / introduction, second sentence

**Before:** “Here you see what is happening in your area today, the works under way, and how to reach the municipal office.”

**After:** “Check local alerts and works under way, or find contact details for the municipal office.”

**Reason:** “Here you see” describes the page instead of helping use it.

### C23 — Karrada / map note

**Before:** “We don't draw the municipality's boundary until the Mayoralty publishes the official boundary file. Positions on the map are approximate.”

**After:** “The map does not show the municipal boundary because the official boundary file is not yet available. Locations are approximate.”

**Reason:** Keeps an important limitation without editorial self-justification.

### C24 — The Mayoralty / duties paragraph

**Before:** “It works through 15 municipalities close to where you live, and central departments that each handle one service.”

**After:** “Services are delivered through 15 local municipalities and central departments responsible for individual services.”

**Reason:** Removes the generic reassurance “close to where you live.”

### C25 — Leadership / deputy mayors

**Before:** “Three deputy mayors share the work below the Mayor: municipal affairs, technical affairs and administrative affairs. A few offices answer to the Mayor directly.”

**After:** “Three deputy mayors oversee municipal, technical and administrative affairs. Some offices report directly to the Mayor.”

**Reason:** Uses normal institutional language rather than a deliberately simplified paraphrase.

### C26 — Leadership / Administrative Affairs

**Before:** “Staff, money, property, legal work and oversight.”

**After:** “Staffing, finance, property, legal affairs and oversight.”

**Reason:** “Money” is less precise than “finance,” not more accessible.

### C27 — News / introduction

**Before:** “Statements from the Mayoralty, newest first, including progress on its own works. News that changes what you need to do, such as a water cut or a road closure, also goes to Alerts.”

**After:** “Read the latest Mayoralty statements and updates on municipal works. Water cuts, road closures and other service disruptions are also listed on the Alerts page.”

**Reason:** Removes the strained “changes what you need to do” formulation. Retain the Alerts link.

### C28 — Tenders / national platform

**Before:** “The national tenders platform lists tenders from every ministry and province, the Mayoralty's among them.”

**After:** “The national tenders platform lists notices from all ministries and provinces, including the Mayoralty.”

**Reason:** Removes an unnatural literary inversion. Coverage claim preserved, not independently reverified.

### C29 — Open data / statistics report description

**Before:** “The Mayoralty's own yearly statistics. To be published as tables once the report is broken down.”

**After:** “The Mayoralty's annual statistics report. Separate data tables are planned but are not yet available.”

**Reason:** “Broken down” exposes production work without clearly explaining availability.

### C30 — Using this website / introduction

**Before:** “What this website keeps about you, how we make it work for everyone, and how search finds its answers.”

**After:** “Read about the information this website collects, its accessibility features and how its search works.”

**Reason:** Replaces a self-conscious three-part promise with accurate section signposting.

### Copy that needs a decision before rewriting

- **“The English version is written with care, not machine-translated.”** Delete this claim. It offers no practical accessibility information and makes an unsupported statement about provenance. Do not substitute “human-written.”
- **“We don't publish a number whose source we don't know.”** Delete the self-endorsement. Supply the source beside each dataset. Do not accidentally strip the existing illustrative labels elsewhere.
- **“Every link says where it takes you. No ‘click here’.”** Delete the editorial rule from public copy. Enforce it in the content checklist.
- **“We don't publish hand-drawn boundaries.”** Replace the attitude with the availability statement already present: the official boundary file is awaited.
- **“This site doesn't”** in the fee-list paragraph belongs to a case-study comparison, not a city service. Keep a direct privacy statement only after the access model is settled.
- **“Search uses AI,” “no one else can see it,” “every channel feeds the same complaints system,” and “we reply within five working days.”** Resolve the underlying claims in section 3 before editing their tone.

I would leave the concise news headlines, most checklist labels, and the basic law/tender titles alone. “Sustainable development” in a summary of an actual agreement is not automatically an AI tell. Neither is the explicit distinction between the Mayoralty and national project owners.

## 2. UI and UX review

### U01 — Important qualifications disappear on phones

- **Page and location:** Service-page facts strips; [docs/shared/page.css:154](/Users/ashaibani/Desktop/public-works/amanat-baghdad/docs/shared/page.css:154); also Karrada's fact strip.
- **Observed:** At widths up to 860px, `.facts .s` is hidden. On Building permit this removes “Once your documents are complete · illustrative,” the cost qualification, and the Ur-account requirement. At 375px the separate illustrative paragraph sits below the application panel, because the action column is moved ahead of the guide.
- **Why it matters:** The phone layout presents “About 30 days” more definitively than the desktop layout and invites an application before showing the qualification.
- **Suggested change:** Keep factual qualifications visible at every size. Put the illustrative notice beside the sample facts and before the primary action in both DOM and visual order.
- **Severity:** High.

### U02 — Search routes a service request to a complaint and misses an exact topic

- **Page and location:** Home / search; [docs/shared/home.js](/Users/ashaibani/Desktop/public-works/amanat-baghdad/docs/shared/home.js), English `ROUTES` and `fillAnswer()`.
- **Observed:** Browser search for “sewer connection” returns “Report a sewage overflow”; “tenders” returns “No page matches your request.” The implementation takes the first matching keyword rule, with sewer/drain complaints matched before any connection intent; there is no tender route. The displayed “Sewers and drainage” source is a text label, not a link to an actual page with that title.
- **Why it matters:** The dominant homepage control sends residents into the wrong workflow and falsely suggests existing content is absent.
- **Suggested change:** Search actual page titles and aliases, handle service intent before incident keywords, and link directly to the matching source page. Cover all published pages; offer several results when intent is ambiguous.
- **Severity:** High.

### U03 — A typed address cannot substitute for map interaction

- **Page and location:** Report / step 2; [docs/en/report.html:370](/Users/ashaibani/Desktop/public-works/amanat-baghdad/docs/en/report.html:370) and `setupMap()`.
- **Observed:** Selecting Karrada and entering an address still produces “Mark the place on the map.” Validation requires `moved`, which is set by map click, marker drag or successful geolocation. There is no address-based path satisfying validation. The default marker and map navigation do not provide an equivalent text-entry route.
- **Why it matters:** Users unable to manipulate the map, or unwilling/unable to share their current location, cannot complete the core task with an address. A person can also be reporting a problem somewhere other than their current position.
- **Suggested change:** Accept a municipality plus address/landmark as a complete alternative. Make pin refinement optional and provide a keyboard-operable location-selection method.
- **Severity:** High.

### U04 — Receipt and tracking describe different reports

- **Page and location:** Report / completion and Track / case; [docs/en/report.html:285](/Users/ashaibani/Desktop/public-works/amanat-baghdad/docs/en/report.html:285), `:418`; [docs/en/track.html:124](/Users/ashaibani/Desktop/public-works/amanat-baghdad/docs/en/track.html:124).
- **Observed:** Source inspection shows every completed report receives B-48213, while its completion text uses the selected category and municipality. “Track this report” opens the fixed sewage-overflow case in Karrada, irrespective of those selections.
- **Why it matters:** Even as a demonstration, the primary end-to-end journey contradicts itself. A water report in another municipality appears to become a sewage report in Karrada.
- **Suggested change:** Carry the demonstration's selected details through to its receipt and tracking view, or provide one clearly defined sample journey with matching details throughout. No production backend is required to fix this demonstration inconsistency.
- **Severity:** High.

### U05 — Updates are promised without a phone number

- **Page and location:** Report / review and completion; [docs/en/report.html:256](/Users/ashaibani/Desktop/public-works/amanat-baghdad/docs/en/report.html:256) and `:419`.
- **Observed:** WhatsApp is preselected. The phone field is not required and is never checked by `valid()`. Completion nevertheless promises every update on WhatsApp or by text, according to the selected option.
- **Why it matters:** The interaction demonstrates an impossible success state and gives no useful correction when contact details are missing.
- **Suggested change:** Default to tracking without messages, or require and validate a number when message updates are selected. Show the selected destination on the review screen.
- **Severity:** Medium.

### U06 — Step changes scroll the page but leave keyboard focus behind

- **Page and location:** Report / `show()` at [docs/en/report.html:354](/Users/ashaibani/Desktop/public-works/amanat-baghdad/docs/en/report.html:354).
- **Observed:** After clicking Next to reach step 2, focus remained on Next, below the newly displayed fields. The function scrolls to the intro but does not move focus to the step heading. Step count is announced through a live region, which helps but does not solve navigation order.
- **Why it matters:** Continuing with Tab skips the newly revealed fields; users must move backwards to reach them. After a Change action hides its own step, focus also needs deliberate handling.
- **Suggested change:** Focus the new step heading or legend using an appropriate programmatic focus target. On validation failure, connect the message to the relevant field and provide a predictable focus destination.
- **Severity:** Medium.

### U07 — Page-feedback buttons have no outcome

- **Page and location:** Five service guides / “Did you find what you needed on this page?”
- **Observed:** Yes and No are `type="button"` controls with no handlers, destination or confirmation. Confirmed in the HTML and loaded scripts.
- **Why it matters:** They solicit an action the product cannot acknowledge; a “No” answer offers no route to assistance.
- **Suggested change:** Demonstrate an explicit acknowledgement and useful next step, or remove the controls until feedback is in scope.
- **Severity:** Medium.

### U08 — Long document pages lose their contents navigation on phones

- **Page and location:** Laws, Leadership, Karrada and other long pages; `.toc` in [docs/shared/page.css](/Users/ashaibani/Desktop/public-works/amanat-baghdad/docs/shared/page.css).
- **Observed:** All “On this page” navigation is hidden below 860px. Laws contains multiple long document groups; Leadership contains several department tables.
- **Why it matters:** Phone users must scan the entire page to reach a known topic. Saving screen space removes the feature most useful on a long narrow layout.
- **Suggested change:** Keep a compact contents list near the title, or use a native disclosure labelled “On this page.”
- **Severity:** Medium.

### U09 — Shared navigation has no skip link

- **Page and location:** All in-scope pages / beginning of body and shared masthead.
- **Observed:** Pages provide a main landmark but no “Skip to main content” link before repeated navigation. Desktop dropdown children also enter the focus path when their parent has focus.
- **Why it matters:** Keyboard users without landmark shortcuts must traverse repeated navigation on each page.
- **Suggested change:** Add a visible-on-focus skip link to a consistently identified main content target; test it with the sticky header.
- **Severity:** Medium.

### U10 — A road status label contradicts the restriction

- **Page and location:** Karrada / Today in Karrada / Abu Nuwas road alert.
- **Observed:** The text says one lane is closed and the riverside walk remains open, but the badge says “Walking only.” The citywide Alerts page labels the same lane closure “Partly closed.”
- **Why it matters:** The badge implies the road is closed to vehicles, a different restriction.
- **Suggested change:** Use the same “Partly closed” status in both locations; keep the pedestrian-route detail in the description.
- **Severity:** Medium.

### U11 — Hotline numbers are not tap-to-call links

- **Page and location:** Shared footer and report/contact references.
- **Observed:** 5628 is rendered as text rather than an explicit telephone link.
- **Why it matters:** Calling is the principal alternative when the web task fails, especially on a phone.
- **Suggested change:** Use a consistently labelled `tel:5628` link while preserving the published number and hours. Test short-code handling on local devices before release.
- **Severity:** Low.

## 3. Content and strategy review

### S01 — The site presents proposed integrations as established services

- **Page and location:** Home / report channels; Report / help; About / referrals; Leadership / report promotion.
- **Observed:** Copy says phone, app, WhatsApp and web reports share a trackable system; it also guarantees referral to other bodies and describes reporting as faster than emailing. The repository research explicitly leaves Citizen Voice case numbers/public status unconfirmed. The report page is a simulation. The absence of a WhatsApp number is already logged; the additional issue is the certainty of these operational promises.
- **Why it matters:** These claims depend on agency agreements and working systems, not just a redesigned website. They are central to the proposed product's credibility.
- **Suggested change:** Record these as proposed capabilities in the case study and obtain service-owner confirmation before treating them as official copy. Keep verified phone/app routes distinct from the proposed unified journey. Do not invent replacement phone numbers or integration claims.
- **Severity:** High.

### S02 — Search's explanation does not describe the implementation

- **Page and location:** Home / search note; Using this website / How search works.
- **Observed:** The site says search uses AI, understands natural-language requests and answers from reviewed pages. The implementation is a fixed keyword list with prewritten responses and a 600ms delay. It does not retrieve page content. The water-cut response also promises users will see a scheduled cut first, but the report journey has no alert-check step.
- **Why it matters:** An AI description asks users to trust capabilities the prototype does not demonstrate. It also distracts from the simpler goal of finding the right service.
- **Suggested change:** Describe the actual prototype search behavior. Keep a future AI approach in the project rationale until implemented and evaluated; remove the unsupported scheduled-cut promise or build the check.
- **Severity:** High.

### S03 — The extent of illustrative service guidance is broader than the brief suggests

- **Page and location:** Building permit, Property statement, Water account, Sewer connection and Municipal fees / requirements, eligibility, times and office fallback.
- **Observed:** The brief highlights illustrative live figures, alerts and local works. The pages additionally mark documents, steps, contents of official statements, fees and processing times as illustrative. Other consequential statements are categorical, including permit exemptions, one required office visit, continued water supply during transfer and application-duration estimates. Verified Ur destinations do not verify these surrounding instructions.
- **Why it matters:** A resident can prepare the wrong documents or rely on a procedural assurance that has not been confirmed. A prototype may demonstrate a guide structure, but its evidence boundary must be explicit.
- **Suggested change:** Create a claim-by-claim verification list for each service and obtain the department's review. Keep sample requirements clearly identified and out of definitive guidance until confirmed. Do not rewrite an unverified exemption or deadline as if it were established law.
- **Severity:** High.

### S04 — Account-number lookup is described as private access

- **Page and location:** Municipal fees / “Why we don't publish lists of names,” [docs/en/service-fees.html:134](/Users/ashaibani/Desktop/public-works/amanat-baghdad/docs/en/service-fees.html:134).
- **Observed:** The text says “no one else can see it,” but the interface requests only an account number; any nonempty value returns the same illustrative record. There is no identity check. This is sample data, not evidence of an actual disclosure.
- **Why it matters:** Removing public lists does not establish that only an account holder can view a balance. The proposed access model and its privacy promise do not match.
- **Suggested change:** Define what information may be shown with an account reference alone and what requires verification. Replace the absolute exclusivity claim only after that decision; retain the decision not to publish named fee-payer lists.
- **Severity:** High.

### S05 — Accessibility and service standards are asserted ahead of evidence

- **Page and location:** Using this website / Accessibility, [docs/en/site.html:89](/Users/ashaibani/Desktop/public-works/amanat-baghdad/docs/en/site.html:89).
- **Observed:** “We work to the WCAG 2.2 AA standard” is accompanied by “every map has a text or table alternative” and a five-working-day response commitment. The report map has no equivalent address-only completion path. Reporting, tracking and fee lookup also rely on scripts, beyond the maps and search identified in the text. No supporting accessibility audit or approved response standard was supplied.
- **Why it matters:** Readers may interpret an aspiration as tested support. People encountering barriers need accurate limitations and a dependable alternative.
- **Suggested change:** Distinguish the accessibility target from tested results, list known limitations and usable alternatives, and confirm any response-time commitment with its owner. Remove the assertion about non-machine-translated English; it provides no accessibility assurance.
- **Severity:** High.

### S06 — “Open data” is mostly a document list and future programme

- **Page and location:** Open data / introduction, Datasets, Licence.
- **Observed:** The census is an HTML table with a source link; there is no CSV download. Several entries are “In preparation,” “When reporting launches,” or awaiting a source/file. The licence block says “an open licence” without identifying one, and it does not distinguish Mayoralty-produced data from the externally compiled census. The lead promises data readers can download and reuse.
- **Why it matters:** Researchers cannot readily download the principal table or determine reuse conditions. Planned datasets make the page look fuller without adding a present service.
- **Suggested change:** Separate available material from a short, clearly owned future-publication list. Add a downloadable table with units, geography, date and source metadata. Identify the applicable licence per dataset after verifying rights; do not invent a licence for third-party data.
- **Severity:** Medium.

### S07 — District navigation promises information the directory does not supply

- **Page and location:** Home / Your district office; Services / Find and contact; Alerts / area-only alerts; Districts introduction.
- **Observed:** Entry points promise office addresses, opening hours, works and local alerts. Most district entries contain names and email addresses only. “Your municipality is your nearest office” also implies proximity determines jurisdiction, while the project has no confirmed boundary lookup. The single completed district page is already a logged limitation; these inaccurate entry-point promises are the additional issue.
- **Why it matters:** Residents follow a link expecting to identify or visit an office and cannot finish the task. Choosing the geographically nearest office may not establish the correct jurisdiction.
- **Suggested change:** Describe the existing directory as municipal contact details. Promise addresses/hours/alerts only for pages that supply them. Explain the limits of jurisdiction guidance until official boundaries or a verified locality list are available.
- **Severity:** Medium.

### S08 — Failed resolution requires residents to start again

- **Page and location:** Track / “Problem still there?” action and closed-report help.
- **Observed:** The proposed recovery route is to submit another report and manually include the previous number. The interface does not carry the old number into a new report or offer a reopen/escalation action.
- **Why it matters:** Residents repeat work, case history can be lost, and duplicate reports may distort the performance figures the prototype promotes.
- **Suggested change:** Model a “Problem not resolved” path that retains the original reference and records the resident's disagreement. Define who reviews it and how it relates to the staff-complaint route on Contact.
- **Severity:** Medium.

### S09 — Procurement notices are hard to assess before downloading

- **Page and location:** Tenders and auctions / both notice tables.
- **Observed:** All listed notices are closed. Rows identify notice numbers, dates and download links but not the procurement subject. Missing subjects are already logged in the README. The page does not clearly introduce this set as an archive/snapshot or distinguish it from current opportunities.
- **Why it matters:** A contractor must open documents to discover relevance and may mistake the displayed archive for a complete current-opportunity list.
- **Suggested change:** Label the verified snapshot and its date clearly, separate active opportunities from archives when a maintained feed exists, and extract subjects from the original files without changing notice numbers or dates. Avoid saying no tenders are open unless that has been checked.
- **Severity:** Medium.

### S10 — Privacy copy describes a future service, with incomplete operational detail

- **Page and location:** Using this website / Privacy; Report / review notice.
- **Observed:** Privacy says the site keeps reports and optional phone numbers and refers to a public problem map. The report implementation sends nothing, as its review notice correctly states; the described public report map is not implemented. The policy does not specify retention, recipients or how to request correction/deletion. Pages load third-party fonts, images and map resources.
- **Why it matters:** The prototype's behavior and the proposed service's policy are mixed together. Readers cannot tell what is actually collected and who receives it.
- **Suggested change:** Write a policy for the actual prototype and separately define the intended service's data handling with its operator. Address third-party resource requests and map/photo location handling. This is a content-completeness finding, not a legal compliance determination.
- **Severity:** Medium.

### S11 — Critical and time-sensitive content lacks a visible maintenance model

- **Page and location:** Today panel, Alerts, Karrada works, service guides, Laws and Tenders; project documentation.
- **Observed:** Demonstration alerts say “Today” against a fixed 30 October date. The README recognises news/tenders/laws as a snapshot and anticipates future feeds. Dates and review statements are hand-authored; no documented owner/expiry workflow is supplied for service claims or urgent alerts.
- **Why it matters:** A static demonstration is legitimate, but a convincing government product also needs a way to retire expired closures, confirm instructions and distinguish publication date from verification date. “Last reviewed” alone does not define that work.
- **Suggested change:** Define a small content register: responsible office, source, verification date, next review and expiry where relevant. Keep the demonstration's date explicit; do not make sample alerts appear live by merely updating their date automatically.
- **Severity:** Medium.

### S12 — The emergency warning does not complete the handoff

- **Page and location:** Report / warning above the form.
- **Observed:** The warning tells people to call emergency services when a life is at risk, but supplies no verified emergency contact or destination.
- **Why it matters:** At the most urgent point, the site asks the resident to leave and work out the next step alone.
- **Suggested change:** Verify the appropriate local emergency route with the responsible agency and provide it directly, with the scope of that service. Do not substitute the municipal complaints number or guess an emergency number.
- **Severity:** Medium.

### S13 — Laws introduction overstates format consistency

- **Page and location:** Laws and plans / introduction and Plans and maps.
- **Observed:** “Every document is the official Arabic text as a PDF” conflicts with the listed neighbourhood-and-street map, correctly labelled as an image. The closing note also says English titles were supplied by the prototype author.
- **Why it matters:** Readers should know whether they are opening a searchable text, scanned image or translated description.
- **Suggested change:** Say the page provides official Arabic documents and maps, with formats marked beside each link. Keep the distinction between original documents and editorial English titles.
- **Severity:** Low.

## Recommended order

1. Fix the phone qualification loss, incorrect search routes and mandatory map interaction.
2. Make the report demonstration consistent from entry through receipt and tracking; correct update/contact validation and focus behavior.
3. Resolve unsupported operational, privacy and accessibility claims with an explicit verification list.
4. Apply the copy edits, starting with public-facing design commentary and unnatural simplification. Keep precise service language and genuinely useful distinctions.
5. Tighten the district, data and tender entry points to match what is actually available; establish content ownership before expanding those sections.

The known WhatsApp destination, water-payment destination, incomplete district coverage and unconfirmed deputy names remain on the existing backlog. They were not counted as newly discovered broken features. The certificate error should be reproduced independently in an ordinary browser before attributing it to hosting configuration.
