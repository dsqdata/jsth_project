const sys = require('../../../../../utils/sys.js')
const util = require('../../../../../utils/util.js')
var app = getApp();
Page({
  data: {
    sbw:null,
    xw:null,
    yw:null,
    xtw:null,
    tw:null,
    dtw:null
  },
  sbwChange(e) {
    console.log(e)
    this.setData({
      sbw: e.detail.value
    })
  },
  xwChange(e) {
    this.setData({
      xw: e.detail.value
    })
  },
  ywChange(e) {
    this.setData({
      yw: e.detail.value
    })
  },
  xtwChange(e) {
    this.setData({
      xtw: e.detail.value
    })
  },
  twChange(e) {
    this.setData({
      tw: e.detail.value
    })
  },
  dtwChange(e) {
    this.setData({
      dtw: e.detail.value
    })
  },
  saveBt() {
    var _this = this;
    if (!!!this.data.sbw
      && !!!this.data.xw
      && !!!this.data.yw
      && !!!this.data.xtw
      && !!!this.data.tw
      && !!!this.data.dtw) {
      sys.showToast("请输入体围")
      return false
    }
    var cData = {
      sbw: _this.data.sbw,
      xw: _this.data.xw,
      yw: _this.data.yw,
      tw: _this.data.tw,
      xtw: _this.data.xtw,
      dtw: _this.data.dtw
    }
    sys.postRequest('/api/v0/user/addUserConfig', {
      openid: app.globalData.userInfo.openid,
      type: 'tw',
      cDate: util.formatDate(new Date()),
      cData: cData
    }, function (res) {
      var pages = getCurrentPages();//当前页面栈
      if (pages.length > 1) {
        var beforePage = pages[pages.length - 2];//获取上一个页面实例对象
        beforePage.changeData();//触发父页面中的方法
      }
      wx.navigateBack({
        delta: 1
      })
    }, function (res) {
      sys.showToast("数据保存失败！")
    })
  },
  onLoad(options) {

  }
})
