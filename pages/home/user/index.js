const App = getApp()

Page({
  data: {
    userInfo: {},
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
    this.getUserInfo()
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