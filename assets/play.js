/* ═══════════════════════════════════════════════════════════
   PLAY —— 可玩的东西
   设计课最好玩的地方在于：你可以把东西做坏，而且不用付几十万的开模费。
   这里的每一个实验室都是真模拟：参数真的会互相冲突，结果真的会失败。
   ═══════════════════════════════════════════════════════════ */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /* ═══ 等轴测投影（画三维零件用） ═══════════════════ */
  const C30 = Math.cos(Math.PI / 6), S30 = Math.sin(Math.PI / 6);
  const iso = (x, y, z) => [(x - y) * C30, (x + y) * S30 - z];

  /* ═══════════════════════════════════════════════════
     ① 开模实验室 —— 你自己塑形，然后让它活下来

     旧版的问题：给三个滑块调参，按下按钮拿一个"合格/不合格"的文字判定。
     学生学到的是查表（0.6° → 拉伤），不是理解。

     新版做三件事：
       · 视图改成「侧剖」—— 拔模角和壁厚只在剖面里看得见，
         等轴测视图恰恰让这两个概念隐形
       · 学生直接拖几何体上的手柄，不拖滑块 ——
         操作和后果在空间上连在一起
       · 干涉是「算」出来的：把剖面当折线，逐段求 dx/dy。
         向上顶出 δ，若某段 dx/dy < 0，则该段必然嵌入钢模。
         这不是查表，是几何本身。
     ═══════════════════════════════════════════════════ */
  function moldingLab(root) {
    const S = 7;                       // px per mm
    const CX = 280;                    // 中轴
    const YB = 300;                    // 零件底面（外侧）
    const STEEL = 9;                   // 钢模壁厚 mm
    const BASE = 6;                    // 模底厚 mm
    const H = 26;                      // 件高 mm

    // 可调几何
    const G = {
      Wb: 20,      // 底部外侧半宽 mm
      wall: 1.6,   // 壁厚 mm
      draft: 1.0,  // 拔模角（度），负值 = 倒扣
      r: 1.2,      // 底角半径 mm
      bottom: 2.2  // 底厚（会随壁厚联动，见 geom）
    };
    const G0 = Object.assign({}, G);          // 初始形状，「重来」要回到这里
    const GOOD = { wall: [1.2, 3.0], draft: [1.0, 6], r: [0.8, 6], rI: 0.8 };
    const LIM  = { wall: [0.6, 4.0], draft: [-3, 6],  r: [0, 6] };

    const px = mm => mm * S;
    const yOf = up => YB - px(up);                 // 以 mm 计的"离底高度" → svg y

    /* ── 几何：把剖面算成精确的点 ─────────────────── */
    function geom() {
      const tan = Math.tan(G.draft * Math.PI / 180);
      const Wt  = G.Wb + tan * H;                  // 顶部外侧半宽
      const Wi  = G.Wb - G.wall;                   // 底部内侧半宽
      const Wti = Wt - G.wall;                     // 顶部内侧半宽
      // 底厚随壁厚联动（真实零件底比壁厚）：这样厚壁也能留出足够的内圆角，
      // 否则「壁厚 > 2.8mm」会变成一整片不可能成功的参数区。
      const bt  = Math.min(Math.max(G.wall * 1.4, 1.6), H * .45);
      // 外圆角：受几何限制但不再"偷偷截断"（读数必须等于实际画出来的）
      const rO  = Math.max(0, Math.min(G.r, G.Wb * .55, bt * 1.5, H * .34));
      // 内圆角：等壁厚的必然结果 —— 内圆角 = 外圆角 − 壁厚。
      // 真实模具里这两个圆角由不同的钢件加工（外=模腔，内=模芯），
      // 而且决定强度的是内圆角。这条关系本身就是个值得教的设计事实。
      const rI  = Math.max(0, rO - G.wall);
      return { Wt, Wi, Wti, tan, bt, rO, rI };
    }

    /* ── 干涉分析：逐段求斜率，算真实接触 ───────────
       顶出方向 +y（向上）。外侧壁从底到顶横向变化 dW：
         dW > 0  → 向外张开，能滑出
         dW ≈ 0  → 直壁，整面贴合，硬拽
         dW < 0  → 倒扣，嵌入钢模，出不来                     */
    function analyse() {
      const g = geom();
      const slope = (g.Wt - G.Wb) / H;             // dx/dy
      const out = { slope, issues: [], contact: 0 };

      if (slope < -0.006) {
        // 倒扣：真实嵌入深度 = |slope| × 件高
        out.issues.push({
          k: 'lock', 名: '倒扣',
          值: (-slope * H).toFixed(1) + ' mm',
          因为: `顶比底窄了 ${(-slope * H).toFixed(1)} 毫米。零件被钢模咬住，往哪个方向都出不来 —— 这不是"难顶"，是<strong>物理上不可能</strong>。真实世界里只有两条路：改形状，或者加一套侧向滑块，模具费翻倍。`
        });
        out.contact = H;                            // 全高咬合
      } else if (slope < Math.tan(GOOD.draft[0] * Math.PI / 180)) {
        out.issues.push({
          k: 'drag', 名: '拉伤',
          值: (Math.atan(Math.abs(slope)) * 180 / Math.PI).toFixed(1) + '°',
          因为: `壁几乎是直的（${(Math.atan(Math.abs(slope)) * 180 / Math.PI).toFixed(1)}°）。直壁意味着零件<b>整个 ${H} 毫米高度都贴着钢模</b>，顶出来要硬拽，表面会被刮花。要滑顺，只需要 1° —— 在 ${H} 毫米的高度上，那只有 <b>${(Math.tan(Math.PI / 180) * H).toFixed(1)} 毫米</b>的斜度。`
        });
        out.contact = H * .8;
      }

      if (G.wall < GOOD.wall[0]) out.issues.push({
        k: 'short', 名: '短射', 值: G.wall.toFixed(1) + ' mm',
        因为: `${G.wall.toFixed(1)} 毫米的壁太薄了。塑料在模具里是<b>边流边冷</b>的 —— 还没流到边角就冻住了，零件缺一块。薄壁需要更高的注射压力和更快的速度，普通机器做不到。`
      });
      else if (G.wall > GOOD.wall[1]) out.issues.push({
        k: 'sink', 名: '缩水', 值: G.wall.toFixed(1) + ' mm',
        因为: `${G.wall.toFixed(1)} 毫米的肉太厚。厚的地方冷得慢，塑料收缩时表面已经被冻住了、里面还在缩 —— <b>表面就被拽下去一块</b>。真正的解法不是加厚，是加一道加强筋。`
      });

      const g2 = geom();
      if (g2.rI < GOOD.rI) out.issues.push({
        k: 'crack', 名: '应力开裂', 值: '内圆角 ' + g2.rI.toFixed(1) + ' mm',
        因为: `真正决定强度的是<b>内圆角</b>，而它现在只有 ${g2.rI.toFixed(1)} 毫米。` +
          (g2.rO > 0.1
            ? `你的外圆角是 ${g2.rO.toFixed(1)} 毫米 —— 内圆角 = 外圆角 − 壁厚（${G.wall.toFixed(1)}）。<b>壁厚一加，内圆角就变小</b>，这是藏在剖面里的连锁反应。`
            : `外圆角是尖的，内圆角必然也是尖的。`) +
          `尖锐的内角会把应力集中到<b>几十倍</b> —— 零件在顶出、装配或者只是放久了之后，就从这里裂开。`
      });
      return out;
    }

    /* ── 画 ──────────────────────────────────────── */
    const W = 560, Hv = 430;
    const p2 = (x, y) => `${x.toFixed(1)},${y.toFixed(1)}`;

    function steel() {
      const g = geom();
      const outerHalf = px(G.Wb + STEEL);
      const topLo = yOf(0) - px(BASE) - 46;        // 钢模上缘（留出顶出空间）
      const botY  = yOf(0) + px(BASE);
      // 模腔：与零件外表面完全一致（模具就是照零件挖出来的）
      const cavTopR = CX + px(g.Wt), cavTopL = CX - px(g.Wt);
      const cavBotR = CX + px(G.Wb), cavBotL = CX - px(G.Wb);
      return `
        <defs>
          <pattern id="hatch" width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="7" stroke="rgba(150,160,180,.30)" stroke-width="1.2"/>
          </pattern>
        </defs>
        <g class="md-steel">
          <!-- 左钢模 -->
          <path d="M${p2(CX - outerHalf, topLo)} L${p2(cavTopL, topLo)} L${p2(cavBotL, YB)} L${p2(CX - outerHalf, YB)} Z"
                fill="#20232B" stroke="rgba(150,160,180,.55)" stroke-width="1.4"/>
          <path d="M${p2(CX - outerHalf, topLo)} L${p2(cavTopL, topLo)} L${p2(cavBotL, YB)} L${p2(CX - outerHalf, YB)} Z" fill="url(#hatch)"/>
          <!-- 右钢模 -->
          <path d="M${p2(cavTopR, topLo)} L${p2(CX + outerHalf, topLo)} L${p2(CX + outerHalf, YB)} L${p2(cavBotR, YB)} Z"
                fill="#20232B" stroke="rgba(150,160,180,.55)" stroke-width="1.4"/>
          <path d="M${p2(cavTopR, topLo)} L${p2(CX + outerHalf, topLo)} L${p2(CX + outerHalf, YB)} L${p2(cavBotR, YB)} Z" fill="url(#hatch)"/>
          <!-- 模底 -->
          <rect x="${CX - outerHalf}" y="${YB}" width="${outerHalf * 2}" height="${px(BASE)}"
                fill="#20232B" stroke="rgba(150,160,180,.55)" stroke-width="1.4"/>
          <rect x="${CX - outerHalf}" y="${YB}" width="${outerHalf * 2}" height="${px(BASE)}" fill="url(#hatch)"/>
          <!-- 顶出方向 -->
          <g opacity=".7">
            <line x1="${CX}" y1="${topLo - 34}" x2="${CX}" y2="${topLo - 8}" stroke="#FF5A1F" stroke-width="2"/>
            <path d="M${CX} ${topLo - 42} l-5 10 h10 z" fill="#FF5A1F"/>
            <text x="${CX + 12}" y="${topLo - 26}" fill="#FF5A1F" font-size="11.5"
                  font-family="system-ui" letter-spacing=".1em">顶出方向</text>
          </g>
        </g>`;
    }

    function plastic(heat) {
      const g = geom();
      const yTop = yOf(H), yIn = yOf(g.bt);
      const oR = CX + px(g.Wt), oL = CX - px(g.Wt);
      const iR = CX + px(g.Wti), iL = CX - px(g.Wti);
      const bR = CX + px(G.Wb), bL = CX - px(G.Wb);
      const cR = CX + px(g.Wi), cL = CX - px(g.Wi);
      const rp = px(g.rO);                                        // 外圆角（模腔做出来的）
      const rb = px(Math.min(g.rI, g.Wi * .5, g.bt * .55));       // 内圆角（模芯做出来的）

      // 外轮廓 + 内轮廓（一只杯子的剖面，中间是塑料）
      const d = [
        `M${p2(bL + rp, YB)}`,
        `L${p2(bR - rp, YB)}`,
        `Q${p2(bR, YB)} ${p2(bR, YB - rp)}`,
        `L${p2(oR, yTop)}`,
        `L${p2(iR, yTop)}`,                                   // 顶部端面
        `L${p2(cR, yIn - rb)}`,
        `Q${p2(cR, yIn)} ${p2(cR - rb, yIn)}`,
        `L${p2(cL + rb, yIn)}`,
        `Q${p2(cL, yIn)} ${p2(cL, yIn - rb)}`,
        `L${p2(iL, yTop)}`,
        `L${p2(oL, yTop)}`,
        `L${p2(bL, YB - rp)}`,
        `Q${p2(bL, YB)} ${p2(bL + rp, YB)}`,
        'Z'
      ].join(' ');

      // 冷却：肉厚处先红后塌
      const heatFill = heat != null
        ? `url(#heatGrad)`
        : 'url(#plasticGrad)';
      let extra = '';
      if (heat != null && heat > .35 && G.wall > GOOD.wall[1] - .6) {
        const sy = yOf(H * .45), sx = CX + px(g.Wt * .42);
        extra = `<ellipse cx="${sx}" cy="${sy}" rx="${px(G.wall * 1.9)}" ry="${px(3.4)}"
                   fill="#0A0F1A" opacity="${(heat * .8).toFixed(2)}"/>`;
      }
      return `
        <defs>
          <linearGradient id="plasticGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="#2A4D8F"/><stop offset=".5" stop-color="#4E86E0"/>
            <stop offset="1" stop-color="#2A4D8F"/>
          </linearGradient>
          <linearGradient id="heatGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#F5B841"/><stop offset=".55" stop-color="#E8613C"/>
            <stop offset="1" stop-color="#4E86E0"/>
          </linearGradient>
        </defs>
        <path d="${d}" fill="${heatFill}" stroke="#8FC2FF" stroke-width="1.6" stroke-linejoin="round"/>
        ${extra}`;
    }

    function handles() {
      const g = geom();
      const yTop = yOf(H);
      const yMid = yOf(H * .5);
      const oR = CX + px(g.Wt), iR = CX + px(g.Wti);
      const bR = CX + px(G.Wb);
      const H1 = (x, y, k, 名) => `
        <g class="md-handle" data-h="${k}" style="cursor:grab">
          <circle cx="${x}" cy="${y}" r="16" fill="transparent"/>
          <circle cx="${x}" cy="${y}" r="8" fill="#F4F1EA" stroke="#0B0B0C" stroke-width="2.5"/>
          <circle cx="${x}" cy="${y}" r="3" fill="#FF5A1F"/>
          <title>${名}</title>
        </g>`;
      return `
        ${H1(oR, yTop - 4, 'draft', '拖动改变拔模角（向左拖过头会变成倒扣）')}
        ${H1(iR, yMid, 'wall', '拖动改变壁厚')}
        ${H1(bR - px(g.rO) - 10, YB, 'r', '左右拖动改变外圆角（内圆角会跟着变）')}`;
    }

    /* ── 渲染 ────────────────────────────────────── */
    let phase = 'idle';   // idle | ejecting | cooling | done
    let ejectY = 0, heat = null, jammed = false;

    function draw() {
      const a = analyse();
      const I = $('[data-moldsvg]', root);
      I.innerHTML = `
        ${steel()}
        <g data-ejectg transform="translate(0,${-ejectY})">${plastic(heat)}</g>
        ${phase === 'idle' ? handles() : ''}
        ${phase !== 'idle' && a.issues.some(i => i.k === 'lock' || i.k === 'drag') ? jamMarks(a) : ''}`;

      // 读数
      const dEl = $('[data-read="draft"]', root);
      if (dEl) dEl.textContent = G.draft.toFixed(1) + '°';
      const wEl = $('[data-read="wall"]', root);
      if (wEl) wEl.textContent = G.wall.toFixed(1) + ' mm';
      const g3 = geom();
      const rEl = $('[data-read="r"]', root);
      if (rEl) rEl.textContent = g3.rO.toFixed(1) + ' mm';
      const riEl = $('[data-read="ri"]', root);
      if (riEl) riEl.textContent = g3.rI.toFixed(1) + ' mm';
      // 实时标注：哪个参数已经越出工艺常规区间。不给答案，只给准星 ——
      // 原来学生只能"按顶出 → 被拒 → 再猜"，像在盲盒里摸。
      const mark = (k, ok) => {
        const el = $('[data-read="' + k + '"]', root);
        if (el) el.classList.toggle('is-warn', !ok);
      };
      mark('wall', G.wall >= GOOD.wall[0] && G.wall <= GOOD.wall[1]);
      mark('draft', G.draft >= GOOD.draft[0]);
      mark('r', g3.rI >= GOOD.rI);

      // 参数条
      $$('[data-range]', root).forEach(el => {
        const k = el.dataset.range;
        const [lo, hi] = LIM[k], [g1, g2] = GOOD[k];
        const pct = v => ((v - lo) / (hi - lo)) * 100;
        const gd = $('.pl-good', el);
        if (gd) { gd.style.left = Math.max(0, pct(g1)) + '%'; gd.style.width = (pct(g2) - Math.max(0, pct(g1))) + '%'; }
      });

      // 缺陷灯
      $$('[data-flag]', root).forEach(el => {
        const on = phase !== 'idle' && a.issues.some(i => i.k === el.dataset.flag);
        el.classList.toggle('is-on', on);
      });

      // 结论
      const v = $('[data-verdict]', root);
      if (phase === 'idle') {
        v.className = 'pl-verdict is-idle';
        v.innerHTML = '<b>拖动图上的三个白点：</b>上面的改拔模角、中间改壁厚、下面改圆角。做好了按「顶出」。<br><span style="opacity:.75">做坏了不用赔钱 —— 这是这门课最便宜的地方。</span>';
      } else if (!a.issues.length) {
        v.className = 'pl-verdict is-ok';
        v.innerHTML = `<b>✓ 顺利顶出。</b>拔模角 ${G.draft.toFixed(1)}°、壁厚 ${G.wall.toFixed(1)} mm、圆角 ${G.r.toFixed(1)} mm —— 这三项都过了。<br>成型周期约 <b>${(16 + G.wall * 9).toFixed(0)} 秒</b>。记住这个手感：<b>让它好做，形状得让一步。</b>`;
      } else {
        v.className = 'pl-verdict is-bad';
        v.innerHTML = a.issues.map(i => `
          <div class="pl-defect"><span>${i.名}${i.值 ? ' · ' + i.值 : ''}</span>
          <em>${i.因为}</em></div>`).join('');
      }
    }

    function jamMarks(a) {
      const g = geom();
      const lock = a.issues.some(i => i.k === 'lock');
      const col = lock ? '#FF3B1F' : '#F5B841';
      const yTop = yOf(H), yBot = yOf(0);
      const n = 9;
      let s = '';
      for (let i = 0; i < n; i++) {
        const y = yBot + (yTop - yBot) * (i / (n - 1));
        const t = i / (n - 1);
        // 干涉点沿壁分布：倒扣是全高，拉伤集中在下半段
        const on = lock || t < .62 ? 1 : 0;
        if (!on) continue;
        const xR = CX + px(G.Wb + (g.Wt - G.Wb) * t);
        s += `<line x1="${xR - 16}" y1="${y}" x2="${xR + 16}" y2="${y}"
                stroke="${col}" stroke-width="2.4" stroke-linecap="round" opacity=".95"/>
              <line x1="${2 * CX - xR - 16}" y1="${y}" x2="${2 * CX - xR + 16}" y2="${y}"
                stroke="${col}" stroke-width="2.4" stroke-linecap="round" opacity=".95"/>`;
      }
      return `<g class="md-jam">${s}</g>`;
    }

    /* ── 拖拽 ────────────────────────────────────── */
    function toMm(evt) {
      const svg = $('[data-moldsvg]', root);
      const r = svg.getBoundingClientRect();
      return ((evt.clientX - r.left) / r.width) * W;
    }
    let drag = null;
    // 增益：光标移动 1px 对应参数的多少。原来 1:1 时，
    // 合格区在 560px 画布上只有 11px 宽 —— 学生根本拖不中。
    const GAIN = { draft: 5, wall: 8, r: 5 };

    root.addEventListener('pointerdown', e => {
      const h = e.target.closest('.md-handle');
      if (!h || phase !== 'idle') return;
      drag = { k: h.dataset.h, x0: toMm(e), G0: Object.assign({}, G) };
      h.style.cursor = 'grabbing';
      try { root.setPointerCapture && root.setPointerCapture(e.pointerId); } catch (err) {}
      e.preventDefault();
    });
    root.addEventListener('pointermove', e => {
      if (!drag) return;
      const cl = (v, a, b) => Math.max(a, Math.min(b, v));
      const dmm = (toMm(e) - drag.x0) / (S * GAIN[drag.k]);   // 拖拽量 → 毫米当量
      const g0 = drag.G0;
      if (drag.k === 'draft') {
        const Wt0 = g0.Wb + Math.tan(g0.draft * Math.PI / 180) * H;
        const deg = Math.atan2((Wt0 + dmm) - G.Wb, H) * 180 / Math.PI;
        G.draft = cl(deg, LIM.draft[0], LIM.draft[1]);
      } else if (drag.k === 'wall') {
        G.wall = cl(g0.wall - dmm, LIM.wall[0], LIM.wall[1]);
      } else if (drag.k === 'r') {
        G.r = cl(g0.r - dmm, LIM.r[0], LIM.r[1]);
      }
      draw();
      e.preventDefault();
    });
    const end = () => { drag = null; };
    root.addEventListener('pointerup', end);
    root.addEventListener('pointercancel', end);
    root.addEventListener('pointerleave', end);

    /* ── 顶出：真的把它推出去 ─────────────────────── */
    const btn = $('[data-mold]', root);
    btn.addEventListener('click', () => {
      if (phase === 'ejecting' || phase === 'cooling') return;
      const a = analyse();
      const lock = a.issues.some(i => i.k === 'lock');
      const stage = $('[data-stage]', root);
      const wrap = $('.sim-stage', root);
      wrap && wrap.classList.add('is-run');

      phase = 'ejecting'; jammed = lock;
      const t0 = performance.now();
      const DUR = 900, MAX = lock ? 6 : px(H * .82);

      (function step(t) {
        const k = Math.min(1, (t - t0) / DUR);
        const e = 1 - Math.pow(1 - k, 3);
        ejectY = MAX * (lock ? Math.min(e * 4, 1) * .18 : e);
        if (stage) stage.textContent = lock ? '卡死' : '顶出中';
        draw();
        if (k < 1) requestAnimationFrame(step);
        else {
          if (lock) {
            // 卡死：抖一下，退回去
            let n = 0;
            const shake = setInterval(() => {
              ejectY = (n % 2 ? 2 : -1);
              draw(); n++;
              if (n > 7) { clearInterval(shake); after(); }
            }, 60);
          } else after();
        }
      })(t0);

      function after() {
        if (stage) stage.textContent = '';
        wrap && wrap.classList.remove('is-run');
        // 厚壁 → 冷却阶段
        if (G.wall > GOOD.wall[1] - .7) {
          phase = 'cooling';
          const c0 = performance.now();
          (function cool(t) {
            const k = Math.min(1, (t - c0) / 1100);
            heat = k;
            if (stage) stage.textContent = '冷却';
            draw();
            if (k < 1) requestAnimationFrame(cool);
            else { heat = null; phase = 'done'; if (stage) stage.textContent = ''; draw(); }
          })(c0);
        } else { phase = 'done'; draw(); }
      }
    });

    // 复位
    const rst = $('[data-moldreset]', root);
    if (rst) rst.addEventListener('click', () => {
      Object.assign(G, G0);                   // 形状也要回到初始 —— 原来只重置了动画
      phase = 'idle'; ejectY = 0; heat = null; jammed = false;
      const st = $('[data-stage]', root); if (st) st.textContent = '';
      draw();
    });

    draw();
    return { G, analyse, draw };
  }

  /* ═══════════════════════════════════════════════════
     ② 成本实验室 —— 产量差一千倍，成本差十八倍
     ═══════════════════════════════════════════════════ */
  function costLab(root) {
    const MAT = {
      pp:  { 名: 'PP 塑料',  单价: 12,  密度: 0.9, 模具: 18 },
      abs: { 名: 'ABS 塑料', 单价: 18,  密度: 1.05, 模具: 26 },
      al:  { 名: '铝合金',   单价: 32,  密度: 2.7, 模具: 60 },
      steel:{ 名: '不锈钢',  单价: 45,  密度: 7.8, 模具: 140 }
    };
    const S = { vol: 320, parts: 6, qty: 100000, mat: 'abs' };  // 体积 cm³

    function calc() {
      const m = MAT[S.mat];
      const 材料 = (S.vol * m.密度 / 1000) * m.单价;      // 元
      const 工时 = 0.6 * S.parts;                          // 每件装配工时（元）
      const 模具分摊 = (m.模具 * 10000) / S.qty;           // 元
      const 单件 = 材料 + 工时 + 模具分摊;
      return { 材料, 工时, 模具分摊, 单件, m };
    }

    function render() {
      const r = calc();
      $('[data-qty]', root).textContent = S.qty >= 10000
        ? (S.qty / 10000) + ' 万件' : S.qty.toLocaleString() + ' 件';
      $('[data-parts]', root).textContent = S.parts + ' 个';
      $('[data-mat]', root).textContent = r.m.名;
      $('[data-total]', root).textContent = '¥' + r.单件.toFixed(2);

      const max = Math.max(r.材料, r.工时, r.模具分摊, .01);
      $$('[data-bar]', root).forEach(el => {
        const k = el.dataset.bar;
        const v = r[k];
        el.style.setProperty('--w', (v / (r.材料 + r.工时 + r.模具分摊) * 100).toFixed(1) + '%');
        $('.cl-val', el).textContent = '¥' + v.toFixed(2);
      });
      // 提示：模具分摊占比
      const tip = $('[data-tip]', root);
      const share = r.模具分摊 / r.单件;
      tip.className = 'cl-tip ' + (share > .3 ? 'is-warn' : share > .12 ? 'is-mid' : 'is-ok');
      tip.textContent = share > .3
        ? `模具费占了单件成本的 ${(share*100).toFixed(0)}% —— 做得太少，你其实在替模具打工。`
        : share > .12
        ? `模具费占 ${(share*100).toFixed(0)}%，还算健康。`
        : `模具费只占 ${(share*100).toFixed(0)}% —— 产量已经足够把模具摊薄了。`;
    }

    $$('input[type=range]', root).forEach(inp => {
      inp.addEventListener('input', () => {
        const k = inp.dataset.k2;
        S[k] = k === 'qty' ? Math.round(Math.pow(10, +inp.value)) : +inp.value;
        render();
      });
    });
    $$('[data-matbtn]', root).forEach(b => b.addEventListener('click', () => {
      S.mat = b.dataset.matbtn;
      $$('[data-matbtn]', root).forEach(x => x.classList.toggle('is-on', x === b));
      render();
    }));
    render();
    return { S, calc, render };
  }

  /* ═══════════════════════════════════════════════════
     ③ 人体实验室 —— 按平均做的东西，谁都不合身
     ═══════════════════════════════════════════════════ */
  function ergoLab(root) {
    // 一把固定尺寸的椅子（不许调，模拟"按平均做死"）
    const CHAIR = { 座高: 45, 座深: 45, 扶手高: 24 };
    const S = { 身高: 170 };

    // 身高 → 各部位（简化回归）
    const body = h => ({
      小腿: h * 0.245,   // 腘窝高 ≈ 座高需求的来源
      大腿: h * 0.235,
      肘高: h * 0.63 * 0.72
    });

    function render() {
      const b = body(S.身高);
      const 差 = b.小腿 - CHAIR.座高;                 // >0 说明椅太矮
      $('[data-h]', root).textContent = S.身高 + ' cm';
      const ht = $('[data-read="hTop"]', root); if (ht) ht.textContent = S.身高 + ' cm';
      $('[data-leg]', root).textContent = b.小腿.toFixed(1) + ' cm';
      $('[data-need]', root).textContent = (b.小腿).toFixed(0) + ' cm';

      // 画人 + 椅子
      const sc = 2.0;
      const legY = CHAIR.座高 * sc;
      const hipY = legY;
      const shY = hipY - (S.身高 * 0.29) * sc;
      const headY = shY - 24;
      const cx = 200;

      let s = '';
      // 椅子
      s += `<rect x="${cx - 46}" y="${legY}" width="92" height="7" rx="3" fill="#4A4A52"/>`;
      s += `<rect x="${cx - 40}" y="${legY + 7}" width="6" height="${(200 - legY)}" fill="#3A3A42"/>`;
      s += `<rect x="${cx + 34}" y="${legY + 7}" width="6" height="${(200 - legY)}" fill="#3A3A42"/>`;
      s += `<rect x="${cx + 40}" y="${legY - 70}" width="7" height="70" rx="3" fill="#3A3A42"/>`;
      // 人
      const fit = Math.abs(差) < 2;
      const col = fit ? '#6EE7D7' : '#FF5A1F';
      // 小腿
      s += `<line x1="${cx - 10}" y1="${hipY}" x2="${cx - 14}" y2="${hipY + b.小腿 * sc * .55}" stroke="${col}" stroke-width="7" stroke-linecap="round"/>`;
      // 大腿（水平坐在座面上）
      s += `<line x1="${cx - 14}" y1="${hipY}" x2="${cx + 30}" y2="${hipY}" stroke="${col}" stroke-width="9" stroke-linecap="round"/>`;
      // 躯干
      s += `<line x1="${cx + 30}" y1="${hipY}" x2="${cx + 36}" y2="${shY}" stroke="${col}" stroke-width="11" stroke-linecap="round"/>`;
      // 头
      s += `<circle cx="${cx + 38}" cy="${headY}" r="13" fill="${col}"/>`;
      // 座椅高度参考线
      s += `<line x1="${cx - 80}" y1="${legY}" x2="${cx + 80}" y2="${legY}" stroke="rgba(255,90,31,.5)" stroke-width="1.5" stroke-dasharray="5 4"/>`;
      s += `<text x="${cx - 84}" y="${legY - 6}" fill="#FF5A1F" font-size="11" text-anchor="end" font-family="system-ui">座高 45</text>`;
      // 脚是否着地
      const footY = hipY + b.小腿 * sc * .55 + 12;
      if (Math.abs(footY - 200) > 8) {
        s += `<text x="${cx + 78}" y="${200}" fill="#FF5A1F" font-size="11" font-family="system-ui">${footY < 200 ? '脚够不到地' : '膝盖顶起来'}</text>`;
      }
      $('[data-figure]', root).innerHTML =
        `<svg viewBox="88 -10 224 224" role="img" aria-label="人体与椅子尺寸示意">${s}</svg>`;

      const v = $('[data-ergo-verdict]', root);
      if (fit) {
        v.className = 'pl-verdict is-ok';
        v.innerHTML = `<b>恰好合身。</b>腘窝高 ${b.小腿.toFixed(1)} cm ≈ 座高 45 cm。但注意 —— <b>这只是一个人</b>。`;
      } else if (差 > 0) {
        v.className = 'pl-verdict is-bad';
        v.innerHTML = `<b>椅子偏低 ${差.toFixed(1)} cm。</b>大腿被抬起，久坐腰会酸。要修就得加高座面 —— 但加高之后，腿短的人脚就够不到地了。`;
      } else {
        v.className = 'pl-verdict is-bad';
        v.innerHTML = `<b>椅子偏高 ${(-差).toFixed(1)} cm。</b>脚悬空，压力全压在大腿下面。要修就得降低座面 —— 但降低之后，腿长的人膝盖会顶起来。`;
      }
    }
    const inp = $('input[type=range]', root);
    if (inp) inp.addEventListener('input', () => { S.身高 = +inp.value; render(); });
    render();
    return { S, render };
  }

  /* ═══════════════════════════════════════════════════
     ④ 进度系统 —— 让课程变成一段可以走完的路
     ═══════════════════════════════════════════════════ */
  const PROGRESS = (() => {
    const KEY = 'idc-progress-v1';
    const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } };
    const write = o => { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} };
    return {
      done: () => read(),
      mark(id) { const o = read(); o[id] = Date.now(); write(o); },
      isDone: id => !!read()[id],
      count: () => Object.keys(read()).length,
      last() {
        const o = read();
        const ks = Object.keys(o).sort((a, b) => o[b] - o[a]);
        return ks[0] || null;
      },
      reset() { write({}); }
    };
  })();

  window.PLAY = { moldingLab, costLab, ergoLab, PROGRESS };

  /* ═══ 自动初始化 ═══════════════════════════════════ */
  window.PLAY.init = function (root = document) {
    $$('[data-lab]', root).forEach(el => {
      if (el.dataset.ready) return;
      el.dataset.ready = '1';
      const kind = el.dataset.lab;
      try {
        if (kind === 'molding') moldingLab(el);
        else if (kind === 'cost') costLab(el);
        else if (kind === 'ergo') ergoLab(el);
      } catch (e) { console.warn('[PLAY] 实验室初始化失败', kind, e); }
    });
  };
})();
