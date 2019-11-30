//login.js
//获取应用实例
const sys = require('../../utils/sys.js')
var app = getApp();
Page({
  data: {
    remind: '加载中',
    angle: 0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  goToIndex: function () {
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
                sys.postRequest('/api/v0/user/add', app.globalData.userInfo,
                  function (res) { },
                  function (res) { }
                )
                wx.reLaunch({
                  url: '/pages/start/index',
                })
              }                
            })
          }
        }, function (res) {
          sys.showToast("网络请求错误！");
        })
      }
    });
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: wx.getStorageSync('appName')
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    if (!!e.detail.userInfo) { //用户按了允许授权按钮
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      wx.reLaunch({
        url: '/pages/start/index',
      })
    } else { //用户按了拒绝按钮

    }
  },
  onShow: function () {

  },
  onReady: function () {
    var that = this;
    setTimeout(function () {
      that.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) { angle = 14; }
      else if (angle < -14) { angle = -14; }
      if (that.data.angle !== angle) {
        that.setData({
          angle: angle
        });
      }
    });
  }
});