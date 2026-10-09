/* ═══════════════════════════════════════════════════════════
   区块渲染引擎
   每课的内容是一份数据；这里把它变成页面。
   老师改文案只改 assets/data/*.js，不用碰这个文件。
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const esc = s => String(s == null ? '' : s)
    .replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const IMG = (k, size) => `${window.__BASE || ''}assets/img/${k}-${size}.webp`;
  const META = window.__IMGMETA || {};
  const OBJ = window.OBJ || {};

  // 照片真实比例 → 取景框比例（夹在可读区间内）
  const frameAR = k => Math.min(1.55, Math.max(0.68, (META[k] && META[k].ar) || 0.8));

  // 内容字段允许老师写 <b> <br> <em>，所以正文不转义；属性值一律转义。
  const R = (s, d) => (s || d || '').replace(/\{img:([a-z0-9-]+)\}/g, (m, k) => IMG(k, 'full'));
  const obj = id => OBJ[id] || { id, name: id, year: '', by: '', img: id, pos: '50% 50%' };

  /* ── 各区块 ─────────────────────────────────────────── */

  const B = {};

  // 封面
  B.hero = b => {
    const vit = (b.vitrine || []).filter(k => OBJ[k]);
    const lines = (b.titleLines || []).map((l, i) =>
      `<span class="line reveal" data-d="${i + 1}">${l}</span>`).join('');
    return `<section class="sec hero${vit.length ? '' : ' hero--plain'}" data-title="封面">
      <div class="wrap hero-grid">
        <div class="hero-copy">
          ${b.kicker ? `<p class="kicker reveal">${b.kicker}</p>` : ''}
          <h1 class="hero-title">${lines}</h1>
          ${b.sub ? `<p class="hero-sub reveal" data-d="${(b.titleLines || []).length + 1}">${b.sub}</p>` : ''}
          ${b.cta ? `<div class="hero-cta reveal" data-d="5">
            ${(b.cta || []).map((c, i) => c.href
              ? `<a class="btn ${i ? 'btn--ghost' : 'btn--primary'}" href="${esc(c.href)}">${c.text}</a>`
              : `<button class="btn ${i ? 'btn--ghost' : 'btn--primary'}" type="button" data-act="${esc(c.act)}">${c.text}</button>`).join('')}
          </div>` : ''}
          ${b.meta ? `<div class="hero-meta reveal" data-d="6">${b.meta.map(m => `<span>${m}</span>`).join('<span class="sep"></span>')}</div>` : ''}
        </div>
        ${vit.length ? `<div class="hero-viz reveal" data-d="3">
          <div class="vitrine" id="vitrine" aria-live="polite"></div>
          <div class="vitrine-nav" id="vitrineNav" role="tablist" aria-label="橱窗展品"></div>
        </div>` : ''}
      </div>
      <div class="scroll-cue" aria-hidden="true"><span></span>向下滚动</div>
    </section>`;
  };

  // 正文（左文右卡 / 纯文）
  B.prose = b => {
    const cards = b.cards || [];
    const text = `
      ${b.lead ? `<p class="lead reveal">${R(b.lead)}</p>` : ''}
      ${(b.paras || []).map(p => `<p class="reveal">${R(p)}</p>`).join('')}
      ${b.quote ? `<blockquote class="quote reveal">${R(b.quote)}</blockquote>` : ''}
      ${b.aside ? `<aside class="aside reveal"><h4>${b.aside.h}</h4><p>${R(b.aside.p)}</p></aside>` : ''}
      ${b.tail ? `<p class="muted reveal">${R(b.tail)}</p>` : ''}`;
    const cardHtml = cards.map((c, i) => `
      <article class="kw reveal" data-d="${i + 1}">
        <div class="kw-num">${esc(c.n || String(i + 1).padStart(2, '0'))}</div>
        <h3>${c.h}${c.en ? ` <span>${esc(c.en)}</span>` : ''}</h3>
        <p>${R(c.p)}</p>
        ${c.v != null ? `<div class="kw-meter"><i style="--v:${+c.v}%"></i></div>` : ''}
      </article>`).join('');
    return `<section class="sec${b.alt ? ' sec--alt' : ''}" data-title="${esc(b.nav || b.title || '正文')}">
      <div class="wrap">
        ${b.kicker ? `<p class="kicker reveal">${b.kicker}</p>` : ''}
        ${b.title ? `<h2 class="sec-title reveal">${R(b.title)}</h2>` : ''}
        <div class="${cards.length ? 'two-col' : 'prose-single'}">
          <div class="col-text">${text}</div>
          ${cards.length ? `<div class="col-cards">${cardHtml}</div>` : ''}
        </div>
      </div>
    </section>`;
  };

  // 独立四卡网格
  B.cards = b => `<section class="sec${b.alt ? ' sec--alt' : ''}" data-title="${esc(b.nav || b.title || '要点')}">
    <div class="wrap">
      ${b.kicker ? `<p class="kicker reveal">${b.kicker}</p>` : ''}
      ${b.title ? `<h2 class="sec-title reveal">${R(b.title)}</h2>` : ''}
      ${b.lead ? `<p class="lead narrow reveal">${R(b.lead)}</p>` : ''}
      <div class="card-grid">${(b.items || []).map((c, i) => `
        <article class="kw reveal" data-d="${i % 4}">
          <div class="kw-num">${esc(c.n || String(i + 1).padStart(2, '0'))}</div>
          <h3>${c.h}${c.en ? ` <span>${esc(c.en)}</span>` : ''}</h3>
          <p>${R(c.p)}</p>
          ${c.v != null ? `<div class="kw-meter"><i style="--v:${+c.v}%"></i></div>` : ''}
        </article>`).join('')}</div>
      ${b.tail ? `<div class="takeaway reveal">${R(b.tail)}</div>` : ''}
    </div>
  </section>`;

  // 单图 / 图组
  B.figures = b => `<section class="sec${b.alt ? ' sec--alt' : ''}" data-title="${esc(b.nav || b.title || '看图')}">
    <div class="wrap">
      ${b.kicker ? `<p class="kicker reveal">${b.kicker}</p>` : ''}
      ${b.title ? `<h2 class="sec-title reveal">${R(b.title)}</h2>` : ''}
      ${b.lead ? `<p class="lead narrow reveal">${R(b.lead)}</p>` : ''}
      <div class="fig-grid fig-grid--${(b.items || []).length > 2 ? 'many' : 'few'}">
        ${(b.items || []).map((f, i) => `
          <figure class="fig reveal" data-d="${i % 4}">
            <div class="fig-frame" style="--ar:${f.ar || 1.4}">
              <img src="${IMG(f.img, 'card')}" alt="${esc(f.alt || '')}" loading="lazy" decoding="async"
                   style="object-position:${f.pos || '50% 50%'}">
            </div>
            ${f.cap ? `<figcaption>${R(f.cap)}</figcaption>` : ''}
          </figure>`).join('')}
      </div>
      ${b.note ? `<div class="takeaway reveal">${R(b.note)}</div>` : ''}
    </div>
  </section>`;

  // 设计光谱
  B.spectrum = b => `<section class="sec${b.alt ? ' sec--alt' : ''}" data-title="${esc(b.nav || '互动')}">
    <div class="wrap">
      ${b.kicker ? `<p class="kicker reveal">${b.kicker}</p>` : ''}
      <h2 class="sec-title reveal">${R(b.title)}</h2>
      ${b.lead ? `<p class="lead narrow reveal">${R(b.lead)}</p>` : ''}
      <div class="spectrum reveal">
        <div class="spectrum-labels">
          <span>${b.left || '纯功能'}<em>${b.leftSub || ''}</em></span>
          <span class="mid">${b.mid || '工具 ↔ 作品'}</span>
          <span>${b.right || '纯表达'}<em>${b.rightSub || ''}</em></span>
        </div>
        <div class="spectrum-track">
          <div class="spectrum-axis"></div>
          <div class="spectrum-ticks" aria-hidden="true"><i style="left:0%"></i><i style="left:25%"></i><i style="left:50%"></i><i style="left:75%"></i><i style="left:100%"></i></div>
          <div class="spectrum-items" id="spectrumItems">${(b.items || []).map(it => {
            const o = obj(it.id);
            return `<div class="sp-item" data-x="${+it.x}" style="--x:${+it.x}%">
              <span class="sp-shot"><img src="${IMG(o.img, 'card')}" alt="${esc(o.name)}" loading="lazy" decoding="async" style="object-position:${o.pos || '50% 50%'}"></span>
              <b>${esc(it.label || o.name.replace(/（.*?）/, ''))}</b><span>${esc(it.sub || o.year)}</span>
            </div>`;
          }).join('')}</div>
        </div>
        <div class="spectrum-range">
          <input id="spectrumSlider" type="range" min="0" max="100" value="${b.start != null ? b.start : 40}" aria-label="设计光谱">
          <div class="spectrum-readout"><strong id="spectrumValue">${b.start != null ? b.start : 40}</strong><span>功能 ← → 表达</span></div>
        </div>
      </div>
      ${b.takeaway ? `<div class="takeaway reveal">${R(b.takeaway)}</div>` : ''}
    </div>
  </section>`;

  // 时间轴
  B.timeline = b => `<section class="sec${b.alt ? ' sec--alt' : ''}" data-title="${esc(b.nav || '时间轴')}">
    <div class="wrap">
      ${b.kicker ? `<p class="kicker reveal">${b.kicker}</p>` : ''}
      <h2 class="sec-title reveal">${R(b.title)}</h2>
      ${b.lead ? `<p class="lead narrow reveal">${R(b.lead)}</p>` : ''}
      <div class="timeline reveal">
        <div class="tl-rail"><span id="tlRailFill"></span></div>
        <div class="tl-track" id="tlTrack">${(b.nodes || []).map((n, i) => `
          <button class="tl-node" type="button" data-i="${i}">
            <span class="tl-dot"></span>
            <b>${esc(n.y)}</b><strong>${esc(n.t)}</strong><em>${esc(n.s)}</em>
          </button>`).join('')}</div>
      </div>
      <div class="tl-detail reveal" id="tlDetail" aria-live="polite"></div>
    </div>
  </section>`;

  // 白墙展厅
  B.gallery = b => `<section class="sec wall" data-title="${esc(b.nav || '白墙展厅')}">
    <div class="wrap">
      ${b.kicker ? `<p class="kicker reveal">${b.kicker}</p>` : ''}
      <h2 class="sec-title reveal">${R(b.title)}</h2>
      ${b.lead ? `<p class="lead narrow reveal">${R(b.lead)}</p>` : ''}
      <div class="gallery" id="gallery" data-items="${esc((b.items || []).join(','))}"></div>
      ${b.hint ? `<div class="wall-hint reveal"><span>${R(b.hint)}</span><span class="rule"></span><span>照片来自 Wikimedia Commons，署名见页尾</span></div>` : ''}
    </div>
  </section>`;

  // 深色图卡网格（用于白墙之外的物件/案例陈列）
  B.cases = b => `<section class="sec${b.alt ? ' sec--alt' : ''}" data-title="${esc(b.nav || b.title || '案例')}">
    <div class="wrap">
      ${b.kicker ? `<p class="kicker reveal">${b.kicker}</p>` : ''}
      ${b.title ? `<h2 class="sec-title reveal">${R(b.title)}</h2>` : ''}
      ${b.lead ? `<p class="lead narrow reveal">${R(b.lead)}</p>` : ''}
      <div class="case-grid">
        ${(b.items || []).map((c, i) => {
          const o = c.obj ? obj(c.obj) : null;
          const key = o ? o.img : c.img;
          const pos = o ? o.pos : (c.pos || '50% 50%');
          return `<button class="case-card reveal" data-d="${i % 4}" type="button"${o ? ` data-obj="${esc(o.id)}"` : ''}>
            <span class="case-frame" style="--ar:${c.ar || frameAR(key)}">
              <img src="${IMG(key, 'card')}" alt="${esc(c.name)}" loading="lazy" decoding="async" style="object-position:${pos}">
              ${c.tag ? `<span class="case-tag">${esc(c.tag)}</span>` : ''}
            </span>
            <span class="case-meta"><b>${esc(c.name)}</b>${c.sub ? `<span>${esc(c.sub)}</span>` : ''}</span>
            ${c.p ? `<span class="case-text">${R(c.p)}</span>` : ''}
          </button>`;
        }).join('')}
      </div>
      ${b.tail ? `<div class="takeaway reveal">${R(b.tail)}</div>` : ''}
    </div>
  </section>`;

  // 对比（左右两栏）
  B.compare = b => `<section class="sec${b.alt ? ' sec--alt' : ''}" data-title="${esc(b.nav || b.title || '对比')}">
    <div class="wrap">
      ${b.kicker ? `<p class="kicker reveal">${b.kicker}</p>` : ''}
      <h2 class="sec-title reveal">${R(b.title)}</h2>
      ${b.lead ? `<p class="lead narrow reveal">${R(b.lead)}</p>` : ''}
      <div class="cmp-list">
        ${(b.pairs || []).map((p, i) => `
          <div class="cmp reveal" data-d="${i % 3}">
            <div class="cmp-side">
              <div class="cmp-frame" style="--ar:${p.a.ar || 1.2}"><img src="${IMG(p.a.img, 'card')}" alt="${esc(p.a.cap || '')}" loading="lazy" decoding="async" style="object-position:${p.a.pos || '50% 50%'}"></div>
              <p class="cmp-cap">${R(p.a.cap)}</p>
            </div>
            <div class="cmp-arrow" aria-hidden="true">→</div>
            <div class="cmp-side">
              <div class="cmp-frame" style="--ar:${p.b.ar || 1.2}"><img src="${IMG(p.b.img, 'card')}" alt="${esc(p.b.cap || '')}" loading="lazy" decoding="async" style="object-position:${p.b.pos || '50% 50%'}"></div>
              <p class="cmp-cap">${R(p.b.cap)}</p>
            </div>
            ${p.note ? `<p class="cmp-note">${R(p.note)}</p>` : ''}
          </div>`).join('')}
      </div>
    </div>
  </section>`;

  // 流程六步
  B.steps = b => `<section class="sec${b.alt ? ' sec--alt' : ''}" data-title="${esc(b.nav || '方法')}">
    <div class="wrap">
      ${b.kicker ? `<p class="kicker reveal">${b.kicker}</p>` : ''}
      <h2 class="sec-title reveal">${R(b.title)}</h2>
      ${b.lead ? `<p class="lead narrow reveal">${R(b.lead)}</p>` : ''}
      <div class="flow reveal" id="flow"></div>
      ${b.myths ? `<div class="myth-grid">${b.myths.map((m, i) => `
        <div class="myth reveal" data-d="${i % 3}"><h4>${m.h}</h4><p>${R(m.p)}</p></div>`).join('')}</div>` : ''}
    </div>
  </section>`;

  // 课堂动手
  B.lab = b => `<section class="sec sec--lab" data-title="${esc(b.nav || '动手环节')}">
    <div class="wrap">
      ${b.kicker ? `<p class="kicker reveal">${b.kicker}</p>` : ''}
      <h2 class="sec-title reveal">${R(b.title)}</h2>
      ${b.lead ? `<p class="lead narrow reveal">${R(b.lead)}</p>` : ''}
      <div class="lab">
        <aside class="lab-panel reveal">
          <div class="brief-card">
            <p class="brief-label">${esc(b.briefLabel || '设计任务')}</p>
            <p class="brief-text" id="briefText">${R(b.briefStart || '点下面的按钮，抽一个任务。别挑，抽到什么画什么。')}</p>
            <ul class="brief-list" id="briefList"></ul>
          </div>
          <div class="lab-actions">
            <button class="btn btn--primary" type="button" id="drawBriefBtn">${esc(b.drawLabel || '抽一张题')}</button>
            <button class="btn btn--ghost" type="button" id="addConstraintBtn">${esc(b.addLabel || '加一条限制')}</button>
          </div>
          <div class="timer" id="timerBox">
            <div class="timer-display"><span id="timerText">${esc(b.minutes || '05:00')}</span></div>
            <div class="timer-btns">
              <button class="chip is-active" type="button" data-sec="300">5 分钟</button>
              <button class="chip" type="button" data-sec="60">1 分钟</button>
              <button class="btn btn--tiny" type="button" id="timerToggle">开始</button>
              <button class="btn btn--tiny btn--quiet" type="button" id="timerReset">重置</button>
            </div>
          </div>
        </aside>
        <div class="lab-canvas reveal" data-d="1">
          <div class="canvas-head">
            <span class="canvas-title">${esc(b.canvasTitle || '草图板')}</span>
            <div class="canvas-tools">
              <button class="tool is-active" data-tool="pen" type="button">✎ 笔</button>
              <button class="tool" data-tool="marker" type="button">▮ 粗</button>
              <button class="tool" data-tool="eraser" type="button">◻ 擦</button>
              <span class="color-dots" id="colorDots"></span>
              <button class="tool tool--danger" id="clearCanvas" type="button">清空</button>
              <button class="tool" id="saveCanvas" type="button">保存 PNG</button>
            </div>
          </div>
          <canvas id="sketch" width="1000" height="640" aria-label="课堂手绘草图板"></canvas>
          <p class="canvas-foot">${R(b.canvasFoot || '提示：投影时你可以自己先画 10 秒示范。学生用纸笔，你在这上面画。')}</p>
        </div>
      </div>
      ${b.poll ? `<div class="vote reveal">
        <h3>${esc(b.poll.title || '全班举手表决')}</h3>
        <p class="muted">${R(b.poll.desc || '点一下按钮，记录一票。')}</p>
        <div class="vote-body">
          <div class="vote-stat"><b id="voteCount">0</b><span>票</span></div>
          <div class="vote-btns">
            <button class="btn btn--primary" type="button" id="voteUp">+1 举手</button>
            <button class="btn btn--ghost" type="button" id="voteReset">清零</button>
          </div>
        </div>
      </div>` : ''}
    </div>
  </section>`;

  // 小测
  B.quiz = b => `<section class="sec${b.alt ? ' sec--alt' : ''}" data-title="${esc(b.nav || '小测')}">
    <div class="wrap">
      ${b.kicker ? `<p class="kicker reveal">${b.kicker}</p>` : ''}
      <h2 class="sec-title reveal">${R(b.title || '五道题。<br>答错比答对有用。')}</h2>
      <div class="quiz" id="quiz"></div>
      <div class="quiz-score" id="quizScore" aria-live="polite">已答 0 / ${(b.questions || []).length}</div>
    </div>
  </section>`;

  // 数据
  B.stats = b => `<section class="sec${b.alt ? ' sec--alt' : ''}" data-title="${esc(b.nav || '为什么')}">
    <div class="wrap">
      ${b.kicker ? `<p class="kicker reveal">${b.kicker}</p>` : ''}
      <h2 class="sec-title reveal">${R(b.title)}</h2>
      <div class="stats">${(b.items || []).map((s, i) => `
        <div class="stat reveal" data-d="${i % 4}">
          <div class="stat-num" data-to="${+s.to}" data-suffix="${esc(s.suffix || '')}">0${esc(s.suffix || '')}</div>
          <p>${R(s.p)}</p>
        </div>`).join('')}</div>
      ${b.closing ? `<div class="closing reveal"><p class="closing-big">${R(b.closing.big)}</p>${b.closing.small ? `<p class="closing-small">${R(b.closing.small)}</p>` : ''}</div>` : ''}
    </div>
  </section>`;

  // 提示条
  B.note = b => `<section class="sec${b.alt ? ' sec--alt' : ''}" data-title="${esc(b.nav || '记住这句')}">
    <div class="wrap"><div class="note-band reveal">
      ${b.kicker ? `<p class="kicker">${b.kicker}</p>` : ''}
      <p class="note-big">${R(b.text)}</p>
      ${b.sub ? `<p class="note-sub">${R(b.sub)}</p>` : ''}
    </div></div>
  </section>`;

  // 结语
  B.closing = b => `<section class="sec sec--end" data-title="${esc(b.nav || '结语')}">
    <div class="wrap end-wrap">
      ${b.kicker ? `<p class="kicker reveal">${b.kicker}</p>` : ''}
      <h2 class="end-title reveal">${R(b.title)}</h2>
      ${b.hot ? `<p class="end-hot reveal" data-d="1">${R(b.hot)}</p>` : ''}
      ${b.cards ? `<div class="end-grid">${b.cards.map((c, i) => `
        <div class="end-card reveal" data-d="${i + 2}"><h4>${c.h}</h4><p>${R(c.p)}</p></div>`).join('')}</div>` : ''}
      ${b.next ? `<div class="next-lesson reveal"><span>下一课</span><a class="btn btn--primary" href="${esc(b.next.href)}">${esc(b.next.text)} →</a></div>` : ''}
    </div>
  </section>`;

  /* ── 组装 ───────────────────────────────────────────── */
  window.renderLesson = function (lesson) {
    const blocks = (lesson && lesson.blocks) || [];
    return blocks.map(b => (B[b.type] ? B[b.type](b) : '')).filter(Boolean);
  };
  window.BLOCKS = B;
})();
