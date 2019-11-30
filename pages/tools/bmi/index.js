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
    tizhong: null,
    flist: [
      ["BMI 分类", "WHO 标准", '亚洲标准', '中国参考标准', '相关疾病发病的危险性'],
      ['偏瘦', '<18.5', '<18.5', '<18.5','低（但其它疾病危险性增加）'], 
      ['正常', '18.5～24.9', '18.5～22.9', '18.5～23.9', '平均水平'],
      ['超重', '≥25', '≥23', '≥24', ''],
      ['偏胖', '25.0～29.9', '23～24.9', '24～26.9', '增加'],
      ['肥胖', '30.0～34.9', '25～29.9', '27～29.9', '中度增加'],
      ['重度肥胖', '35.0～39.9', '≥30', '≥30', '严重增加'],
      ['极重度肥胖', '≥40.0', '≥30', '≥30', '非常严重增加']
      ]
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
    console.log(this.data.shengao)
    console.log(this.data.tizhong)
    var base = this.data.tizhong / (this.data.shengao * this.data.shengao * 0.0001)
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