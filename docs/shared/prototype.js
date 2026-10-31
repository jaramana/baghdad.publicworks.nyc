/*
  Prototype bar for the public demo

  A slim sticky bar above the masthead says this is a design prototype and
  links to the Mayoralty's real website. It sits outside the page design:
  remove this script tag from the pages and the model is unchanged.
*/

(() => {
  const words = {
    en: ['Design prototype by publicworks.nyc. Not the official website of the Mayoralty of Baghdad.', 'Prototype, not the official website.', 'Official site ↗'],
    ar: ['نموذج تصميم تجريبي من publicworks.nyc، وليس الموقع الرسمي لأمانة بغداد.', 'نموذج تجريبي، وليس الموقع الرسمي.', 'الموقع الرسمي ↗'],
    ckb: ['نموونەیەکی دیزاینی تاقیکارییە لە publicworks.nyc، ماڵپەڕی فەرمیی ئەمانەتی بەغدا نییە.', 'نموونەی تاقیکاری، ماڵپەڕی فەرمی نییە.', 'ماڵپەڕی فەرمی ↗']
  };
  const [long, short, link] = words[document.documentElement.lang] || words.en;

  const style = document.createElement('style');
  style.textContent = `
    .proto-bar { position: sticky; top: 0; z-index: 1000; background: #13201a; color: #f3f1ea; font-size: 0.8125rem; line-height: 1.4; view-transition-name: proto-bar; }
    .proto-bar p { max-width: 72rem; margin: 0 auto; padding: 0.4rem 16px; text-align: center; }
    .proto-bar a { color: #fff; font-weight: 600; white-space: nowrap; margin-inline-start: 0.5rem; }
    .proto-bar .short { display: none; }
    @media (max-width: 720px) { .proto-bar .long { display: none; } .proto-bar .short { display: inline; } }
    .masthead { top: var(--proto-h, 0px); }
    .action, .help { top: calc(7rem + var(--proto-h, 0px)); }
  `;
  document.head.append(style);

  const bar = document.createElement('div');
  bar.className = 'proto-bar';
  bar.setAttribute('role', 'note');
  bar.innerHTML = `<p><span class="long">${long}</span><span class="short">${short}</span><a href="https://www.amanatbaghdad.gov.iq/ar" rel="external">${link}</a></p>`;
  document.body.prepend(bar);

  const fit = () => document.documentElement.style.setProperty('--proto-h', bar.offsetHeight + 'px');
  fit();
  new ResizeObserver(fit).observe(bar);
})();
