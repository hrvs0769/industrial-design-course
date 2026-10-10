/* ═══════════════════════════════════════════════════════════
   页面外壳 —— 顶栏 / 课程导航 / 章节圆点 / 快捷键 / 弹窗 / 署名
   所有课共用；每课只提供一份数据。
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const B = window.__BASE || '';
  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const app = $('#app');
  if (!app) return;
  const id = app.dataset.lesson;
  const COURSE = window.COURSE || { lessons: [] };
  const lessons = COURSE.lessons || [];
  const idx = lessons.findIndex(l => l.id === id);
  const lesson = lessons[idx] || { id, title: '工业设计', short: '' };
  const data = window.LESSON || {};
  const prev = idx > 0 ? lessons[idx - 1] : null;
  const next = idx >= 0 && idx < lessons.length - 1 ? lessons[idx + 1] : null;

  document.title = `第 ${lesson.id} 课 · ${lesson.short} | ${COURSE.title || '工业设计'}`;
  document.documentElement.style.setProperty('--accent', lesson.accent || '#FF5A1F');

  /* ── 渲染正文 ────────────────────────────────────────── */
  // 偶发：数据没拉下来。绝不留白屏，给一句能操作的提示。
  const loaded = !!(window.LESSON && (window.LESSON.blocks || []).length && window.renderLesson);
  app.innerHTML = loaded ? window.renderLesson(data).join('') : `
    <section class="sec" data-title="加载中断">
      <div class="wrap" style="text-align:center;padding:clamp(60px,18vh,180px) 0">
        <p class="kicker">加载中断</p>
        <h2 class="sec-title" style="margin:0 auto 26px">这一课的内容没能加载出来。</h2>
        <p class="lead" style="max-width:46ch;margin:0 auto 34px">
          多半是网络抖动导致的。刷新一次通常就好了。
        </p>
        <p style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
          <button class="btn btn--primary" type="button" onclick="location.reload()">重新加载</button>
          <a class="btn btn--ghost" href="${B}index.html">返回课程地图</a>
        </p>
      </div>
    </section>`;

  /* ── 顶栏 ────────────────────────────────────────────── */
  const topbar = $('#topbar');
  if (topbar) {
    topbar.innerHTML = `
      <a class="brand" href="${B}index.html">
        <span class="brand-mark" aria-hidden="true"></span>
        <span class="brand-text">工业设计<em>·</em>第 ${esc(lesson.id)} 课</span>
      </a>
      <nav class="dots" id="dots" aria-label="本章导航"></nav>
      <div class="topbar-right">
        <a class="nav-link" href="${B}index.html">课程地图</a>
        ${prev ? `<a class="nav-arrow" href="${esc(prev.file)}" title="上一课：${esc(prev.short)}">←</a>` : ''}
        ${next ? `<a class="nav-arrow" href="${esc(next.file)}" title="下一课：${esc(next.short)}">→</a>` : ''}
        <button class="key-hint" id="helpBtn" type="button" aria-haspopup="dialog">快捷键 <kbd>?</kbd></button>
      </div>`;
  }

  /* ── 章节圆点 / 进度 / 顶栏反色 ──────────────────────── */
  const SECS = $$('main .sec');
  SECS.forEach((s, i) => { s.id = 's' + i; });
  const dotsEl = $('#dots');
  const DOT_BTNS = SECS.map((s, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.dataset.label = s.dataset.title || ('第 ' + (i + 1) + ' 节');
    b.setAttribute('aria-label', b.dataset.label);
    b.addEventListener('click', () => goTo(i));
    dotsEl && dotsEl.appendChild(b);
    return b;
  });
  const wall = $('.wall');
  let activeIdx = -1, ticking = false, trailing = false;
  const bar = $('#bar');

  function goTo(i) {
    i = Math.max(0, Math.min(SECS.length - 1, i));
    SECS[i].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  // 兜底：IntersectionObserver 在快速滚动时会漏掉「刚进入又离开」的瞬时状态，
  // 那会让区块永远停在 opacity:0。这里在每次滚动时把凡是已经进入过视口的补上。
  function sweepReveals() {
    const vh = window.innerHeight;
    const left = $$('.reveal:not(.is-in), .kw:not(.is-in)');
    if (!left.length) return;
    left.forEach(el => {
      if (el.getBoundingClientRect().top < vh - 40) el.classList.add('is-in');
    });
  }
  function onScroll() {
    if (ticking) { trailing = true; return; }
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      sweepReveals();
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.width = (max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0) + '%';
      const mid = window.scrollY + window.innerHeight * 0.36;
      let i = 0;
      SECS.forEach((s, k) => { if (s.offsetTop <= mid) i = k; });
      if (i !== activeIdx) {
        activeIdx = i;
        DOT_BTNS.forEach((d, k) => d.classList.toggle('is-active', k === activeIdx));
      }
      if (wall && topbar) {
        const r = wall.getBoundingClientRect();
        topbar.classList.toggle('is-light', r.top <= 10 && r.bottom >= 40);
      }
      // 快速滚动时最后几次事件会被合并丢掉，补跑一次保证收尾状态正确
      if (trailing) { trailing = false; onScroll(); }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    onScroll();
    window.LABS.relayoutTimeline();
  });

  /* ── 滚动出现 ────────────────────────────────────────── */
  const io = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  $$('.reveal, .kw').forEach(el => io.observe(el));

  document.addEventListener('pointermove', e => {
    const kw = e.target.closest && e.target.closest('.kw');
    if (!kw) return;
    const r = kw.getBoundingClientRect();
    kw.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    kw.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }, { passive: true });

  /* ── 弹窗（全站共用，外壳生成） ──────────────────────── */
  const shell = $('#shell');
  if (shell) {
    shell.innerHTML = `
    <section class="credits" aria-labelledby="creditsTitle">
      <div class="wrap">
        <h3 id="creditsTitle">图片来源与许可</h3>
        <p>本课程使用的实物照片来自 <b>Wikimedia Commons</b>，依据其原始许可协议（Public domain / CC0 / CC BY / CC BY-SA）使用。
           以下列出每张图片的作者、协议与来源 —— <b>用别人的东西要署名，这是设计行业最基本的习惯。</b></p>
        <details><summary>展开查看全部署名</summary><div class="credit-grid" id="creditGrid"></div></details>
      </div>
    </section>
    <footer class="site-foot">
      <div class="wrap foot-inner">
        <p>${esc(COURSE.title || '工业设计')} · 第 ${esc(lesson.id)} 课</p>
        <p class="foot-tip"><a href="${B}index.html">← 返回课程地图</a> · <kbd>→</kbd> 下一节</p>
      </div>
    </footer>
    <div class="modal" id="helpModal" role="dialog" aria-modal="true" hidden>
      <div class="modal-card">
        <h3>课堂快捷键</h3>
        <ul class="keys">
          <li><kbd>→</kbd><kbd>空格</kbd><kbd>PgDn</kbd><span>下一节</span></li>
          <li><kbd>←</kbd><kbd>PgUp</kbd><span>上一节</span></li>
          <li><kbd>1</kbd>–<kbd>9</kbd><span>跳到第 N 节</span></li>
          <li><kbd>Home</kbd> / <kbd>End</kbd><span>本节开头 / 结尾</span></li>
          <li><kbd>R</kbd><span>随机看一件经典物件</span></li>
          <li><kbd>T</kbd><span>开始 / 暂停计时</span></li>
          <li><kbd>N</kbd> / <kbd>P</kbd><span>下一课 / 上一课</span></li>
          <li><kbd>?</kbd><span>打开 / 关闭本面板</span></li>
        </ul>
        <button class="btn btn--primary" type="button" id="helpClose">知道了</button>
      </div>
    </div>
    <div class="modal obj-modal" id="objModal" role="dialog" aria-modal="true" hidden>
      <div class="modal-card">
        <button class="modal-x" type="button" id="objClose" aria-label="关闭">✕</button>
        <div class="obj-visual" id="objVisual"></div>
        <div class="obj-label">
          <p class="obj-label-year" id="objYear"></p>
          <h3 id="objTitle"></h3>
          <p class="obj-label-by" id="objBy"></p>
          <p class="obj-label-body" id="objBody"></p>
          <div class="obj-lesson"><b>它教会我们：</b><span id="objLesson"></span></div>
          <div class="obj-draft" id="objDraft" hidden></div>
        </div>
      </div>
    </div>`;
  }

  // 署名
  const grid = $('#creditGrid'), CR = window.__CREDITS || [];
  if (grid) {
    grid.innerHTML = CR.map(c => `<div class="credit-row"><b>${esc(c.label)}</b>
      <span>${esc(c.artist)} · ${esc(c.license)} · ${c.page ? `<a href="${esc(c.page)}" target="_blank" rel="noopener">来源</a>` : ''}</span></div>`).join('');
    const s = $('.credits summary');
    if (s) s.textContent = `展开查看全部 ${CR.length} 项署名`;
  }

  /* ── 弹窗控制 ────────────────────────────────────────── */
  const helpModal = $('#helpModal'), objModal = $('#objModal');
  let lastFocus = null;
  window.__openModal = m => { lastFocus = document.activeElement; m.hidden = false; const f = m.querySelector('button'); if (f) f.focus(); };
  window.__closeModal = m => { m.hidden = true; if (lastFocus) lastFocus.focus(); };
  const closeModal = window.__closeModal;

  $('#helpBtn') && $('#helpBtn').addEventListener('click', () => window.__openModal(helpModal));
  $('#helpClose') && $('#helpClose').addEventListener('click', () => closeModal(helpModal));
  $('#objClose') && $('#objClose').addEventListener('click', () => closeModal(objModal));
  [helpModal, objModal].forEach(m => m && m.addEventListener('click', e => { if (e.target === m) closeModal(m); }));

  $$('[data-act="random"]').forEach(b => b.addEventListener('click', () => {
    const ids = Object.keys(window.OBJ || {});
    if (ids.length && window.openObject) window.openObject(ids[Math.floor(Math.random() * ids.length)]);
  }));

  /* ── 快捷键 ──────────────────────────────────────────── */
  document.addEventListener('keydown', e => {
    const ae = document.activeElement;
    if (e.key === 'Escape') {
      if (objModal && !objModal.hidden) return closeModal(objModal);
      if (helpModal && !helpModal.hidden) return closeModal(helpModal);
      return;
    }
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName)) return;
    if (e.key === ' ' && /^(BUTTON|A|SUMMARY)$/.test(ae.tagName)) return;
    if (e.key === '?' || (e.key === '/' && e.shiftKey)) {
      e.preventDefault();
      helpModal.hidden ? window.__openModal(helpModal) : closeModal(helpModal);
      return;
    }
    if ((objModal && !objModal.hidden) || (helpModal && !helpModal.hidden)) return;

    switch (e.key) {
      case 'ArrowRight': case 'PageDown': case ' ':
        e.preventDefault(); goTo(activeIdx + 1); break;
      case 'ArrowLeft': case 'PageUp':
        e.preventDefault(); goTo(activeIdx - 1); break;
      case 'Home': e.preventDefault(); goTo(0); break;
      case 'End': e.preventDefault(); goTo(SECS.length - 1); break;
      case 'r': case 'R': {
        const ids = Object.keys(window.OBJ || {});
        if (ids.length && window.openObject) window.openObject(ids[Math.floor(Math.random() * ids.length)]);
        break;
      }
      case 't': case 'T': if (window.__timerToggle) window.__timerToggle(); break;
      case 'n': case 'N': if (next) location.href = next.file; break;
      case 'p': case 'P': if (prev) location.href = prev.file; break;
      default:
        if (/^[1-9]$/.test(e.key)) { e.preventDefault(); goTo(+e.key); }
    }
  });

  /* ── 互动（必须放在弹窗生成之后：objectModal 依赖 #objModal 才能绑定）── */
  window.LABS.init();
  $$('.reveal, .kw').forEach(el => { if (!el.classList.contains('is-in')) io.observe(el); });

  onScroll();
  window.addEventListener('load', onScroll);
})();
