const app = getApp();
const sys = require('../../../utils/sys.js')

Page({
  data: {
    index: null,
    sex: ['男', '女'],
    sexIndex: null,
    yun: ['很少或没有运动', '一星期运动1至3次', '一星期运动4至6次'],
    yunIndex: null,
    age: null,
    shengao: null,
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
  shengaoChange(e) {
    this.setData({
      shengao: e.detail.value
    })
  },
  tizhongChange(e) {
    this.setData({
      tizhong: e.detail.value
    })
  },

  jsFunction(e) {
    if (!!!this.data.sexIndex) {
      sys.showToast("请选择性别")
      return false
    }
    if (!!!this.data.yunIndex) {
      sys.showToast("请选择一周运动频率")
      return false
    }
    if (!!!this.data.age) {
      sys.showToast("请输入年龄")
      return false
    }
    if (!!!this.data.shengao) {
      sys.showToast("请输入身高")
      return false
    }
    if (!!!this.data.tizhong) {
      sys.showToast("请输入体重")
      return false
    }
    console.log(this.data.sexIndex)
    var base = 0;
    if (this.data.sexIndex == 0) { //男
      base = 66 + (13.7 * this.data.tizhong) + (5 * this.data.shengao) - (6.8 * this.data.age)
    } else {
      base = 655 + (9.6 * this.data.tizhong) + (1.8 * this.data.shengao) - (4.7 * this.data.age)
    }

    if (this.data.yunIndex == 0) {
      base = base * 1.2
    } else if (this.data.yunIndex == 1) {
      base = base * 1.5
    } else {
      base = base * 1.8
    }

    this.setData({
      baseResult: base.toFixed(2),
      modalName: e.currentTarget.dataset.target
    })

  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
})