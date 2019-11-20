const sys = require('../../../utils/sys.js')
const app = getApp()
Page({
  data: {
    userInfo: {},
    current: 1,
    infoList: []
  },
  onLoad(options) {
    var _this = this;
    var id = options.id
    sys.postRequest('/api/v0/user/getWxUserInfoById', { id: id },
      function (res) {
        _this.setData({
          userInfo: res.data
        })
      },
      function (res) { }
    ),
      this.loadList()
  },
  onReady() {
    wx.hideLoading()
  },
  loadList() {
    var that = this;
    sys.postRequest('/api/v0/user/listUserShare', {
      current: that.data.current,
      title: that.data.fileValue
    }, function (res) {
      if (res.data.docs.lenght !== 0) {
        that.setData({
          infoList: that.data.infoList.concat(res.data.docs),
          current: that.data.current + 1
        })
      }
    }, function (res) {

    })
  },
  onReachBottom() {
    // 下拉触底，先判断是否有请求正在进行中
    // 以及检查当前请求页数是不是小于数据总页数，如符合条件，则发送请求
    // if (!this.loading && this.data.page < this.data.pages) {
    this.loadList()
    // }
  },

})