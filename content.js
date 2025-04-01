// ==================================================
// content.js - 游戏内容定义
// ==================================================
// (注意：此内容扩展旨在提供一个约10分钟的包含分支和多结局的流程)
// (Current time: Tuesday, April 1, 2025 at 12:03:04 PM JST)

const gameContent = {

    // --- 基本设置 ---
    initialScene: 'TITLE', // 初始显示标题画面
    firstPlayableScene: 'INTRO_SCENE', // 点开始后进入的第一个场景
    playerDefaults: {
        x: 256 - 50, // 玩家初始位置靠右
        y: 256 / 2 - 10,
        sprite: 'hero', // 玩家精灵
    },
    initialFlags: { // 所有剧情标志的初始状态
        metMoogle: false,        // 是否见过开场的莫古力
        helpedMoogle: false,       // 是否答应帮莫古力找绒球
        foundMooglePom: false,     // 是否真的找到了绒球（在森林）
        boughtAir: false,        // 是否买了空气
        boughtFeather: false,    // 是否买了鸡毛（伪·不死鸟之尾）
        annoyedCactuar: false,    // 是否惹恼了仙人掌
        solvedCactuarRiddle: false,// 是否解决了仙人掌的谜题
        metGhost: false,         // 是否遇到了幽灵
        helpedGhost: false,        // 是否听完了幽灵的抱怨
        metTonberryChef: false,  // 是否遇到了Tonberry厨师
        foundTonberrySecret: false,// 是否发现了厨师的秘密（爱心调料）
        metGilgamesh: false,     // 是否遇到了吉尔伽美什
        gotWrongCoffee: false,   // 是否拿到了吉尔伽美什给错的咖啡/武器
        annoyedGilgamesh: false,   // 是否惹恼了吉尔伽美什
        gotUltimateSpatula: false, // 是否获得了究极锅铲
        visitedShop: false,      // 是否去过商店
        visitedDesert: false,    // 是否去过沙漠
        visitedForest: false,    // 是否去过森林
        visitedCafe: false,      // 是否去过咖啡馆
    },

    // --- 视觉定义 ---
    colors: { // 调色板
        black: '#000000', white: '#FFFFFF', blue: '#0077FF', red: '#FF0000',
        green: '#00FF00', brown: '#A0522D', skin: '#FFCCAA', grey: '#888888',
        darkGreen: '#006400', lightGreen: '#90EE90', yellow: '#FFFF00', pink: '#FFC0CB',
        purple: '#800080', orange: '#FFA500', lightBlue: '#ADD8E6', darkGrey: '#404040',
        uiBackground: '#111133', uiBorder: '#AAAAFF', uiText: '#FFFFFF',
        uiHighlight: '#FFFF00', bgPattern1: '#223344', bgPattern2: '#334455',
        endingGoodBg: '#4466AA', endingBadBg: '#AA4444', endingWeirdBg: '#8A2BE2',
        endingSpatulaBg: '#CD853F', endingChefBg: '#90EE90', endingCafeBg: '#D2B48C',
    },

    sprites: { // 精灵定义 (保持之前的定义)
        hero: { width: 8, height: 10, colors: ['skin', 'blue', 'brown', 'white'], pixels: [[0, 0, 3, 3, 3, 3, 0, 0], [0, 3, 3, 1, 1, 3, 3, 0], [0, 3, 1, 1, 1, 1, 3, 0], [0, 3, 1, 4, 1, 4, 1, 0], [0, 0, 1, 1, 1, 1, 0, 0], [0, 2, 2, 2, 2, 2, 2, 0], [2, 2, 2, 2, 2, 2, 2, 2], [0, 0, 2, 2, 2, 2, 0, 0], [0, 3, 3, 0, 0, 3, 3, 0], [3, 3, 0, 0, 0, 0, 3, 3]] },
        moogle: { width: 10, height: 9, colors: ['white', 'red', 'black', 'yellow'], pixels: [[0, 0, 0, 0, 0, 2, 0, 0, 0, 0], [0, 0, 0, 0, 3, 0, 3, 0, 0, 0], [0, 0, 1, 1, 1, 1, 1, 1, 0, 0], [0, 1, 1, 3, 1, 1, 3, 1, 1, 0], [0, 1, 1, 1, 2, 1, 1, 1, 1, 0], [0, 0, 1, 1, 1, 1, 1, 1, 4, 0], [0, 0, 0, 1, 1, 1, 1, 4, 4, 0], [0, 0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 0, 0, 1, 1, 1, 1, 0, 0, 0]] },
        cactuar: { width: 6, height: 10, colors: ['lightGreen', 'darkGreen', 'black'], pixels: [[0, 0, 1, 1, 0, 0], [0, 1, 1, 1, 1, 0], [1, 1, 1, 1, 1, 1], [1, 1, 3, 1, 3, 1], [1, 1, 1, 1, 1, 1], [0, 2, 3, 3, 2, 0], [0, 1, 1, 1, 1, 0], [2, 1, 1, 1, 1, 2], [0, 0, 1, 1, 0, 0], [0, 1, 1, 0, 1, 1]] },
        // --- 新增精灵 ---
        ghost: { width: 7, height: 8, colors: ['lightBlue', 'white', 'black'], pixels: [[0, 0, 1, 1, 1, 0, 0], [0, 1, 1, 1, 1, 1, 0], [1, 1, 2, 1, 2, 1, 1], [1, 1, 1, 1, 1, 1, 1], [1, 1, 3, 3, 3, 1, 1], [0, 1, 1, 1, 1, 1, 0], [0, 0, 1, 1, 1, 0, 0], [0, 0, 1, 0, 1, 0, 0]] },
        tonberry: { width: 8, height: 9, colors: ['darkGreen', 'yellow', 'brown', 'white'], pixels: [[0, 0, 1, 1, 1, 1, 0, 0], [0, 1, 1, 1, 1, 1, 1, 0], [1, 1, 2, 1, 2, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1], [0, 1, 1, 1, 1, 1, 1, 0], [0, 0, 3, 3, 3, 3, 0, 0], [0, 0, 3, 4, 4, 3, 0, 0], [0, 3, 3, 0, 0, 3, 3, 0], [3, 3, 0, 0, 0, 0, 3, 3]] },
        gilgamesh: { width: 9, height: 11, colors: ['red', 'orange', 'skin', 'blue', 'grey'], pixels: [[0, 0, 0, 1, 1, 1, 0, 0, 0], [0, 0, 1, 1, 1, 1, 1, 0, 0], [0, 1, 1, 3, 3, 1, 1, 1, 0], [0, 1, 3, 3, 3, 3, 3, 1, 0], [1, 1, 3, 1, 3, 1, 3, 1, 1], [0, 4, 4, 4, 4, 4, 4, 4, 0], [0, 4, 2, 4, 4, 2, 4, 4, 0], [0, 0, 4, 4, 4, 4, 0, 0, 0], [0, 5, 5, 0, 0, 5, 5, 0, 0], [5, 5, 0, 0, 0, 0, 0, 5, 5], [5, 0, 0, 0, 0, 0, 0, 0, 5]] }, // 简化版多手怪
        spatula: { width: 5, height: 7, colors: ['grey', 'brown'], pixels: [[0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [1, 1, 1, 1, 1], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 2, 0, 0], [0, 0, 2, 0, 0]] }, // 锅铲精灵图
    },

    // --- 场景定义 ---
    scenes: {
        'TITLE': { name: "标题画面", npcs: [], commands: [], onEnterAction: null },
        'INTRO_SCENE': {
            name: "初始地点", npcs: [{ sprite: 'moogle', x: 30, y: 256 / 2 }],
            commands: [{ text: "对话莫古力", action: 'talk_intro_moogle' }, { text: "原地转圈", action: 'examine_intro' }],
            onEnterAction: 'dialogue_intro_entry'
        },
        'CROSSROADS': {
            name: "命运の十字路口", npcs: [],
            commands: [
                { text: "左: 莫古商店", action: 'goto_shop_action' },
                { text: "前: 闹鬼森林", action: 'goto_forest_action' },
                { text: "右: 仙人掌沙漠", action: 'goto_desert_action' },
                { text: "后: 水晶咖啡馆", action: 'goto_cafe_action' },
                { text: "回: 初始地点", action: 'goto_intro_action' }, // 可以回去触发结局检查
                { text: "原地发呆", action: 'examine_crossroads' },
            ],
            onEnterAction: 'dialogue_crossroads_entry'
        },
        'MOOGLE_SHOP': {
            name: "莫古好物★商店", npcs: [{ sprite: 'moogle', x: 256 / 2 - 30, y: 256 / 2 - 20 }],
            commands: [{ text: "和店主说话", action: 'talk_shopkeeper' }, { text: "离开商店", action: 'leave_shop_action' },],
            onEnterAction: 'dialogue_shop_entry'
        },
        'CACTUAR_DESERT': { // 重命名场景
            name: "扎人沙漠边缘", npcs: [{ sprite: 'cactuar', x: 50, y: 256 / 2 - 5 }],
            commands: [{ text: "尝试对话", action: 'talk_cactuar_action' }, { text: "偷偷溜走", action: 'escape_cactuar_action' }, { text: "戳它一下", action: 'poke_cactuar_action' },],
            onEnterAction: 'dialogue_cactuar_entry'
        },
        // --- 新增场景 ---
        'SPOOKY_FOREST': {
            name: "闹鬼森林深处", npcs: [{ sprite: 'ghost', x: 40, y: 256 / 2 - 15 }, { sprite: 'tonberry', x: 180, y: 256 / 2 - 5, hidden: true }], // Tonberry initially hidden?
            commands: [{ text: "和幽灵说话", action: 'talk_ghost' }, { text: "寻找绒球", action: 'search_pom' }, { text: "调查奇怪的气味", action: 'investigate_smell' }, { text: "离开森林", action: 'leave_forest' },],
            onEnterAction: 'dialogue_forest_entry'
        },
        'CRYSTAL_CAFE': {
            name: "水晶咖啡馆™", npcs: [{ sprite: 'gilgamesh', x: 70, y: 256 / 2 - 30 }], // 吉尔伽美什做咖啡师
            commands: [{ text: "和咖啡师说话", action: 'talk_gilgamesh' }, { text: "看看菜单", action: 'examine_menu' }, { text: "观察其他客人", action: 'examine_customers' }, { text: "离开咖啡馆", action: 'leave_cafe' },],
            onEnterAction: 'dialogue_cafe_entry'
        },
        // --- 结局场景 ---
        'ENDING_GOOD': { name: "结局A", isEnding: true, message: ["结局 A：和平的午后", "", `伟大的冒险者 {playerName}`, "帮助了莫古力，对仙人掌很友善,", "世界似乎又和平了一点点。", "(评分: S)"], backgroundColor: 'endingGoodBg' },
        'ENDING_BAD': { name: "结局B", isEnding: true, message: ["结局 B：针尖对麦芒", "", `莽撞的冒险者 {playerName}`, "惹恼了仙人掌,", "被【针万本】扎成了筛子。", "GAME OVER..."], backgroundColor: 'endingBadBg' },
        'ENDING_SPATULA': { name: "结局C", isEnding: true, message: ["结局 C：厨神传说", "", `厨神 {playerName}`, "你找到了【究级锅铲】!", "从此，你的炒饭闻名整个大陆。", "(也许可以开个连锁店?)"], backgroundColor: 'endingSpatulaBg' },
        'ENDING_CAFE': { name: "结局D", isEnding: true, message: ["结局 D：咖啡馆黑名单", "", `不受欢迎的 {playerName}`, "你彻底惹毛了吉尔伽美什,", "被禁止进入所有水晶咖啡馆。", "(只好去喝白开水了)"], backgroundColor: 'endingCafeBg' },
        'ENDING_CHEF': { name: "结局E", isEnding: true, message: ["结局 E：兰豆之友", "", `美食家 {playerName}`, "你发现了Tonberry厨师的秘密,", "并被邀请共进晚餐。", "(竟然...异常美味!)"], backgroundColor: 'endingChefBg' },
        'ENDING_WEIRD': {
            name: "结局 F：意义不明", isEnding: true, message: [ "",`存在主义者 {playerName}`, "你买了空气，拿了鸡毛，安慰了幽灵...", "然后呢？嗯...然后就没有然后了。", "(哲学的尽头是虚无吗？库啵？)"], backgroundColor: 'endingWeirdBg'
    },
},

    // --- 对话定义 ---
    dialogues: {
        // --- Intro & Crossroads ---
        'dialogue_intro_entry': { speaker: null, lines: ["...", "你揉了揉眼睛，发现自己站在一个陌生的地方。", "一个毛茸茸的生物向你跑来。"], choices: [] },
        'dialogue_intro_moogle': { speaker: "莫古力向导", lines: ["库啵！欢迎来到混乱的【最终幻想大乱炖界】！我是向导！", "你看起来很迷茫，需要帮助吗？", "或者，你想知道你为什么会出现在这里？（剧透：我也不知道）", "总之，前面是个十字路口，可以通往不同地方，库啵！"], choices: [{ text: "十字路口？带我去！", action: 'goto_crossroads_action' }, { text: "你能帮我什么？", action: 'ask_moogle_help' }, { text: "检查我的状态", action: 'check_status_intro' }, { text: "报告结局的时候再找你", action: 'delay_ending_check' }] },
        'dialogue_moogle_ask_help_response': { speaker: "莫古力向导", lines: ["嗯...我好像把我的绒球(Pom-Pom)弄丢了！", "它对我很重要...据说是在北边的森林里？", "如果你找到了，能还给我吗？库啵？"], choices: [{ text: "包在我身上！", action: 'accept_help_moogle' }, { text: "再说吧...", action: 'end_dialogue' }] },
        'dialogue_intro_examine': { speaker: null, lines: ["你原地转了一圈，感觉更晕了。莫古力关切地看着你。"], choices: [] },
        'dialogue_check_status': { speaker: "系统", lines: ["姓名: {playerName}", "状态: 良好 (但有点懵)", "装备: 【新手布衣】", "道具: 【口袋里的灰尘】", "任务: (好像还没接到...)"], choices: [] },
        'dialogue_crossroads_entry': { speaker: null, lines: ["这里就是十字路口，四条路通往不同的方向。"], choices: [] },
        'dialogue_crossroads_examine': { speaker: null, lines: ["路牌歪歪扭扭地写着：", "左：商店 (价格公道?)", "前：森林 (免费氧吧?)", "右：沙漠 (日光浴?)", "后：咖啡馆 (摸鱼圣地?)"], choices: [] },
        'dialogue_return_to_intro': { speaker: "莫古力向导", lines: ["库啵！你回来啦！冒险得怎么样？", "找到我的绒球了吗？或者经历了什么有趣的事？"], choices: [ /* 由 actionHandler 动态添加结局选项 */] },
        'dialogue_delay_ending': { speaker: "莫古力向导", lines: ["库啵...好吧，等你准备好了再来找我聊聊你的冒险！"], choices: [] },

        // --- Moogle Shop ---
        'dialogue_shop_entry': { speaker: null, lines: ["一股混合着灰尘和可疑甜味的气息扑面而来。", "莫古力店主正用抹布擦拭一个空瓶子。"], choices: [] },
        'dialogue_shopkeeper': { speaker: "店主莫古力", lines: ["库啵！是新面孔！想买点什么？", "我们有镇店之宝【瓶装空气】(清新自然无污染)，还有【不死鸟之尾羽】(刚从后院捡的鸡毛)！", "都是跳楼价！库啵！"], choices: [{ text: "买【瓶装空气】(免费)", action: 'buy_air_action' }, { text: "买【不死鸟之尾羽】(1 G)", action: 'buy_feather_action' }, { text: "随便聊聊", action: 'shop_chat_action' }, { text: "告辞", action: 'leave_shop_action' }] },
        'dialogue_shop_buy_air_result': { speaker: "系统", lines: ["你获得了【瓶装空气】x1。感觉...毫无变化。", "(Flag: boughtAir set)"], choices: [] },
        'dialogue_shop_buy_feather_result': { speaker: "系统", lines: ["你支付了根本不存在的 1G，获得了【不死鸟之尾羽】x1。", "它看起来非常像一根普通的鸡毛。", "(Flag: boughtFeather set)"], choices: [] },
        'dialogue_shop_chat': { speaker: "店主莫古力", lines: ["库啵...生意难做啊...", "森林里的Tonberry最近好像在研究新菜谱，味道怪怪的。", "咖啡馆的吉尔伽美什又把浓缩咖啡当剑油了，唉..."], choices: [] },
        'dialogue_leave_shop': { speaker: null, lines: ["你离开了这家充满“惊喜”的商店。"], choices: [] },

        // --- Cactuar Desert ---
        'dialogue_cactuar_entry': { speaker: null, lines: ["热浪滚滚，一个绿色的身影在不远处做着奇怪的体操。"], choices: [] },
        'dialogue_cactuar_talk': { speaker: "仙人掌?", lines: ["...", "它停下了动作，用三根刺指着你，又指了指天空，然后指了指地上的沙子。", "好像在问你什么。"], choices: [{ text: "给它看【瓶装空气】", action: 'show_cactuar_air' }, { text: "猜谜语？“天上有，地上无？”", action: 'guess_cactuar_riddle_A' }, { text: "猜谜语？“能跑很快但没腿？”", action: 'guess_cactuar_riddle_B' }, { text: "礼貌地离开", action: 'escape_cactuar_conditional' }] },
        'dialogue_cactuar_show_air_result': { speaker: null, lines: ["仙人掌疑惑地晃了晃，似乎觉得这东西毫无意义。", "它摇了摇刺，表示不对。"], choices: [] },
        'dialogue_cactuar_riddle_A_correct': { speaker: null, lines: ["仙人掌高兴地跳了一下（大概？），给了你一个小小的、亮晶晶的东西。", "是【究级锅铲】？！为什么仙人掌会有这个？！", "(Flag: gotUltimateSpatula set, solvedCactuarRiddle set)"], choices: [{ text: "道谢并离开", action: 'escape_cactuar_conditional' }] },
        'dialogue_cactuar_riddle_B_wrong': { speaker: null, lines: ["仙人掌不耐烦地跺了跺脚（如果它有脚的话），表示错误。"], choices: [] },
        'dialogue_cactuar_escape_normal': { speaker: null, lines: ["你觉得猜谜太难，还是溜了。仙人掌耸耸肩（如果它有肩的话）。"], choices: [] },
        'dialogue_cactuar_escape_good': { speaker: null, lines: ["你决定不去打扰它。也许是你的明智（或傻气）让它对你产生了一丝好感。", "在你离开时，它似乎向你点了点头。"], choices: [] },
        'dialogue_cactuar_escape_fast': { speaker: null, lines: ["溜了溜了！"], choices: [] },
        'dialogue_poke_cactuar': { speaker: "系统", lines: ["你手贱地戳了一下...", "噢...", "【针 十 万 本】！！！"], choices: [{ text: "我感觉身体被掏空...", action: 'trigger_ending_bad' }] },

        // --- Spooky Forest ---
        'dialogue_forest_entry': { speaker: null, lines: ["森林里光线昏暗，空气中弥漫着一种奇怪的香味和淡淡的怨气。"], choices: [] },
        'dialogue_talk_ghost': { speaker: "忧郁的幽灵", lines: ["呜呜呜...又有人来了...", "当幽灵好无聊啊，每天就是飘来飘去，吓唬谁都没反应...", "连个能聊天的都没有..."], choices: [{ text: "听它继续抱怨", action: 'listen_ghost' }, { text: "问它有没有看到绒球", action: 'ask_ghost_pom' }, { text: "安慰它说“你吓到我了”", action: 'comfort_ghost' }, { text: "不理它，溜了", action: 'end_dialogue' }] },
        'dialogue_ghost_listen': { speaker: "忧郁的幽灵", lines: ["呜呜呜...我以前是个吟游诗人，现在只能唱安魂曲...", "还老是跑调...呜呜呜..."], choices: [{ text: "继续听...", action: 'finish_listen_ghost' }] },
        'dialogue_ghost_finish_listen': { speaker: "忧郁的幽灵", lines: ["谢谢你听我说了这么多废话...", "感觉好多了。这个给你吧，也许有点用。", "你获得了【空气清新剂】(幽灵特供版)"], choices: [{ text: "谢谢？", action: 'end_dialogue' }] }, // Sets helpedGhost flag
        'dialogue_ghost_ask_pom_no': { speaker: "忧郁的幽灵", lines: ["绒球？没见过...我只见过一个绿色的家伙，拿着菜刀在这附近转悠...好可怕..."], choices: [] },
        'dialogue_ghost_ask_pom_yes': { speaker: "忧郁的幽灵", lines: ["绒球？好像看到一个粉红色的球滚到那边树丛里去了。"], choices: [] },
        'dialogue_ghost_comfort_result': { speaker: "忧郁的幽灵", lines: ["真的吗？！我吓到你了吗？！太好了！呜呜呜（喜极而泣）"], choices: [] },
        'dialogue_search_pom_found': { speaker: "系统", lines: ["你在树丛里找到了一个粉红色的【莫古力绒球】！"], choices: [] }, // Sets foundMooglePom flag
        'dialogue_search_pom_notfound': { speaker: "系统", lines: ["你找了一圈，只发现了一些奇怪的蘑菇。"], choices: [] },
        'dialogue_investigate_smell': { speaker: null, lines: ["你循着奇怪的香味走去，发现一个穿着厨师服的Tonberry正在用一把巨大的菜刀切洋葱。", "它的眼神专注而...平静？"], choices: [{ text: "和Tonberry厨师说话", action: 'talk_tonberry_chef' }, { text: "偷看它的调料", action: 'peek_tonberry_secret' }, { text: "赶紧溜走", action: 'end_dialogue' }] },
        'dialogue_talk_tonberry_chef': { speaker: "Tonberry厨师", lines: ["...", "(它默默地看了你一眼，递给你一小块刚做好的炖菜)", "...", "(尝尝？)"], choices: [{ text: "尝一口", action: 'taste_tonberry_food' }, { text: "谢绝好意", action: 'refuse_tonberry_food' }] },
        'dialogue_tonberry_taste_good': { speaker: "系统", lines: ["你尝了一小口...", "出乎意料的美味！充满了...爱的味道？！"], choices: [{ text: "询问秘诀", action: 'ask_tonberry_secret' }] },
        'dialogue_tonberry_taste_bad': { speaker: "系统", lines: ["你尝了一小口...味道一言难尽..."], choices: [] }, // Maybe sets a negative flag?
        'dialogue_tonberry_refuse': { speaker: "Tonberry厨师", lines: ["...", "(它默默收回了炖菜，继续切洋葱)"], choices: [] },
        'dialogue_tonberry_peek_secret': { speaker: "系统", lines: ["你偷偷看了一眼它的调料罐，上面贴着标签：【爱心】"], choices: [] }, // Sets foundTonberrySecret flag
        'dialogue_tonberry_ask_secret_success': { speaker: "Tonberry厨师", lines: ["...", "(它点了点头，又给了你一份炖菜)", "...", "(分享是快乐的)"], choices: [{ text: "谢谢大厨！", action: 'trigger_ending_chef' }] }, // Leads to Chef ending
        'dialogue_leave_forest': { speaker: null, lines: ["你离开了这片充满“惊喜”的森林。"], choices: [] },

        // --- Crystal Cafe ---
        'dialogue_cafe_entry': { speaker: null, lines: ["咖啡馆里意外地很热闹，空气中飘着咖啡香和...某种金属摩擦的声音？"], choices: [] },
        'dialogue_talk_gilgamesh': { speaker: "咖啡师 吉尔伽美什", lines: ["欢迎光临！想要点什么？是传说中的【圣剑拿铁】？还是【魔枪浓缩】？", "或者...尝尝我刚弄到的【究级锅铲卡布奇诺】？！哈哈哈！"], choices: [{ text: "就要【究级锅铲卡布奇诺】!", action: 'order_spatula_cappuccino' }, { text: "随便来杯咖啡吧", action: 'order_random_coffee' }, { text: "你这里有真的武器吗？", action: 'ask_gilgamesh_weapons' }, { text: "算了，看看别的", action: 'end_dialogue' }] },
        'dialogue_gilgamesh_order_spatula': { speaker: "咖啡师 吉尔伽美什", lines: ["好品味！稍等！", "(他一阵手忙脚乱，用六只手同时操作咖啡机和...一把锅铲？)", "给你！【究级锅铲卡布奇诺】！还有...呃...这个好像是你要的【究级锅铲】？拿去！"], choices: [{ text: "这真的是锅铲？！", action: 'receive_spatula_from_gilgamesh' }] }, // Sets gotUltimateSpatula flag
        'dialogue_gilgamesh_order_random': { speaker: "咖啡师 吉尔伽美什", lines: ["好嘞！咖啡来咯！", "(他递给你一杯...等等，这不是【石中剑】吗？！)", "哎呀，拿错了！哈哈哈！这个送你了！咖啡下次吧！"], choices: [{ text: "呃,谢谢？(获得石中剑?)", action: 'receive_wrong_coffee' }] }, // Sets gotWrongCoffee flag
        'dialogue_gilgamesh_ask_weapons': { speaker: "咖啡师 吉尔伽美什", lines: ["武器？哈哈哈！我收藏的可多了！但这可是咖啡馆！", "不过嘛...如果你帮我找到传说中的【源氏咖啡豆】，我可以考虑给你看看我的宝贝！"], choices: [] }, // Side quest hook?
        'dialogue_examine_menu': { speaker: null, lines: ["菜单：", "- 普通咖啡 (价格面议)", "- 特调咖啡 (看咖啡师心情)", "- 水 (免费，杯子收费)", "- 今日推荐：大概是咖啡吧"], choices: [] },
        'dialogue_examine_customers': { speaker: null, lines: ["角落里有个顶着尖刺发型的人在喝闷酒...", "吧台边有个女孩好像在往口袋里塞方糖...", "一个穿着武道服的女性在快速擦桌子..."], choices: [] }, // References to Cloud, Yuffie, Tifa
        'dialogue_annoy_gilgamesh': { speaker: "咖啡师 吉尔伽美什", lines: ["嗯？！你说我的咖啡/武器不对？！", "这可是艺术！你不懂！再抱怨我就把你和那把赝品一起丢出去！"], choices: [{ text: "是是是，您说得对", action: 'appease_gilgamesh' }, { text: "我就抱怨！", action: 'trigger_ending_cafe' }] }, // Leads to Cafe ending
        'dialogue_appease_gilgamesh': { speaker: "咖啡师 吉尔伽美什", lines: ["哼！谅你也不敢！"], choices: [] },
        'dialogue_leave_cafe': { speaker: null, lines: ["你离开了这家奇妙的咖啡馆。"], choices: [] },

        // --- Default/Fallback ---
        'dialogue_unknown_action': { speaker: "系统", lines: ["这个指令还没有实现效果。"], choices: [] },
        'dialogue_examine_default': { speaker: null, lines: ["你环顾四周，好像没什么特别的。"], choices: [] }
    },

    // --- 行动处理器 ---
    actionHandlers: {
        // --- 基本导航 ---
        'end_dialogue': (engine) => { engine.closeDialogue(); },
'goto_crossroads_action': (engine) => { engine.changeScene('CROSSROADS') },
    'goto_shop_action': (engine) => { engine.setFlag('visitedShop', true); engine.changeScene('MOOGLE_SHOP') },
        'goto_forest_action': (engine) => { engine.setFlag('visitedForest', true); engine.changeScene('SPOOKY_FOREST') },
            'goto_desert_action': (engine) => { engine.setFlag('visitedDesert', true); engine.changeScene('CACTUAR_DESERT') },
                'goto_cafe_action': (engine) => { engine.setFlag('visitedCafe', true); engine.changeScene('CRYSTAL_CAFE') },
                    'goto_intro_action': (engine) => { engine.executeAction('check_ending_conditions') }, // 特殊：回去检查结局
                        'leave_shop_action': (engine) => { engine.changeScene('CROSSROADS', 'dialogue_leave_shop') },
                            'leave_forest': (engine) => { engine.changeScene('CROSSROADS', 'dialogue_leave_forest') },
                                'leave_cafe': (engine) => { engine.changeScene('CROSSROADS', 'dialogue_leave_cafe') },

                                    // --- 初始场景 ---
                                    'talk_intro_moogle': (engine) => { engine.setFlag('metMoogle', true); engine.startDialogue('dialogue_intro_moogle') },
                                        'ask_moogle_help': (engine) => { engine.startDialogue('dialogue_moogle_ask_help_response') },
                                            'accept_help_moogle': (engine) => { engine.setFlag('helpedMoogle', true); engine.goto_crossroads_action(engine) }, // 同意后直接去路口
                                                'examine_intro': (engine) => { engine.startDialogue('dialogue_intro_examine') },
                                                    'check_status_intro': (engine) => { engine.startDialogue('dialogue_check_status') },
                                                        'delay_ending_check': (engine) => { engine.startDialogue('dialogue_delay_ending') },

                                                            // --- 莫古力商店 ---
                                                            'talk_shopkeeper': (engine) => { engine.startDialogue('dialogue_shopkeeper') },
                                                                'buy_air_action': (engine) => { engine.setFlag('boughtAir', true); engine.startDialogue('dialogue_shop_buy_air_result') },
                                                                    'buy_feather_action': (engine) => { engine.setFlag('boughtFeather', true); engine.startDialogue('dialogue_shop_buy_feather_result') },
                                                                        'shop_chat_action': (engine) => { engine.startDialogue('dialogue_shop_chat') },

                                                                            // --- 仙人掌沙漠 ---
                                                                            'talk_cactuar_action': (engine) => { engine.startDialogue('dialogue_cactuar_talk') },
                                                                                'show_cactuar_air': (engine) => { engine.startDialogue(engine.getFlag('boughtAir') ? 'dialogue_cactuar_show_air_have' : 'dialogue_cactuar_show_air_nohave') },
                                                                                    'guess_cactuar_riddle_A': (engine) => { // 猜 "天" -> 正确
                                                                                        engine.setFlag('solvedCactuarRiddle', true)
                                                                                        engine.setFlag('gotUltimateSpatula', true) // 仙人掌给锅铲
                                                                                        engine.startDialogue('dialogue_cactuar_riddle_A_correct')
                                                                                    },
                                                                                        'guess_cactuar_riddle_B': (engine) => { // 猜 "时间" -> 错误
                                                                                            engine.startDialogue('dialogue_cactuar_riddle_B_wrong')
                                                                                        },
                                                                                            'escape_cactuar_conditional': (engine) => { // 从对话中离开
                                                                                                // 好结局条件之一：答应帮莫古力 或 解开了谜题，并且没惹恼它
                                                                                                if ((engine.getFlag('helpedMoogle') || engine.getFlag('solvedCactuarRiddle')) && !engine.getFlag('annoyedCactuar')) {
                                                                                                    engine.changeScene('CROSSROADS', 'dialogue_cactuar_escape_good') // 使用稍微好点的离开对话
                                                                                                } else {
                                                                                                    engine.changeScene('CROSSROADS', 'dialogue_cactuar_escape_normal')
                                                                                                }
                                                                                            },
                                                                                                'escape_cactuar_action': (engine) => { // 用按钮溜走
                                                                                                    // 好结局条件之一：答应帮莫古力 或 解开了谜题，并且没惹恼它
                                                                                                    if ((engine.getFlag('helpedMoogle') || engine.getFlag('solvedCactuarRiddle')) && !engine.getFlag('annoyedCactuar')) {
                                                                                                        engine.changeScene('CROSSROADS', 'dialogue_cactuar_escape_good')
                                                                                                    } else {
                                                                                                        engine.changeScene('CROSSROADS', 'dialogue_cactuar_escape_fast')
                                                                                                    }
                                                                                                },
                                                                                                    'poke_cactuar_action': (engine) => { engine.setFlag('annoyedCactuar', true); engine.startDialogue('dialogue_poke_cactuar') },
                                                                                                        'trigger_ending_bad': (engine) => { engine.changeScene('ENDING_BAD') }, // 触发坏结局

                                                                                                            // --- 闹鬼森林 ---
                                                                                                            'talk_ghost': (engine) => { engine.setFlag('metGhost', true); engine.startDialogue('dialogue_talk_ghost') },
                                                                                                                'listen_ghost': (engine) => { engine.startDialogue('dialogue_ghost_listen') },
                                                                                                                    'finish_listen_ghost': (engine) => { engine.setFlag('helpedGhost', true); engine.startDialogue('dialogue_ghost_finish_listen') },
                                                                                                                        'ask_ghost_pom': (engine) => { engine.startDialogue(engine.getFlag('helpedMoogle') ? 'dialogue_ghost_ask_pom_yes' : 'dialogue_ghost_ask_pom_no') }, // 只有答应了帮莫古力，幽灵才会告诉你绒球位置
                                                                                                                            'comfort_ghost': (engine) => { engine.startDialogue('dialogue_ghost_comfort_result') },
                                                                                                                                'search_pom': (engine) => {
                                                                                                                                    if (engine.getFlag('helpedMoogle')) { // 只有答应了才能找到
                                                                                                                                        engine.setFlag('foundMooglePom', true)
                                                                                                                                        engine.startDialogue('dialogue_search_pom_found')
                                                                                                                                    } else {
                                                                                                                                        engine.startDialogue('dialogue_search_pom_notfound')
                                                                                                                                    }
                                                                                                                                },
                                                                                                                                    'investigate_smell': (engine) => { engine.setFlag('metTonberryChef', true); engine.startDialogue('dialogue_investigate_smell') },
                                                                                                                                        'talk_tonberry_chef': (engine) => { engine.startDialogue('dialogue_talk_tonberry_chef') },
                                                                                                                                            'taste_tonberry_food': (engine) => { engine.startDialogue('dialogue_tonberry_taste_good') }, // 总是美味的
                                                                                                                                                'refuse_tonberry_food': (engine) => { engine.startDialogue('dialogue_tonberry_refuse') },
                                                                                                                                                    'peek_tonberry_secret': (engine) => { engine.setFlag('foundTonberrySecret', true); engine.startDialogue('dialogue_tonberry_peek_secret') },
                                                                                                                                                        'ask_tonberry_secret': (engine) => {
                                                                                                                                                            if (engine.getFlag('foundTonberrySecret')) { // 必须先偷看才知道秘密是爱心
                                                                                                                                                                engine.startDialogue('dialogue_tonberry_ask_secret_success') // 可通往厨师结局
                                                                                                                                                            } else {
                                                                                                                                                                engine.startDialogue('dialogue_tonberry_refuse') // 如果没偷看就问，厨师不理你
                                                                                                                                                            }
                                                                                                                                                        },
                                                                                                                                                            'trigger_ending_chef': (engine) => { engine.changeScene('ENDING_CHEF') }, // 触发厨师结局

                                                                                                                                                                // --- 水晶咖啡馆 ---
                                                                                                                                                                'talk_gilgamesh': (engine) => { engine.setFlag('metGilgamesh', true); engine.startDialogue('dialogue_talk_gilgamesh') },
                                                                                                                                                                    'order_spatula_cappuccino': (engine) => { engine.startDialogue('dialogue_gilgamesh_order_spatula') },
                                                                                                                                                                        'receive_spatula_from_gilgamesh': (engine) => { engine.setFlag('gotUltimateSpatula', true); engine.end_dialogue(engine) }, // 获得锅铲并结束对话
                                                                                                                                                                            'order_random_coffee': (engine) => { engine.setFlag('gotWrongCoffee', true); engine.startDialogue('dialogue_gilgamesh_order_random') },
                                                                                                                                                                                'receive_wrong_coffee': (engine) => { /* maybe set a flag for having 'Excalipoor'? */ engine.end_dialogue(engine) },
                                                                                                                                                                                    'ask_gilgamesh_weapons': (engine) => { engine.startDialogue('dialogue_gilgamesh_ask_weapons') },
                                                                                                                                                                                        'examine_menu': (engine) => { engine.startDialogue('dialogue_examine_menu') },
                                                                                                                                                                                            'examine_customers': (engine) => { engine.startDialogue('dialogue_examine_customers') },
                                                                                                                                                                                                'trigger_ending_cafe': (engine) => { engine.setFlag('annoyedGilgamesh', true); engine.changeScene('ENDING_CAFE') }, // 触发咖啡馆结局
                                                                                                                                                                                                    'appease_gilgamesh': (engine) => { engine.startDialogue('dialogue_appease_gilgamesh') },

                                                                                                                                                                                                        // --- 结局判定 ---
                                                                                                                                                                                                        'check_ending_conditions': (engine) => {
                                                                                                                                                                                                            console.log("Checking ending conditions with flags:", engine.gameState.flags)
                                                                                                                                                                                                            // 结局优先级判定
                                                                                                                                                                                                            if (engine.getFlag('annoyedCactuar')) { // 优先级最高？如果惹了仙人掌必是坏结局
                                                                                                                                                                                                                engine.changeScene('ENDING_BAD')
                                                                                                                                                                                                            } else if (engine.getFlag('annoyedGilgamesh')) { // 被咖啡馆拉黑
                                                                                                                                                                                                                engine.changeScene('ENDING_CAFE')
                                                                                                                                                                                                            } else if (engine.getFlag('gotUltimateSpatula')) { // 拿到锅铲是独特结局
                                                                                                                                                                                                                engine.changeScene('ENDING_SPATULA')
                                                                                                                                                                                                                // Tonberry 结局需要较高条件
                                                                                                                                                                                                            } else if (engine.getFlag('metTonberryChef') && engine.getFlag('foundTonberrySecret')) {
                                                                                                                                                                                                                engine.startDialogue({ // 需要通过对话选择触发
                                                                                                                                                                                                                    speaker: "系统", lines: ["你回想起和Tonberry厨师的约定..."],
                                                                                                                                                                                                                    choices: [{ text: "去赴约晚餐!", action: 'trigger_ending_chef' }, { text: "还是算了", action: 'check_other_endings' }] // 提供一个选择
                                                                                                                                                                                                                })
                                                                                                                                                                                                                // 直接触发: engine.changeScene('ENDING_CHEF');
                                                                                                                                                                                                            } else if (engine.getFlag('helpedMoogle') && engine.getFlag('foundMooglePom')) { // 帮莫古力找到绒球，且没触发其他坏结局 = 好结局
                                                                                                                                                                                                                engine.changeScene('ENDING_GOOD')
                                                                                                                                                                                                            } else if (engine.getFlag('boughtAir') && engine.getFlag('boughtFeather') && engine.getFlag('helpedGhost')) { // 买了怪东西 + 帮了幽灵 = 奇怪结局
                                                                                                                                                                                                                engine.changeScene('ENDING_WEIRD')
                                                                                                                                                                                                            } else { // 如果以上都不是，给一个默认的普通好结局或回到十字路口？
                                                                                                                                                                                                                // 默认好结局 (如果帮了莫古力 或 对仙人掌友善)
                                                                                                                                                                                                                if (engine.getFlag('helpedMoogle') || (engine.getFlag('visitedDesert') && !engine.getFlag('annoyedCactuar'))) {
                                                                                                                                                                                                                    engine.changeScene('ENDING_GOOD', { speaker: null, lines: ["你回到了起点，虽然没发生惊天动地的大事，但感觉还不错。"], choices: [] }) // 提供一个略有不同的好结局描述
                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                    // 实在没啥特殊进展，就回到十字路口吧
                                                                                                                                                                                                                    engine.startDialogue({ speaker: "莫古力向导", lines: ["库啵...看来你的冒险还需要更多探索呢！再去转转吧！"], choices: [{ text: "好吧", action: 'goto_crossroads_action' }] })
                                                                                                                                                                                                                }
                                                                                                                                                                                                            }
                                                                                                                                                                                                        },
                                                                                                                                                                                                            // 用于从 Tonberry 结局检查中跳过，检查其他结局
                                                                                                                                                                                                            'check_other_endings': (engine) => {
                                                                                                                                                                                                                if (engine.getFlag('helpedMoogle') && engine.getFlag('foundMooglePom')) { engine.changeScene('ENDING_GOOD') }
                                                                                                                                                                                                                else if (engine.getFlag('boughtAir') && engine.getFlag('boughtFeather') && engine.getFlag('helpedGhost')) { engine.changeScene('ENDING_WEIRD') }
                                                                                                                                                                                                                else {
                                                                                                                                                                                                                    if (engine.getFlag('helpedMoogle') || (engine.getFlag('visitedDesert') && !engine.getFlag('annoyedCactuar'))) { engine.changeScene('ENDING_GOOD', { speaker: null, lines: ["你回到了起点，虽然没发生惊天动地的大事，但感觉还不错。"], choices: [] }) }
                                                                                                                                                                                                                    else { engine.startDialogue({ speaker: "莫古力向导", lines: ["库啵...看来你的冒险还需要更多探索呢！再去转转吧！"], choices: [{ text: "好吧", action: 'goto_crossroads_action' }] }) }
                                                                                                                                                                                                                }
                                                                                                                                                                                                            },

                                                                                                                                                                                                                // --- 默认/Fallback ---
                                                                                                                                                                                                                'unknown_action': (engine) => { engine.startDialogue('dialogue_unknown_action') },
                                                                                                                                                                                                                    'default_examine': (engine) => { engine.startDialogue('dialogue_examine_default') }
    },

}; // End of gameContent object

// Make the content globally accessible
window.gameContent = gameContent
console.log("Expanded game content loaded.", new Date().toString()) // 添加时间戳以便调试