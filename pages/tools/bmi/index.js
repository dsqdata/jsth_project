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
    // if (!!!this.data.sexIndex) {
    //   sys.showToast("请选择性别")
    //   return false
    // }
    // if (!!!this.data.yunIndex) {
    //   sys.showToast("请选择一周运动频率")
    //   return false
    // }
    // if (!!!this.data.age) {
    //   sys.showToast("请输入年龄")
    //   return false
    // }
    if (!!!this.data.shengao) {
      sys.showToast("请输入身高")
      return false
    }
    if (!!!this.data.tizhong) {
      sys.showToast("请输入体重")
      return false
    }
    var base = this.data.tizhong / (this.data.shengao * this.data.shengao) 
    this.setData({
      baseResult: base.toFixed(0),
      modalName: e.currentTarget.dataset.target
    })

  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
})