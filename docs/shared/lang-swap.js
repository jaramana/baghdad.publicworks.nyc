// Language swap, loaded in <head> on every paired page.
// Keeps the reader's place across the swap, and animates only swaps made from a language link.

(() => {
  const PLACE_KEY = 'swap-place';

  const get = key => { try { return sessionStorage.getItem(key); } catch { return null; } };
  const set = (key, value) => { try { sessionStorage.setItem(key, value); } catch {} };
  const drop = key => { try { sessionStorage.removeItem(key); } catch {} };

  // Height the sticky masthead covers; zero on phones, where it scrolls away

  function covered() {
    const bar = document.querySelector('.masthead');
    return bar && getComputedStyle(bar).position === 'sticky' ? bar.offsetHeight : 0;
  }

  // Place = the nearest IDs above the top of the screen and how far past each the reader is.
  // Both languages share IDs; when one is missing, the next nearest is used.

  function savePlace() {
    const top = covered();
    const marks = [];
    document.querySelectorAll('main [id]').forEach(el => {
      const edge = el.getBoundingClientRect().top;
      if (edge <= top + 1) marks.push({ id: el.id, offset: top - edge });
    });
    set(PLACE_KEY, JSON.stringify({ marks: marks.slice(-8).reverse(), y: scrollY }));
  }

  function restorePlace() {
    const raw = get(PLACE_KEY);
    if (!raw) return false;
    drop(PLACE_KEY);
    const { marks, y } = JSON.parse(raw);
    const mark = marks.find(m => document.getElementById(m.id));
    const el = mark && document.getElementById(mark.id);
    scrollTo(0, el ? el.getBoundingClientRect().top + scrollY - covered() + mark.offset : y);
    return true;
  }

  addEventListener('click', e => {
    if (e.target.closest('.lang a')) savePlace();
  });

  if ('onpagereveal' in window) {
    addEventListener('pagereveal', e => {
      const swapped = restorePlace();
      if (!e.viewTransition) return;
      e.viewTransition.ready.catch(() => {});
      if (!swapped) e.viewTransition.skipTransition();
    });
  } else {
    addEventListener('DOMContentLoaded', restorePlace);
  }
})();
