/* ═══════════════════════════════════════════════════════════
   手绘 SVG 技术图解
   有些概念照片永远讲不清楚 —— 拔模角、百分位、循环经济，
   只能画出来。全部矢量，离线可用，可任意缩放。
   ═══════════════════════════════════════════════════════════ */
window.DIAGRAMS = {

  /* ── 注塑三定律 ─────────────────────────────────────── */
  'molding': `<svg viewBox="0 0 900 340" role="img" aria-label="注塑成型的三条硬约束">
    <defs>
      <marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M0 0 L10 5 L0 10 z" fill="#FF5A1F"/>
      </marker>
      <marker id="ar2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M0 0 L10 5 L0 10 z" fill="#6EE7D7"/>
      </marker>
    </defs>

    <!-- ① 拔模角 -->
    <g transform="translate(10,34)">
      <rect x="0" y="0" width="270" height="250" rx="14" fill="rgba(244,241,234,.03)" stroke="rgba(244,241,234,.14)"/>
      <text x="20" y="32" fill="#FF5A1F" font-size="15" font-weight="700" font-family="system-ui">① 拔模角</text>
      <!-- 模具剖面上半 -->
      <path d="M62 72 L208 72 L197 118 L73 118 Z" fill="rgba(244,241,234,.10)" stroke="#F4F1EA" stroke-width="2"/>
      <!-- 制品 -->
      <path d="M73 118 L197 118 L188 146 L82 146 Z" fill="rgba(255,90,31,.30)" stroke="#FF5A1F" stroke-width="2"/>
      <!-- 模具剖面下半 -->
      <path d="M82 146 L188 146 L212 186 L58 186 Z" fill="rgba(244,241,234,.10)" stroke="#F4F1EA" stroke-width="2"/>
      <!-- 顶出方向 -->
      <line x1="135" y1="212" x2="135" y2="164" stroke="#6EE7D7" stroke-width="2.5" marker-end="url(#ar2)"/>
      <text x="146" y="210" fill="#6EE7D7" font-size="12.5" font-family="system-ui">顶出方向</text>
      <!-- 角度标注 -->
      <path d="M188 146 L216 146" stroke="#FF5A1F" stroke-width="1.5" stroke-dasharray="4 3"/>
      <path d="M188 146 L208 184" stroke="#FF5A1F" stroke-width="1.5" stroke-dasharray="4 3"/>
      <text x="220" y="172" fill="#FF5A1F" font-size="14" font-weight="700" font-family="system-ui">1–3°</text>
      <text x="22" y="222" fill="rgba(244,241,234,.55)" font-size="12.5" font-family="system-ui">没有这个斜度，</text>
      <text x="22" y="240" fill="rgba(244,241,234,.55)" font-size="12.5" font-family="system-ui">零件就拔不出来。</text>
    </g>

    <!-- ② 壁厚均匀 -->
    <g transform="translate(315,34)">
      <rect x="0" y="0" width="270" height="250" rx="14" fill="rgba(244,241,234,.03)" stroke="rgba(244,241,234,.14)"/>
      <text x="20" y="34" fill="#FF5A1F" font-size="15" font-weight="700" font-family="system-ui">② 壁厚均匀</text>
      <!-- 好的：均匀 -->
      <path d="M38 74 L118 74 L118 96 L60 96 L60 200 L118 200 L118 222 L38 222 Z" fill="rgba(110,231,215,.22)" stroke="#6EE7D7" stroke-width="2"/>
      <text x="66" y="160" fill="#6EE7D7" font-size="13" font-family="system-ui">均匀</text>
      <!-- 坏的：厚薄不均 + 缩水 -->
      <path d="M158 74 L238 74 L238 96 L180 96 L180 200 L238 200 L238 222 L158 222 Z" fill="rgba(255,90,31,.22)" stroke="#FF5A1F" stroke-width="2"/>
      <path d="M258 84 q-16 14 0 28" fill="none" stroke="#FF5A1F" stroke-width="2"/>
      <text x="196" y="164" fill="#FF5A1F" font-size="13" font-family="system-ui">缩水</text>
      <text x="20" y="230" fill="rgba(244,241,234,.55)" font-size="12.5" font-family="system-ui">厚的地方冷得慢，会塌陷。</text>
      <text x="20" y="248" fill="rgba(244,241,234,.55)" font-size="12.5" font-family="system-ui">所以加强筋比加厚更聪明。</text>
    </g>

    <!-- ③ 圆角 -->
    <g transform="translate(620,34)">
      <rect x="0" y="0" width="270" height="250" rx="14" fill="rgba(244,241,234,.03)" stroke="rgba(244,241,234,.14)"/>
      <text x="20" y="34" fill="#FF5A1F" font-size="15" font-weight="700" font-family="system-ui">③ 圆角</text>
      <!-- 尖角 -->
      <rect x="44" y="88" width="76" height="88" fill="rgba(255,90,31,.20)" stroke="#FF5A1F" stroke-width="2"/>
      <path d="M108 76 l24 24" stroke="#FF5A1F" stroke-width="2.5"/>
      <path d="M132 76 l-24 24" stroke="#FF5A1F" stroke-width="2.5"/>
      <text x="42" y="200" fill="#FF5A1F" font-size="12.5" font-family="system-ui">尖角＝应力集中</text>
      <!-- 圆角 -->
      <rect x="162" y="88" width="76" height="88" rx="20" ry="20" fill="rgba(110,231,215,.20)" stroke="#6EE7D7" stroke-width="2"/>
      <path d="M162 108 a20 20 0 0 1 20 -20" fill="none" stroke="#6EE7D7" stroke-width="3"/>
      <text x="160" y="200" fill="#6EE7D7" font-size="12.5" font-family="system-ui">圆角＝力顺下去</text>
      <text x="20" y="230" fill="rgba(244,241,234,.55)" font-size="12.5" font-family="system-ui">你在屏幕上画的每一个尖角，</text>
      <text x="20" y="248" fill="rgba(244,241,234,.55)" font-size="12.5" font-family="system-ui">在钢模上都是一个裂点。</text>
    </g>
  </svg>`,

  /* ── 人体百分位：平均人不存在 ────────────────────────── */
  'anthropometry': `<svg viewBox="0 0 900 360" role="img" aria-label="人体尺寸的分布与平均值的陷阱">
    <defs>
      <linearGradient id="band" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#6EE7D7" stop-opacity=".14"/>
        <stop offset=".5" stop-color="#F4F1EA" stop-opacity=".10"/>
        <stop offset="1" stop-color="#FF5A1F" stop-opacity=".14"/>
      </linearGradient>
    </defs>

    <!-- 分布曲线 -->
    <path d="M60 250 C 200 250, 260 96, 450 96 C 640 96, 700 250, 840 250"
          fill="url(#band)" stroke="rgba(244,241,234,.35)" stroke-width="2"/>
    <line x1="60" y1="250" x2="840" y2="250" stroke="rgba(244,241,234,.25)" stroke-width="2"/>

    <!-- 第5百分位女性 -->
    <g transform="translate(272,110)">
      <circle cx="0" cy="0" r="15" fill="none" stroke="#6EE7D7" stroke-width="2.5"/>
      <path d="M0 18 V74 M-17 40 H17 M0 74 L-13 128 M0 74 L13 128" stroke="#6EE7D7" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    </g>
    <text x="252" y="290" fill="#6EE7D7" font-size="13.5" font-weight="700" font-family="system-ui">第 5 百分位女性</text>
    <text x="252" y="310" fill="rgba(244,241,234,.5)" font-size="12" font-family="system-ui">100 个人里只有 5 个比她矮</text>

    <!-- 第95百分位男性 -->
    <g transform="translate(628,66)">
      <circle cx="0" cy="0" r="17" fill="none" stroke="#FF5A1F" stroke-width="2.5"/>
      <path d="M0 20 V84 M-19 44 H19 M0 84 L-15 150 M0 84 L15 150" stroke="#FF5A1F" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    </g>
    <text x="566" y="290" fill="#FF5A1F" font-size="13.5" font-weight="700" font-family="system-ui">第 95 百分位男性</text>
    <text x="566" y="310" fill="rgba(244,241,234,.5)" font-size="12" font-family="system-ui">100 个人里只有 5 个比他高</text>

    <!-- 中间：平均值 -->
    <line x1="450" y1="88" x2="450" y2="252" stroke="#FF5A1F" stroke-width="2" stroke-dasharray="6 5"/>
    <text x="392" y="76" fill="#FF5A1F" font-size="14" font-weight="700" font-family="system-ui">"平均人"</text>

    <!-- 椅子示意：按平均做的椅子，两头都不合身 -->
    <g transform="translate(348,196)">
      <path d="M0 0 h46 M0 0 v-26" stroke="rgba(244,241,234,.55)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <text x="58" y="4" fill="rgba(244,241,234,.55)" font-size="12" font-family="system-ui">按平均做的椅子</text>
    </g>

    <!-- 结论条 -->
    <rect x="60" y="326" width="780" height="26" rx="13" fill="rgba(255,90,31,.12)"/>
    <text x="450" y="344" fill="#FFB694" font-size="13.5" text-anchor="middle" font-family="system-ui">
      1952 年美军测了 4063 名飞行员，没有一个人同时符合 10 项平均尺寸 —— 按平均值设计，等于对谁都不合适
    </text>
  </svg>`,

  /* ── 线性经济 vs 循环设计 ───────────────────────────── */
  'circular': `<svg viewBox="0 0 900 320" role="img" aria-label="线性经济与循环设计的对比">
    <defs>
      <marker id="cr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M0 0 L10 5 L0 10 z" fill="#FF5A1F"/>
      </marker>
      <marker id="cg" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M0 0 L10 5 L0 10 z" fill="#6EE7D7"/>
      </marker>
    </defs>

    <!-- 左：线性 -->
    <text x="40" y="34" fill="#FF5A1F" font-size="15" font-weight="700" font-family="system-ui">线性：从摇篮到坟墓</text>
    <g transform="translate(40,60)">
      <rect x="0" y="0" width="360" height="200" rx="14" fill="rgba(255,90,31,.05)" stroke="rgba(255,90,31,.25)"/>
      <g font-size="12.5" font-family="system-ui" fill="rgba(244,241,234,.72)" text-anchor="middle">
        <rect x="22" y="66" width="62" height="40" rx="9" fill="rgba(244,241,234,.08)" stroke="rgba(244,241,234,.3)"/>
        <text x="53" y="91">开采</text>
        <rect x="106" y="66" width="62" height="40" rx="9" fill="rgba(244,241,234,.08)" stroke="rgba(244,241,234,.3)"/>
        <text x="137" y="91">制造</text>
        <rect x="190" y="66" width="62" height="40" rx="9" fill="rgba(244,241,234,.08)" stroke="rgba(244,241,234,.3)"/>
        <text x="221" y="91">使用</text>
        <rect x="274" y="66" width="62" height="40" rx="9" fill="rgba(255,90,31,.18)" stroke="#FF5A1F"/>
        <text x="305" y="91" fill="#FFB694">丢弃</text>
      </g>
      <line x1="84" y1="86" x2="104" y2="86" stroke="#FF5A1F" stroke-width="2" marker-end="url(#cr)"/>
      <line x1="168" y1="86" x2="188" y2="86" stroke="#FF5A1F" stroke-width="2" marker-end="url(#cr)"/>
      <line x1="252" y1="86" x2="272" y2="86" stroke="#FF5A1F" stroke-width="2" marker-end="url(#cr)"/>
      <!-- 垃圾堆 -->
      <path d="M262 168 l88 0 l-12 -34 l-64 0 z" fill="rgba(255,90,31,.28)" stroke="#FF5A1F" stroke-width="2"/>
      <text x="306" y="186" fill="#FFB694" font-size="12" font-family="system-ui" text-anchor="middle">三百年</text>
      <text x="180" y="172" fill="rgba(244,241,234,.45)" font-size="12.5" font-family="system-ui">设计只负责前两步，</text>
      <text x="180" y="190" fill="rgba(244,241,234,.45)" font-size="12.5" font-family="system-ui">后面的事没人管。</text>
    </g>

    <!-- 右：循环 -->
    <text x="500" y="34" fill="#6EE7D7" font-size="15" font-weight="700" font-family="system-ui">循环：从摇篮到摇篮</text>
    <g transform="translate(500,60)">
      <rect x="0" y="0" width="360" height="200" rx="14" fill="rgba(110,231,215,.05)" stroke="rgba(110,231,215,.25)"/>
      <g font-size="12.5" font-family="system-ui" text-anchor="middle">
        <rect x="26" y="52" width="72" height="38" rx="9" fill="rgba(110,231,215,.14)" stroke="#6EE7D7"/>
        <text x="62" y="76" fill="#A7F3E6">设计</text>
        <rect x="258" y="52" width="72" height="38" rx="9" fill="rgba(110,231,215,.14)" stroke="#6EE7D7"/>
        <text x="294" y="76" fill="#A7F3E6">制造</text>
        <rect x="258" y="132" width="72" height="38" rx="9" fill="rgba(110,231,215,.14)" stroke="#6EE7D7"/>
        <text x="294" y="156" fill="#A7F3E6">使用</text>
        <rect x="26" y="132" width="72" height="38" rx="9" fill="rgba(110,231,215,.14)" stroke="#6EE7D7"/>
        <text x="62" y="156" fill="#A7F3E6">维修·回收</text>
      </g>
      <line x1="102" y1="71" x2="254" y2="71" stroke="#6EE7D7" stroke-width="2" marker-end="url(#cg)"/>
      <line x1="294" y1="94" x2="294" y2="128" stroke="#6EE7D7" stroke-width="2" marker-end="url(#cg)"/>
      <line x1="254" y1="151" x2="102" y2="151" stroke="#6EE7D7" stroke-width="2" marker-end="url(#cg)"/>
      <line x1="62" y1="128" x2="62" y2="94" stroke="#6EE7D7" stroke-width="2" marker-end="url(#cg)"/>
      <text x="180" y="186" fill="rgba(244,241,234,.45)" font-size="12.5" font-family="system-ui" text-anchor="middle">设计的第一步就要想好最后一步。</text>
    </g>
  </svg>`,

  /* ── 公差叠加 ───────────────────────────────────────── */
  'tolerance': `<svg viewBox="0 0 900 300" role="img" aria-label="公差叠加：每多一个零件，误差就多一份">
    <defs>
      <marker id="tr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M0 0 L10 5 L0 10 z" fill="#F4F1EA"/>
      </marker>
    </defs>
    <text x="30" y="30" fill="#FF5A1F" font-size="15" font-weight="700" font-family="system-ui">公差叠加：每多一个零件，误差就多一份</text>

    <!-- 三个零件 -->
    <g transform="translate(30,60)">
      <rect x="0" y="0" width="150" height="52" rx="8" fill="rgba(244,241,234,.08)" stroke="rgba(244,241,234,.42)" stroke-width="2"/>
      <text x="75" y="33" fill="rgba(244,241,234,.8)" font-size="13" text-anchor="middle" font-family="system-ui">零件 A</text>
      <text x="75" y="74" fill="rgba(244,241,234,.45)" font-size="12" text-anchor="middle" font-family="system-ui">±0.10</text>

      <rect x="200" y="0" width="150" height="52" rx="8" fill="rgba(244,241,234,.08)" stroke="rgba(244,241,234,.42)" stroke-width="2"/>
      <text x="275" y="33" fill="rgba(244,241,234,.8)" font-size="13" text-anchor="middle" font-family="system-ui">零件 B</text>
      <text x="275" y="74" fill="rgba(244,241,234,.45)" font-size="12" text-anchor="middle" font-family="system-ui">±0.10</text>

      <rect x="400" y="0" width="150" height="52" rx="8" fill="rgba(244,241,234,.08)" stroke="rgba(244,241,234,.42)" stroke-width="2"/>
      <text x="475" y="33" fill="rgba(244,241,234,.8)" font-size="13" text-anchor="middle" font-family="system-ui">零件 C</text>
      <text x="475" y="74" fill="rgba(244,241,234,.45)" font-size="12" text-anchor="middle" font-family="system-ui">±0.10</text>

      <!-- 装配 -->
      <rect x="620" y="0" width="220" height="52" rx="8" fill="rgba(255,90,31,.16)" stroke="#FF5A1F" stroke-width="2"/>
      <text x="730" y="27" fill="#FFB694" font-size="13" text-anchor="middle" font-family="system-ui">装配后总误差</text>
      <text x="730" y="45" fill="#FF5A1F" font-size="14" font-weight="700" text-anchor="middle" font-family="system-ui">最多 ±0.30</text>

      <line x1="556" y1="26" x2="612" y2="26" stroke="#F4F1EA" stroke-width="2" marker-end="url(#tr)"/>
    </g>

    <!-- 提示 -->
    <g transform="translate(30,176)">
      <rect x="0" y="0" width="840" height="92" rx="14" fill="rgba(244,241,234,.035)" stroke="rgba(244,241,234,.13)"/>
      <text x="24" y="32" fill="#6EE7D7" font-size="14" font-weight="700" font-family="system-ui">每个零件都"合格"，装起来却可能不合格。</text>
      <text x="24" y="58" fill="rgba(244,241,234,.62)" font-size="13" font-family="system-ui">
        所以设计师的减法不是审美偏好，是成本与精度的算术：能把 3 个零件合成 1 个，就同时省掉了模具、装配工位、库存和两份公差。
      </text>
      <text x="24" y="80" fill="rgba(244,241,234,.45)" font-size="12.5" font-family="system-ui">
        宜家 Billy 书架只有一块板、几个螺丝 —— 这句话的背后是这个算式。
      </text>
    </g>
  </svg>`
};
