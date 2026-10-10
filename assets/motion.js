/* ═══════════════════════════════════════════════════════════
   MOTION —— 滚动与交互引擎
   苹果官网的做法归结成三条：
     ① 所有动画由「一个」rAF 循环驱动，不做 N 个独立监听
     ② 滚动位置直接映射成动画进度（scrub），而不是"进入就播一次"
     ③ 缓动曲线统一，绝不用 linear
   ═══════════════════════════════════════════════════════════ */
(function () {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  // 苹果常用的缓动：起步快、收尾极缓
  const EASE = {
    apple: 'cubic-bezier(.32,.72,0,1)',
    out:   'cubic-bezier(.16,1,.3,1)',
    spring:'cubic-bezier(.34,1.4,.64,1)'
  };

  /* ── 单一 rAF 循环 ─────────────────────────────── */
  const subs = new Set();          // 每帧要跑的滚动订阅
  let queued = false, ticking = false;

  function frame() {
    ticking = true;
    const vh = innerHeight, y = scrollY;
    subs.forEach(fn => { try { fn(y, vh); } catch (e) {} });
    if (queued) { queued = false; requestAnimationFrame(frame); }
    else ticking = false;
  }
  function request() {
    if (ticking) { queued = true; return; }
    requestAnimationFrame(frame);
  }
  addEventListener('scroll', request, { passive: true });
  addEventListener('resize', () => { measureAll(); request(); }, { passive: true });

  /* ── 元素进度：0 = 刚进入底部，1 = 完全离开顶部 ── */
  function progressOf(el, y, vh) {
    const r = el.getBoundingClientRect();
    const top = r.top + y;
    const travel = r.height + vh;
    return clamp((y + vh - top) / travel, 0, 1);
  }

  /* ── ① scrub：滚动位置直接驱动 ────────────────── */
  function scrub(sel, fn, opts = {}) {
    const els = typeof sel === 'string' ? document.querySelectorAll(sel) : [sel];
    els.forEach(el => {
      if (!el) return;
      const run = (y, vh) => {
        const p = progressOf(el, y, vh);
        fn(el, p, (p - .5) * 2);   // 第三个参数：-1 → 1，居中为 0
      };
      run(scrollY, innerHeight);
      subs.add(run);
    });
    return () => els.forEach(el => subs.delete(el));
  }

  /* ── ② pin：区块钉住，滚动只在内部推进 ─────────── */
  function pin(sel, fn, opts = {}) {
    const els = typeof sel === 'string' ? document.querySelectorAll(sel) : [sel];
    els.forEach(el => {
      if (!el || reduce) return;
      const run = (y, vh) => {
        const r = el.getBoundingClientRect();
        const total = el.offsetHeight - vh;
        if (total <= 0) { fn(el, 0); return; }
        const p = clamp(-r.top / total, 0, 1);
        fn(el, p);
      };
      run(scrollY, innerHeight);
      subs.add(run);
    });
  }

  /* ── ③ 视差 ───────────────────────────────────── */
  function parallax(sel, speed = .12) {
    scrub(sel, (el, p, c) => {
      el.style.setProperty('--py', (c * speed * 100).toFixed(1) + 'px');
    });
  }

  /* ── ④ 进入视口：一次性揭示 ───────────────────── */
  let io = null;
  function reveal(root = document) {
    const items = root.querySelectorAll('.reveal:not(.is-in)');
    if (!io) {
      io = new IntersectionObserver((ents) => {
        ents.forEach(e => {
          if (!e.isIntersecting) return;
          const el = e.target;
          const d = +(el.dataset.d || 0);
          el.style.transitionDelay = (d * 70) + 'ms';
          el.classList.add('is-in');
          io.unobserve(el);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: .06 });
    }
    items.forEach(el => io.observe(el));
    return items.length;
  }

  /* ── ⑤ 数字增长 ───────────────────────────────── */
  function counter(el, to, dur = 1100) {
    if (reduce) { el.textContent = to; return; }
    const from = 0, t0 = performance.now();
    (function step(t) {
      const k = clamp((t - t0) / dur, 0, 1);
      const e = 1 - Math.pow(1 - k, 3);       // easeOutCubic
      el.textContent = Math.round(from + (to - from) * e);
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  }

  /* ── ⑥ 磁吸按钮：朝光标微微移动 ───────────────── */
  function magnetic(sel, strength = .22) {
    if (reduce || matchMedia('(hover:none)').matches) return;
    document.querySelectorAll(sel).forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
        const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        el.style.transform = `translate(${dx * r.width * strength}px, ${dy * r.height * strength}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  /* ── ⑦ 3D 倾斜 ────────────────────────────────── */
  function tilt(sel, max = 7) {
    if (reduce || matchMedia('(hover:none)').matches) return;
    document.querySelectorAll(sel).forEach(el => {
      const inner = el.querySelector('.tilt-inner') || el;
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - .5;
        const py = (e.clientY - r.top) / r.height - .5;
        inner.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg)`;
      });
      el.addEventListener('pointerleave', () => { inner.style.transform = ''; });
    });
  }

  /* ── ⑧ 光标光晕 ───────────────────────────────── */
  function cursorGlow(sel) {
    if (reduce || matchMedia('(hover:none)').matches) return;
    document.querySelectorAll(sel).forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        el.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
      });
    });
  }

  /* ── ⑨ 顶栏滚动进度条 ─────────────────────────── */
  function progressBar(el) {
    subs.add(() => {
      const h = document.documentElement.scrollHeight - innerHeight;
      el.style.transform = `scaleX(${h > 0 ? clamp(scrollY / h, 0, 1) : 0})`;
    });
  }

  /* ── ⑩ 平滑锚点（自实现，避免 html{scroll-behavior} 与 scrub 冲突）── */
  function anchors() {
    document.addEventListener('click', e => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      const top = t.getBoundingClientRect().top + scrollY - 70;
      smoothTo(top, 900);
      history.replaceState(null, '', id);
    });
  }
  function smoothTo(to, dur = 800) {
    if (reduce) { scrollTo(0, to); return; }
    const from = scrollY, d = to - from, t0 = performance.now();
    (function step(t) {
      const k = clamp((t - t0) / dur, 0, 1);
      const e = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      scrollTo(0, from + d * e);
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  }

  function measureAll() { request(); }

  window.MOTION = { scrub, pin, parallax, reveal, counter, magnetic, tilt,
                    cursorGlow, progressBar, anchors, smoothTo, EASE, reduce, request };
})();
