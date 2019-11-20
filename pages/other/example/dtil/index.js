const sys = require('../../../../utils/sys.js')
const app = getApp()
Page({
  data: {

  },
  onLoad(options) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    var name = options.name;
    var url = options.url
    var desc = options.desc
    this.setData({
      name: name,
      url: url,
      desc: desc
    })

  },
  onReady() {
    wx.hideLoading()
  },

})