const sys = require('../../../../utils/sys.js')
const app = getApp()
Page({
  data: {
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
    listItem: {},
    load: true
  },
  onLoad(options) {
    var id = options.id
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    let lists = {
      "01": [{
        id: "01", name: "胸部", desc: "主要练胸大肌、三角肌前束、肱三头肌等。",
        subList: [
          { name: '仰卧飞鸟（男）', path: '/jsth/胸部训练/仰卧飞鸟（男）.gif' },
          { name: '宽距俯卧撑-男侧面', path: '/jsth/胸部训练/宽距俯卧撑-男侧面.gif' },
          { name: '上斜卧推举哑铃（男）', path: '/jsth/胸部训练/上斜卧推举哑铃（男）.gif' },
          { name: '上斜哑铃飞鸟（男）', path: '/jsth/胸部训练/上斜哑铃飞鸟（男）.gif' },
          { name: '平卧推举哑铃（男）', path: '/jsth/胸部训练/平卧推举哑铃（男）.gif' },
          { name: '窄距俯卧撑侧面-男', path: '/jsth/胸部训练/窄距俯卧撑侧面-男.gif' },
          { name: '平板推举杠铃（男）', path: '/jsth/胸部训练/平板推举杠铃（男）.gif' },
          { name: '上斜杠铃卧推（男）', path: '/jsth/胸部训练/上斜杠铃卧推（男）.gif' },
          { name: '哑铃仰卧屈臂上提（男）', path: '/jsth/胸部训练/哑铃仰卧屈臂上提（男）.gif' },
          { name: '窄距俯卧撑-男侧面', path: '/jsth/胸部训练/窄距俯卧撑-男侧面.gif' },
          { name: '双杠臂屈伸（男）', path: '/jsth/胸部训练/双杠臂屈伸（男）.gif' },
          { name: '龙门架夹胸（男）', path: '/jsth/胸部训练/龙门架夹胸（男）.gif' },
          { name: '坐姿屈臂夹胸（女）', path: '/jsth/胸部训练/坐姿屈臂夹胸（女）.gif' },
          { name: '哑铃仰卧屈臂上提（女）', path: '/jsth/胸部训练/哑铃仰卧屈臂上提（女）.gif' },
          { name: '平板推举杠铃（女）', path: '/jsth/胸部训练/平板推举杠铃（女）.gif' },
          { name: '上斜杠铃卧推（女）', path: '/jsth/胸部训练/上斜杠铃卧推（女）.gif' },
          { name: '平卧推举哑铃（女）', path: '/jsth/胸部训练/平卧推举哑铃（女）.gif' },
          { name: '上斜哑铃飞鸟（女）', path: '/jsth/胸部训练/上斜哑铃飞鸟（女）.gif' },
          { name: '上斜卧推举哑铃（女）', path: '/jsth/胸部训练/上斜卧推举哑铃（女）.gif' },
          { name: '窄距俯卧撑-女侧面', path: '/jsth/胸部训练/窄距俯卧撑-女侧面.gif' },
          { name: '仰卧飞鸟（女）', path: '/jsth/胸部训练/仰卧飞鸟（女）.gif' },
          { name: '宽距俯卧撑-女', path: '/jsth/胸部训练/宽距俯卧撑-女.gif' },
          { name: '窄距俯卧撑-女', path: '/jsth/胸部训练/窄距俯卧撑-女.gif' },
          { name: '坐姿屈臂夹胸（男）', path: '/jsth/胸部训练/坐姿屈臂夹胸（男）.gif' },
          { name: '龙门架夹胸（女）', path: '/jsth/胸部训练/龙门架夹胸（女）.gif' },
          { name: '手肘交换支撑-女', path: '/jsth/胸部训练/手肘交换支撑-女.gif' },
          { name: '宽距俯卧撑-女侧面', path: '/jsth/胸部训练/宽距俯卧撑-女侧面.gif' },
          { name: '窄距俯卧撑-男', path: '/jsth/胸部训练/窄距俯卧撑-男.gif' },
          { name: '宽距俯卧撑-男', path: '/jsth/胸部训练/宽距俯卧撑-男.gif' },
          { name: '双杠臂屈伸（女）', path: '/jsth/胸部训练/双杠臂屈伸（女）.gif' },
        ]
      }],
      "02": [{
        id: "02", name: "背部", desc: '背部肌群是背部骨骼肌的总称，包括浅层的斜方肌、背阔肌和深层的骶棘肌。',
        subList: [
          { name: '屈腿硬拉正面（男）', path: '/jsth/背部训练/屈腿硬拉正面（男）.gif' },
          { name: '负重躬身（男）', path: '/jsth/背部训练/负重躬身（男）.gif' },
          { name: '坐姿并握划船（女）', path: '/jsth/背部训练/坐姿并握划船（女）.gif' },
          { name: '直立划船（女）', path: '/jsth/背部训练/直立划船（女）.gif' },
          { name: '颈后下拉', path: '/jsth/背部训练/颈后下拉.gif' },
          { name: '杠铃耸肩（男）', path: '/jsth/背部训练/杠铃耸肩（男）.gif' },
          { name: '俯身杠铃划船（女）', path: '/jsth/背部训练/俯身杠铃划船（女）.gif' },
          { name: '俯卧两头起-男', path: '/jsth/背部训练/俯卧两头起-男.gif' },
          { name: '超度挺身（男）', path: '/jsth/背部训练/超度挺身（男）.gif' },
          { name: '俯身哑铃划船（女）', path: '/jsth/背部训练/俯身哑铃划船（女）.gif' },
          { name: 'T杠划船（女）', path: '/jsth/背部训练/T杠划船（女）.gif' },
          { name: '耸肩提哑铃（女）', path: '/jsth/背部训练/耸肩提哑铃（女）.gif' },
          { name: '屈腿硬拉侧面（女）', path: '/jsth/背部训练/屈腿硬拉侧面（女）.gif' },
          { name: '高位下拉（男）', path: '/jsth/背部训练/高位下拉（男）.gif' },
          { name: '俯身杠铃划船侧面（男）', path: '/jsth/背部训练/俯身杠铃划船侧面（男）.gif' },
          { name: 'T杠划船', path: '/jsth/背部训练/T杠划船.gif' },
          { name: '站姿并握划船（男）', path: '/jsth/背部训练/站姿并握划船（男）.gif' },
          { name: '俯卧两头起-女', path: '/jsth/背部训练/俯卧两头起-女.gif' },
          { name: '耸肩提哑铃（男）', path: '/jsth/背部训练/耸肩提哑铃（男）.gif' },
          { name: '屈腿硬拉侧面（男）', path: '/jsth/背部训练/屈腿硬拉侧面（男）.gif' },
          { name: '超度挺身（女）', path: '/jsth/背部训练/超度挺身（女）.gif' },
          { name: '俯身哑铃划船（男）', path: '/jsth/背部训练/俯身哑铃划船（男）.gif' },
          { name: '俯身杠铃划船（男）', path: '/jsth/背部训练/俯身杠铃划船（男）.gif' },
          { name: '杠铃耸肩（女）', path: '/jsth/背部训练/杠铃耸肩（女）.gif' },
          { name: '坐姿并握划船（男）', path: '/jsth/背部训练/坐姿并握划船（男）.gif' },
          { name: '直立划船（男）', path: '/jsth/背部训练/直立划船（男）.gif' },
          { name: '负重躬身（女）', path: '/jsth/背部训练/负重躬身（女）.gif' },
          { name: '站姿并握划船（女）', path: '/jsth/背部训练/站姿并握划船（女）.gif' },
          { name: '俯身杠铃划船侧面（女）', path: '/jsth/背部训练/俯身杠铃划船侧面（女）.gif' },
          { name: '引体向上（男）', path: '/jsth/背部训练/引体向上（男）.gif' },
          { name: '高位下拉（女）', path: '/jsth/背部训练/高位下拉（女）.gif' },
        ]
      }],
      "03": [{
        id: "03", name: "腿部", desc: "腿部肌肉发达可以使下肢行走或者跑步,更加有力。主要表现为蹲起比正常人功能优越。",
        subList: [
          { name: '深蹲跳', path: '/jsth/腿部训练/深蹲跳.gif' },
          { name: '杠铃箭步蹲（女）', path: '/jsth/腿部训练/杠铃箭步蹲（女）.gif' },
          { name: '腿举（女）', path: '/jsth/腿部训练/腿举（女）.gif' },
          { name: '俯卧腿弯举（女）', path: '/jsth/腿部训练/俯卧腿弯举（女）.gif' },
          { name: '前弓步蹲-男', path: '/jsth/腿部训练/前弓步蹲-男.gif' },
          { name: '杠铃箭步蹲侧面（女）', path: '/jsth/腿部训练/杠铃箭步蹲侧面（女）.gif' },
          { name: '驴式提踵（女）', path: '/jsth/腿部训练/驴式提踵（女）.gif' },
          { name: '前蹲（女）', path: '/jsth/腿部训练/前蹲（女）.gif' },
          { name: '坐式腿弯举（男）', path: '/jsth/腿部训练/坐式腿弯举（男）.gif' },
          { name: '坐式腿屈伸（男）', path: '/jsth/腿部训练/坐式腿屈伸（男）.gif' },
          { name: '剪蹲（女）', path: '/jsth/腿部训练/剪蹲（女）.gif' },
          { name: '坐姿提踵（女）', path: '/jsth/腿部训练/坐姿提踵（女）.gif' },
          { name: '坐姿提踵特写', path: '/jsth/腿部训练/坐姿提踵特写.gif' },
          { name: '前蹲侧面（女）', path: '/jsth/腿部训练/前蹲侧面（女）.gif' },
          { name: '相扑硬拉', path: '/jsth/腿部训练/相扑硬拉.gif' },
          { name: '相扑硬拉正面', path: '/jsth/腿部训练/相扑硬拉正面.gif' },
          { name: '杠铃颈后深蹲侧面（女）', path: '/jsth/腿部训练/杠铃颈后深蹲侧面（女）.gif' },
          { name: '杠铃颈后深蹲（男）', path: '/jsth/腿部训练/杠铃颈后深蹲（男）.gif' },
          { name: '前弓步蹲-女', path: '/jsth/腿部训练/前弓步蹲-女.gif' },
          { name: '前蹲（男）', path: '/jsth/腿部训练/前蹲（男）.gif' },
          { name: '坐式腿弯举（女）', path: '/jsth/腿部训练/坐式腿弯举（女）.gif' },
          { name: '杠铃箭步蹲侧面（男）', path: '/jsth/腿部训练/杠铃箭步蹲侧面（男）.gif' },
          { name: '驴式提踵（男）', path: '/jsth/腿部训练/驴式提踵（男）.gif' },
          { name: '腿举（男）', path: '/jsth/腿部训练/腿举（男）.gif' },
          { name: '俯卧腿弯举（男）', path: '/jsth/腿部训练/俯卧腿弯举（男）.gif' },
          { name: '杠铃箭步蹲（男）', path: '/jsth/腿部训练/杠铃箭步蹲（男）.gif' },
          { name: '杠铃颈后深蹲（女）', path: '/jsth/腿部训练/杠铃颈后深蹲（女）.gif' },
          { name: '坐姿提踵特写（女）', path: '/jsth/腿部训练/坐姿提踵特写（女）.gif' },
          { name: '坐姿提踵', path: '/jsth/腿部训练/坐姿提踵.gif' },
          { name: '杠铃颈后深蹲侧面（男）', path: '/jsth/腿部训练/杠铃颈后深蹲侧面（男）.gif' },
          { name: '前蹲侧面（男）', path: '/jsth/腿部训练/前蹲侧面（男）.gif' },
          { name: '剪蹲（男）', path: '/jsth/腿部训练/剪蹲（男）.gif' },
          { name: '坐式腿屈伸（女）', path: '/jsth/腿部训练/坐式腿屈伸（女）.gif' },
        ]
      }],
      "04": [{
        id: "04", name: "臀部", desc: "",
        subList: [
          { name: '相扑深蹲正面', path: '/jsth/臀部训练/相扑深蹲正面.gif' },
          { name: '相扑深蹲男', path: '/jsth/臀部训练/相扑深蹲男.gif' },
          { name: '相扑深蹲', path: '/jsth/臀部训练/相扑深蹲.gif' },
          { name: '跪姿髋外展-正面女', path: '/jsth/臀部训练/跪姿髋外展-正面女.gif' },
          { name: '后弓步男', path: '/jsth/臀部训练/后弓步男.gif' },
          { name: '跪姿髋外展-正面', path: '/jsth/臀部训练/跪姿髋外展-正面.gif' },
          { name: '保加利亚深蹲', path: '/jsth/臀部训练/保加利亚深蹲.gif' },
          { name: '单腿硬拉', path: '/jsth/臀部训练/单腿硬拉.gif' },
          { name: '侧向行走', path: '/jsth/臀部训练/侧向行走.gif' },
          { name: '臀推', path: '/jsth/臀部训练/臀推.gif' },
          { name: '站姿髋外展-男', path: '/jsth/臀部训练/站姿髋外展-男.gif' },
          { name: '侧向行走-女', path: '/jsth/臀部训练/侧向行走-女.gif' },
          { name: '跪姿髋外展-女', path: '/jsth/臀部训练/跪姿髋外展-女.gif' },
          { name: '站姿腿后踢', path: '/jsth/臀部训练/站姿腿后踢.gif' },
          { name: '站姿腿后踢特写', path: '/jsth/臀部训练/站姿腿后踢特写.gif.gif' },
          { name: '跪姿腿后踢', path: '/jsth/臀部训练/跪姿腿后踢.gif' },
          { name: '跪姿髋外展-男', path: '/jsth/臀部训练/跪姿髋外展-男.gif' },
          { name: '后弓步蹲-女', path: '/jsth/臀部训练/后弓步蹲-女.gif' },
          { name: '站姿髋外展-女', path: '/jsth/臀部训练/站姿髋外展-女.gif' },
        ]
      }],
      "05": [{
        id: "05", name: "腹部", desc: "",
        subList: [
          { name: '坐式缩腿（女）', path: '/jsth/腹部训练/坐式缩腿（女）.gif' },
          { name: '直腿抬升（女）', path: '/jsth/腹部训练/直腿抬升（女）.gif' },
          { name: '悬杠屈膝缩腿（女）', path: '/jsth/腹部训练/悬杠屈膝缩腿（女）.gif' },
          { name: '曲腿仰卧卷腹（女）', path: '/jsth/腹部训练/曲腿仰卧卷腹（女）.gif' },
          { name: '头碰膝（男）', path: '/jsth/腹部训练/头碰膝（男）.gif' },
          { name: '大腿手滑（男）', path: '/jsth/腹部训练/大腿手滑（男）.gif' },
          { name: '同侧手触踝-女', path: '/jsth/腹部训练/同侧手触踝-女.gif' },
          { name: '直角支撑（男）', path: '/jsth/腹部训练/直角支撑（男）.gif' },
          { name: '控腿收腹（女）', path: '/jsth/腹部训练/控腿收腹（女）.gif' },
          { name: '元宝收腹（女）', path: '/jsth/腹部训练/元宝收腹（女）.gif' },
          { name: '直腿提臀（女）', path: '/jsth/腹部训练/直腿提臀（女）.gif' },
          { name: '搁腿仰卧起坐（男）', path: '/jsth/腹部训练/搁腿仰卧起坐（男）.gif' },
          { name: '斜板仰卧腿上举（男）', path: '/jsth/腹部训练/斜板仰卧腿上举（男）.gif' },
          { name: 'v形两头起（男）', path: '/jsth/腹部训练/v形两头起（男）.gif' },
          { name: '同侧手触踝-男', path: '/jsth/腹部训练/同侧手触踝-男.gif' },
          { name: '十字大挑战（男）', path: '/jsth/腹部训练/十字大挑战（男）.gif' },
          { name: '屈膝起坐（男）', path: '/jsth/腹部训练/屈膝起坐（男）.gif' },
          { name: '直角支撑（女）', path: '/jsth/腹部训练/直角支撑（女）.gif' },
          { name: '头碰膝（女）', path: '/jsth/腹部训练/头碰膝（女）.gif' },
          { name: '大腿手滑（女）', path: '/jsth/腹部训练/大腿手滑（女）.gif' },
          { name: '直腿抬升（男）', path: '/jsth/腹部训练/直腿抬升（男）.gif' },
          { name: '悬杠屈膝缩腿（男）', path: '/jsth/腹部训练/悬杠屈膝缩腿（男）.gif' },
          { name: '曲腿仰卧卷腹（男）', path: '/jsth/腹部训练/曲腿仰卧卷腹（男）.gif' },
          { name: '坐式缩腿（男）', path: '/jsth/腹部训练/坐式缩腿（男）.gif' },
          { name: '十字大挑战（女）', path: '/jsth/腹部训练/十字大挑战（女）.gif' },
          { name: '屈膝起坐（女）', path: '/jsth/腹部训练/屈膝起坐（女）.gif' },
          { name: 'v形两头起（女）', path: '/jsth/腹部训练/v形两头起（女）.gif' },
          { name: '斜板仰卧腿上举（女）', path: '/jsth/腹部训练/斜板仰卧腿上举（女）.gif' },
          { name: '直腿提臀（男）', path: '/jsth/腹部训练/直腿提臀（男）.gif' },
          { name: '搁腿仰卧起坐（女）', path: '/jsth/腹部训练/搁腿仰卧起坐（女）.gif' },
          { name: '元宝收腹（男）', path: '/jsth/腹部训练/元宝收腹（男）.gif' },
          { name: '控腿收腹（男）', path: '/jsth/腹部训练/控腿收腹（男）.gif' },
        ]
      }],
      "06": [{
        id: "06", name: "肩部", desc: "",
        subList: [
          { name: '	单臂侧平拉龙门架（男）', path: '/jsth/肩部训练/	单臂侧平拉龙门架（男）.gif' },
          { name: '	杠铃前平举（女）-(2)', path: '/jsth/肩部训练/	杠铃前平举（女）-(2).gif' },
          { name: '俯身侧平举（男）', path: '/jsth/肩部训练/俯身侧平举（男）.gif' },
          { name: '哑铃推举（男）', path: '/jsth/肩部训练/哑铃推举（男）.gif' },
          { name: '杠铃前平举（女）', path: '/jsth/肩部训练/杠铃前平举（女）.gif' },
          { name: '哑铃耸肩（男）', path: '/jsth/肩部训练/哑铃耸肩（男）.gif' },
          { name: '直立推举（男）', path: '/jsth/肩部训练/直立推举（男）.gif' },
          { name: '哑铃前平举（男）', path: '/jsth/肩部训练/哑铃前平举（男）.gif' },
          { name: '哑铃侧平举（男）', path: '/jsth/肩部训练/哑铃侧平举（男）.gif' },
          { name: '站姿推肩', path: '/jsth/肩部训练/站姿推肩.gif' },
          { name: '俯身侧平举侧面（男）', path: '/jsth/肩部训练/俯身侧平举侧面（男）.gif' },
          { name: '颈后推举（女）', path: '/jsth/肩部训练/颈后推举（女）.gif' },
          { name: '哑铃侧平举（女）', path: '/jsth/肩部训练/哑铃侧平举（女）.gif' },
          { name: '哑铃前平举（女）', path: '/jsth/肩部训练/哑铃前平举（女）.gif' },
          { name: '直立推举（女）', path: '/jsth/肩部训练/直立推举（女）.gif' },
          { name: '哑铃耸肩（女）', path: '/jsth/肩部训练/哑铃耸肩（女）.gif' },
          { name: '杠铃前平举（男）-(2)', path: '/jsth/肩部训练/杠铃前平举（男）-(2).gif' },
          { name: '杠铃前平举（男）', path: '/jsth/肩部训练/杠铃前平举（男）.gif' },
          { name: '俯身侧平举（女）', path: '/jsth/肩部训练/俯身侧平举（女）.gif' },
          { name: '哑铃推举（女）', path: '/jsth/肩部训练/哑铃推举（女）.gif' },
          { name: '单臂侧平拉龙门架（女）', path: '/jsth/肩部训练/单臂侧平拉龙门架（女）.gif' },
          { name: '俯身侧平举侧面（女）', path: '/jsth/肩部训练/俯身侧平举侧面（女）.gif' },
          { name: '颈后推举（男）', path: '/jsth/肩部训练/颈后推举（男）.gif' },
        ]
      }],
      "07": [{
        id: "07", name: "手臂", desc: "",
        subList: [
          { name: '	绳索下拉男', path: '/jsth/手臂训练/	绳索下拉男.gif' },
          { name: '锤式弯举', path: '/jsth/手臂训练/锤式弯举.gif' },
          { name: '俯立臂曲伸（男）', path: '/jsth/手臂训练/俯立臂曲伸（男）.gif' },
          { name: '臂弯举（男）', path: '/jsth/手臂训练/臂弯举（男）.gif' },
          { name: '绳索下拉', path: '/jsth/手臂训练/绳索下拉.gif' },
          { name: '斜托臂弯举（男）', path: '/jsth/手臂训练/斜托臂弯举（男）.gif' },
          { name: '坐姿反握腕弯举（女）', path: '/jsth/手臂训练/坐姿反握腕弯举（女）.gif' },
          { name: '窄距俯卧撑侧面-男', path: '/jsth/手臂训练/窄距俯卧撑侧面-男.gif' },
          { name: '曲杆杠铃弯举侧面（男）', path: '/jsth/手臂训练/曲杆杠铃弯举侧面（男）.gif' },
          { name: '曲杆杠铃弯举（女）', path: '/jsth/手臂训练/曲杆杠铃弯举（女）.gif' },
          { name: '杠铃弯举（女）', path: '/jsth/手臂训练/杠铃弯举（女）.gif' },
          { name: '窄距俯卧撑-男侧面', path: '/jsth/手臂训练/窄距俯卧撑-男侧面.gif' },
          { name: '直臂后抬（男）', path: '/jsth/手臂训练/直臂后抬（男）.gif' },
          { name: '仰卧臂屈伸（男）', path: '/jsth/手臂训练/仰卧臂屈伸（男）.gif' },
          { name: '站姿正握下拉（女）', path: '/jsth/手臂训练/站姿正握下拉（女）.gif' },
          { name: '单臂弯举（男）', path: '/jsth/手臂训练/单臂弯举（男）.gif' },
          { name: '劲霸弯举女', path: '/jsth/手臂训练/劲霸弯举女.gif' },
          { name: '锤式弯举（女）', path: '/jsth/手臂训练/锤式弯举（女）.gif' },
          { name: '龙门架弯举', path: '/jsth/手臂训练/龙门架弯举.gif' },
          { name: '仰卧后撑（女）', path: '/jsth/手臂训练/仰卧后撑（女）.gif' },
          { name: '坐姿哑铃颈后臂屈伸（女）', path: '/jsth/手臂训练/坐姿哑铃颈后臂屈伸（女）.gif' },
          { name: '杠铃弯举侧面（女）', path: '/jsth/手臂训练/杠铃弯举侧面（女）.gif' },
          { name: '龙门架弯举（女）', path: '/jsth/手臂训练/龙门架弯举（女）.gif' },
          { name: '杠铃弯举（男）', path: '/jsth/手臂训练/杠铃弯举（男）.gif' },
          { name: '曲杆杠铃弯举侧面（女）', path: '/jsth/手臂训练/曲杆杠铃弯举侧面（女）.gif' },
          { name: '曲杆杠铃弯举（男）', path: '/jsth/手臂训练/曲杆杠铃弯举（男）.gif' },
          { name: '坐姿反握腕弯举（男）', path: '/jsth/手臂训练/坐姿反握腕弯举（男）.gif' },
          { name: '斜托臂弯举（女）', path: '/jsth/手臂训练/斜托臂弯举（女）.gif' },
          { name: '直臂后抬2（男）', path: '/jsth/手臂训练/直臂后抬2（男）.gif' },
          { name: '臂弯举（女）', path: '/jsth/手臂训练/臂弯举（女）.gif' },
          { name: '窄距俯卧撑-女侧面', path: '/jsth/手臂训练/窄距俯卧撑-女侧面.gif' },
          { name: '俯立臂曲伸（女）', path: '/jsth/手臂训练/俯立臂曲伸（女）.gif' },
          { name: '窄距俯卧撑-女', path: '/jsth/手臂训练/窄距俯卧撑-女.gif' },
          { name: '杠铃弯举侧面（男）', path: '/jsth/手臂训练/杠铃弯举侧面（男）.gif' },
          { name: '坐姿哑铃颈后臂屈伸（男）', path: '/jsth/手臂训练/坐姿哑铃颈后臂屈伸（男）.gif' },
          { name: '仰卧后撑（男）', path: '/jsth/手臂训练/仰卧后撑（男）.gif' },
          { name: '单臂弯举（女）', path: '/jsth/手臂训练/单臂弯举（女）.gif' },
          { name: '站姿正握下拉（男）', path: '/jsth/手臂训练/站姿正握下拉（男）.gif' },
          { name: '窄距俯卧撑-男', path: '/jsth/手臂训练/窄距俯卧撑-男.gif' },
          { name: '直臂后抬（女）', path: '/jsth/手臂训练/直臂后抬（女）.gif' },
          { name: '仰卧臂屈伸（女）', path: '/jsth/手臂训练/仰卧臂屈伸（女）.gif' },
        ]
      }],
      "08": [{
        id: "08", name: "普拉提", desc: "它主要是锻炼人体深层的小肌肉群，维持和改善外观正常活动姿势、达到身体平衡、创展躯干和肢体的活动范围和活动能力、强调对核心肌群的控制、加强人脑对肢体及骨骼肌肉组织的神经感应及支配，再配合正确的呼吸方法所进行的一项全身协调运动。",
        subList: [
          { name: '	胸部抬起-男', path: '/jsth/普拉提动作/	胸部抬起-男.gif' },
          { name: '百次呼吸-男', path: '/jsth/普拉提动作/百次呼吸-男.gif' },
          { name: '双腿伸展-男', path: '/jsth/普拉提动作/双腿伸展-男.gif' },
          { name: '站姿中立位2-女', path: '/jsth/普拉提动作/站姿中立位2-女.gif' },
          { name: '猫-男', path: '/jsth/普拉提动作/猫-男.gif' },
          { name: '俯身提臀-女', path: '/jsth/普拉提动作/俯身提臀-女.gif' },
          { name: '泳式-女', path: '/jsth/普拉提动作/泳式-女.gif' },
          { name: '俯卧中立位-女', path: '/jsth/普拉提动作/俯卧中立位-女.gif' },
          { name: '马-男', path: '/jsth/普拉提动作/马-男.gif' },
          { name: '骨盆卷动-女', path: '/jsth/普拉提动作/骨盆卷动-女.gif' },
          { name: '仰卧中立位-女', path: '/jsth/普拉提动作/仰卧中立位-女.gif' },
          { name: '球状-男', path: '/jsth/普拉提动作/球状-男.gif' },
          { name: '侧卧单腿后蹬-男', path: '/jsth/普拉提动作/侧卧单腿后蹬-男.gif' },
          { name: '侧卧中立位-男', path: '/jsth/普拉提动作/侧卧中立位-男.gif' },
          { name: '侧卧单腿上抬-男', path: '/jsth/普拉提动作/侧卧单腿上抬-男.gif' },
          { name: '双腿伸展-女', path: '/jsth/普拉提动作/双腿伸展-女.gif' },
          { name: '普拉提下蹲-女', path: '/jsth/普拉提动作/普拉提下蹲-女.gif' },
          { name: '胸部抬起-女', path: '/jsth/普拉提动作/胸部抬起-女.gif' },
          { name: '百次呼吸-女', path: '/jsth/普拉提动作/百次呼吸-女.gif' },
          { name: '美人鱼侧弯拉伸-女', path: '/jsth/普拉提动作/美人鱼侧弯拉伸-女.gif' },
          { name: '仰卧中立位-男', path: '/jsth/普拉提动作/仰卧中立位-男.gif' },
          { name: '侧卧单腿上抬-女', path: '/jsth/普拉提动作/侧卧单腿上抬-女.gif' },
          { name: '骨盆卷动-男', path: '/jsth/普拉提动作/骨盆卷动-男.gif' },
          { name: '四肢游泳-女', path: '/jsth/普拉提动作/四肢游泳-女.gif' },
          { name: '侧卧中立位-女', path: '/jsth/普拉提动作/侧卧中立位-女.gif' },
          { name: '球状-女', path: '/jsth/普拉提动作/球状-女.gif' },
          { name: '泳式-男', path: '/jsth/普拉提动作/泳式-男.gif' },
          { name: '马-女', path: '/jsth/普拉提动作/马-女.gif' },
          { name: '俯身提臀-男', path: '/jsth/普拉提动作/俯身提臀-男.gif' },
          { name: '锯子-女', path: '/jsth/普拉提动作/锯子-女.gif' },
          { name: '俯卧中立位-男', path: '/jsth/普拉提动作/俯卧中立位-男.gif' },
          { name: '单腿伸直操-男', path: '/jsth/普拉提动作/单腿伸直操-男.gif' },
          { name: '侧卧蚌式-女', path: '/jsth/普拉提动作/侧卧蚌式-女.gif' },
          { name: '十字大挑战-女', path: '/jsth/普拉提动作/十字大挑战-女.gif' },
          { name: '坐姿体前屈-女', path: '/jsth/普拉提动作/坐姿体前屈-女.gif' },
          { name: '跪姿后仰-女', path: '/jsth/普拉提动作/跪姿后仰-女.gif' },
          { name: '坐姿中立位-女', path: '/jsth/普拉提动作/坐姿中立位-女.gif' },
          { name: '小天鹅-男', path: '/jsth/普拉提动作/小天鹅-男.gif' },
          { name: '侧卧单腿环绕-男', path: '/jsth/普拉提动作/侧卧单腿环绕-男.gif' },
          { name: '仰卧单腿上抬-男', path: '/jsth/普拉提动作/仰卧单腿上抬-男.gif' },
          { name: '侧卧蹬自行车-女', path: '/jsth/普拉提动作/侧卧蹬自行车-女.gif' },
          { name: '僵虫-男', path: '/jsth/普拉提动作/僵虫-男.gif' },
          { name: '脊柱扭动-女', path: '/jsth/普拉提动作/脊柱扭动-女.gif' },
          { name: '单腿伸展-男', path: '/jsth/普拉提动作/单腿伸展-男.gif' },
          { name: '上翻-男', path: '/jsth/普拉提动作/上翻-男.gif' },
          { name: '仰卧卷起-男', path: '/jsth/普拉提动作/仰卧卷起-男.gif' },
          { name: '四肢跪地侧踢-女', path: '/jsth/普拉提动作/四肢跪地侧踢-女.gif' },
          { name: '基本背伸展-女', path: '/jsth/普拉提动作/基本背伸展-女.gif' },
          { name: '坐姿体前屈-男', path: '/jsth/普拉提动作/坐姿体前屈-男.gif' },
          { name: '十字大挑战-男', path: '/jsth/普拉提动作/十字大挑战-男.gif' },
          { name: '侧卧蚌式-男', path: '/jsth/普拉提动作/侧卧蚌式-男.gif' },
          { name: '仰卧单腿上抬-女', path: '/jsth/普拉提动作/仰卧单腿上抬-女.gif' },
          { name: '坐姿中立位-男', path: '/jsth/普拉提动作/坐姿中立位-男.gif' },
          { name: '跪姿后仰-男', path: '/jsth/普拉提动作/跪姿后仰-男.gif' },
          { name: '单腿伸直操-女', path: '/jsth/普拉提动作/单腿伸直操-女.gif' },
          { name: '小天鹅-女---副本', path: '/jsth/普拉提动作/小天鹅-女---副本.gif' },
          { name: '平板支撑-女', path: '/jsth/普拉提动作/平板支撑-女.gif' },
          { name: '单腿伸展-女', path: '/jsth/普拉提动作/单腿伸展-女.gif' },
          { name: '四肢跪地中立位-男', path: '/jsth/普拉提动作/四肢跪地中立位-男.gif' },
          { name: '四肢跪地侧踢-男', path: '/jsth/普拉提动作/四肢跪地侧踢-男.gif' },
          { name: '仰卧卷起-女', path: '/jsth/普拉提动作/仰卧卷起-女.gif' },
          { name: '侧卧蹬自行车-男', path: '/jsth/普拉提动作/侧卧蹬自行车-男.gif' },
          { name: '上翻-女', path: '/jsth/普拉提动作/上翻-女.gif' },
          { name: '侧卧单腿环绕-女', path: '/jsth/普拉提动作/侧卧单腿环绕-女.gif' },
          { name: '僵虫-女', path: '/jsth/普拉提动作/僵虫-女.gif' },
        ]
      }]
    };
    // for (let i = 0; i < 26; i++) {
    //   list[i] = {};
    //   list[i].name = String.fromCharCode(65 + i);
    //   list[i].id = i;
    // }
    var list = lists[id]
    this.setData({
      list: list,
      listCur: list[0]
    })
  },
  onReady() {
    wx.hideLoading()
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight //+ data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  },

  openUrl(e) {
    var url = e.currentTarget.dataset.path;
    var name = e.currentTarget.dataset.name;
    var desc = e.currentTarget.dataset.desc;
    console.log(sys.url + url)
    wx.navigateTo({
      url: '../dtil/index?url=' + sys.url + url + '&name=' + name + '&desc=' + desc
    })
  }
})