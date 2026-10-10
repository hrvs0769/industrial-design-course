/* ═══════════════════════════════════════════════════════════
   课程首页 —— 运动 / 进度 / 实验室 / 课程地图
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const IMG = (k, size) => `assets/img/${k}-${size}.webp`;
  const OBJ = window.OBJ || {};
  const COURSE = window.COURSE || { lessons: [] };
  const M = window.MOTION, P = window.PLAY;
  const PROG = P && P.PROGRESS;

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

  /* ── 课程地图（带进度标记）──────────────────────────── */
  const map = $('#courseMap');
  const done = PROG ? PROG.done() : {};
  const lastId = PROG ? PROG.last() : null;

  if (map) {
    map.innerHTML = COURSE.lessons.map((l, i) => {
      const o = OBJ[l.cover] || {};
      const img = o.img || l.cover;
      const isDone = !!done[l.id];
      const isLast = l.id === lastId && !isDone;
      return `<a class="lesson-card reveal${isDone ? ' is-done' : ''}${isLast ? ' is-last' : ''}"
                 data-d="${i % 4}" href="lessons/${esc(l.file)}"
                 style="--accent:${esc(l.accent || '#FF5A1F')}">
        <span class="lesson-frame">
          <img src="${IMG(img, 'card')}" alt="" loading="lazy" decoding="async" style="object-position:${o.pos || '50% 50%'}">
          <span class="lesson-week">W${String(l.week).padStart(2, '0')}</span>
        </span>
        <span class="lesson-body">
          <span class="lesson-tag">${esc(l.tag || '')}</span>
          <b>${l.title}</b>
          <span class="lesson-q">${esc(l.q || '')}</span>
          <span class="lesson-cta">${isDone ? '再看一遍' : (isLast ? '从这里继续' : `进入第 ${esc(l.id)} 课`)} <i>→</i></span>
        </span>
      </a>`;
    }).join('');
  }

  /* ── 进度条 ─────────────────────────────────────────── */
  const progWrap = $('#progWrap');
  if (progWrap && PROG) {
    const n = PROG.count(), total = COURSE.lessons.length || 16;
    if (n > 0) {
      progWrap.hidden = false;
      requestAnimationFrame(() => { $('#progBar').style.width = (n / total * 100).toFixed(1) + '%'; });
      $('#progText').textContent = `已完成 ${n} / ${total} 课`;
      const li = COURSE.lessons.find(l => l.id === lastId);
      if (li) {
        $('#progGo').href = 'lessons/' + li.file;
        $('#progGo').textContent = `继续第 ${li.id} 课 →`;
      } else {
        const nx = COURSE.lessons.find(l => !done[l.id]);
        if (nx) { $('#progGo').href = 'lessons/' + nx.file; $('#progGo').textContent = `继续第 ${nx.id} 课 →`; }
      }
      const hint = $('#progHint');
      if (hint) { hint.hidden = false; hint.textContent = `${n}/${total} 课`; }
    }
    const rb = $('#progReset');
    if (rb) rb.addEventListener('click', () => {
      PROG.reset(); progWrap.hidden = true;
      $$('.lesson-card').forEach(c => c.classList.remove('is-done'));
      const hint = $('#progHint'); if (hint) hint.hidden = true;
    });
  }

  /* ── 署名 ────────────────────────────────────────────── */
  const grid = $('#creditGrid'), CR = window.__CREDITS || [];
  if (grid) {
    grid.innerHTML = CR.map(c => `<div class="credit-row"><b>${esc(c.label)}</b>
      <span>${esc(c.artist)} · ${esc(c.license)} · ${c.page ? `<a href="${esc(c.page)}" target="_blank" rel="noopener">来源</a>` : ''}</span></div>`).join('');
    const s = $('.credits summary');
    if (s) s.textContent = `展开查看全部 ${CR.length} 项署名`;
  }

  /* ── 运动：揭示 / 顶栏 / 进度条 / 封面滚动 ──────────── */
  if (M) {
    M.reveal();
    const bar = $('#bar');
    if (bar) M.progressBar(bar);
    M.magnetic('.btn', .18);
    M.cursorGlow('.has-glow');
    M.anchors();

    // 顶栏变实
    const top = $('#topbar');
    M.scrub('body', () => {
      if (top) top.classList.toggle('is-stuck', scrollY > 40);
    });

    // 封面：标题随滚动轻微上移并淡出，图片带反向抬升
    const ht = $('#heroTitle');
    M.scrub('#hero', (el, p, c) => {
      if (window.innerWidth < 760) return;
      if (ht) { ht.style.transform = `translateY(${-c * 26}px)`; ht.style.opacity = String(Math.max(0, 1 - Math.max(0, c) * 1.5)); }
      if (strip) strip.style.transform = `translateY(${Math.max(0, c) * -34}px) scale(${1 + Math.max(0, c) * .05})`;
    });
  } else {
    // 降级：没有运动引擎也要能看
    const bar = $('#bar');
    window.addEventListener('scroll', () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (bar) bar.style.width = (max > 0 ? Math.min(100, scrollY / max * 100) : 0) + '%';
    }, { passive: true });
  }

  /* ── 实验室 ─────────────────────────────────────────── */
  if (P && P.init) {
    P.init();
    // 开模结果不同 → 轻微反馈
    const lab = document.querySelector('[data-lab="molding"]');
    if (lab) lab.addEventListener('molded', e => {
      const bad = e.detail.bad;
      const stage = $('#moldStage');
      if (!stage) return;
      stage.style.borderColor = bad.length ? 'rgba(255,90,31,.5)' : 'rgba(110,231,215,.5)';
      setTimeout(() => { stage.style.borderColor = ''; }, 1400);
    });
  }

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
