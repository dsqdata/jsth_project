//index.js
//获取应用实例
const sys = require('../../../../utils/sys.js')
var app = getApp()
Page({
  data: {
    url: sys.url,
    current: 1,
    zsList: [],
    pageable: true
  },

  onLoad: function () {
    this.loadList()
  },

  loadList: function () {
    var that = this
    if (that.data.pageable) {
      sys.getRequest('/api/v0/content/getList?current=' + this.data.current,
        {}, function (res) {
          console.log(res.data.docs.length)
          if (res.data.docs.length !== 0) {
            that.setData({
              zsList: that.data.zsList.concat(res.data.docs),
              current: that.data.current + 1
            })
          }else{
            that.setData({
              pageable: false
            })
          }
        }, function (res) {
        })
    }
  },

  openZs(e) {
    var id = e.currentTarget.id
    wx.navigateTo({
      url: "../dtl/index?id=" + e.currentTarget.id
    })
  },

  onReachBottom() {
    this.loadList()
  },
})