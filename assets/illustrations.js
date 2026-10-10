/* ═══════════════════════════════════════════════════════════
   插画库（第二批）
   技术图解之外，还有一类图能救"只有文字"的课：
   把抽象过程画成看得见的东西 —— 用户旅程、成本曲线、
   一天的时间账、失败的生命周期曲线。
   全部矢量，离线可用。
   ═══════════════════════════════════════════════════════════ */
(function () {
  const C = {
    line: 'rgba(244,241,234,.16)',
    line2: 'rgba(244,241,234,.34)',
    paper: '#F4F1EA',
    muted: 'rgba(244,241,234,.55)',
    faint: 'rgba(244,241,234,.34)',
    hot: '#FF5A1F',
    mint: '#6EE7D7',
    violet: '#A78BFA',
    amber: '#F5B841'
  };
  const F = 'font-family="system-ui,-apple-system,\'PingFang SC\',sans-serif"';

  const MORE = {
  'designer-day': `<svg viewBox="0 0 900 400" role="img" aria-label="工业设计师一天的时间分配">
    <text x="0" y="22" fill="${C.hot}" font-size="15" font-weight="700" ${F}>一个工业设计师真实的一天</text>
    <text x="0" y="44" fill="${C.muted}" font-size="12.5" ${F}>画图只占五分之一。剩下的是把"我觉得"翻译成别人能点头的话。</text>

    <!-- 时间轴 -->
    <line x1="0" y1="92" x2="860" y2="92" stroke="${C.line}" stroke-width="2"/>
    <g font-size="11" fill="${C.faint}" ${F} text-anchor="middle">
      <text x="10" y="82">9:00</text><text x="180" y="82">11:00</text>
      <text x="360" y="82">13:00</text><text x="540" y="82">15:00</text>
      <text x="720" y="82">17:00</text><text x="855" y="82">19:00</text>
    </g>

    <!-- 时间块 -->
    <g ${F}>
      <rect x="10" y="100" width="150" height="52" rx="8" fill="rgba(255,90,31,.28)" stroke="${C.hot}" stroke-width="1.5"/>
      <text x="85" y="122" fill="#FFD3C2" font-size="12.5" font-weight="700" text-anchor="middle">站会 + 对齐</text>
      <text x="85" y="140" fill="rgba(255,211,194,.75)" font-size="11" text-anchor="middle">40 分钟</text>

      <rect x="168" y="100" width="180" height="52" rx="8" fill="rgba(167,139,250,.24)" stroke="${C.violet}" stroke-width="1.5"/>
      <text x="258" y="122" fill="#DCD0FF" font-size="12.5" font-weight="700" text-anchor="middle">跟结构工程师吵公差</text>
      <text x="258" y="140" fill="rgba(220,208,255,.75)" font-size="11" text-anchor="middle">1 小时 50 分</text>

      <rect x="356" y="100" width="120" height="52" rx="8" fill="rgba(110,231,215,.24)" stroke="${C.mint}" stroke-width="1.5"/>
      <text x="416" y="126" fill="#B8F5EC" font-size="12.5" font-weight="700" text-anchor="middle">改图</text>

      <rect x="484" y="100" width="130" height="52" rx="8" fill="rgba(245,184,65,.22)" stroke="${C.amber}" stroke-width="1.5"/>
      <text x="549" y="122" fill="#FBE0A8" font-size="12.5" font-weight="700" text-anchor="middle">看成本表</text>
      <text x="549" y="140" fill="rgba(251,224,168,.75)" font-size="11" text-anchor="middle">改 3 个方案</text>

      <rect x="622" y="100" width="140" height="52" rx="8" fill="rgba(255,90,31,.28)" stroke="${C.hot}" stroke-width="1.5"/>
      <text x="692" y="122" fill="#FFD3C2" font-size="12.5" font-weight="700" text-anchor="middle">给供应商打电话</text>
      <text x="692" y="140" fill="rgba(255,211,194,.75)" font-size="11" text-anchor="middle">问能不能做</text>
    </g>

    <!-- 占比条 -->
    <text x="0" y="206" fill="${C.paper}" font-size="13.5" font-weight="700" ${F}>这一天真正"在设计"的部分：</text>
    <g transform="translate(0,222)">
      <rect x="0" y="0" width="760" height="34" rx="6" fill="rgba(244,241,234,.06)"/>
      <rect x="0"   y="0" width="118" height="34" rx="6" fill="${C.faint}"/>
      <rect x="118" y="0" width="262" height="34" fill="${C.violet}"/>
      <rect x="380" y="0" width="150" height="34" fill="${C.mint}"/>
      <rect x="530" y="0" width="150" height="34" fill="${C.amber}"/>
      <rect x="680" y="0" width="80"  height="34" rx="6" fill="${C.hot}"/>
      <g font-size="12" font-weight="700" ${F}>
        <text x="59"  y="22" fill="#0B0B0C" text-anchor="middle">行政</text>
        <text x="249" y="22" fill="#150B2E" text-anchor="middle">沟通 · 说服</text>
        <text x="455" y="22" fill="#04241F" text-anchor="middle">画图</text>
        <text x="605" y="22" fill="#2A1B02" text-anchor="middle">成本 · 工艺</text>
        <text x="720" y="22" fill="#150500" text-anchor="middle">测试</text>
      </g>
    </g>
    <text x="0" y="292" fill="${C.muted}" font-size="12.5" ${F}>学校里的作业，只有中间那一段。所以第一份工作最容易打击人的，不是画不出来，</text>
    <text x="0" y="312" fill="${C.muted}" font-size="12.5" ${F}>而是发现"画得好"只占能力的一小块。</text>

    <rect x="0" y="336" width="860" height="52" rx="12" fill="rgba(110,231,215,.07)" stroke="rgba(110,231,215,.24)"/>
    <text x="20" y="358" fill="${C.mint}" font-size="13" font-weight="700" ${F}>一个反常识的数字：</text>
    <text x="20" y="378" fill="${C.paper}" font-size="13" ${F}>面试官平均只看你作品集的 3–5 分钟。他要找的不是渲染图，是"你怎么发现这个问题"。</text>
  </svg>`,

  'portfolio': `<svg viewBox="0 0 900 420" role="img" aria-label="作品集一页应该包含什么">
    <text x="0" y="22" fill="${C.hot}" font-size="15" font-weight="700" ${F}>作品集里的一页，应该是一条完整的推理链</text>
    <text x="0" y="44" fill="${C.muted}" font-size="12.5" ${F}>不是一张漂亮的效果图，而是让人看见你的判断过程。</text>

    <g transform="translate(0,66)">
      <!-- 左右对照 -->
      <rect x="0" y="0" width="410" height="300" rx="14" fill="rgba(255,90,31,.06)" stroke="rgba(255,90,31,.3)"/>
      <text x="20" y="30" fill="${C.hot}" font-size="14" font-weight="700" ${F}>✗ 学生常做的（被翻过去的）</text>
      <g ${F} font-size="12.5" fill="${C.muted}">
        <text x="20" y="62">· 一张大渲染图，占满整页</text>
        <text x="20" y="90">· 三个不同项目的图混在一起</text>
        <text x="20" y="118">· 只讲"我用了什么软件"</text>
        <text x="20" y="146">· 颜色很好看，但看不出它解决谁的什么问题</text>
        <text x="20" y="174">· 没有一张草图</text>
      </g>
      <rect x="20" y="200" width="370" height="76" rx="10" fill="rgba(11,11,12,.5)"/>
      <text x="34" y="224" fill="${C.faint}" font-size="12" ${F}>面试官心里的判断：</text>
      <text x="34" y="248" fill="#FFB694" font-size="13" font-weight="700" ${F}>"审美还行。"</text>
      <text x="34" y="268" fill="${C.faint}" font-size="12" ${F}>（然后翻页，平均停留 8 秒）</text>

      <rect x="450" y="0" width="410" height="300" rx="14" fill="rgba(110,231,215,.06)" stroke="rgba(110,231,215,.3)"/>
      <text x="470" y="30" fill="${C.mint}" font-size="14" font-weight="700" ${F}>✓ 能让人记住的（会被留下来的）</text>
      <g ${F} font-size="12.5">
        <text x="470" y="62" fill="${C.paper}"><tspan fill="${C.mint}" font-weight="700">① 问题　</tspan>你发现谁的什么麻烦？（一句话）</text>
        <text x="470" y="90" fill="${C.paper}"><tspan fill="${C.mint}" font-weight="700">② 约束　</tspan>成本 / 工艺 / 尺寸，卡在哪</text>
        <text x="470" y="118" fill="${C.paper}"><tspan fill="${C.mint}" font-weight="700">③ 取舍　</tspan>你放弃了什么，为什么</text>
        <text x="470" y="146" fill="${C.paper}"><tspan fill="${C.mint}" font-weight="700">④ 代价　</tspan>这个选择让什么变差了</text>
        <text x="470" y="174" fill="${C.paper}"><tspan fill="${C.mint}" font-weight="700">⑤ 过程　</tspan>草稿、模型、失败的那几版</text>
      </g>
      <rect x="470" y="200" width="370" height="76" rx="10" fill="rgba(11,11,12,.5)"/>
      <text x="484" y="224" fill="${C.faint}" font-size="12" ${F}>面试官心里的判断：</text>
      <text x="484" y="248" fill="#A7F3E6" font-size="13" font-weight="700" ${F}>"这个人会想问题。"</text>
      <text x="484" y="268" fill="${C.faint}" font-size="12" ${F}>（然后开始问你问题 —— 这才是面试开始了）</text>
    </g>

    <rect x="0" y="386" width="860" height="26" rx="13" fill="rgba(244,241,234,.05)"/>
    <text x="430" y="404" fill="${C.paper}" font-size="12.5" text-anchor="middle" ${F}>三个讲透的项目 &gt; 十个堆在一起的作业。淘汰率最高的永远是"看不出你怎么想的"那一本。</text>
  </svg>`,

  'journey': `<svg viewBox="0 0 900 440" role="img" aria-label="用户旅程与情绪曲线">
    <text x="0" y="22" fill="${C.hot}" font-size="15" font-weight="700" ${F}>把"一天"画出来，问题才会自己浮上来</text>
    <text x="0" y="44" fill="${C.muted}" font-size="12.5" ${F}>以「早高峰坐地铁上班」为例。横向是时间，纵向是心情。</text>

    <!-- 阶段 -->
    <g ${F}>
      <rect x="0"   y="66" width="164" height="40" rx="9" fill="rgba(244,241,234,.07)" stroke="${C.line2}"/>
      <rect x="176" y="66" width="164" height="40" rx="9" fill="rgba(244,241,234,.07)" stroke="${C.line2}"/>
      <rect x="352" y="66" width="164" height="40" rx="9" fill="rgba(255,90,31,.16)" stroke="${C.hot}" stroke-width="1.5"/>
      <rect x="528" y="66" width="164" height="40" rx="9" fill="rgba(244,241,234,.07)" stroke="${C.line2}"/>
      <rect x="704" y="66" width="156" height="40" rx="9" fill="rgba(244,241,234,.07)" stroke="${C.line2}"/>
      <g font-size="12.5" fill="${C.paper}" text-anchor="middle">
        <text x="82" y="91">出门 · 查路线</text>
        <text x="258" y="91">进站 · 安检</text>
        <text x="434" y="91" fill="#FFB694" font-weight="700">挤上车</text>
        <text x="610" y="91">换乘</text>
        <text x="782" y="91">到工位</text>
      </g>
    </g>

    <!-- 情绪曲线 -->
    <line x1="0" y1="300" x2="860" y2="300" stroke="${C.line}" stroke-width="1.5"/>
    <text x="0" y="322" fill="${C.faint}" font-size="11" ${F}>心情</text>
    <path d="M0 200 C 60 190, 120 210, 176 220 C 240 232, 300 258, 352 340 C 380 384, 400 376, 434 322
             C 470 268, 500 250, 528 262 C 580 282, 620 276, 704 232 C 760 202, 810 196, 860 190"
          fill="none" stroke="${C.violet}" stroke-width="3" stroke-linecap="round"/>
    <g fill="${C.violet}">
      <circle cx="0" cy="200" r="5"/><circle cx="176" cy="220" r="5"/>
      <circle cx="352" cy="340" r="7" fill="${C.hot}"/>
      <circle cx="528" cy="262" r="5"/><circle cx="704" cy="232" r="5"/><circle cx="860" cy="190" r="5"/>
    </g>
    <g ${F}>
      <text x="352" y="368" fill="${C.hot}" font-size="12.5" font-weight="700" text-anchor="middle">谷底</text>
      <text x="352" y="386" fill="#FFB694" font-size="11.5" text-anchor="middle">手上拎着包，还要腾出手刷卡</text>
      <text x="352" y="403" fill="#FFB694" font-size="11.5" text-anchor="middle">后面的人在推，手机根本掏不出来</text>
    </g>

    <!-- 洞察标注 -->
    <rect x="470" y="120" width="390" height="88" rx="12" fill="rgba(110,231,215,.07)" stroke="rgba(110,231,215,.3)"/>
    <text x="490" y="146" fill="${C.mint}" font-size="13" font-weight="700" ${F}>这张图真正的产出，是这一句：</text>
    <text x="490" y="172" fill="${C.paper}" font-size="13" ${F}>用户的痛点不在"车太挤"，而在</text>
    <text x="490" y="194" fill="${C.hot}" font-size="13.5" font-weight="700" ${F}>"我没有第三只手"。</text>

    <text x="0" y="428" fill="${C.muted}" font-size="12.5" ${F}>同一个需求，画成图之后，你能看见"哪一秒最难受"。这就是访谈时问不出来的东西。</text>
  </svg>`,

  'interview-ladder': `<svg viewBox="0 0 900 430" role="img" aria-label="访谈提问的五个层次">
    <text x="0" y="22" fill="${C.hot}" font-size="15" font-weight="700" ${F}>同一个问题，问法不同，拿到的答案差十倍</text>
    <text x="0" y="44" fill="${C.muted}" font-size="12.5" ${F}>从上往下，越往下越接近真相。大部分新手停在最上面两层。</text>

    <g ${F}>
      <!-- 阶梯 -->
      <g>
        <rect x="0" y="72" width="520" height="56" rx="10" fill="rgba(244,241,234,.05)" stroke="${C.line}"/>
        <text x="20" y="96" fill="${C.faint}" font-size="12" font-weight="700">第 1 层</text>
        <text x="90" y="96" fill="${C.paper}" font-size="13.5">"你觉得这个产品怎么样？"</text>
        <text x="90" y="116" fill="${C.faint}" font-size="12">→ 得到客套话。人不会当面说你做的东西丑。</text>
      </g>
      <g>
        <rect x="40" y="136" width="520" height="56" rx="10" fill="rgba(244,241,234,.055)" stroke="${C.line}"/>
        <text x="60" y="160" fill="${C.faint}" font-size="12" font-weight="700">第 2 层</text>
        <text x="130" y="160" fill="${C.paper}" font-size="13.5">"你以后会用吗？"</text>
        <text x="130" y="180" fill="${C.faint}" font-size="12">→ 得到善意的谎言。人对未来的预测基本不准。</text>
      </g>
      <g>
        <rect x="80" y="200" width="520" height="56" rx="10" fill="rgba(245,184,65,.09)" stroke="rgba(245,184,65,.4)"/>
        <text x="100" y="224" fill="${C.amber}" font-size="12" font-weight="700">第 3 层</text>
        <text x="170" y="224" fill="${C.paper}" font-size="13.5">"你上一次遇到这种情况是什么时候？"</text>
        <text x="170" y="244" fill="rgba(251,224,168,.7)" font-size="12">→ 开始拿到具体场景，但还很浅。</text>
      </g>
      <g>
        <rect x="120" y="264" width="520" height="56" rx="10" fill="rgba(167,139,250,.12)" stroke="rgba(167,139,250,.45)"/>
        <text x="140" y="288" fill="${C.violet}" font-size="12" font-weight="700">第 4 层</text>
        <text x="210" y="288" fill="${C.paper}" font-size="13.5">"当时你具体怎么做的？先做了什么？"</text>
        <text x="210" y="308" fill="rgba(220,208,255,.75)" font-size="12">→ 拿到行为。行为不会撒谎。</text>
      </g>
      <g>
        <rect x="160" y="328" width="520" height="60" rx="10" fill="rgba(110,231,215,.13)" stroke="${C.mint}" stroke-width="2"/>
        <text x="180" y="354" fill="${C.mint}" font-size="12" font-weight="700">第 5 层</text>
        <text x="250" y="354" fill="${C.paper}" font-size="13.5" font-weight="700">"有什么地方让你觉得特别别扭？"</text>
        <text x="250" y="376" fill="#A7F3E6" font-size="12">→ 拿到痛点。抱怨里藏着真需求。</text>
      </g>

      <!-- 右侧提示 -->
      <rect x="710" y="72" width="150" height="316" rx="14" fill="rgba(11,11,12,.5)" stroke="${C.line}"/>
      <text x="785" y="104" fill="${C.hot}" font-size="13" font-weight="700" text-anchor="middle">三条铁律</text>
      <g font-size="11.5" fill="${C.muted}" text-anchor="middle">
        <text x="785" y="140">问过去</text><text x="785" y="158" fill="${C.faint}">不问未来</text>
        <text x="785" y="196">问行为</text><text x="785" y="214" fill="${C.faint}">不问态度</text>
        <text x="785" y="252">问具体</text><text x="785" y="270" fill="${C.faint}">不问抽象</text>
      </g>
      <line x1="735" y1="296" x2="835" y2="296" stroke="${C.line}"/>
      <text x="785" y="322" fill="${C.paper}" font-size="11.5" text-anchor="middle">最重要的一条：</text>
      <text x="785" y="344" fill="${C.mint}" font-size="11.5" font-weight="700" text-anchor="middle">闭嘴</text>
      <text x="785" y="364" fill="${C.faint}" font-size="11" text-anchor="middle">他说完别急着接话</text>
    </g>
  </svg>`,

  'lifecycle': `<svg viewBox="0 0 900 420" role="img" aria-label="产品采用曲线与失败的位置">
    <text x="0" y="22" fill="${C.hot}" font-size="15" font-weight="700" ${F}>新产品被接受的曲线 —— 很多失败只是站错了位置</text>
    <text x="0" y="44" fill="${C.muted}" font-size="12.5" ${F}>横轴是时间，纵轴是买它的人数。这张图解释了大量"明明很好却死了"的产品。</text>

    <!-- 分区底色 -->
    <g>
      <rect x="0"   y="66" width="150" height="220" fill="rgba(167,139,250,.08)"/>
      <rect x="150" y="66" width="170" height="220" fill="rgba(110,231,215,.07)"/>
      <rect x="320" y="66" width="290" height="220" fill="rgba(244,241,234,.035)"/>
      <rect x="610" y="66" width="250" height="220" fill="rgba(244,241,234,.02)"/>
    </g>
    <g font-size="11.5" fill="${C.faint}" ${F} text-anchor="middle">
      <text x="75"  y="84">尝鲜者 2.5%</text>
      <text x="235" y="84">早期采用者 13.5%</text>
      <text x="465" y="84">早期大众 34%</text>
      <text x="735" y="84">后期大众 34% · 落后者 16%</text>
    </g>

    <!-- 曲线 -->
    <line x1="0" y1="286" x2="860" y2="286" stroke="${C.line2}" stroke-width="1.5"/>
    <path d="M0 284 C 60 282, 110 268, 150 240 C 185 216, 215 178, 250 140
             C 285 104, 320 92, 400 92 C 490 92, 550 110, 620 150
             C 690 190, 760 238, 860 274"
          fill="none" stroke="${C.mint}" stroke-width="3" stroke-linecap="round"/>

    <!-- 鸿沟 -->
    <line x1="250" y1="96" x2="250" y2="290" stroke="${C.hot}" stroke-width="2" stroke-dasharray="6 5"/>
    <text x="258" y="270" fill="${C.hot}" font-size="12.5" font-weight="700" ${F}>鸿沟</text>
    <text x="258" y="288" fill="#FFB694" font-size="11.5" ${F}>大多数产品掉在这里</text>

    <!-- 标记 -->
    <circle cx="180" cy="222" r="7" fill="${C.violet}"/>
    <text x="192" y="212" fill="${C.violet}" font-size="12.5" font-weight="700" ${F}>Apple Newton（1993）</text>
    <text x="192" y="230" fill="rgba(220,208,255,.75)" font-size="11.5" ${F}>手写识别还不够准 → 死得太早</text>

    <circle cx="330" cy="98" r="7" fill="${C.amber}"/>
    <text x="342" y="88" fill="${C.amber}" font-size="12.5" font-weight="700" ${F}>Segway（2001）</text>
    <text x="342" y="106" fill="rgba(251,224,168,.75)" font-size="11.5" ${F}>4950 美元 + 人行道不让上 → 太贵太小众</text>

    <circle cx="700" cy="212" r="7" fill="${C.hot}"/>
    <text x="712" y="204" fill="${C.hot}" font-size="12.5" font-weight="700" ${F}>Google Glass（2013）</text>
    <text x="712" y="222" fill="#FFB694" font-size="11.5" ${F}>技术成了，但旁人不知道你在拍 → 死在信任</text>

    <rect x="0" y="312" width="860" height="88" rx="12" fill="rgba(244,241,234,.045)" stroke="${C.line}"/>
    <text x="20" y="338" fill="${C.paper}" font-size="13" font-weight="700" ${F}>所以"失败"至少有三种完全不同的意思：</text>
    <g font-size="12.5" ${F}>
      <text x="20" y="362" fill="${C.violet}">① 太早：东西对了，世界还没准备好。</text>
      <text x="20" y="384" fill="${C.amber}">② 太贵：解决了问题，但没人愿意付这个钱。</text>
      <text x="440" y="362" fill="${C.hot}">③ 太怪：自己用没问题，</text>
      <text x="440" y="384" fill="${C.hot}">　 但让别人不舒服。</text>
    </g>
  </svg>`,

  'failure-modes': `<svg viewBox="0 0 900 400" role="img" aria-label="产品失败的六种典型死法">
    <text x="0" y="22" fill="${C.hot}" font-size="15" font-weight="700" ${F}>成功各有各的运气，失败的原因高度雷同</text>
    <text x="0" y="44" fill="${C.muted}" font-size="12.5" ${F}>下面六种，覆盖了绝大多数产品的死因。只有第 5 种是真正的技术问题。</text>

    <g ${F}>
      <g transform="translate(0,64)">
        <rect x="0" y="0" width="272" height="140" rx="12" fill="rgba(167,139,250,.08)" stroke="rgba(167,139,250,.32)"/>
        <circle cx="34" cy="34" r="16" fill="none" stroke="${C.violet}" stroke-width="2.5"/>
        <path d="M34 26 v10 M34 41 v1" stroke="${C.violet}" stroke-width="2.5" stroke-linecap="round"/>
        <text x="60" y="40" fill="${C.violet}" font-size="13.5" font-weight="700">① 死在"太早"</text>
        <text x="20" y="76" fill="${C.faint}" font-size="11.5">技术还不够好</text>
        <text x="20" y="98" fill="${C.paper}" font-size="12">Apple Newton 的手写识别</text>
        <text x="20" y="120" fill="${C.muted}" font-size="11.5">提前三年是笑话，晚三年是庸品</text>
      </g>
      <g transform="translate(294,64)">
        <rect x="0" y="0" width="272" height="140" rx="12" fill="rgba(245,184,65,.08)" stroke="rgba(245,184,65,.32)"/>
        <circle cx="34" cy="34" r="16" fill="none" stroke="${C.amber}" stroke-width="2.5"/>
        <path d="M26 34 h16 M34 34 v-7 M34 34 v7" stroke="${C.amber}" stroke-width="2.5" stroke-linecap="round"/>
        <text x="60" y="40" fill="${C.amber}" font-size="13.5" font-weight="700">② 死在"太贵"</text>
        <text x="20" y="76" fill="${C.faint}" font-size="11.5">成本结构不成立</text>
        <text x="20" y="98" fill="${C.paper}" font-size="12">Juicero 榨汁机 699 美元</text>
        <text x="20" y="120" fill="${C.muted}" font-size="11.5">把 90 秒的事变成 5 分钟</text>
      </g>
      <g transform="translate(588,64)">
        <rect x="0" y="0" width="272" height="140" rx="12" fill="rgba(110,231,215,.08)" stroke="rgba(110,231,215,.32)"/>
        <circle cx="34" cy="34" r="16" fill="none" stroke="${C.mint}" stroke-width="2.5"/>
        <path d="M26 28 h16 M26 34 h16 M26 40 h10" stroke="${C.mint}" stroke-width="2.5" stroke-linecap="round"/>
        <text x="60" y="40" fill="${C.mint}" font-size="13.5" font-weight="700">③ 死在"没场景"</text>
        <text x="20" y="76" fill="${C.faint}" font-size="11.5">解决了不存在的问题</text>
        <text x="20" y="98" fill="${C.paper}" font-size="12">很多"智能"小家电</text>
        <text x="20" y="120" fill="${C.muted}" font-size="11.5">痛点是自己想出来的</text>
      </g>

      <g transform="translate(0,220)">
        <rect x="0" y="0" width="272" height="140" rx="12" fill="rgba(255,90,31,.08)" stroke="rgba(255,90,31,.32)"/>
        <circle cx="34" cy="34" r="16" fill="none" stroke="${C.hot}" stroke-width="2.5"/>
        <path d="M26 42 c4 -12 12 -12 16 0" stroke="${C.hot}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <text x="60" y="40" fill="${C.hot}" font-size="13.5" font-weight="700">④ 死在"改习惯"</text>
        <text x="20" y="76" fill="${C.faint}" font-size="11.5">要求用户换一套做法</text>
        <text x="20" y="98" fill="${C.paper}" font-size="12">1985 新可乐 · 79 天撤回</text>
        <text x="20" y="120" fill="${C.muted}" font-size="11.5">你动的不是配方，是身份</text>
      </g>
      <g transform="translate(294,220)">
        <rect x="0" y="0" width="272" height="140" rx="12" fill="rgba(244,241,234,.05)" stroke="${C.line2}"/>
        <circle cx="34" cy="34" r="16" fill="none" stroke="${C.faint}" stroke-width="2.5"/>
        <path d="M27 34 l5 5 l10 -11" stroke="${C.faint}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <text x="60" y="40" fill="${C.faint}" font-size="13.5" font-weight="700">⑤ 死在"工程"</text>
        <text x="20" y="76" fill="${C.faint}" font-size="11.5">真的做砸了</text>
        <text x="20" y="98" fill="${C.paper}" font-size="12">三星 Note 7 电池</text>
        <text x="20" y="120" fill="${C.muted}" font-size="11.5">六种死法里唯一的技术问题</text>
      </g>
      <g transform="translate(588,220)">
        <rect x="0" y="0" width="272" height="140" rx="12" fill="rgba(167,139,250,.08)" stroke="rgba(167,139,250,.32)"/>
        <circle cx="34" cy="34" r="16" fill="none" stroke="${C.violet}" stroke-width="2.5"/>
        <circle cx="34" cy="34" r="5" fill="${C.violet}"/>
        <text x="60" y="40" fill="${C.violet}" font-size="13.5" font-weight="700">⑥ 死在"信任"</text>
        <text x="20" y="76" fill="${C.faint}" font-size="11.5">社会还没接受它</text>
        <text x="20" y="98" fill="${C.paper}" font-size="12">Google Glass 被酒吧赶出去</text>
        <text x="20" y="120" fill="${C.muted}" font-size="11.5">技术成功 ≠ 社会允许</text>
      </g>
    </g>
  </svg>`,

  'cost-curve': `<svg viewBox="0 0 900 400" role="img" aria-label="成本如何随产量摊薄">
    <text x="0" y="22" fill="${C.hot}" font-size="15" font-weight="700" ${F}>为什么"能做出来"和"能量产"是两件事</text>
    <text x="0" y="44" fill="${C.muted}" font-size="12.5" ${F}>纵轴是每一件的成本，横轴是产量。开一副模具是固定支出，做得越多，摊到每一件上就越少。</text>

    <!-- 坐标 -->
    <line x1="70" y1="80" x2="70" y2="296" stroke="${C.line2}" stroke-width="1.5"/>
    <line x1="70" y1="296" x2="840" y2="296" stroke="${C.line2}" stroke-width="1.5"/>
    <text x="24" y="90" fill="${C.faint}" font-size="11.5" ${F}>单件成本</text>
    <text x="800" y="320" fill="${C.faint}" font-size="11.5" ${F}>产量 →</text>

    <!-- 固定成本：模具 -->
    <path d="M86 100 C 150 200, 260 262, 460 280 C 620 292, 740 294, 830 295"
          fill="none" stroke="${C.hot}" stroke-width="3"/>
    <text x="360" y="238" fill="${C.hot}" font-size="12.5" font-weight="700" ${F}>模具费摊薄（几十万 ÷ 产量）</text>

    <!-- 变动成本 -->
    <line x1="86" y1="252" x2="830" y2="252" stroke="${C.mint}" stroke-width="3"/>
    <text x="600" y="244" fill="${C.mint}" font-size="12.5" font-weight="700" ${F}>材料 + 工时（不随产量变）</text>

    <!-- 总成本 -->
    <path d="M86 96 C 130 150, 220 200, 400 226 C 560 246, 720 250, 830 251"
          fill="none" stroke="${C.paper}" stroke-width="2.5" stroke-dasharray="7 5"/>
    <text x="150" y="176" fill="${C.paper}" font-size="12.5" font-weight="700" ${F}>总成本</text>

    <!-- 关键点 -->
    <line x1="180" y1="80" x2="180" y2="296" stroke="${C.violet}" stroke-width="1.5" stroke-dasharray="4 4"/>
    <line x1="620" y1="80" x2="620" y2="296" stroke="${C.violet}" stroke-width="1.5" stroke-dasharray="4 4"/>
    <g ${F}>
      <text x="188" y="98" fill="${C.violet}" font-size="12" font-weight="700">1000 件</text>
      <text x="188" y="116" fill="rgba(220,208,255,.8)" font-size="11.5">单件 480 元</text>
      <text x="628" y="98" fill="${C.violet}" font-size="12" font-weight="700">100 万件</text>
      <text x="628" y="116" fill="rgba(220,208,255,.8)" font-size="11.5">单件 26 元</text>
    </g>

    <!-- 结论 -->
    <rect x="70" y="336" width="770" height="52" rx="12" fill="rgba(255,90,31,.09)" stroke="rgba(255,90,31,.3)"/>
    <text x="90" y="358" fill="#FFB694" font-size="13" font-weight="700" ${F}>同一个设计，产量差一千倍，成本差十八倍。</text>
    <text x="90" y="378" fill="${C.paper}" font-size="12.5" ${F}>所以"这个方案能不能量产"不是工厂的问题 —— 它在你画第一条线的时候就已经被决定了。</text>
  </svg>`,

  'assembly': `<svg viewBox="0 0 900 400" role="img" aria-label="装配顺序与零件数">
    <text x="0" y="22" fill="${C.hot}" font-size="15" font-weight="700" ${F}>从下往上装 —— 顺序错了，就永远装不进去</text>
    <text x="0" y="44" fill="${C.muted}" font-size="12.5" ${F}>以一支最普通的圆珠笔为例。装配工只有两只手，他必须按一个固定顺序把零件放进去。</text>

    <g ${F}>
      <!-- 爆炸图：零件自下而上 -->
      <g transform="translate(70,72)">
        <g>
          <rect x="60" y="228" width="120" height="46" rx="10" fill="rgba(244,241,234,.09)" stroke="${C.line2}" stroke-width="2"/>
          <text x="196" y="256" fill="${C.paper}" font-size="12.5">① 笔杆（PP 塑料管）</text>
        </g>
        <g>
          <rect x="76" y="176" width="88" height="34" rx="8" fill="rgba(110,231,215,.20)" stroke="${C.mint}" stroke-width="2"/>
          <text x="196" y="198" fill="${C.mint}" font-size="12.5">② 笔芯（装墨的那根管）</text>
        </g>
        <g>
          <path d="M104 156 L136 156 L136 170 L104 170 Z" fill="rgba(245,184,65,.28)" stroke="${C.amber}" stroke-width="2"/>
          <text x="196" y="146" fill="${C.amber}" font-size="12.5">③ 弹簧（金属，卡在笔芯上）</text>
        </g>
        <g>
          <rect x="86" y="112" width="68" height="34" rx="8" fill="rgba(167,139,250,.22)" stroke="${C.violet}" stroke-width="2"/>
          <text x="196" y="134" fill="${C.violet}" font-size="12.5">④ 按压件（要卡进笔杆的槽）</text>
        </g>
        <g>
          <path d="M104 88 L136 88 L128 108 L112 108 Z" fill="rgba(255,90,31,.28)" stroke="${C.hot}" stroke-width="2"/>
          <text x="196" y="82" fill="${C.hot}" font-size="12.5">⑤ 笔帽（最后扣上，拆开就断）</text>
        </g>
        <!-- 装配方向 -->
        <line x1="30" y1="272" x2="30" y2="80" stroke="${C.faint}" stroke-width="2" stroke-dasharray="6 5"/>
        <path d="M30 74 l-5 10 h10 z" fill="${C.faint}"/>
      </g>

      <!-- 右侧说明 -->
      <g transform="translate(560,72)">
        <rect x="0" y="0" width="300" height="118" rx="12" fill="rgba(110,231,215,.07)" stroke="rgba(110,231,215,.3)"/>
        <text x="18" y="26" fill="${C.mint}" font-size="13" font-weight="700">为什么弹簧必须第三个装</text>
        <text x="18" y="52" fill="${C.paper}" font-size="12">如果先装按压件，弹簧就套不进去了。</text>
        <text x="18" y="74" fill="${C.paper}" font-size="12">如果先扣笔帽，前面所有零件都看不见了。</text>
        <text x="18" y="100" fill="${C.muted}" font-size="11.5">这就是"装配顺序"约束 —— 它在图纸上就有，不是车间才发现。</text>

        <rect x="0" y="134" width="300" height="118" rx="12" fill="rgba(255,90,31,.07)" stroke="rgba(255,90,31,.3)"/>
        <text x="18" y="160" fill="${C.hot}" font-size="13" font-weight="700">每多一个零件，代价是相乘的</text>
        <text x="18" y="186" fill="${C.paper}" font-size="12">· 多一副小模具</text>
        <text x="18" y="206" fill="${C.paper}" font-size="12">· 多一道装配工位</text>
        <text x="18" y="226" fill="${C.paper}" font-size="12">· 多一份库存与公差</text>
        <text x="18" y="246" fill="${C.mint}" font-size="11.5">→ 所以好设计师都在做减法</text>
      </g>
    </g>
  </svg>`,

  'sketch-lines': `<svg viewBox="0 0 900 400" role="img" aria-label="草图中的三种线">
    <text x="0" y="22" fill="${C.hot}" font-size="15" font-weight="700" ${F}>同一只杯子，两种画法</text>
    <text x="0" y="44" fill="${C.muted}" font-size="12.5" ${F}>左边是"描"，右边是"想"。区别不在画功，在于有没有先搭结构。</text>

    <!-- 左：学生画法 -->
    <g transform="translate(40,70)">
      <rect x="0" y="0" width="360" height="290" rx="14" fill="rgba(255,90,31,.05)" stroke="rgba(255,90,31,.28)"/>
      <text x="20" y="30" fill="${C.hot}" font-size="13.5" font-weight="700">✗ 从轮廓开始描</text>
      <text x="20" y="52" fill="${C.faint}" font-size="11.5">一条线一口气画完，画歪了就擦掉重来</text>
      <!-- 杯子：只有轮廓 -->
      <g transform="translate(120,84)" stroke="${C.faint}" stroke-width="2.5" fill="none">
        <path d="M20 24 L32 160 Q34 176 60 176 Q86 176 88 160 L100 24"/>
        <ellipse cx="60" cy="24" rx="40" ry="12"/>
        <path d="M100 62 Q140 70 138 96 Q136 122 96 126"/>
      </g>
      <g transform="translate(120,84)" stroke="${C.hot}" stroke-width="1.5" fill="none">
        <path d="M22 40 L98 40 M22 60 L98 60 M24 90 L96 90 M26 120 L94 120" stroke-dasharray="3 6"/>
      </g>
      <text x="20" y="272" fill="#FFB694" font-size="11.5">擦痕太多，纸先烂了 —— 而且看不出这杯子有多大</text>
    </g>

    <!-- 右：设计师画法 -->
    <g transform="translate(430,70)">
      <rect x="0" y="0" width="430" height="290" rx="14" fill="rgba(110,231,215,.05)" stroke="rgba(110,231,215,.28)"/>
      <text x="20" y="30" fill="${C.mint}" font-size="13.5" font-weight="700">✓ 先搭结构，再定轮廓</text>
      <text x="20" y="52" fill="${C.faint}" font-size="11.5">三条线各干各的事，画错了只改一条</text>
      <g transform="translate(70,80)">
        <!-- 结构线（浅、虚） -->
        <g stroke="${C.violet}" stroke-width="1.6" fill="none" stroke-dasharray="5 4">
          <rect x="0" y="0" width="120" height="176"/>
          <line x1="0" y1="44" x2="120" y2="44"/>
          <line x1="0" y1="176" x2="120" y2="176"/>
          <ellipse cx="60" cy="0" rx="60" ry="16"/>
          <ellipse cx="60" cy="176" rx="60" ry="16"/>
          <line x1="60" y1="0" x2="60" y2="176"/>
        </g>
        <!-- 轮廓线（重、实） -->
        <g stroke="${C.paper}" stroke-width="2.8" fill="none" stroke-linecap="round">
          <path d="M0 0 L8 158 Q10 176 60 176 Q110 176 112 158 L120 0"/>
          <ellipse cx="60" cy="0" rx="60" ry="16"/>
          <path d="M120 58 Q158 66 156 92 Q154 118 114 124"/>
        </g>
        <!-- 剖面线（剖开内部） -->
        <g stroke="${C.mint}" stroke-width="2" fill="none">
          <path d="M14 96 L106 96" />
          <path d="M14 96 L14 82 M106 96 L106 82" />
          <text x="46" y="90" fill="${C.mint}" font-size="11" stroke="none" ${F}>壁厚 2mm</text>
        </g>
      </g>
      <!-- 图例 -->
      <g transform="translate(230,96)" ${F}>
        <line x1="0" y1="0" x2="34" y2="0" stroke="${C.violet}" stroke-width="1.6" stroke-dasharray="5 4"/>
        <text x="42" y="4" fill="${C.violet}" font-size="12">结构线</text>
        <text x="42" y="22" fill="${C.faint}" font-size="11">定比例、定位置。画错不用擦</text>

        <line x1="0" y1="48" x2="34" y2="48" stroke="${C.paper}" stroke-width="2.8"/>
        <text x="42" y="52" fill="${C.paper}" font-size="12">轮廓线</text>
        <text x="42" y="70" fill="${C.faint}" font-size="11">别人唯一需要看清的一条</text>

        <line x1="0" y1="96" x2="34" y2="96" stroke="${C.mint}" stroke-width="2"/>
        <text x="42" y="100" fill="${C.mint}" font-size="12">剖面 / 标注</text>
        <text x="42" y="118" fill="${C.faint}" font-size="11">告诉工厂"多厚、多大、什么材料"</text>
      </g>
    </g>

    <rect x="0" y="374" width="860" height="24" rx="12" fill="rgba(244,241,234,.05)"/>
    <text x="430" y="391" fill="${C.paper}" font-size="12.5" text-anchor="middle" ${F}>一张草图的价值，取决于它能回答多少问题 —— 不是它有多像照片。</text>
  </svg>`,

  'service-blueprint': `<svg viewBox="0 0 900 440" role="img" aria-label="服务蓝图的分层结构">
    <text x="0" y="22" fill="${C.hot}" font-size="15" font-weight="700" ${F}>用户只看见一步，背后有十步</text>
    <text x="0" y="44" fill="${C.muted}" font-size="12.5" ${F}>以「扫码骑共享单车」为例。这就是服务设计要画的那张图。</text>

    <g ${F}>
      <!-- 分层标签 -->
      <g font-size="12" font-weight="700" text-anchor="end">
        <text x="118" y="106" fill="${C.paper}">用户行为</text>
        <text x="118" y="168" fill="${C.mint}">前台</text>
        <text x="118" y="248" fill="${C.violet}">后台</text>
        <text x="118" y="330" fill="${C.amber}">支持流程</text>
        <text x="118" y="96" fill="${C.faint}" font-size="10.5" font-weight="400">看得见</text>
        <text x="118" y="164" fill="${C.faint}" font-size="10.5" font-weight="400">用户能碰到</text>
        <text x="118" y="266" fill="${C.faint}" font-size="10.5" font-weight="400">用户看不见</text>
      </g>

      <!-- 用户行为条 -->
      <g>
        <rect x="130" y="80" width="720" height="44" rx="10" fill="rgba(244,241,234,.07)" stroke="${C.line2}"/>
        <g font-size="12" fill="${C.paper}" text-anchor="middle">
          <text x="222" y="107">打开 App 找车</text>
          <text x="402" y="107">扫码</text>
          <text x="582" y="107">骑走</text>
          <text x="762" y="107">还车 · 付款</text>
        </g>
      </g>

      <!-- 可见线 -->
      <line x1="130" y1="138" x2="850" y2="138" stroke="${C.mint}" stroke-width="2" stroke-dasharray="8 6"/>
      <text x="856" y="142" fill="${C.mint}" font-size="10.5" ${F}>可</text>

      <!-- 前台 -->
      <g>
        <rect x="130" y="146" width="720" height="42" rx="10" fill="rgba(110,231,215,.10)" stroke="rgba(110,231,215,.35)"/>
        <g font-size="11.5" fill="#A7F3E6" text-anchor="middle">
          <text x="222" y="172">地图显示车辆位置</text>
          <text x="402" y="172">车锁亮灯 · "咔"一声</text>
          <text x="582" y="172">车把上的编号</text>
          <text x="762" y="172">锁车提示音</text>
        </g>
      </g>

      <!-- 后台 -->
      <g>
        <rect x="130" y="200" width="720" height="76" rx="10" fill="rgba(167,139,250,.10)" stroke="rgba(167,139,250,.35)"/>
        <g font-size="11.5" fill="#DCD0FF">
          <text x="150" y="224">· 定位漂移校正、找最近可用车</text>
          <text x="150" y="244">· 生成开锁码、验证账户余额与信用分</text>
          <text x="150" y="264">· 计费、判定位移、判断是否停在禁停区</text>
          <text x="470" y="224">· 坏车派单给运维</text>
          <text x="470" y="244">· 调度：把车从过剩区运到缺车区</text>
          <text x="470" y="264">· 电池电量监控与换电排班</text>
        </g>
      </g>

      <!-- 支持流程 -->
      <g>
        <rect x="130" y="290" width="720" height="50" rx="10" fill="rgba(245,184,65,.10)" stroke="rgba(245,184,65,.35)"/>
        <g font-size="11.5" fill="#FBE0A8">
          <text x="150" y="320">客服系统</text><text x="250" y="320">支付通道</text>
          <text x="360" y="320">维修网点与备件</text><text x="520" y="320">仓储物流</text>
          <text x="640" y="320">城市管理部门</text>
        </g>
      </g>

      <!-- 断点标注 -->
      <line x1="492" y1="146" x2="492" y2="340" stroke="${C.hot}" stroke-width="2" stroke-dasharray="5 5"/>
      <rect x="380" y="352" width="250" height="52" rx="10" fill="rgba(255,90,31,.12)" stroke="${C.hot}"/>
      <text x="505" y="374" fill="${C.hot}" font-size="12.5" font-weight="700" text-anchor="middle">断点：扫了码，锁没开</text>
      <text x="505" y="394" fill="#FFB694" font-size="11.5" text-anchor="middle">用户只会怪"这家公司不行"</text>

      <text x="660" y="374" fill="${C.paper}" font-size="12.5">用户抱怨的每一秒，根源几乎</text>
      <text x="660" y="394" fill="${C.paper}" font-size="12.5">都在下面那两层里。</text>
    </g>
  </svg>`,

  'ai-split': `<svg viewBox="0 0 900 420" role="img" aria-label="AI 擅长与不擅长的事">
    <text x="0" y="22" fill="${C.hot}" font-size="15" font-weight="700" ${F}>它替你省掉的是"手"，不是"判断"</text>
    <text x="0" y="44" fill="${C.muted}" font-size="12.5" ${F}>同一个工具，用在不同环节，价值差几十倍。</text>

    <g ${F}>
      <!-- 左：很在行 -->
      <rect x="0" y="66" width="410" height="300" rx="14" fill="rgba(110,231,215,.06)" stroke="rgba(110,231,215,.3)"/>
      <text x="22" y="96" fill="${C.mint}" font-size="14" font-weight="700">它已经很在行的</text>
      <text x="22" y="116" fill="${C.faint}" font-size="11.5">共同点：有明确目标，缺的是"量"</text>
      <g font-size="12.5" fill="${C.paper}">
        <text x="22" y="150">变体爆炸　</text><text x="110" y="150" fill="${C.muted}">一晚上三百个配色方案</text>
        <text x="22" y="182">渲染出图　</text><text x="110" y="182" fill="${C.muted}">把草稿变成能给人看的图</text>
        <text x="22" y="214">找参考　　</text><text x="110" y="214" fill="${C.muted}">"类似结构还有哪些做法"</text>
        <text x="22" y="246">初步建模　</text><text x="110" y="246" fill="${C.muted}">从草图生成可编辑的三维</text>
        <text x="22" y="278">写文案　　</text><text x="110" y="278" fill="${C.muted}">产品说明、卖点、命名备选</text>
        <text x="22" y="310">翻译术语　</text><text x="110" y="310" fill="${C.muted}">把工程语言转成人话</text>
      </g>
      <text x="22" y="348" fill="${C.mint}" font-size="12">这些活的共同点：做得快就有价值，错一版也无所谓。</text>

      <!-- 右：做不到 -->
      <rect x="450" y="66" width="410" height="300" rx="14" fill="rgba(255,90,31,.06)" stroke="rgba(255,90,31,.3)"/>
      <text x="472" y="96" fill="${C.hot}" font-size="14" font-weight="700">它到现在还做不到的</text>
      <text x="472" y="116" fill="${C.faint}" font-size="11.5">共同点：答案取决于"该不该"，而不是"能不能"</text>
      <g font-size="12.5">
        <text x="472" y="150" fill="${C.paper}">定义问题　</text><text x="560" y="150" fill="${C.muted}">你给错前提，它会非常努力地做完</text>
        <text x="472" y="182" fill="${C.paper}">判断值不值得　</text><text x="582" y="182" fill="${C.muted}">这件事该不该被做出来</text>
        <text x="472" y="214" fill="${C.paper}">走进真实处境　</text><text x="594" y="214" fill="${C.muted}">用户家里多乱、手多脏</text>
        <text x="472" y="246" fill="${C.paper}">在冲突里取舍　</text><text x="594" y="246" fill="${C.muted}">便宜和耐用只能选一个</text>
        <text x="472" y="278" fill="${C.paper}">承担责任　　</text><text x="560" y="278" fill="${C.muted}">签字、召回、道歉</text>
        <text x="472" y="310" fill="${C.paper}">跟工厂吵架　</text><text x="582" y="310" fill="${C.muted}">说服一个真实的人改产线</text>
      </g>
      <text x="472" y="348" fill="#FFB694" font-size="12">这些活的共同点：做错了，代价由别人承担。</text>

      <!-- 结论 -->
      <rect x="0" y="380" width="860" height="34" rx="10" fill="rgba(244,241,234,.06)"/>
      <text x="430" y="402" fill="${C.paper}" font-size="12.5" text-anchor="middle" ${F}>工具升级淘汰的从来不是"设计师"，是"只会操作工具的人"。</text>
    </g>
  </svg>`,

  'materials-map': `<svg viewBox="0 0 900 420" role="img" aria-label="常见材料的成本与强度关系">
    <text x="0" y="22" fill="${C.hot}" font-size="15" font-weight="700" ${F}>选材料，是在一张图上找一个点</text>
    <text x="0" y="44" fill="${C.muted}" font-size="12.5" ${F}>横轴是成本，纵轴是"同样重量下的强度"。没有最好的材料，只有合适的位置。</text>

    <!-- 坐标 -->
    <line x1="90" y1="80" x2="90" y2="320" stroke="${C.line2}" stroke-width="1.5"/>
    <line x1="90" y1="320" x2="830" y2="320" stroke="${C.line2}" stroke-width="1.5"/>
    <text x="20" y="94" fill="${C.faint}" font-size="11.5" ${F}>强度 / 重量</text>
    <text x="20" y="112" fill="${C.faint}" font-size="11" ${F}>（同样重，能扛多少）</text>
    <text x="770" y="344" fill="${C.faint}" font-size="11.5" ${F}>成本 →</text>

    <!-- 网格 -->
    <g stroke="rgba(244,241,234,.05)" stroke-width="1">
      <line x1="90" y1="140" x2="830" y2="140"/><line x1="90" y1="200" x2="830" y2="200"/>
      <line x1="90" y1="260" x2="830" y2="260"/>
      <line x1="275" y1="80" x2="275" y2="320"/><line x1="460" y1="80" x2="460" y2="320"/>
      <line x1="645" y1="80" x2="645" y2="320"/>
    </g>

    <!-- 材料点 -->
    <g ${F}>
      <g><circle cx="140" cy="292" r="9" fill="${C.mint}"/><text x="156" y="297" fill="${C.paper}" font-size="12.5">刨花板</text>
         <text x="156" y="314" fill="${C.faint}" font-size="11">最便宜，怕潮、怕拆</text></g>
      <g><circle cx="255" cy="238" r="9" fill="${C.mint}"/><text x="271" y="243" fill="${C.paper}" font-size="12.5">实木</text>
         <text x="271" y="260" fill="${C.faint}" font-size="11">好看、贵、每块都不一样</text></g>
      <g><circle cx="330" cy="268" r="9" fill="${C.violet}"/><text x="346" y="273" fill="${C.paper}" font-size="12.5">PP / ABS 塑料</text>
         <text x="346" y="290" fill="${C.faint}" font-size="11">便宜、能一次成型、不耐热</text></g>
      <g><circle cx="300" cy="212" r="9" fill="${C.violet}"/><text x="316" y="205" fill="${C.paper}" font-size="12.5">玻璃</text>
         <text x="316" y="222" fill="${C.faint}" font-size="11">重、脆，但能无限次重熔</text></g>
      <g><circle cx="500" cy="168" r="10" fill="${C.amber}"/><text x="518" y="173" fill="${C.paper}" font-size="12.5">铝合金</text>
         <text x="518" y="190" fill="${C.faint}" font-size="11">轻、导热、只能做等截面</text></g>
      <g><circle cx="580" cy="120" r="11" fill="${C.hot}"/><text x="600" y="125" fill="${C.paper}" font-size="12.5">钢</text>
         <text x="600" y="142" fill="${C.faint}" font-size="11">很强、很重、模具寿命长</text></g>
      <g><circle cx="740" cy="98" r="10" fill="${C.hot}"/><text x="700" y="82" fill="${C.paper}" font-size="12.5">碳纤维</text>
         <text x="700" y="99" fill="${C.faint}" font-size="11">性能最好，也最贵</text></g>
    </g>

    <!-- 提示框 -->
    <rect x="530" y="212" width="300" height="92" rx="12" fill="rgba(110,231,215,.07)" stroke="rgba(110,231,215,.3)"/>
    <text x="550" y="238" fill="${C.mint}" font-size="13" font-weight="700" ${F}>怎么用这张图</text>
    <text x="550" y="262" fill="${C.paper}" font-size="12" ${F}>不是"选最好的"，而是：</text>
    <text x="550" y="282" fill="${C.paper}" font-size="12" ${F}>先问"够用就行"在哪，再往下找。</text>
    <text x="550" y="298" fill="${C.muted}" font-size="11.5" ${F}>多出来的性能，也是多出来的成本。</text>

    <text x="90" y="384" fill="${C.muted}" font-size="12.5" ${F}>真实的选材还要看：能不能回收、会不会生锈、摸起来什么温度、供应商在不在国内 —— 这些都不在图上，但都会改变决定。</text>
  </svg>`
  };

  window.DIAGRAMS = Object.assign(window.DIAGRAMS || {}, MORE);
})();
