const sys = require('../../../utils/sys.js')
const app = getApp()
Page({
  data: {
    url: sys.url,
    userInfo: null,
    fileValue: '',
    current: 1,
    loadModal: false,
    infoList: [],
    showConfig: false
  },
  onLoad(options) {
    var _this = this
    if (!!app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
      sys.postRequest('/api/v0/user/listUserShareConfig',
        { openid: app.globalData.userInfo.openid }, function (res) {
          if (res.data.length>0){
            _this.setData({ showConfig: true })
          }
        }, function (res) {})
    }
    this.loadList()
  },
  onReady() {
    wx.hideLoading()
  },
  changeData: function () {
    this.setData({
      infoList: [],
      current: 1
    })
    this.onLoad(); //最好是只写需要刷新的区域的代码，onload也可，效率低，有点low
  },

  loadList() {
    var that = this;
    sys.postRequest('/api/v0/user/listUserShare', {
      current: that.data.current,
      content: that.data.fileValue
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
  titleInput(e) {
    this.setData({
      fileValue: e.detail.value
    })
  },
  searchBt() {
    this.setData({
      infoList: [],
      current: 1
    })
    this.onLoad(); //最好是只写需要刷新的区域的代码，onload也可，效率低，有点low
  },
  addBt() {
    wx.navigateTo({
      url: './add/index'
    })
  },
  onReachBottom() {
    // 下拉触底，先判断是否有请求正在进行中
    // 以及检查当前请求页数是不是小于数据总页数，如符合条件，则发送请求
    // if (!this.loading && this.data.page < this.data.pages) {
    this.loadList()
    // }
  },
  ViewImage(e) {
    var urls = []
    for (let index in e.currentTarget.dataset.urls) {
      urls.push(sys.url + e.currentTarget.dataset.urls[index])
    };
    wx.previewImage({
      urls: urls,
      current: e.currentTarget.dataset.url
    });
  },
  deleteItem: function (e) {
    this.setData({
      loadModal: true
    })
    var _this = this
    var id = e.currentTarget.dataset.sid
    sys.postRequest('/api/v0/user/deleteUserShare', {
      id: id
    }, function (res) {
      _this.setData({
        loadModal: false
      })
      if (res.status !== 200) {
        sys.showToast("微信请求接口错误，请稍后再试！");
      } else {
        _this.setData({
          infoList: [],
          current: 1
        })
        _this.loadList()
      }
    }, function (res) {
      _this.setData({
        loadModal: false
      })
      sys.showToast("微信请求接口错误，请稍后再试！");
    })
  },
  onShareAppMessage: function (e) {
    return {
      title: '健身知识' + '——' + '分享',
      path: '/pages/other/zsfx/index'
    }
  }
})