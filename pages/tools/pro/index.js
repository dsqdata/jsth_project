const app = getApp();
const sys = require('../../../utils/sys.js')

Page({
  data: {
    index: null,
    sex: ['男', '女'],
    sexIndex: null,
    yun: ['正常人', '减肥减脂', '增肌', '健身房健美人士'],
    yunIndex: null,
    age: null,
    tizhong: null
  },

  sexChange(e) {
    console.log(e);
    this.setData({
      sexIndex: e.detail.value
    })
  },

  yunChange(e) {
    console.log(e);
    this.setData({
      yunIndex: e.detail.value
    })
  },

  ageChange(e) {
    this.setData({
      age: e.detail.value
    })
  },

  tizhongChange(e) {
    this.setData({
      tizhong: e.detail.value
    })
  },

  jsFunction(e) {
    // if (!!!this.data.sexIndex) {
    //   sys.showToast("请选择性别")
    //   return false
    // }
    if (!!!this.data.yunIndex) {
      sys.showToast("请选择摄入目标")
      return false
    }
    // if (!!!this.data.age) {
    //   sys.showToast("请输入年龄")
    //   return false
    // }
    if (!!!this.data.tizhong) {
      sys.showToast("请输入体重")
      return false
    }
    console.log(this.data.sexIndex)
    var baseResultStart = 0;
    var baseResultEnd = 0;

    if (this.data.sexIndex == 0) { //男
      baseResultStart = this.data.tizhong
      baseResultEnd = this.data.tizhong
    } else {
      baseResultStart = this.data.tizhong
      baseResultEnd = this.data.tizhong
    }

    if (this.data.yunIndex == 0) {
      baseResultStart = baseResultStart * 0.8
      baseResultEnd = baseResultEnd * 1.2
    } else if (this.data.yunIndex == 1) {
      baseResultStart = baseResultStart * 0.8
      baseResultEnd = baseResultEnd * 1.2
    } else if (this.data.yunIndex == 1)  {
      baseResultStart = baseResultStart * 1.2
      baseResultEnd = baseResultEnd * 1.8
    }else{
      baseResultStart = baseResultStart * 1.2
      baseResultEnd = baseResultEnd * 2
    }

    this.setData({
      baseResultStart: baseResultStart.toFixed(2),
      baseResultEnd: baseResultEnd.toFixed(2),
      modalName: e.currentTarget.dataset.target
    })

  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
})