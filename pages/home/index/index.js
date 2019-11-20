//index.js
//获取应用实例
const sys = require('../../../utils/sys.js')
var app = getApp()
Page({
  data: {
    cardCur: 0,
    skin: false,
    url: sys.url,
    iconList: [
      { id: '01', icon: sys.url + '/jsth/icons/xb.png', color: 'red', badge: 1, name: '胸部训练' },
      { id: '02', icon: sys.url + '/jsth/icons/bb.png', color: 'orange', badge: 0, name: '背部训练' },
      { id: '03', icon: sys.url + '/jsth/icons/tb.png', color: 'yellow', badge: 0, name: '腿部训练' },
      { id: '04', icon: sys.url + '/jsth/icons/tub.png', color: 'olive', badge: 0, name: '臀部训练' },
      { id: '05', icon: sys.url + '/jsth/icons/fb.png', color: 'cyan', badge: 0, name: '腹部训练' },
      { id: '06', icon: sys.url + '/jsth/icons/jb.png', color: 'blue', badge: 0, name: '肩部训练' },
      { id: '07', icon: sys.url + '/jsth/icons/sb.png', color: 'purple', badge: 0, name: '手臂训练' },
      { id: '08', icon: sys.url + '/jsth/icons/plt.png', color: 'mauve', badge: 0, name: '普拉提' }
    ],
    swiperList: [
      {
        id: 0,
        type: 'image',
        url: sys.url + '/jsth/banners/index-05.png'
      }, {
        id: 1,
        type: 'image',
        url: sys.url + '/jsth/banners/index-01.jpg'
      }, {
        id: 2,
        type: 'image',
        url: sys.url + '/jsth/banners/index-02.jpg'
      }, {
        id: 3,
        type: 'image',
        url: sys.url + '/jsth/banners/index-03.jpg'
      }, {
        id: 4,
        type: 'image',
        url: sys.url + '/jsth/banners/index-04.jpg'
      }],

    zsList: []
  },

  onLoad: function () {
    var that = this
    wx.setNavigationBarTitle({
      title: wx.getStorageSync('appName')
    })
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.login({
            success: res => {
              sys.postRequest('/api/v0/user/getCode', {
                jscode: res.code
              }, function (res) {
                var openid = res.data.openid;
                if (!openid) {
                  sys.showToast("微信请求接口错误，请稍后再试！");
                } else {
                  app.globalData.openid = openid
                  app.globalData.userInfo.openid = openid
                  wx.getLocation({
                    type: 'wgs84',
                    altitude: true,
                    success(res) {
                      app.globalData.userInfo.location = res
                    },
                    complete(res) {
                      sys.postRequest('/api/v0/user/doRegWx', app.globalData.userInfo,
                        function (res) {
                          app.globalData.loginUser = res.data
                        },
                        function (res) { }
                      )
                    }
                  })
                }
              }, function (res) {
                sys.showToast("网络请求错误！");
              })
            }
          });
        }
      }
    })

    sys.getRequest('/api/v0/content/getList?model=1', {}, function (res) {
      console.log(res)
      that.setData({
        zsList: res.data.docs
      })
    }, function (res) {
    })
  },

  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },


  openMore() {
    if (!!app.globalData.userInfo) {
      wx.navigateTo({
        url: './list/index'
      })
    } else {
      wx.navigateTo({
        url: '../../index/index'
      })
    }
  },

  clickItem(e) {
    var id = e.currentTarget.id
    if (!!app.globalData.userInfo) {
      wx.navigateTo({
        url: '../../other/action/list/index?id=' + id
      })
    } else {
      wx.navigateTo({
        url: '../../index/index'
      })
    }
  },

  openZs(e) {
    var id = e.currentTarget.id
    wx.navigateTo({
      url: "./dtl/index?id=" + e.currentTarget.id
    })
  },

  onShareAppMessage: function () {
    return {
      title: wx.getStorageSync('appName') + '——' + app.globalData.shareProfile,
      path: '/pages/home/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
})