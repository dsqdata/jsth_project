//login.js
//获取应用实例
const sys = require('../../utils/sys.js')
var app = getApp();
Page({
  data: {
    remind: true,
    angle: 0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function () {
    var _this = this

    var userInfo = wx.getStorageSync('userInfo')
    if (!!userInfo) {
      app.globalData.openid = wx.getStorageSync('openid')
      app.globalData.userInfo = wx.getStorageSync('userInfo')
      app.globalData.userLogin = wx.getStorageSync('userLogin')
      _this.goToIndex();
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.login({
            success: res => {
              wx.getUserInfo({
                success: gui => {
                  sys.postRequest('/api/v0/user/getCode', {
                    jscode: res.code
                  }, function (res) {
                    var openid = res.data.openid;
                    if (!openid) {
                      sys.showToast("微信请求接口错误，请稍后再试！");
                    } else {
                      app.globalData.openid = openid
                      app.globalData.userInfo = gui.userInfo
                      app.globalData.userInfo.openid = openid
                      app.globalData.userLogin = true
                      wx.setStorageSync('openid', app.globalData.openid);
                      wx.setStorageSync('userInfo', app.globalData.userInfo);
                      wx.setStorageSync('userLogin', app.globalData.userLogin);
                    }
                    _this.goToIndex();
                  }, function (res) {
                    _this.goToIndex();
                  })
                },
                fail: () => {
                  _this.goToIndex();
                }
              })
            },
            fail: () => {
              _this.goToIndex();
            }

          })
        } else {
          _this.goToIndex();
        }
      }
    })
  },

  goToIndex() {
    wx.reLaunch({
      url: '/pages/home/index/index',
    })
  },
  onShow: function () {

  },
  onReady: function () {

  }
});