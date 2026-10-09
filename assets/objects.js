/* ═══════════════════════════════════════════════════════════
   十件改变世界的实物 —— 全课程共用的物件库
   照片来自 Wikimedia Commons，署名见 assets/credits.js
   ═══════════════════════════════════════════════════════════ */
window.OBJECTS = [
  { id:'coke', year:'1915', name:'可口可乐弧形瓶', by:'Root Glass Company / Earl R. Dean',
    img:'coke', pos:'50% 42%',
    body:'可口可乐向全美玻璃厂下了一个近乎刁难的命题：设计一个在黑暗中摸一下就能认出来、就算摔碎了也能一眼认出是谁家的瓶子。Root Glass 的设计师 Earl R. Dean 从可可豆荚的形状里找到了那条曲线。',
    lesson:'识别度，是可以被设计进物理形状里的。',
    draft:'coke-draft', draftNote:'Earl R. Dean 当年的概念草图。真实的设计都从一张潦草的图开始 —— 不是从完美的方案开始。' },

  { id:'braun', year:'1956', name:'博朗 SK4 收音机', by:'Dieter Rams / Hans Gugelot',
    img:'braun', pos:'50% 50%',
    body:'当年的收音机都是木壳家具，摆在客厅像一件古董。Rams 把它变成了一个透明亚克力罩子盖住的白色金属机身 —— 人们叫它"白雪公主的棺材"。它第一次说：电子产品不需要装作家具。',
    lesson:'"少，却更好"不是极简，是每一处留下的都更准确。' },

  { id:'panton', year:'1960', name:'潘顿椅 Panton Chair', by:'Verner Panton',
    img:'panton', pos:'50% 42%',
    body:'人类第一把一次注塑成型的悬臂塑料椅。没有腿、没有螺丝、没有拼接，从一块塑料里长出一整个坐姿。设计师花了 7 年才等到材料工业追得上他的想象。',
    lesson:'有时候不是设计不够好，是时代的技术还没到。' },

  { id:'walkman', year:'1979', name:'索尼 Walkman TPS-L2', by:'索尼',
    img:'walkman', pos:'50% 45%',
    body:'索尼内部最初强烈反对：录音机去掉录音功能，谁会买？结果它把"听音乐"从客厅的集体活动，变成了一个人的私人世界。第一批货卖光了。',
    lesson:'用户不会告诉你他想要什么，因为他也没见过。' },

  { id:'billy', year:'1979', name:'宜家 Billy 书架', by:'Gillis Lundgren',
    img:'billy', pos:'50% 40%',
    body:'一块板、几个螺丝、一张能被卡车塞满的平板包装。Billy 用"运输效率"重新定义了家具：它便宜不是因为差，是因为它从来不在仓库里浪费空气。',
    lesson:'成本、物流、货架，都是设计的一部分。' },

  { id:'swatch', year:'1983', name:'Swatch 手表', by:'Nicolas Hayek',
    img:'swatch', pos:'50% 50%',
    body:'瑞士钟表业被石英危机打垮时，Swatch 把机芯零件从 91 个砍到 51 个，然后把表变成了配饰：一个人可以买五块，按心情换。它卖的不是时间，是心情。',
    lesson:'当功能被商品化，意义就是新的战场。' },

  { id:'juicer', year:'1990', name:'Alessi 柠檬榨汁机', by:'Philippe Starck',
    img:'juicer', pos:'50% 45%',
    body:'它的官方说明书写着："它不适合榨柠檬，适合聊天。"这是一个承认自己不好用、却成为设计史图腾的产品。它证明了物件可以是一种态度、一个玩笑、一段对话的开场白。',
    lesson:'功能不是唯一真理。情绪价值，也是价值。',
    draft:'juicer-mold', draftNote:'它的注塑模具。那个像外星蜘蛛的形状，是被这样的钢块一次一次压出来的。' },

  { id:'imac', year:'1998', name:'iMac G3', by:'Jony Ive / Apple',
    img:'imac', pos:'50% 50%',
    body:'1997 年的苹果离破产只剩 90 天。iMac G3 用半透明的"邦迪蓝"外壳、把主机塞进显示器里，让一台电脑第一次被人当作"我想摆在桌上"的东西。它救活了苹果。',
    lesson:'设计不是成本项，它可以是公司的救命稻草。' },

  { id:'iphone', year:'2007', name:'iPhone（第一代）', by:'Apple',
    img:'iphone', pos:'50% 50%',
    body:'它做的最激进的事是"减法"：干掉键盘、干掉手写笔、干掉说明书。把 100 个实体按键变成一块玻璃，意味着产品的形态从此由软件决定 —— 工业设计第一次要向界面设计让位。',
    lesson:'最好的设计，是让人忘了有个东西在被使用。' },

  { id:'kelp', year:'2020s', name:'Kelp Chair 海藻椅', by:'Alexander Westerlund / Interesting Times Gang',
    img:'kelp', pos:'50% 45%',
    body:'一把用海藻提取物做出来的椅子。它不再问"怎么做得更便宜"，而是问"它死后会去哪里"。今天的设计师要在材料被开采之前，就想清楚它的一生。',
    lesson:'下一代设计要回答的，是系统的责任，而不是一件产品的样子。' }
];
window.OBJ = {};
window.OBJECTS.forEach(o => { window.OBJ[o.id] = o; });
