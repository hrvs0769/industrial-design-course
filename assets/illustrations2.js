/* ═══════════════════════════════════════════════════════════
   插画库（第三批）—— 按「最长无图中段」实测结果定点补图
   每一张都对应一个具体章节的空白，不是泛泛配图。
   ═══════════════════════════════════════════════════════════ */
(function () {
  const C = {
    line: 'rgba(244,241,234,.16)', line2: 'rgba(244,241,234,.34)',
    paper: '#F4F1EA', muted: 'rgba(244,241,234,.55)', faint: 'rgba(244,241,234,.34)',
    hot: '#FF5A1F', mint: '#6EE7D7', violet: '#A78BFA', amber: '#F5B841'
  };
  const F = 'font-family="system-ui,-apple-system,\'PingFang SC\',sans-serif"';

  const MORE = {

  /* ── 幸存者偏差：为什么要读失败 ─────────────────── */
  'survivorship': `<svg viewBox="0 0 900 430" role="img" aria-label="幸存者偏差与弹孔">
    <text x="0" y="22" fill="${C.hot}" font-size="15" font-weight="700" ${F}>只看活下来的，你会得到完全相反的结论</text>
    <text x="0" y="44" fill="${C.muted}" font-size="12.5" ${F}>二战时真实发生过的一件事。它解释了"为什么这一课要读失败"。</text>

    <g ${F}>
      <!-- 飞机 -->
      <g transform="translate(60,80)">
        <path d="M0 90 Q60 60 200 62 L300 70 Q340 76 340 90 Q340 104 300 110 L200 118 Q60 120 0 90 Z"
              fill="rgba(244,241,234,.07)" stroke="${C.line2}" stroke-width="2"/>
        <path d="M150 62 L120 -6 L160 -6 L190 62 Z" fill="rgba(244,241,234,.07)" stroke="${C.line2}" stroke-width="2"/>
        <path d="M150 118 L120 176 L160 176 L190 118 Z" fill="rgba(244,241,234,.07)" stroke="${C.line2}" stroke-width="2"/>
        <!-- 弹孔：集中在机身中段与机翼 -->
        <g fill="${C.hot}">
          <circle cx="60" cy="88" r="5"/><circle cx="86" cy="96" r="4.5"/><circle cx="104" cy="80" r="5"/>
          <circle cx="128" cy="100" r="4.5"/><circle cx="146" cy="86" r="5"/><circle cx="170" cy="98" r="4.5"/>
          <circle cx="196" cy="84" r="5"/><circle cx="222" cy="100" r="4.5"/><circle cx="248" cy="88" r="5"/>
          <circle cx="272" cy="98" r="4.5"/><circle cx="296" cy="90" r="5"/>
          <circle cx="136" cy="24" r="4.5"/><circle cx="152" cy="44" r="4.5"/>
          <circle cx="140" cy="150" r="4.5"/><circle cx="156" cy="132" r="4.5"/>
        </g>
        <text x="170" y="212" fill="${C.paper}" font-size="13" font-weight="700" text-anchor="middle">返航的飞机：弹孔全在机身上</text>
        <text x="170" y="232" fill="${C.muted}" font-size="11.5" text-anchor="middle">（这是你唯一能看见的数据）</text>
      </g>

      <!-- 常见错误结论 -->
      <g transform="translate(450,80)">
        <rect x="0" y="0" width="390" height="104" rx="12" fill="rgba(255,90,31,.08)" stroke="rgba(255,90,31,.32)"/>
        <text x="20" y="28" fill="${C.hot}" font-size="13" font-weight="700">✗ 第一反应：这些地方中弹最多</text>
        <text x="20" y="54" fill="${C.paper}" font-size="12.5">那就给机身和机翼加装甲。</text>
        <text x="20" y="80" fill="#FFB694" font-size="12">—— 这是错的。而且会害死人。</text>
      </g>
      <g transform="translate(450,196)">
        <rect x="0" y="0" width="390" height="104" rx="12" fill="rgba(110,231,215,.08)" stroke="rgba(110,231,215,.32)"/>
        <text x="20" y="28" fill="${C.mint}" font-size="13" font-weight="700">✓ 统计学家 Abraham Wald 的反问</text>
        <text x="20" y="54" fill="${C.paper}" font-size="12.5">"没中弹的地方，为什么没有弹孔？"</text>
        <text x="20" y="80" fill="#A7F3E6" font-size="12">因为打中那里的飞机，根本没飞回来。</text>
      </g>

      <!-- 结论 -->
      <rect x="450" y="312" width="390" height="66" rx="12" fill="rgba(167,139,250,.10)" stroke="rgba(167,139,250,.35)"/>
      <text x="470" y="338" fill="${C.violet}" font-size="13" font-weight="700">要加固的，恰恰是弹孔最少的位置。</text>
      <text x="470" y="362" fill="${C.paper}" font-size="12.5">学习失败也是一样：能讲给你听的失败，都是"活着回来的"。</text>
    </g>
  </svg>`,

  /* ── 平均人不存在：1952 年飞行员研究 ─────────────── */
  'pilot-study': `<svg viewBox="0 0 900 430" role="img" aria-label="平均人为什么不存在">
    <text x="0" y="22" fill="${C.hot}" font-size="15" font-weight="700" ${F}>"按平均尺寸设计"为什么必然失败</text>
    <text x="0" y="44" fill="${C.muted}" font-size="12.5" ${F}>1952 年，美国空军量了 4063 名飞行员。下面是 10 项尺寸各自的分布。</text>

    <!-- 10 条正态曲线 -->
    <g transform="translate(60,74)">
      ${[0,1,2,3,4,5,6,7,8,9].map(i => {
        const x = i * 78;
        const h = [46,52,44,50,42,48,45,51,43,47][i];
        return `<g transform="translate(${x},0)">
          <path d="M2 70 Q 30 ${70-h} 37 12 Q 44 ${70-h} 72 70" fill="none" stroke="${C.mint}" stroke-width="2"/>
          <line x1="37" y1="12" x2="37" y2="74" stroke="${C.hot}" stroke-width="2"/>
          <text x="37" y="92" fill="${C.faint}" font-size="10" text-anchor="middle" ${F}>${['身高','臂长','腿长','坐高','胸围','肩宽','手长','脚长','颈围','腰围'][i]}</text>
        </g>`;
      }).join('\n      ')}
      <!-- 平均水平线 -->
      <line x1="-20" y1="12" x2="720" y2="12" stroke="${C.hot}" stroke-width="2" stroke-dasharray="7 5"/>
      <text x="726" y="16" fill="${C.hot}" font-size="11.5" ${F}>平均</text>
    </g>

    <!-- 结论 -->
    <g ${F}>
      <rect x="60" y="196" width="780" height="96" rx="14" fill="rgba(255,90,31,.09)" stroke="rgba(255,90,31,.32)"/>
      <text x="84" y="226" fill="${C.hot}" font-size="14" font-weight="700">把 10 项"都在平均值附近"设为合格标准，同时满足的人有多少？</text>
      <text x="84" y="264" fill="${C.paper}" font-size="34" font-weight="800">0 人</text>
      <text x="176" y="264" fill="${C.muted}" font-size="13">／ 4063 名飞行员</text>
      <text x="84" y="284" fill="${C.faint}" font-size="11.5">不是"很少"，是一个都没有。座舱按平均尺寸造，就意味着一架飞机上没有一个人是合身的。</text>

      <rect x="60" y="308" width="380" height="106" rx="12" fill="rgba(110,231,215,.07)" stroke="rgba(110,231,215,.3)"/>
      <text x="82" y="334" fill="${C.mint}" font-size="13" font-weight="700">✓ 空军的解法：不要"平均"，要"可调"</text>
      <g font-size="12" fill="${C.paper}">
        <text x="82" y="360">· 座椅前后可调</text>
        <text x="82" y="382">· 脚踏板可调</text>
        <text x="82" y="404">· 安全带可调</text>
      </g>

      <rect x="460" y="308" width="380" height="106" rx="12" fill="rgba(244,241,234,.05)" stroke="${C.line}"/>
      <text x="482" y="334" fill="${C.paper}" font-size="13" font-weight="700">这条结论，今天你身边到处都是</text>
      <g font-size="12" fill="${C.muted}">
        <text x="482" y="360">汽车座椅、办公椅的气压杆</text>
        <text x="482" y="382">显示器支架、手机字体大小</text>
        <text x="482" y="404" fill="${C.mint}">→ 凡是"一个人一个样"的，都别做死</text>
      </g>
    </g>
  </svg>`,

  /* ── 去哪儿上班：工业设计毕业生的五条路 ─────────── */
  'career-map': `<svg viewBox="0 0 900 440" role="img" aria-label="工业设计师的就业去向">
    <text x="0" y="22" fill="${C.hot}" font-size="15" font-weight="700" ${F}>"工业设计师"不是一种工作，是五种</text>
    <text x="0" y="44" fill="${C.muted}" font-size="12.5" ${F}>同一个专业毕业，去的地方不同，每天做的事几乎不重叠。横轴是"你离工厂有多近"。</text>

    <!-- 轴 -->
    <line x1="70" y1="330" x2="830" y2="330" stroke="${C.line2}" stroke-width="1.5"/>
    <text x="70" y="352" fill="${C.faint}" font-size="11.5" ${F}>离工厂远 · 离用户近</text>
    <text x="700" y="352" fill="${C.faint}" font-size="11.5" ${F}>离工厂近 · 离用户远</text>

    <g ${F}>
      <!-- 五个站位 -->
      <g transform="translate(70,86)">
        <rect x="0" y="0" width="146" height="216" rx="12" fill="rgba(167,139,250,.08)" stroke="rgba(167,139,250,.35)"/>
        <text x="73" y="28" fill="${C.violet}" font-size="12.5" font-weight="700" text-anchor="middle">互联网 / 硬件</text>
        <text x="14" y="54" fill="${C.paper}" font-size="11.5">做整机体验</text>
        <text x="14" y="76" fill="${C.faint}" font-size="11">手机、家电、可穿戴</text>
        <text x="14" y="106" fill="${C.muted}" font-size="11">画图占</text>
        <text x="14" y="126" fill="${C.mint}" font-size="13" font-weight="700">25%</text>
        <text x="14" y="154" fill="${C.muted}" font-size="11">大量时间在</text>
        <text x="14" y="174" fill="${C.paper}" font-size="11">跟软件、结构、供应链</text>
        <text x="14" y="192" fill="${C.paper}" font-size="11">三方对齐</text>
      </g>

      <g transform="translate(228,86)">
        <rect x="0" y="0" width="146" height="216" rx="12" fill="rgba(110,231,215,.08)" stroke="rgba(110,231,215,.35)"/>
        <text x="73" y="28" fill="${C.mint}" font-size="12.5" font-weight="700" text-anchor="middle">设计咨询（乙方）</text>
        <text x="14" y="54" fill="${C.paper}" font-size="11.5">一年做 6–10 个项目</text>
        <text x="14" y="76" fill="${C.faint}" font-size="11">客户来自各行各业</text>
        <text x="14" y="106" fill="${C.muted}" font-size="11">画图占</text>
        <text x="14" y="126" fill="${C.mint}" font-size="13" font-weight="700">40%</text>
        <text x="14" y="154" fill="${C.muted}" font-size="11">大量时间在</text>
        <text x="14" y="174" fill="${C.paper}" font-size="11">提案、讲方案、</text>
        <text x="14" y="192" fill="${C.paper}" font-size="11">被推翻再重来</text>
      </g>

      <g transform="translate(386,86)">
        <rect x="0" y="0" width="146" height="216" rx="12" fill="rgba(255,90,31,.09)" stroke="rgba(255,90,31,.4)"/>
        <text x="73" y="28" fill="${C.hot}" font-size="12.5" font-weight="700" text-anchor="middle">制造业（甲方）</text>
        <text x="14" y="54" fill="${C.paper}" font-size="11.5">一个产品线跟 3–5 年</text>
        <text x="14" y="76" fill="${C.faint}" font-size="11">家电、工具、家具</text>
        <text x="14" y="106" fill="${C.muted}" font-size="11">画图占</text>
        <text x="14" y="126" fill="${C.hot}" font-size="13" font-weight="700">20%</text>
        <text x="14" y="154" fill="${C.muted}" font-size="11">大量时间在</text>
        <text x="14" y="174" fill="${C.paper}" font-size="11">降成本、改模具、</text>
        <text x="14" y="192" fill="${C.paper}" font-size="11">处理量产问题</text>
      </g>

      <g transform="translate(544,86)">
        <rect x="0" y="0" width="146" height="216" rx="12" fill="rgba(245,184,65,.08)" stroke="rgba(245,184,65,.35)"/>
        <text x="73" y="28" fill="${C.amber}" font-size="12.5" font-weight="700" text-anchor="middle">创业 / 独立</text>
        <text x="14" y="54" fill="${C.paper}" font-size="11.5">从 0 做一个东西</text>
        <text x="14" y="76" fill="${C.faint}" font-size="11">风险最高，也最自由</text>
        <text x="14" y="106" fill="${C.muted}" font-size="11">画图占</text>
        <text x="14" y="126" fill="${C.amber}" font-size="13" font-weight="700">35%</text>
        <text x="14" y="154" fill="${C.muted}" font-size="11">大量时间在</text>
        <text x="14" y="174" fill="${C.paper}" font-size="11">找钱、找供应链、</text>
        <text x="14" y="192" fill="${C.paper}" font-size="11">自己卖货</text>
      </g>

      <g transform="translate(702,86)">
        <rect x="0" y="0" width="146" height="216" rx="12" fill="rgba(244,241,234,.05)" stroke="${C.line2}"/>
        <text x="73" y="28" fill="${C.paper}" font-size="12.5" font-weight="700" text-anchor="middle">设计管理</text>
        <text x="14" y="54" fill="${C.paper}" font-size="11.5">带团队、定方向</text>
        <text x="14" y="76" fill="${C.faint}" font-size="11">通常 8 年后才轮到</text>
        <text x="14" y="106" fill="${C.muted}" font-size="11">画图占</text>
        <text x="14" y="126" fill="${C.paper}" font-size="13" font-weight="700">&lt;10%</text>
        <text x="14" y="154" fill="${C.muted}" font-size="11">大量时间在</text>
        <text x="14" y="174" fill="${C.paper}" font-size="11">招人、定标准、</text>
        <text x="14" y="192" fill="${C.paper}" font-size="11">向上争取资源</text>
      </g>

      <!-- 底部提示 -->
      <rect x="70" y="372" width="778" height="54" rx="12" fill="rgba(110,231,215,.07)" stroke="rgba(110,231,215,.28)"/>
      <text x="90" y="396" fill="${C.mint}" font-size="12.5" font-weight="700">注意最后两栏的"画图占"：越往上走，手上越少。</text>
      <text x="90" y="416" fill="${C.paper}" font-size="12.5">所以从大一开始要练的，不只是手，还有"把想法说清楚"的能力。</text>
    </g>
  </svg>`,

  /* ── 能力金字塔：AI 时代该练什么 ─────────────────── */
  'skill-tree': `<svg viewBox="0 0 900 400" role="img" aria-label="设计能力的三层结构">
    <text x="0" y="22" fill="${C.hot}" font-size="15" font-weight="700" ${F}>三层能力，被替代的难度差很多</text>
    <text x="0" y="44" fill="${C.muted}" font-size="12.5" ${F}>下面一层最容易被工具拿走，上面一层最难。而学校的作业，往往只考最下面一层。</text>

    <g ${F}>
      <!-- 金字塔三层 -->
      <g transform="translate(60,72)">
        <!-- 顶 -->
        <path d="M245 0 L340 96 L150 96 Z" fill="rgba(255,90,31,.16)" stroke="${C.hot}" stroke-width="2"/>
        <text x="245" y="52" fill="${C.hot}" font-size="13.5" font-weight="700" text-anchor="middle">定义问题</text>
        <text x="245" y="74" fill="#FFB694" font-size="11" text-anchor="middle">问对问题</text>
        <!-- 中 -->
        <path d="M150 100 L340 100 L435 196 L55 196 Z" fill="rgba(110,231,215,.13)" stroke="${C.mint}" stroke-width="2"/>
        <text x="245" y="140" fill="${C.mint}" font-size="13.5" font-weight="700" text-anchor="middle">判断</text>
        <text x="245" y="162" fill="#A7F3E6" font-size="11" text-anchor="middle">在冲突的约束里取舍：便宜还是耐用？</text>
        <text x="245" y="182" fill="#A7F3E6" font-size="11" text-anchor="middle">哪个方案更值得做？代价是什么？</text>
        <!-- 底 -->
        <path d="M55 200 L435 200 L530 296 L0 296 L0 296 Z" fill="rgba(244,241,234,.06)" stroke="${C.line2}" stroke-width="2"/>
        <text x="245" y="240" fill="${C.paper}" font-size="13.5" font-weight="700" text-anchor="middle">工具与技能</text>
        <text x="245" y="264" fill="${C.muted}" font-size="11" text-anchor="middle">建模、渲染、出图、排版、写文案</text>
        <text x="245" y="284" fill="${C.faint}" font-size="11" text-anchor="middle">← 这一层正在被 AI 快速拿走</text>
      </g>

      <!-- 右侧对照 -->
      <g transform="translate(620,72)">
        <rect x="0" y="0" width="220" height="140" rx="12" fill="rgba(255,90,31,.09)" stroke="rgba(255,90,31,.35)"/>
        <text x="18" y="26" fill="${C.hot}" font-size="12.5" font-weight="700">AI 现在的水平</text>
        <g font-size="11.5">
          <text x="18" y="52" fill="${C.paper}">底层：已经很熟</text>
          <text x="18" y="74" fill="${C.faint}">甚至比你快 100 倍</text>
          <text x="18" y="102" fill="${C.paper}">中层：只能给参考</text>
          <text x="18" y="124" fill="${C.faint}">它不知道你老板是谁</text>
        </g>
        <rect x="0" y="156" width="220" height="140" rx="12" fill="rgba(110,231,215,.09)" stroke="rgba(110,231,215,.35)"/>
        <text x="18" y="182" fill="${C.mint}" font-size="12.5" font-weight="700">所以大一该做的事</text>
        <g font-size="11.5" fill="${C.paper}">
          <text x="18" y="208">· 工具照样要学，但别当终点</text>
          <text x="18" y="232">· 每做一个东西，逼自己写</text>
          <text x="18" y="250" fill="${C.faint}">　"我放弃了什么、为什么"</text>
          <text x="18" y="276">· 这个习惯，AI 替不了</text>
        </g>
      </g>
    </g>
  </svg>`,

  /* ── 产品的一生：每个阶段谁能改变什么 ───────────── */
  'product-life': `<svg viewBox="0 0 900 420" role="img" aria-label="产品一生各阶段的环境影响">
    <text x="0" y="22" fill="${C.hot}" font-size="15" font-weight="700" ${F}>一件东西的一生，以及设计师能在哪里动手</text>
    <text x="0" y="44" fill="${C.muted}" font-size="12.5" ${F}>下面柱子的高度，是每个阶段对环境的实际影响。注意：决定这些柱子的时间点在最左边。</text>

    <g ${F}>
      <!-- 阶段条 -->
      <line x1="60" y1="300" x2="850" y2="300" stroke="${C.line2}" stroke-width="1.5"/>
      <g>
        ${[['开采','石油 / 矿石 / 木材',44],['制造','注塑 / 冲压 / 组装',150],['运输','卡车 / 轮船 / 仓储',86],['使用','耗电 / 耗水 / 洗护',132],['维修','换件 / 上门 / 返厂',38],['报废','填埋 / 焚烧 / 回收',108]]
          .map((s, i) => {
            const x = 66 + i * 132;
            const h = s[2];
            const col = i === 1 || i === 5 ? C.hot : C.violet;
            return `<g transform="translate(${x},0)">
              <rect x="0" y="${300 - h}" width="104" height="${h}" rx="6" fill="${col}" opacity="${i === 1 || i === 5 ? '.85' : '.5'}"/>
              <text x="52" y="${300 - h - 10}" fill="${C.paper}" font-size="12.5" font-weight="700" text-anchor="middle">${s[0]}</text>
              <text x="52" y="322" fill="${C.faint}" font-size="10.5" text-anchor="middle">${s[1]}</text>
            </g>`;
          }).join('\n        ')}
      </g>

      <!-- 影响力标注 -->
      <rect x="60" y="70" width="290" height="112" rx="12" fill="rgba(255,90,31,.10)" stroke="${C.hot}" stroke-width="1.5"/>
      <text x="82" y="96" fill="${C.hot}" font-size="13" font-weight="700">画图的那几周，决定了全部</text>
      <g font-size="11.5" fill="${C.paper}">
        <text x="82" y="122">· 用几种材料（能不能拆开）</text>
        <text x="82" y="144">· 用什么连接（胶粘还是螺丝）</text>
        <text x="82" y="166">· 能不能修（备件好不好换）</text>
      </g>
      <path d="M205 182 L205 232" stroke="${C.hot}" stroke-width="2" stroke-dasharray="5 4"/>
      <path d="M200 232 l5 -9 h-10 z" fill="${C.hot}"/>

      <rect x="500" y="70" width="350" height="112" rx="12" fill="rgba(110,231,215,.08)" stroke="rgba(110,231,215,.35)"/>
      <text x="522" y="96" fill="${C.mint}" font-size="13" font-weight="700">约 80% 的环境影响，在这里就被锁定</text>
      <text x="522" y="124" fill="${C.paper}" font-size="12">这句话现在写进了欧盟的法规和</text>
      <text x="522" y="146" fill="${C.paper}" font-size="12">很多大公司的考核指标。</text>
      <text x="522" y="170" fill="${C.mint}" font-size="11.5">不是"环保部门"的事，是设计师的事。</text>
    </g>
  </svg>`,

  /* ── 事前验尸 ───────────────────────────────────── */
  'premortem': `<svg viewBox="0 0 900 400" role="img" aria-label="事前验尸怎么做">
    <text x="0" y="22" fill="${C.hot}" font-size="15" font-weight="700" ${F}>把"万一失败"提前到今天开一次会</text>
    <text x="0" y="44" fill="${C.muted}" font-size="12.5" ${F}>心理学上叫 premortem（事前验尸）。它比"风险评估"有效得多，原因在下面。</text>

    <g ${F}>
      <!-- 时间轴 -->
      <line x1="70" y1="96" x2="830" y2="96" stroke="${C.line2}" stroke-width="2"/>
      <circle cx="110" cy="96" r="9" fill="${C.mint}"/>
      <text x="110" y="76" fill="${C.mint}" font-size="12.5" font-weight="700" text-anchor="middle">今天</text>
      <text x="110" y="122" fill="${C.muted}" font-size="11.5" text-anchor="middle">项目刚立项</text>

      <circle cx="820" cy="96" r="9" fill="${C.hot}"/>
      <text x="820" y="76" fill="${C.hot}" font-size="12.5" font-weight="700" text-anchor="middle">18 个月后</text>
      <text x="790" y="122" fill="${C.muted}" font-size="11.5" text-anchor="middle">假设它彻底失败了</text>

      <path d="M130 96 L800 96" stroke="${C.hot}" stroke-width="2" stroke-dasharray="7 5"/>

      <!-- 会议内容 -->
      <rect x="70" y="146" width="380" height="150" rx="12" fill="rgba(255,90,31,.08)" stroke="rgba(255,90,31,.32)"/>
      <text x="92" y="172" fill="${C.hot}" font-size="13" font-weight="700">会上的唯一问题</text>
      <text x="92" y="202" fill="${C.paper}" font-size="13">"假设现在是 18 个月后，</text>
      <text x="92" y="224" fill="${C.paper}" font-size="13">这个产品已经彻底失败了。</text>
      <text x="92" y="246" fill="${C.hot}" font-size="13" font-weight="700">请写下它是怎么失败的。"</text>
      <text x="92" y="276" fill="${C.faint}" font-size="11.5">注意用的是"已经"，不是"可能"。</text>

      <rect x="470" y="146" width="380" height="150" rx="12" fill="rgba(110,231,215,.08)" stroke="rgba(110,231,215,.32)"/>
      <text x="492" y="172" fill="${C.mint}" font-size="13" font-weight="700">为什么"已经"这两个字是关键</text>
      <g font-size="12" fill="${C.paper}">
        <text x="492" y="200">问"可能有什么风险"，人会客气：</text>
        <text x="492" y="222" fill="${C.faint}">"应该问题不大吧。"</text>
        <text x="492" y="252">问"它是怎么死的"，人就开始推理：</text>
        <text x="492" y="276" fill="${C.mint}">"……模具那关肯定过不去。"</text>
      </g>

      <!-- 产出 -->
      <rect x="70" y="316" width="780" height="62" rx="12" fill="rgba(244,241,234,.05)" stroke="${C.line}"/>
      <text x="92" y="342" fill="${C.paper}" font-size="12.5" font-weight="700">会议产出：一张按概率排序的死因清单。</text>
      <text x="92" y="366" fill="${C.muted}" font-size="12.5">今天花 40 分钟，比 18 个月后花 400 万便宜得多。前三个死因，现在就派人对付它们。</text>
    </g>
  </svg>`,

  /* ── 注意力的盲区：大猩猩实验 ───────────────────── */
  'attention-test': `<svg viewBox="0 0 900 420" role="img" aria-label="非注意盲视实验">
    <text x="0" y="22" fill="${C.hot}" font-size="15" font-weight="700" ${F}>你看见了，不等于它进了你的脑子</text>
    <text x="0" y="44" fill="${C.muted}" font-size="12.5" ${F}>1999 年一个著名实验：让人数传球次数，结果一半的人没看见画面里走过一只大猩猩。</text>

    <g ${F}>
      <!-- 画面框 -->
      <rect x="60" y="72" width="380" height="250" rx="14" fill="#0E0E10" stroke="${C.line2}"/>
      <!-- 白队 -->
      <g fill="${C.paper}">
        <circle cx="120" cy="140" r="11"/><circle cx="200" cy="180" r="11"/><circle cx="150" cy="240" r="11"/>
      </g>
      <!-- 黑队 -->
      <g fill="#3A3A40">
        <circle cx="290" cy="130" r="11"/><circle cx="340" cy="210" r="11"/><circle cx="260" cy="270" r="11"/>
      </g>
      <!-- 球 -->
      <circle cx="228" cy="158" r="8" fill="${C.amber}"/>
      <path d="M170 150 Q200 140 220 156" stroke="${C.amber}" stroke-width="2" fill="none" stroke-dasharray="4 3"/>
      <!-- 注视十字 -->
      <g stroke="${C.mint}" stroke-width="2">
        <line x1="240" y1="160" x2="256" y2="160"/><line x1="248" y1="152" x2="248" y2="168"/>
      </g>
      <!-- 大猩猩 -->
      <g transform="translate(300,196)" opacity=".9">
        <ellipse cx="0" cy="0" rx="26" ry="32" fill="#121215" stroke="${C.hot}" stroke-width="2.5"/>
        <circle cx="-10" cy="-30" r="12" fill="#121215" stroke="${C.hot}" stroke-width="2.5"/>
        <circle cx="8" cy="-30" r="12" fill="#121215" stroke="${C.hot}" stroke-width="2.5"/>
      </g>
      <text x="250" y="304" fill="${C.hot}" font-size="12" font-weight="700" text-anchor="middle">大猩猩在这里走过 5 秒</text>
      <text x="250" y="70" fill="${C.faint}" font-size="11" text-anchor="middle">任务：数白队传了几次球</text>

      <!-- 数据 -->
      <g transform="translate(480,72)">
        <rect x="0" y="0" width="370" height="118" rx="12" fill="rgba(255,90,31,.09)" stroke="rgba(255,90,31,.32)"/>
        <text x="20" y="28" fill="${C.hot}" font-size="13" font-weight="700">实验结果</text>
        <text x="20" y="60" fill="${C.paper}" font-size="13">约 <tspan fill="${C.hot}" font-size="20" font-weight="800">50%</tspan> 的人完全没有见那只猩猩。</text>
        <text x="20" y="86" fill="${C.muted}" font-size="12">不是眼睛没接收到，是脑子没有分配注意力给它。</text>
        <text x="20" y="106" fill="${C.faint}" font-size="11.5">（这个现象叫"非注意盲视"）</text>

        <rect x="0" y="134" width="370" height="116" rx="12" fill="rgba(110,231,215,.08)" stroke="rgba(110,231,215,.32)"/>
        <text x="20" y="162" fill="${C.mint}" font-size="13" font-weight="700">它对你的意义，比你想的大</text>
        <g font-size="12" fill="${C.paper}">
          <text x="20" y="188">· 用户说的"我没注意"，常常是真的</text>
          <text x="20" y="212">· 你自己也一样 —— 熟悉的东西会消失</text>
          <text x="20" y="236" fill="${C.mint}">→ 所以"看"必须被训练，不能靠本能</text>
        </g>
      </g>
    </g>
  </svg>`
  };

  window.DIAGRAMS = Object.assign(window.DIAGRAMS || {}, MORE);
})();
