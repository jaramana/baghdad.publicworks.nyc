// Behavior shared by the home pages (Arabic and English) and the report flow.
// The search demo routes a plain-language request with keyword rules.
// A real build would use a model that answers only from site pages.

const LANG = document.documentElement.lang === 'en' ? 'en' : 'ar';

const DISTRICTS = [
  { ar: 'مركز الرصافة', en: 'Rusafa Center', side: 'الرصافة', slug: 'rusafa' },
  { ar: 'الأعظمية', en: 'Adhamiya', side: 'الرصافة', slug: 'adhamiya' },
  { ar: 'الشعب', en: 'Al-Shaab', side: 'الرصافة', slug: 'shaab' },
  { ar: 'الصدر الأولى', en: 'Sadr 1', side: 'الرصافة', slug: 'sader1' },
  { ar: 'الصدر الثانية', en: 'Sadr 2', side: 'الرصافة', slug: 'sader2' },
  { ar: 'الغدير', en: 'Al-Ghadeer', side: 'الرصافة', slug: 'ghadeer' },
  { ar: 'بغداد الجديدة', en: 'New Baghdad', side: 'الرصافة', slug: 'baghdadg' },
  { ar: 'الكرادة', en: 'Karrada', side: 'الرصافة', slug: 'karrada', works: 4, reports: 142, closed: 81 },
  { ar: 'مركز الكرخ', en: 'Karkh Center', side: 'الكرخ', slug: 'karkh' },
  { ar: 'الكاظمية', en: 'Kadhimiya', side: 'الكرخ', slug: 'kadhimiya' },
  { ar: 'المنصور', en: 'Mansour', side: 'الكرخ', slug: 'mansour' },
  { ar: 'الشعلة', en: 'Al-Shula', side: 'الكرخ', slug: 'shuala' },
  { ar: 'الرشيد', en: 'Al-Rasheed', side: 'الكرخ', slug: 'rasheed' },
  { ar: 'الدورة', en: 'Dora', side: 'الكرخ', slug: 'dora' },
  { ar: 'المنطقة الخضراء وطريق المطار', en: 'Green Zone and Airport Road', side: 'الكرخ', slug: 'gzone' }
];

const SIDE_EN = { 'الرصافة': 'Rusafa (east bank)', 'الكرخ': 'Karkh (west bank)' };

// Only Karrada has a full page, and its figures match that page.
// Every other district opens its row in the index.

const districtHref = d => d.slug === 'karrada' ? 'district-karrada.html' : `districts.html#${d.slug}`;

const ROUTES = {
  ar: [
    { match: /مجار|مجاري|طفح|صرف/, title: 'بلاغ عن طفح المجاري', body: 'نفتح نموذج البلاغ وفيه نوع المشكلة. أضف صورة وحدّد الموقع على الخريطة.', action: 'ابدأ البلاغ', source: 'المجاري والصرف الصحي', href: 'report.html?cat=طفح المجاري' },
    { match: /ماء|مياه|ماي|انقطاع/, title: 'بلاغ عن انقطاع الماء', body: 'نفتح نموذج البلاغ وفيه نوع المشكلة. إن كان القطع مجدولاً في منطقتك فستراه أولاً.', action: 'ابدأ البلاغ', source: 'انقطاع الماء', href: 'report.html?cat=انقطاع الماء' },
    { match: /نفاي|قمام|زبال|أوساخ/, title: 'بلاغ عن النفايات', body: 'نفتح نموذج البلاغ. أضف صورة، وسنرسله إلى بلدية منطقتك.', action: 'ابدأ البلاغ', source: 'رفع النفايات', href: 'report.html?cat=النفايات' },
    { match: /إنار|انار|ضوء|عمود/, title: 'بلاغ عن الإنارة', body: 'حدّد العمود على الخريطة أو أضف صورة له.', action: 'ابدأ البلاغ', source: 'إنارة الشوارع', href: 'report.html?cat=إنارة الشوارع' },
    { match: /حفر|حفرة|تبليط|رصيف/, title: 'بلاغ عن الطريق أو الرصيف', body: 'أضف صورة وحدّد الموقع. نرسله إلى الدائرة المسؤولة.', action: 'ابدأ البلاغ', source: 'الطرق والأرصفة', href: 'report.html?cat=الطرق والأرصفة' },
    { match: /إجاز|اجاز|بناء|ترميم/, title: 'إجازة البناء', body: 'تقدَّم الإجازة على بوابة أور. اقرأ أولاً ما تحتاجه من مستندات، والكلفة، والمدة.', action: 'اقرأ دليل الإجازة', source: 'إجازة البناء', href: 'service-permit.html' },
    { match: /فاتور|اشتراك|عداد|مقياس/, title: 'حساب الماء', body: 'الدفع والاشتراك الجديد ونقل الاسم تتم على بوابة أور.', action: 'اذهب إلى حساب الماء', source: 'حساب الماء', href: 'service-water.html' },
    { match: /عقار|سند|بيان/, title: 'بيان عقار', body: 'يصدر البيان إلكترونياً على بوابة أور. تحتاجه للبيع والإرث والإجازات.', action: 'اقرأ دليل البيان', source: 'بيان عقار', href: 'service-property.html' },
    { match: /رسوم|رسم|دفع/, title: 'الرسوم البلدية', body: 'رسوم المهن والإعلانات والنظافة، ومن أين تُدفع.', action: 'اقرأ دليل الرسوم', source: 'الرسوم البلدية', href: 'service-fees.html' }
  ],
  en: [
    { match: /sewer|sewage|overflow|drain/i, title: 'Report a sewage overflow', body: 'We open the report form with the problem type filled in. Add a photo and pin the place on the map.', action: 'Start a report', source: 'Sewers and drainage', href: 'report.html?cat=طفح المجاري' },
    { match: /water cut|no water|outage|water/i, title: 'Report a water cut', body: 'We open the report form with the problem type filled in. If a cut is scheduled in your area, you see it first.', action: 'Start a report', source: 'Water cuts', href: 'report.html?cat=انقطاع الماء' },
    { match: /garbage|trash|rubbish|waste/i, title: 'Report uncollected waste', body: 'We open the report form. Add a photo and we send it to your district office.', action: 'Start a report', source: 'Waste collection', href: 'report.html?cat=النفايات' },
    { match: /light|lamp/i, title: 'Report a street light', body: 'Pin the pole on the map or add a photo of it.', action: 'Start a report', source: 'Street lighting', href: 'report.html?cat=إنارة الشوارع' },
    { match: /pothole|road|pavement|sidewalk/i, title: 'Report a road or pavement problem', body: 'Add a photo and pin the place. We send it to the department in charge.', action: 'Start a report', source: 'Roads and pavements', href: 'report.html?cat=الطرق والأرصفة' },
    { match: /permit|build|renovat/i, title: 'Building permit', body: 'You apply on the Ur portal. Read first what documents you need, what it costs and how long it takes.', action: 'Read the permit guide', source: 'Building permit', href: 'service-permit.html' },
    { match: /bill|account|meter/i, title: 'Water account', body: 'Paying, opening an account and changing the name are done on the Ur portal.', action: 'Go to water account', source: 'Water account', href: 'service-water.html' },
    { match: /property|deed|statement/i, title: 'Property statement', body: 'Issued online on the Ur portal. You need it to sell, inherit or apply for a permit.', action: 'Read the statement guide', source: 'Property statement', href: 'service-property.html' },
    { match: /fee|tax|pay/i, title: 'Municipal fees', body: 'Trade, advertising and cleaning fees, and where to pay them.', action: 'Read the fees guide', source: 'Municipal fees', href: 'service-fees.html' }
  ]
};

const STR = {
  ar: {
    wait: 'جارٍ البحث في صفحات الأمانة…',
    none: '<p class="answer-title">لم نجد صفحة تطابق طلبك.</p><p>جرّب كلمات أخرى، أو <a href="services.html">تصفّح كل الخدمات</a>.</p>',
    area: d => `المنطقة: ${d.ar} · ${d.side}`,
    source: s => `المصدر: صفحة «${s}» على موقع الأمانة`,
    group: side => `جانب ${side}`,
    name: d => `بلدية ${d.ar}`,
    side: d => `جانب ${d.side} · ${d.en}`,
    hoursK: 'ساعات الدوام', hoursV: 'الأحد إلى الخميس، ٨:٣٠ صباحاً – ٢:٣٠ ظهراً',
    worksK: 'أعمال جارية', worksV: n => `${num(n)} مشاريع في المنطقة`,
    reportsK: 'بلاغات هذا الشهر', reportsV: (n, p) => `${num(n)} بلاغاً، أُغلق ${num(p)}٪ منها`,
    link: 'صفحة البلدية', note: 'أرقام توضيحية في هذا النموذج'
  },
  en: {
    wait: 'Searching Mayoralty pages…',
    none: '<p class="answer-title">No page matches your request.</p><p>Try other words, or <a href="services.html">browse all services</a>.</p>',
    area: d => `Area: ${d.en} · ${SIDE_EN[d.side]}`,
    source: s => `Source: the “${s}” page on the Mayoralty site`,
    group: side => SIDE_EN[side],
    name: d => `${d.en} municipality`,
    side: d => `${SIDE_EN[d.side]} · ${d.ar}`,
    hoursK: 'Office hours', hoursV: 'Sunday to Thursday, 8:30 am – 2:30 pm',
    worksK: 'Works under way', worksV: n => `${n} projects in the area`,
    reportsK: 'Reports this month', reportsV: (n, p) => `${n} reports, ${p}% closed`,
    link: 'District page', note: 'Figures are illustrative in this prototype'
  }
}[LANG];

const ar = n => String(n).replace(/\d/g, c => '٠١٢٣٤٥٦٧٨٩'[c]);
const num = n => LANG === 'ar' ? ar(n) : String(n);

function findDistrict(text) {
  const t = text.toLowerCase();
  return DISTRICTS.find(d =>
    text.includes(d.ar) || text.includes(d.ar.replace(/^ال/, '')) || t.includes(d.en.toLowerCase()));
}

// The answer fills a slot reserved in the layout, so nothing below it moves.

function renderAnswer(box, query) {
  box.hidden = false;
  box.classList.add('is-loading');
  box.innerHTML = `<p class="answer-wait">${STR.wait}</p>`;
  clearTimeout(box.timer);
  box.timer = setTimeout(() => {
    box.classList.remove('is-loading');
    fillAnswer(box, query);
  }, 600);
}

function fillAnswer(box, query) {
  const route = ROUTES[LANG].find(r => r.match.test(query));
  const district = findDistrict(query);
  if (!route) { box.innerHTML = STR.none; return; }
  box.innerHTML = `
    <p class="answer-title">${route.title}</p>
    <p>${route.body}</p>
    ${district ? `<p class="answer-meta">${STR.area(district)}</p>` : ''}
    <a class="answer-action" href="${route.href}">${route.action}</a>
    <p class="answer-source">${STR.source(route.source)}</p>`;
}

function renderDistrict(card, value) {
  const index = Number(value);
  const d = value === '' ? null : DISTRICTS[index];
  if (!d) { card.hidden = true; return; }
  card.innerHTML = `
    <p class="district-name">${STR.name(d)}</p>
    <p class="district-side">${STR.side(d)}</p>
    <dl>
      <div><dt>${STR.hoursK}</dt><dd>${STR.hoursV}</dd></div>
      <div><dt>${STR.worksK}</dt><dd>${STR.worksV(d.works ?? (index % 4) + 2)}</dd></div>
      <div><dt>${STR.reportsK}</dt><dd>${STR.reportsV(d.reports ?? (index * 37 % 180) + 60, d.closed ?? 70 + index % 20)}</dd></div>
    </dl>
    <a class="district-link" href="${districtHref(d)}">${STR.link}</a>
    <p class="note">${STR.note}</p>`;
  card.hidden = false;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('[data-search]');
  const input = form?.querySelector('input');
  const box = document.querySelector('[data-answer]');

  form?.addEventListener('submit', e => {
    e.preventDefault();
    if (input.value.trim()) renderAnswer(box, input.value.trim());
  });

  document.querySelectorAll('[data-chip]').forEach(chip => {
    chip.addEventListener('click', () => {
      input.value = chip.dataset.chip;
      renderAnswer(box, input.value);
    });
  });

  const select = document.querySelector('[data-district]');
  const card = document.querySelector('[data-district-card]');
  if (select) {
    const groups = {};
    DISTRICTS.forEach((d, i) => {
      if (!groups[d.side]) {
        groups[d.side] = document.createElement('optgroup');
        groups[d.side].label = STR.group(d.side);
        select.append(groups[d.side]);
      }
      groups[d.side].append(new Option(LANG === 'en' ? d.en : d.ar, i));
    });
    select.addEventListener('change', () => renderDistrict(card, select.value));
  }
});
