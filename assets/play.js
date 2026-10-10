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
     ① 注塑实验室 —— 三条工艺定律，做坏不用赔钱
     ═══════════════════════════════════════════════════ */
  function moldingLab(root) {
    const P = { wall: 1.6, draft: 1.0, r: 1.0 };   // 当前参数
    const LIM = {                  // 教科书给的合理区间
      wall:  [0.6, 4.0],
      draft: [0, 4],
      r:     [0, 4]
    };
    const GOOD = { wall: [1.2, 3.0], draft: [1.0, 4], r: [0.8, 4] };

    // 视框按零件的实际包围盒收紧（否则零件在舞台里只有一小块）
    const W = 178, H = 156;

    function verdict() {
      const bad = [];
      if (P.wall < GOOD.wall[0])       bad.push({ k: 'short', 名: '短射',  因: '壁太薄，塑料还没流到边角就冷却了' });
      else if (P.wall > GOOD.wall[1])  bad.push({ k: 'sink',  名: '缩水',  因: '壁太厚，肉厚处冷得慢，表面塌下去一块' });
      if (P.draft < GOOD.draft[0])     bad.push({ k: 'drag',  名: '拉伤',  因: '拔模角不够，零件被硬拽出来，侧面被刮花' });
      if (P.r < GOOD.r[0])             bad.push({ k: 'crack', 名: '应力开裂', 因: '尖角把力全挤在一点，塑料从这里裂开' });
      return bad;
    }

    // 画零件
    function part(bad, t) {
      const w = P.wall, d = P.draft * 0.9, r = Math.min(P.r, 3.4) * 1.1;
      const L = 62, D = 44, Hh = 30;
      const taper = d;                                  // 顶部外扩量
      const th = clamp(w * 3.2, 3.5, 13);               // 视觉厚度

      // 外面四个角（等轴测），带拔模外扩
      const o = [
        iso(0, 0, 0), iso(L, 0, 0), iso(L, D, 0), iso(0, D, 0)
      ];
      const oTop = [
        iso(-taper, -taper, Hh), iso(L + taper, -taper, Hh),
        iso(L + taper, D + taper, Hh), iso(-taper, D + taper, Hh)
      ];
      // 内腔
      const i0 = iso(th, th, th), i1 = iso(L - th, th, th),
            i2 = iso(L - th, D - th, th), i3 = iso(th, D - th, th);
      const iTop = [
        iso(th - taper, th - taper, Hh), iso(L - th + taper, th - taper, Hh),
        iso(L - th + taper, D - th + taper, Hh), iso(th - taper, D - th + taper, Hh)
      ];
      const P0 = p => p.map(v => v.map(n => n.toFixed(1)).join(',')).join(' ');
      // 零件在等轴测坐标里的中心大约在 (8, 12)，据此把它摆到视框正中
      const ox = W / 2 - 8, oy = H / 2 - 10;
      const g = s => `<g transform="translate(${ox},${oy})">${s}</g>`;

      const FILL = '#2A4D8F', FILL2 = '#1F3A6D', EDGE = '#6FB4FF';
      let s = '';

      // 外壳两个可见侧面
      s += `<polygon points="${P0([o[0], o[1], oTop[1], oTop[0]])}" fill="${FILL2}" stroke="${EDGE}" stroke-width="1.4"/>`;
      s += `<polygon points="${P0([o[1], o[2], oTop[2], oTop[1]])}" fill="${FILL}" stroke="${EDGE}" stroke-width="1.4"/>`;
      // 顶面环（壁厚）
      s += `<polygon points="${P0([oTop[0], oTop[1], oTop[2], oTop[3]])}" fill="#3D6BC4" stroke="${EDGE}" stroke-width="1.4"/>`;
      s += `<polygon points="${P0([iTop[0], iTop[1], iTop[2], iTop[3]])}" fill="#0C1424" stroke="rgba(111,180,255,.5)" stroke-width="1"/>`;
      // 内壁
      s += `<polygon points="${P0([i0, i1, iTop[1], iTop[0]])}" fill="#16223A"/>`;
      s += `<polygon points="${P0([i1, i2, iTop[2], iTop[1]])}" fill="#101A2C"/>`;

      /* ── 缺陷 ── */
      const has = k => bad.some(b => b.k === k);

      // 短射：料没流满，边角留出未填充区
      if (has('short')) {
        s += `<polygon points="${P0([o[1], o[2], oTop[2], oTop[1]])}" fill="#0B0B0C" opacity=".72"/>`;
        s += `<path d="${(() => {
          const a = iso(L * .52, 0, Hh), b = iso(L, D * .44, Hh), c = iso(L * .78, D, 0);
          return `M${a[0]},${a[1]} L${b[0]},${b[1]} L${c[0]},${c[1]}`;
        })()}" stroke="#FF5A1F" stroke-width="2.5" stroke-dasharray="6 5" fill="none"/>`;
      }
      // 缩水：厚壁表面凹一块
      if (has('sink')) {
        const c = iso(L * .62, D, Hh * .45);
        s += `<ellipse cx="${c[0]}" cy="${c[1] + 4}" rx="${18 + th}" ry="${9 + th * .4}" fill="#0A0F1A" opacity=".8"/>`;
        s += `<ellipse cx="${c[0]}" cy="${c[1] + 4}" rx="${18 + th}" ry="${9 + th * .4}" fill="none" stroke="#FF5A1F" stroke-width="2"/>`;
      }
      // 拉伤：侧壁竖向刮痕
      if (has('drag')) {
        for (let i = 0; i < 7; i++) {
          const x = 14 + i * 17;
          const a = iso(x, D, Hh * .1), b = iso(x, D, Hh * .92);
          s += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#FF5A1F" stroke-width="1.8" opacity=".85"/>`;
        }
      }
      // 开裂：从尖角放射
      if (has('crack')) {
        const c = iso(L, 0, Hh * .5);
        for (let i = 0; i < 4; i++) {
          const a = (i - 1.5) * .5;
          s += `<line x1="${c[0]}" y1="${c[1]}" x2="${c[0] + Math.cos(a) * 34}" y2="${c[1] + Math.sin(a) * 34 + 10}"
                  stroke="#FF5A1F" stroke-width="2.2" stroke-linecap="round"/>`;
        }
      }
      // 合格：高光
      if (!bad.length) {
        const c = iso(L * .55, 0, Hh);
        s += `<ellipse cx="${c[0]}" cy="${c[1] + 6}" rx="34" ry="12" fill="#6EE7D7" opacity=".18"/>`;
      }
      return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="注塑零件模拟">${g(s)}</svg>`;
    }

    function render(state) {
      const bad = verdict();
      // 尺寸读数
      $$('[data-read]', root).forEach(el => {
        const k = el.dataset.read;
        const v = P[k];
        el.textContent = k === 'draft' ? v.toFixed(1) + '°' : v.toFixed(1) + ' mm';
      });
      // 参数条：标出合理区间
      $$('[data-range]', root).forEach(el => {
        const k = el.dataset.range;
        const [lo, hi] = LIM[k], [g1, g2] = GOOD[k];
        const pct = v => ((v - lo) / (hi - lo)) * 100;
        $('.pl-good', el).style.left = pct(g1) + '%';
        $('.pl-good', el).style.width = (pct(g2) - pct(g1)) + '%';
        $('.pl-knob', el).style.left = pct(P[k]) + '%';
      });
      $('[data-part]', root).innerHTML = part(state && state.show ? bad : []);
      // 只在「开模」之后显示结论；拖动时只显示形状
      const v = $('[data-verdict]', root);
      if (!state || !state.show) {
        v.className = 'pl-verdict is-idle';
        v.innerHTML = '<b>调好参数，按下「开模」。</b>做坏了不用赔钱 —— 这是这门课最便宜的地方。';
      } else if (!bad.length) {
        v.className = 'pl-verdict is-ok';
        v.innerHTML = `<b>✓ 合格件。</b>壁厚 ${P.wall.toFixed(1)} mm、拔模角 ${P.draft.toFixed(1)}°、圆角 ${P.r.toFixed(1)} mm —— 这三项都落在可成型的区间里。成型周期约 <b>${(18 + P.wall * 9).toFixed(0)} 秒</b>。`;
      } else {
        v.className = 'pl-verdict is-bad';
        v.innerHTML = bad.map(b => `<div class="pl-defect"><span>${b.名}</span>${b.因}</div>`).join('');
      }
      // 缺陷标签
      $$('[data-flag]', root).forEach(el => {
        const on = bad.some(b => b.k === el.dataset.flag) && state && state.show;
        el.classList.toggle('is-on', !!on);
      });
    }

    // 绑定滑块
    $$('input[type=range]', root).forEach(inp => {
      inp.addEventListener('input', () => {
        P[inp.dataset.k] = +inp.value;
        render({ show: false });
      });
    });

    // 开模：先合模 → 填充 → 顶出 → 结论
    const btn = $('[data-mold]', root);
    btn.addEventListener('click', () => {
      if (btn.disabled) return;
      btn.disabled = true;
      const stage = $('[data-stage]', root);
      const seq = ['合模', '填充', '冷却', '顶出'];
      let i = 0;
      stage.classList.add('is-run');
      const tick = setInterval(() => {
        stage.textContent = seq[i] || '';
        stage.dataset.i = i;
        i++;
        if (i > seq.length) {
          clearInterval(tick);
          stage.textContent = '';
          stage.classList.remove('is-run');
          btn.disabled = false;
          render({ show: true });
          const bad = verdict();
          root.dispatchEvent(new CustomEvent('molded', { detail: { bad } }));
        }
      }, 420);
    });

    render({ show: false });
    return { P, verdict, render };
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
