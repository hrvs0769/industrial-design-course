/* ═══════════════════════════════════════════════════════════
   课程首页 —— 课程地图
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const IMG = (k, size) => `assets/img/${k}-${size}.webp`;
  const OBJ = window.OBJ || {};
  const COURSE = window.COURSE || { lessons: [] };

  /* ── 封面图片带 ──────────────────────────────────────── */
  const strip = $('#courseStrip');
  if (strip) {
    const keys = ['panton', 'braun', 'juicer', 'imac', 'coke', 'walkman', 'swatch', 'kelp', 'billy', 'iphone'];
    strip.innerHTML = keys.map((k, i) => {
      const o = OBJ[k] || { name: k, pos: '50% 50%' };
      return `<span class="strip-cell" style="--i:${i}">
        <img src="${IMG(k, 'card')}" alt="${esc(o.name)}" ${i > 3 ? 'loading="lazy" ' : ''}decoding="async" style="object-position:${o.pos || '50% 50%'}">
      </span>`;
    }).join('');
  }

  /* ── 课程地图 ────────────────────────────────────────── */
  const map = $('#courseMap');
  if (map) {
    map.innerHTML = COURSE.lessons.map((l, i) => {
      const o = OBJ[l.cover] || {};
      const img = o.img || l.cover;
      return `<a class="lesson-card reveal" data-d="${i % 4}" href="lessons/${esc(l.file)}"
                 style="--accent:${esc(l.accent || '#FF5A1F')}">
        <span class="lesson-frame">
          <img src="${IMG(img, 'card')}" alt="" loading="lazy" decoding="async" style="object-position:${o.pos || '50% 50%'}">
          <span class="lesson-week">W${String(l.week).padStart(2, '0')}</span>
          ${l.done ? '<span class="lesson-done">已完成</span>' : ''}
        </span>
        <span class="lesson-body">
          <span class="lesson-tag">${esc(l.tag || '')}</span>
          <b>${l.title}</b>
          <span class="lesson-q">${esc(l.q || '')}</span>
          <span class="lesson-cta">进入第 ${esc(l.id)} 课 <i>→</i></span>
        </span>
      </a>`;
    }).join('');
  }

  /* ── 署名 ────────────────────────────────────────────── */
  const grid = $('#creditGrid'), CR = window.__CREDITS || [];
  if (grid) {
    grid.innerHTML = CR.map(c => `<div class="credit-row"><b>${esc(c.label)}</b>
      <span>${esc(c.artist)} · ${esc(c.license)} · ${c.page ? `<a href="${esc(c.page)}" target="_blank" rel="noopener">来源</a>` : ''}</span></div>`).join('');
    const s = $('.credits summary');
    if (s) s.textContent = `展开查看全部 ${CR.length} 项署名`;
  }

  /* ── 滚动出现 / 进度 / 顶栏 ──────────────────────────── */
  const wall = null;
  const io = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
  $$('.reveal, .kw').forEach(el => io.observe(el));

  document.addEventListener('pointermove', e => {
    const kw = e.target.closest && e.target.closest('.kw');
    if (!kw) return;
    const r = kw.getBoundingClientRect();
    kw.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    kw.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }, { passive: true });

  const bar = $('#bar');
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.width = (max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0) + '%';
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── 快捷键面板 ──────────────────────────────────────── */
  const help = $('#helpModal');
  let lastFocus = null;
  const open = () => { lastFocus = document.activeElement; help.hidden = false; $('#helpClose').focus(); };
  const close = () => { help.hidden = true; if (lastFocus) lastFocus.focus(); };
  $('#helpBtn').addEventListener('click', open);
  $('#helpClose').addEventListener('click', close);
  help.addEventListener('click', e => { if (e.target === help) close(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !help.hidden) return close();
    const ae = document.activeElement;
    if (/^(INPUT|TEXTAREA)$/.test(ae.tagName)) return;
    if (e.key === '?' || (e.key === '/' && e.shiftKey)) { e.preventDefault(); help.hidden ? open() : close(); }
    if (help.hidden && /^[1-9]$/.test(e.key)) {
      const l = COURSE.lessons[+e.key - 1];
      if (l) location.href = 'lessons/' + l.file;
    }
  });
})();
