// Home page behavior shared by all variants.
// The search demo routes a plain-language request with keyword rules.
// A real build would use a model that answers only from site pages.

const DISTRICTS = [
  { ar: 'مركز الرصافة', en: 'Rusafa Center', side: 'الرصافة' },
  { ar: 'الأعظمية', en: 'Adhamiya', side: 'الرصافة' },
  { ar: 'الشعب', en: 'Al-Shaab', side: 'الرصافة' },
  { ar: 'الصدر الأولى', en: 'Sadr 1', side: 'الرصافة' },
  { ar: 'الصدر الثانية', en: 'Sadr 2', side: 'الرصافة' },
  { ar: 'الغدير', en: 'Al-Ghadeer', side: 'الرصافة' },
  { ar: 'بغداد الجديدة', en: 'New Baghdad', side: 'الرصافة' },
  { ar: 'الكرادة', en: 'Karrada', side: 'الرصافة' },
  { ar: 'مركز الكرخ', en: 'Karkh Center', side: 'الكرخ' },
  { ar: 'الكاظمية', en: 'Kadhimiya', side: 'الكرخ' },
  { ar: 'المنصور', en: 'Mansour', side: 'الكرخ' },
  { ar: 'الشعلة', en: 'Al-Shula', side: 'الكرخ' },
  { ar: 'الرشيد', en: 'Al-Rasheed', side: 'الكرخ' },
  { ar: 'الدورة', en: 'Dora', side: 'الكرخ' },
  { ar: 'المنطقة الخضراء وطريق المطار', en: 'Green Zone and Airport Road', side: 'الكرخ' }
];

const ROUTES = [
  { match: /مجار|مجاري|طفح|صرف/, title: 'بلاغ عن طفح المجاري', body: 'نفتح نموذج البلاغ وفيه نوع المشكلة. أضف صورة وحدّد الموقع على الخريطة.', action: 'ابدأ البلاغ', source: 'المجاري والصرف الصحي' },
  { match: /ماء|مياه|ماي|انقطاع/, title: 'بلاغ عن انقطاع الماء', body: 'نفتح نموذج البلاغ وفيه نوع المشكلة. إن كان القطع مجدولاً في منطقتك فستراه أولاً.', action: 'ابدأ البلاغ', source: 'انقطاع الماء' },
  { match: /نفاي|قمام|زبال|أوساخ/, title: 'بلاغ عن النفايات', body: 'نفتح نموذج البلاغ. أضف صورة، وسنرسله إلى بلدية منطقتك.', action: 'ابدأ البلاغ', source: 'رفع النفايات' },
  { match: /إنار|انار|ضوء|عمود/, title: 'بلاغ عن الإنارة', body: 'حدّد العمود على الخريطة أو أضف صورة له.', action: 'ابدأ البلاغ', source: 'إنارة الشوارع' },
  { match: /حفر|حفرة|تبليط|رصيف/, title: 'بلاغ عن الطريق أو الرصيف', body: 'أضف صورة وحدّد الموقع. نرسله إلى الدائرة المسؤولة.', action: 'ابدأ البلاغ', source: 'الطرق والأرصفة' },
  { match: /إجاز|اجاز|بناء|ترميم/, title: 'إجازة البناء', body: 'تقدَّم الإجازة على بوابة أور. اقرأ أولاً ما تحتاجه من مستندات، والكلفة، والمدة.', action: 'اقرأ دليل الإجازة', source: 'إجازة البناء' },
  { match: /فاتور|اشتراك|عداد|مقياس/, title: 'حساب الماء', body: 'الدفع والاشتراك الجديد ونقل الاسم تتم على بوابة أور.', action: 'اذهب إلى حساب الماء', source: 'حساب الماء' },
  { match: /عقار|سند|بيان/, title: 'بيان عقار', body: 'يصدر البيان إلكترونياً على بوابة أور. تحتاجه للبيع والإرث والإجازات.', action: 'اقرأ دليل البيان', source: 'بيان عقار' },
  { match: /رسوم|رسم|دفع/, title: 'الرسوم البلدية', body: 'رسوم المهن والإعلانات والنظافة، ومن أين تُدفع.', action: 'اقرأ دليل الرسوم', source: 'الرسوم البلدية' }
];

function findDistrict(text) {
  return DISTRICTS.find(d => text.includes(d.ar) || text.includes(d.ar.replace(/^ال/, '')));
}

// The answer fills a slot reserved in the layout, so nothing below it moves.

function renderAnswer(box, query) {
  box.hidden = false;
  box.classList.add('is-loading');
  box.innerHTML = '<p class="answer-wait">جارٍ البحث في صفحات الأمانة…</p>';
  clearTimeout(box.timer);
  box.timer = setTimeout(() => {
    box.classList.remove('is-loading');
    fillAnswer(box, query);
  }, 600);
}

function fillAnswer(box, query) {
  const route = ROUTES.find(r => r.match.test(query));
  const district = findDistrict(query);
  if (!route) {
    box.innerHTML = `
      <p class="answer-title">لم نجد صفحة تطابق طلبك.</p>
      <p>جرّب كلمات أخرى، أو <a href="#tasks">تصفّح أكثر الخدمات طلباً</a>.</p>`;
  } else {
    box.innerHTML = `
      <p class="answer-title">${route.title}</p>
      <p>${route.body}</p>
      ${district ? `<p class="answer-meta">المنطقة: ${district.ar} · ${district.side}</p>` : ''}
      <a class="answer-action" href="#">${route.action}</a>
      <p class="answer-source">المصدر: صفحة «${route.source}» على موقع الأمانة</p>`;
  }
}

const ar = n => String(n).replace(/\d/g, c => '٠١٢٣٤٥٦٧٨٩'[c]);

function renderDistrict(card, value) {
  const index = Number(value);
  const d = value === '' ? null : DISTRICTS[index];
  if (!d) { card.hidden = true; return; }
  card.innerHTML = `
    <p class="district-name">بلدية ${d.ar}</p>
    <p class="district-side">جانب ${d.side} · ${d.en}</p>
    <dl>
      <div><dt>ساعات الدوام</dt><dd>الأحد إلى الخميس، ٨:٣٠ صباحاً – ٢:٣٠ ظهراً</dd></div>
      <div><dt>أعمال جارية</dt><dd>${ar((index % 4) + 2)} مشاريع في المنطقة</dd></div>
      <div><dt>بلاغات هذا الشهر</dt><dd>${ar((index * 37 % 180) + 60)} بلاغاً، أُغلق ${ar(70 + index % 20)}٪ منها</dd></div>
    </dl>
    <a class="district-link" href="#">صفحة البلدية</a>
    <p class="note">أرقام توضيحية في هذا النموذج</p>`;
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
        groups[d.side].label = `جانب ${d.side}`;
        select.append(groups[d.side]);
      }
      groups[d.side].append(new Option(d.ar, i));
    });
    select.addEventListener('change', () => renderDistrict(card, select.value));
  }
});
