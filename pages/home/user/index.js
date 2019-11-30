const App = getApp()
const sys = require('../../../utils/sys.js')
Page({
  data: {
    userInfo: {},
    showConfig: false,
    items: [
      {
        icon: '../../assets/images/iconfont-kefu.png',
        text: '联系客服',
        path: '',
      },
      {
        icon: '../../assets/images/iconfont-help.png',
        text: '常见问题',
        path: '/pages/help/list/index',
      },
    ],
    settings: [
      {
        icon: '../../assets/images/iconfont-clear.png',
        text: '清除缓存',
        clearText: '0.0KB'
      },
      {
        icon: '../../assets/images/iconfont-about.png',
        text: '关于我们',
        path: '/pages/about/index'
      }
    ]
  },
  onLoad() {
    var _this = this
    this.getUserInfo()
    if (!!App.globalData.userInfo) {
      this.setData({
        userInfo: App.globalData.userInfo
      })
      sys.postRequest('/api/v0/user/listUserShareConfig',
        { openid: App.globalData.userInfo.openid }, function (res) {
          if (res.data.length > 0) {
            _this.setData({ showConfig: true })
          }
        }, function (res) { })
    }
  },
  goLogin() {
    wx.navigateTo({
      url: '../../index/index'
    })
  },
  navigateTo(e) {
    const index = e.currentTarget.dataset.index
    const path = e.currentTarget.dataset.path
    switch (index) {
      case 2:
        App.WxService.makePhoneCall({
          phoneNumber: path
        })
        break
      default:
        App.WxService.navigateTo(path)
    }
  },
  getUserInfo() {
    const userInfo = App.globalData.userInfo
    if (userInfo) {
      this.setData({
        userInfo: userInfo
      })
      return
    }
  }
})