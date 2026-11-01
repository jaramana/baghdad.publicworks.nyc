// The 15 municipalities, for the report form in all three languages.
// The order is the value of each option in the report form.

const DISTRICTS = [
  { ar: 'مركز الرصافة', en: 'Rusafa Center', ku: 'ناوەندی ڕوسافە', side: 'الرصافة', slug: 'rusafa' },
  { ar: 'الأعظمية', en: 'Adhamiya', ku: 'ئەعزەمییە', side: 'الرصافة', slug: 'adhamiya' },
  { ar: 'الشعب', en: 'Al-Shaab', ku: 'شەعب', side: 'الرصافة', slug: 'shaab' },
  { ar: 'الصدر الأولى', en: 'Sadr 1', ku: 'سەدری یەکەم', side: 'الرصافة', slug: 'sader1' },
  { ar: 'الصدر الثانية', en: 'Sadr 2', ku: 'سەدری دووەم', side: 'الرصافة', slug: 'sader2' },
  { ar: 'الغدير', en: 'Al-Ghadeer', ku: 'غەدیر', side: 'الرصافة', slug: 'ghadeer' },
  { ar: 'بغداد الجديدة', en: 'New Baghdad', ku: 'بەغدای نوێ', side: 'الرصافة', slug: 'baghdadg' },
  { ar: 'الكرادة', en: 'Karrada', ku: 'کەڕادە', side: 'الرصافة', slug: 'karrada' },
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

const eastern = n => String(n).replace(/\d/g, c => '٠١٢٣٤٥٦٧٨٩'[c]);
