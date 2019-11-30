const sys = require('../../../../../utils/sys.js')
const util = require('../../../../../utils/util.js')
var app = getApp();
Page({
  data: {
    title: null
  },
  titleChange(e) {
    this.setData({
      title: e.detail.value
    })
  },
  saveBt() {
    if (!!!this.data.title) {
      sys.showToast("请输入体重")
      return false
    }

    sys.postRequest('/api/v0/user/addUserConfig', {
      openid: app.globalData.userInfo.openid,
      type: 'tz',
      cDate: util.formatDate(new Date()),
      cData: this.data.title
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
