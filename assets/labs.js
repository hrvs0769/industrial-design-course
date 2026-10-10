/* ═══════════════════════════════════════════════════════════
   互动组件库 —— 把渲染出来的区块接上行为
   （内容全部来自当前课的 window.LESSON）
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const IMG = (k, size) => `${window.__BASE || ''}assets/img/${k}-${size}.webp`;
  const PAPER = '#F4F1EA', HOT = '#FF5A1F', MINT = '#6EE7D7', VIOLET = '#A78BFA';
  const OBJ = window.OBJ || {};

  const blk = t => ((window.LESSON || {}).blocks || []).find(b => b.type === t);

  window.LABS = {};

  /* ── 封面橱窗 ────────────────────────────────────────── */
  window.LABS.vitrine = function () {
    const el = $('#vitrine');
    if (!el) return;
    const hero = blk('hero') || {};
    const list = (hero.vitrine || []).filter(k => OBJ[k]);
    if (!list.length) return;
    const nav = $('#vitrineNav');

    el.innerHTML = list.map((k, i) => {
      const o = OBJ[k];
      return `<img src="${IMG(k, 'full')}" alt="${esc(o.name)}" ${i ? 'loading="lazy" ' : ''}decoding="async"
        class="${i === 0 ? 'is-on' : ''}" style="object-position:${o.pos || '50% 50%'}">`;
    }).join('') + '<div class="vitrine-glass"></div>' +
      '<div class="vitrine-tag"><b id="vTagName"></b><span id="vTagMeta"></span></div>';

    nav.innerHTML = list.map((k, i) =>
      `<button type="button" role="tab" data-i="${i}" aria-label="${esc(OBJ[k].name)}"></button>`).join('');

    const imgs = $$('img', el), btns = $$('button', nav);
    const name = $('#vTagName'), meta = $('#vTagMeta');
    let idx = 0, timer = null;

    const show = i => {
      idx = (i + list.length) % list.length;
      imgs.forEach((im, k) => im.classList.toggle('is-on', k === idx));
      btns.forEach((b, k) => b.classList.toggle('is-on', k === idx));
      const o = OBJ[list[idx]];
      name.textContent = o.name;
      meta.textContent = o.year + ' · ' + o.by;
    };
    const stop = () => { if (timer) clearInterval(timer); timer = null; };
    const start = () => { stop(); timer = setInterval(() => show(idx + 1), 5200); };

    btns.forEach(b => b.addEventListener('click', () => { show(+b.dataset.i); start(); }));
    show(0); start();
    new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? start() : stop()),
      { threshold: 0.15 }).observe(el);
  };

  /* ── 设计光谱 ────────────────────────────────────────── */
  window.LABS.spectrum = function () {
    const slider = $('#spectrumSlider');
    if (!slider) return;
    const out = $('#spectrumValue');
    const nodes = $$('.sp-item');
    const sync = () => {
      const v = +slider.value;
      out.textContent = v;
      let best = 0, bd = 1e9;
      nodes.forEach((n, i) => { const d = Math.abs(+n.dataset.x - v); if (d < bd) { bd = d; best = i; } });
      nodes.forEach((n, i) => n.classList.toggle('is-near', i === best && bd < 14));
      slider.style.backgroundImage =
        `linear-gradient(90deg,${MINT} 0%,rgba(244,241,234,.22) ${v}%,rgba(244,241,234,.22) ${v}%,${HOT} 100%)`;
    };
    slider.addEventListener('input', sync);
    sync();
  };

  /* ── 时间轴 ──────────────────────────────────────────── */
  let tlActive = -1, tlFill = null, tlNodes = null;
  window.LABS.timeline = function () {
    const track = $('#tlTrack');
    if (!track) return;
    const detail = $('#tlDetail');
    const nodes = (blk('timeline') || {}).nodes || [];
    tlFill = $('#tlRailFill');
    tlNodes = $$('.tl-node', track);
    tlActive = -1;

    const set = i => {
      if (i === tlActive) return;
      tlActive = i;
      tlNodes.forEach((n, k) => n.classList.toggle('is-active', k === i));
      const n = nodes[i];
      if (!n) return;
      detail.innerHTML = `
        ${n.img ? `<div class="tl-shot"><img src="${IMG(n.img, 'card')}" alt="${esc(n.t)}" loading="lazy" decoding="async"></div>` : ''}
        <div>
          <p class="tl-when">${esc(n.when || n.y)}</p>
          <h3>${esc(n.t)}</h3>
          <p>${n.p}</p>
          ${n.key ? `<span class="tl-key">${esc(n.key)}</span>` : ''}
        </div>`;
      detail.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }],
        { duration: 420, easing: 'cubic-bezier(.16,1,.3,1)' });
      if (tlFill && tlNodes[i]) tlFill.style.width = (tlNodes[i].offsetLeft + 7) + 'px';
    };
    tlNodes.forEach(n => n.addEventListener('click', () => set(+n.dataset.i)));
    new IntersectionObserver((es, obs) => {
      es.forEach(e => { if (e.isIntersecting) { set(0); obs.disconnect(); } });
    }, { threshold: 0.25 }).observe(track);
  };
  window.LABS.relayoutTimeline = function () {
    if (tlActive >= 0 && tlFill && tlNodes && tlNodes[tlActive])
      tlFill.style.width = (tlNodes[tlActive].offsetLeft + 7) + 'px';
  };

  /* ── 白墙展厅 ────────────────────────────────────────── */
  window.LABS.gallery = function () {
    const g = $('#gallery');
    if (!g) return;
    const ids = (g.dataset.items || '').split(',').filter(Boolean);
    const META = window.__IMGMETA || {};
    const ar = k => Math.min(1.55, Math.max(0.68, (META[k] && META[k].ar) || 0.8));

    g.innerHTML = ids.map((id, i) => {
      const o = OBJ[id];
      if (!o) return '';
      return `<button class="obj-card" type="button" data-obj="${esc(id)}" aria-label="${esc(o.name)}">
        <span class="obj-frame" style="--ar:${ar(o.img)}">
          <span class="obj-badge">${esc(o.year)}</span>
          <img src="${IMG(o.img, 'card')}" alt="${esc(o.name)}" loading="lazy" decoding="async" style="object-position:${o.pos || '50% 50%'}">
          <span class="obj-mark">↗</span>
        </span>
        <span class="obj-meta"><b>${esc(o.name)}</b><span>${esc(o.by)}</span></span>
      </button>`;
    }).join('');
  };

  /* ── 物件弹窗（全站共用） ────────────────────────────── */
  window.LABS.objectModal = function () {
    const modal = $('#objModal');
    if (!modal) return;
    const visual = $('#objVisual'), year = $('#objYear'), title = $('#objTitle'),
          by = $('#objBy'), body = $('#objBody'), lesson = $('#objLesson'), draft = $('#objDraft');

    window.openObject = function (id) {
      const o = OBJ[id];
      if (!o) return;
      visual.innerHTML = `<img class="obj-photo" src="${IMG(o.img, 'full')}" alt="${esc(o.name)}" decoding="async">`;
      year.textContent = o.year;
      title.textContent = o.name;
      by.textContent = o.by;
      body.innerHTML = String(o.body).split(/\n\s*\n/).map(t => `<p>${esc(t)}</p>`).join('');
      lesson.textContent = o.lesson;
      if (o.draft) {
        draft.hidden = false;
        draft.innerHTML = `<img src="${IMG(o.draft, 'card')}" alt="设计过程稿" loading="lazy">` +
          `<p><b>它从这张图开始。</b><br>${esc(o.draftNote)}</p>`;
      } else { draft.hidden = true; draft.innerHTML = ''; }
      window.__openModal(modal);
    };

    document.addEventListener('click', e => {
      const t = e.target.closest('[data-obj]');
      if (t) window.openObject(t.dataset.obj);
    });
  };

  /* ── 流程六步 ────────────────────────────────────────── */
  window.LABS.steps = function () {
    const wrap = $('#flow');
    if (!wrap) return;
    const steps = (blk('steps') || {}).steps || [];
    wrap.innerHTML = steps.map((f, i) => `
      <button class="step" type="button" data-i="${i}">
        <span class="step-n">STEP ${String(i + 1).padStart(2, '0')}</span>
        <h4>${esc(f.t)}${f.en ? `<br><span style="font-family:var(--mono);font-size:10.5px;color:var(--faint);letter-spacing:.1em">${esc(f.en)}</span>` : ''}</h4>
        <p>${esc(f.q || '')}</p>
        <span class="step-bar"><i></i></span>
      </button>`).join('') + '<div class="flow-detail" id="flowDetail"></div>';

    const el = $$('.step', wrap), detail = $('#flowDetail');
    let active = -1;
    const set = i => {
      if (i === active) return;
      active = i;
      el.forEach((s, k) => s.classList.toggle('is-active', k === i));
      const f = steps[i];
      detail.innerHTML = `<h3>${esc(f.t)}${f.en ? ' · ' + esc(f.en) : ''}</h3>
        ${f.q ? `<p class="fd-q">${esc(f.q)}</p>` : ''}
        <p>${f.p}</p>
        ${f.tools ? `<div class="fd-tools">${f.tools.map(t => `<span>${esc(t)}</span>`).join('')}</div>` : ''}`;
    };
    el.forEach(s => s.addEventListener('click', () => set(+s.dataset.i)));
    if (steps.length) set(0);
  };

  /* ── 课堂动手：任务 / 限制 / 计时 / 画板 / 投票 ──────── */
  window.LABS.lab = function () {
    const box = $('#briefText');
    if (!box) return;
    const b = blk('lab') || {};
    const list = $('#briefList');

    $('#drawBriefBtn').addEventListener('click', () => {
      const u = pick(b.users || []), t = pick(b.things || []), g = pick(b.goals || []);
      // 用 innerHTML：模板是老师写的，允许 <br> 换行（内容与 render.js 同级信任）
      box.innerHTML = b.template
        ? b.template.replace(/\{谁\}/g, u).replace(/\{什么\}/g, t).replace(/\{目标\}/g, g)
        : `为【${u}】设计一个【${t}】，${g}。`;
      list.innerHTML = '';
      box.animate([{ opacity: .2, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }],
        { duration: 380, easing: 'cubic-bezier(.16,1,.3,1)' });
    });

    $('#addConstraintBtn').addEventListener('click', () => {
      const notes = $$('li', list);
      if (notes.length >= 3) {
        if (notes.length === 3) {
          const li = document.createElement('li');
          li.style.color = 'var(--hot)';
          li.textContent = b.constraintEnd || '限制够了。三条限制，就是真实世界给你的全部余地 —— 开始画吧。';
          list.appendChild(li);
        }
        return;
      }
      let c, g = 0;
      do { c = pick(b.constraints || ['成本不能超过 15 元']); g++; }
      while (list.textContent.includes(c) && g < 40);
      const li = document.createElement('li');
      li.textContent = c;
      list.appendChild(li);
    });

    // 计时器
    const tBox = $('#timerBox'), tText = $('#timerText'), tToggle = $('#timerToggle');
    let total = 300, left = 300, tid = null, end = 0, running = false;
    const fmt = s => {
      s = Math.max(0, Math.round(s));
      return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
    };
    const render = () => {
      tText.textContent = fmt(left);
      tBox.classList.toggle('is-run', running);
      tBox.classList.toggle('is-warn', running && left <= 10);
      document.title = running ? `${fmt(left)} · ${(window.LESSON || {}).short || '工业设计'}`
        : window.__BASE_TITLE;
    };
    const stop = () => { running = false; clearInterval(tid); tid = null; tToggle.textContent = '开始'; render(); };
    const start = () => {
      if (left <= 0) left = total;
      end = Date.now() + left * 1000; running = true; tToggle.textContent = '暂停';
      clearInterval(tid);
      tid = setInterval(() => {
        left = (end - Date.now()) / 1000;
        if (left <= 0) {
          left = 0; render(); stop();
          tBox.animate([{ transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(255,90,31,.6)' },
            { transform: 'scale(1.05)', boxShadow: '0 0 0 14px rgba(255,90,31,0)' },
            { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(255,90,31,0)' }],
            { duration: 900, iterations: 3, easing: 'ease-out' });
          tText.textContent = '停笔！';
          return;
        }
        render();
      }, 200);
      render();
    };
    window.__timerToggle = () => running ? stop() : start();
    tToggle.addEventListener('click', window.__timerToggle);
    $('#timerReset').addEventListener('click', () => { stop(); left = total; render(); });
    $$('.chip').forEach(c => c.addEventListener('click', () => {
      $$('.chip').forEach(x => x.classList.remove('is-active'));
      c.classList.add('is-active');
      stop(); total = +c.dataset.sec; left = total; render();
    }));
    window.__BASE_TITLE = document.title;
    render();

    // 画板
    const canvas = $('#sketch'), ctx = canvas.getContext('2d');
    const CW = 1000, CH = 640;
    const COLORS = [PAPER, HOT, MINT, VIOLET, 'rgba(244,241,234,.45)'];
    let color = COLORS[0], tool = 'pen', drawing = false, lx = 0, ly = 0, inked = false;

    const clear = () => {
      ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = '#101012'; ctx.fillRect(0, 0, canvas.width, canvas.height); ctx.restore();
      ctx.save(); ctx.strokeStyle = 'rgba(244,241,234,.055)'; ctx.lineWidth = 1;
      for (let x = 0; x <= CW; x += 50) { ctx.beginPath(); ctx.moveTo(x + .5, 0); ctx.lineTo(x + .5, CH); ctx.stroke(); }
      for (let y = 0; y <= CH; y += 50) { ctx.beginPath(); ctx.moveTo(0, y + .5); ctx.lineTo(CW, y + .5); ctx.stroke(); }
      ctx.restore(); inked = false;
    };
    (function setup() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = CW * dpr; canvas.height = CH * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineJoin = 'round'; ctx.lineCap = 'round';
      clear();
      ctx.save();
      ctx.fillStyle = 'rgba(244,241,234,.22)';
      ctx.font = '600 26px "PingFang SC", system-ui, sans-serif';
      ctx.fillText(b.canvasHint || '在这里画。', 60, 84);
      ctx.font = '400 16px "PingFang SC", system-ui, sans-serif';
      ctx.fillStyle = 'rgba(244,241,234,.15)';
      ctx.fillText(b.canvasHint2 || '手比脑子快 · 别追求好看', 60, 118);
      ctx.restore();
    })();

    const pos = e => {
      const r = canvas.getBoundingClientRect();
      return { x: (e.clientX - r.left) / r.width * CW, y: (e.clientY - r.top) / r.height * CH };
    };
    const stroke = (a, c) => {
      ctx.strokeStyle = tool === 'eraser' ? '#101012' : color;
      ctx.lineWidth = tool === 'marker' ? 22 : tool === 'eraser' ? 30 : 3.2;
      ctx.globalAlpha = tool === 'marker' ? .55 : 1;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(c.x, c.y); ctx.stroke();
      ctx.globalAlpha = 1;
    };
    canvas.addEventListener('pointerdown', e => {
      drawing = true; inked = true; canvas.setPointerCapture(e.pointerId);
      const p = pos(e); lx = p.x; ly = p.y; stroke({ x: p.x - .01, y: p.y - .01 }, p);
    });
    canvas.addEventListener('pointermove', e => {
      if (!drawing) return;
      const p = pos(e); stroke({ x: lx, y: ly }, p); lx = p.x; ly = p.y;
    });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(ev => canvas.addEventListener(ev, () => { drawing = false; }));

    const dots = $('#colorDots');
    COLORS.forEach((c, i) => {
      const btn = document.createElement('button');
      btn.type = 'button'; btn.style.background = c; btn.setAttribute('aria-label', '画笔颜色 ' + (i + 1));
      if (!i) btn.classList.add('is-active');
      btn.addEventListener('click', () => {
        color = c; if (tool === 'eraser') setTool('pen');
        $$('button', dots).forEach(x => x.classList.remove('is-active'));
        btn.classList.add('is-active');
      });
      dots.appendChild(btn);
    });
    function setTool(t) {
      tool = t;
      $$('.tool[data-tool]').forEach(x => x.classList.toggle('is-active', x.dataset.tool === t));
    }
    $$('.tool[data-tool]').forEach(x => x.addEventListener('click', () => setTool(x.dataset.tool)));
    $('#clearCanvas').addEventListener('click', clear);
    $('#saveCanvas').addEventListener('click', () => {
      const out = document.createElement('canvas');
      out.width = CW; out.height = CH;
      const o = out.getContext('2d');
      o.fillStyle = '#101012'; o.fillRect(0, 0, CW, CH);
      o.drawImage(canvas, 0, 0, CW, CH);
      const a = document.createElement('a');
      a.download = '草图-' + new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-') + '.png';
      a.href = out.toDataURL('image/png'); a.click();
    });

    // 举手表决
    const vc = $('#voteCount');
    if (vc) {
      let votes = 0;
      $('#voteUp').addEventListener('click', () => {
        votes++; vc.textContent = votes;
        vc.classList.remove('bump'); void vc.offsetWidth; vc.classList.add('bump');
      });
      $('#voteReset').addEventListener('click', () => { votes = 0; vc.textContent = '0'; });
    }
  };

  /* ── 小测 ────────────────────────────────────────────── */
  window.LABS.quiz = function () {
    const el = $('#quiz');
    if (!el) return;
    const qs = (blk('quiz') || {}).questions || [];
    const score = $('#quizScore');
    let answered = 0, correct = 0;

    el.innerHTML = qs.map((q, i) => `
      <div class="q" data-i="${i}">
        <div class="q-head"><span class="q-n">Q${i + 1}</span><p class="q-text">${esc(q.q)}</p></div>
        <div class="q-opts">${q.o.map((o, k) => `<button class="opt" type="button" data-k="${k}">
          <span class="opt-key">${'ABCDEFG'[k]}</span><span>${esc(o)}</span></button>`).join('')}</div>
      </div>`).join('');

    el.addEventListener('click', e => {
      const btn = e.target.closest('.opt');
      if (!btn || btn.disabled) return;
      const card = btn.closest('.q');
      const q = qs[+card.dataset.i];
      const opts = $$('.opt', card);
      opts.forEach(o => { o.disabled = true; });
      opts[q.a].classList.add('is-right');
      if (+btn.dataset.k !== q.a) btn.classList.add('is-wrong'); else correct++;
      card.insertAdjacentHTML('beforeend', `<p class="q-why">${q.why}</p>`);
      answered++;
      score.textContent = `已答 ${answered} / ${qs.length}` +
        (answered === qs.length ? `  ·  答对 ${correct} 道。答错的那几道，才是今天真正学到的东西。` : '');
    });
  };

  /* ── 数据滚动计数 ────────────────────────────────────── */
  window.LABS.stats = function () {
    const nums = $$('.stat-num');
    if (!nums.length) return;
    const obs = new IntersectionObserver((es, o) => {
      es.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target; o.unobserve(el);
        const to = +el.dataset.to, suf = el.dataset.suffix || '', t0 = performance.now();
        (function tick(now) {
          const k = Math.min(1, (now - t0) / 1100);
          el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))) + suf;
          if (k < 1) requestAnimationFrame(tick);
        })(t0);
      });
    }, { threshold: 0.6 });
    nums.forEach(n => obs.observe(n));
  };

  /* ── 看图识物 ────────────────────────────────────────── */
  window.LABS.detailQuiz = function () {
    const wrap = $('.dq-grid');
    if (!wrap) return;
    wrap.addEventListener('click', e => {
      const c = e.target.closest('.dq');
      if (c) c.classList.toggle('is-open');
    });
  };

  /* ── 初始化全部 ──────────────────────────────────────── */
  window.LABS.init = function () {
    ['vitrine', 'spectrum', 'timeline', 'gallery', 'objectModal', 'steps', 'detailQuiz', 'lab', 'quiz', 'stats']
      .forEach(k => { try { window.LABS[k](); } catch (err) { console.warn('lab failed:', k, err); } });
  };
})();
