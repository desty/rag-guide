// ====== i18n Toggle System ======
// Shared across intro & expert guides.
// Usage: add data-i18n="key" to any element.
// Text nodes get replaced; attributes can be targeted with data-i18n-attr="placeholder".

(function () {
  const STORAGE_KEY = 'rag-guide-lang';

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || 'ko';
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    applyLang(lang);
    updateToggleUI(lang);
  }

  function applyLang(lang) {
    document.documentElement.lang = lang === 'en' ? 'en' : 'ko';
    document.querySelectorAll('[data-ko]').forEach(el => {
      const text = el.getAttribute(lang === 'en' ? 'data-en' : 'data-ko');
      if (text !== null) {
        // If the element has child elements we only want to replace, use innerHTML carefully
        if (el.children.length === 0) {
          el.textContent = text;
        } else {
          el.innerHTML = text;
        }
      }
    });
  }

  function updateToggleUI(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  // Create toggle button & inject into nav
  function createToggle() {
    const nav = document.querySelector('.nav-inner');
    if (!nav) return;

    const wrap = document.createElement('div');
    wrap.className = 'lang-toggle';
    wrap.innerHTML = `
      <button class="lang-btn" data-lang="ko">KO</button>
      <button class="lang-btn" data-lang="en">EN</button>
    `;
    nav.appendChild(wrap);

    wrap.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });

    updateToggleUI(getLang());
  }

  // Init
  document.addEventListener('DOMContentLoaded', () => {
    createToggle();
    const lang = getLang();
    if (lang !== 'ko') applyLang(lang);
    updateToggleUI(lang);
  });
})();
