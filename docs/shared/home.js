// Behavior shared by the Arabic and Kurdish home pages and the report flow.
// The Arabic and Kurdish search demo routes a request with keyword rules.
// English search has its own results page (en/search.html).

const LANG = { en: 'en', ckb: 'ckb' }[document.documentElement.lang] ?? 'ar';

const DISTRICTS = [
  { ar: 'مركز الرصافة', en: 'Rusafa Center', ku: 'ناوەندی ڕوسافە', side: 'الرصافة', slug: 'rusafa' },
  { ar: 'الأعظمية', en: 'Adhamiya', ku: 'ئەعزەمییە', side: 'الرصافة', slug: 'adhamiya' },
  { ar: 'الشعب', en: 'Al-Shaab', ku: 'شەعب', side: 'الرصافة', slug: 'shaab' },
  { ar: 'الصدر الأولى', en: 'Sadr 1', ku: 'سەدری یەکەم', side: 'الرصافة', slug: 'sader1' },
  { ar: 'الصدر الثانية', en: 'Sadr 2', ku: 'سەدری دووەم', side: 'الرصافة', slug: 'sader2' },
  { ar: 'الغدير', en: 'Al-Ghadeer', ku: 'غەدیر', side: 'الرصافة', slug: 'ghadeer' },
  { ar: 'بغداد الجديدة', en: 'New Baghdad', ku: 'بەغدای نوێ', side: 'الرصافة', slug: 'baghdadg' },
  { ar: 'الكرادة', en: 'Karrada', ku: 'کەڕادە', side: 'الرصافة', slug: 'karrada', works: 4, reports: 142, closed: 81 },
  { ar: 'مركز الكرخ', en: 'Karkh Center', ku: 'ناوەندی کەرخ', side: 'الكرخ', slug: 'karkh' },
  { ar: 'الكاظمية', en: 'Kadhimiya', ku: 'کازمییە', side: 'الكرخ', slug: 'kadhimiya' },
  { ar: 'المنصور', en: 'Mansour', ku: 'مەنسوور', side: 'الكرخ', slug: 'mansour' },
  { ar: 'الشعلة', en: 'Al-Shula', ku: 'شوعلە', side: 'الكرخ', slug: 'shuala' },
  { ar: 'الرشيد', en: 'Al-Rasheed', ku: 'ڕەشید', side: 'الكرخ', slug: 'rasheed' },
  { ar: 'الدورة', en: 'Dora', ku: 'دۆرە', side: 'الكرخ', slug: 'dora' },
  { ar: 'المنطقة الخضراء وطريق المطار', en: 'Green Zone and Airport Road', ku: 'ناوچەی سەوز و ڕێگای فڕۆکەخانە', side: 'الكرخ', slug: 'gzone' }
];

const SIDE_EN = { 'الرصافة': 'Rusafa (east bank)', 'الكرخ': 'Karkh (west bank)' };
const SIDE_KU = { 'الرصافة': 'ڕوسافە (کەناری ڕۆژهەڵات)', 'الكرخ': 'کەرخ (کەناری ڕۆژئاوا)' };

// Only Karrada has a full page, and its figures match that page.
// Every other district opens its row in the index.

const districtHref = d => d.slug === 'karrada' ? 'district-karrada.html' : `districts.html#${d.slug}`;

const ROUTES = {
  ar: [
    { match: /مجار|مجاري|طفح|صرف/, title: 'بلاغ عن طفح المجاري', body: 'نفتح نموذج البلاغ وفيه نوع المشكلة. أضف صورة وحدّد الموقع على الخريطة.', action: 'ابدأ البلاغ', source: 'المجاري والصرف الصحي', href: 'report.html?cat=طفح المجاري' },
    { match: /فاتور|اشتراك|عداد|مقياس/, title: 'حساب الماء', body: 'الدفع والاشتراك الجديد ونقل الاسم تتم على بوابة أور.', action: 'اذهب إلى حساب الماء', source: 'حساب الماء', href: 'service-water.html' },
    { match: /ماء|مياه|ماي|انقطاع/, title: 'بلاغ عن انقطاع الماء', body: 'نفتح نموذج البلاغ وفيه نوع المشكلة. إن كان القطع مجدولاً في منطقتك فستراه أولاً.', action: 'ابدأ البلاغ', source: 'انقطاع الماء', href: 'report.html?cat=انقطاع الماء' },
    { match: /نفاي|قمام|زبال|أوساخ/, title: 'بلاغ عن النفايات', body: 'نفتح نموذج البلاغ. أضف صورة، وسنرسله إلى بلدية منطقتك.', action: 'ابدأ البلاغ', source: 'رفع النفايات', href: 'report.html?cat=النفايات' },
    { match: /إنار|انار|ضوء|عمود/, title: 'بلاغ عن الإنارة', body: 'حدّد العمود على الخريطة أو أضف صورة له.', action: 'ابدأ البلاغ', source: 'إنارة الشوارع', href: 'report.html?cat=إنارة الشوارع' },
    { match: /حفر|حفرة|تبليط|رصيف/, title: 'بلاغ عن الطريق أو الرصيف', body: 'أضف صورة وحدّد الموقع. نرسله إلى الدائرة المسؤولة.', action: 'ابدأ البلاغ', source: 'الطرق والأرصفة', href: 'report.html?cat=الطرق والأرصفة' },
    { match: /إجاز|اجاز|بناء|ترميم/, title: 'إجازة البناء', body: 'تقدَّم الإجازة على بوابة أور. اقرأ أولاً ما تحتاجه من مستندات، والكلفة، والمدة.', action: 'اقرأ دليل الإجازة', source: 'إجازة البناء', href: 'service-permit.html' },
    { match: /عقار|سند|بيان/, title: 'بيان عقار', body: 'يصدر البيان إلكترونياً على بوابة أور. تحتاجه للبيع والإرث والإجازات.', action: 'اقرأ دليل البيان', source: 'بيان عقار', href: 'service-property.html' },
    { match: /رسوم|رسم|دفع/, title: 'الرسوم البلدية', body: 'رسوم المهن والإعلانات والنظافة، ومن أين تُدفع.', action: 'اقرأ دليل الرسوم', source: 'الرسوم البلدية', href: 'service-fees.html' }
  ],
  // Kurdish guides not yet translated open their English page

  ckb: [
    { match: /ئاوەڕۆ|زێراب|لێشاو|مەجاری/, title: 'ڕاپۆرتی ڕژانی ئاوەڕۆ', body: 'فۆرمی ڕاپۆرت دەکەینەوە و جۆری کێشەکەی تێدا پڕکراوەتەوە. وێنەیەک زیاد بکە و شوێنەکە لەسەر نەخشە دیاری بکە.', action: 'دەست بە ڕاپۆرت بکە', source: 'ئاوەڕۆ و زێراب', href: 'report.html?cat=طفح المجاري' },
    { match: /پسوولە|هەژمار|میتەر|عەداد/, title: 'هەژماری ئاو', body: 'پارەدان، کردنەوەی هەژمار و گۆڕینی ناو لە پۆرتاڵی ئور دەکرێن.', action: 'بڕۆ بۆ هەژماری ئاو', source: 'هەژماری ئاو', href: '../en/service-water.html' },
    { match: /ئاو|بڕان|بڕاوە/, title: 'ڕاپۆرتی بڕانی ئاو', body: 'فۆرمی ڕاپۆرت دەکەینەوە و جۆری کێشەکەی تێدا پڕکراوەتەوە. ئەگەر بڕانێکی خشتەکراو لە ناوچەکەت هەبێت، یەکەم جار ئەوە دەبینیت.', action: 'دەست بە ڕاپۆرت بکە', source: 'بڕانی ئاو', href: 'report.html?cat=انقطاع الماء' },
    { match: /خاشاک|زبڵ|پاشماوە/, title: 'ڕاپۆرتی خاشاک', body: 'فۆرمی ڕاپۆرت دەکەینەوە. وێنەیەک زیاد بکە و دەینێرین بۆ شارەوانی ناوچەکەت.', action: 'دەست بە ڕاپۆرت بکە', source: 'کۆکردنەوەی خاشاک', href: 'report.html?cat=النفايات' },
    { match: /ڕووناکی|گڵۆپ|چرا|ستوون/, title: 'ڕاپۆرتی ڕووناکی شەقام', body: 'ستوونەکە لەسەر نەخشە دیاری بکە یان وێنەیەکی زیاد بکە.', action: 'دەست بە ڕاپۆرت بکە', source: 'ڕووناکی شەقامەکان', href: 'report.html?cat=إنارة الشوارع' },
    { match: /چاڵ|ڕێگا|شەقام|جادە|پیادەڕەو/, title: 'ڕاپۆرتی کێشەی ڕێگا یان پیادەڕەو', body: 'وێنەیەک زیاد بکە و شوێنەکە دیاری بکە. دەینێرین بۆ ئەو فەرمانگەیەی بەرپرسە.', action: 'دەست بە ڕاپۆرت بکە', source: 'ڕێگا و پیادەڕەوەکان', href: 'report.html?cat=الطرق والأرصفة' },
    { match: /مۆڵەت|بیناسازی|نۆژەن/, title: 'مۆڵەتی بیناسازی', body: 'داواکاری لە پۆرتاڵی ئور پێشکەش دەکەیت. سەرەتا بخوێنەرەوە چ بەڵگەنامەیەکت پێویستە، تێچووی چەندە و چەند دەخایەنێت.', action: 'ڕێبەری مۆڵەت بخوێنەرەوە', source: 'مۆڵەتی بیناسازی', href: 'service-permit.html' },
    { match: /موڵک|بەیاننامە|تاپۆ/, title: 'بەیاننامەی موڵک', body: 'بە ئۆنلاین لە پۆرتاڵی ئور دەردەچێت. بۆ فرۆشتن، میرات یان داواکردنی مۆڵەت پێویستە.', action: 'ڕێبەری بەیاننامە بخوێنەرەوە', source: 'بەیاننامەی موڵک', href: '../en/service-property.html' },
    { match: /باج|ڕسووم|پارەدان/, title: 'باجەکانی شارەوانی', body: 'باجی پیشە، ڕیکلام و پاککردنەوە، و لە کوێ دەدرێن.', action: 'ڕێبەری باجەکان بخوێنەرەوە', source: 'باجەکانی شارەوانی', href: '../en/service-fees.html' }
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
  // Kurdish pages use search only; the district card is Arabic-home only

  ckb: {
    wait: 'لە پەڕەکانی ئەمانەت دەگەڕێین…',
    none: '<p class="answer-title">هیچ پەڕەیەک لەگەڵ داواکارییەکەت ناگونجێت.</p><p>وشەی تر تاقی بکەرەوە، یان <a href="services.html">سەیری هەموو خزمەتگوزارییەکان بکە</a>.</p>',
    area: d => `ناوچە: ${d.ku} · ${SIDE_KU[d.side]}`,
    source: s => `سەرچاوە: پەڕەی «${s}» لە ماڵپەڕی ئەمانەت`
  }
}[LANG];

const ar = n => String(n).replace(/\d/g, c => '٠١٢٣٤٥٦٧٨٩'[c]);
const num = n => LANG === 'en' ? String(n) : ar(n);

function findDistrict(text) {
  const t = text.toLowerCase();
  return DISTRICTS.find(d =>
    text.includes(d.ar) || text.includes(d.ar.replace(/^ال/, '')) || text.includes(d.ku) || t.includes(d.en.toLowerCase()));
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
