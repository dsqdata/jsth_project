const app = getApp();
Page({
  data: {
    openid: null,
  },
  isCard(e) {
    this.setData({
      isCard: e.detail.value
    })
  },
  onLoad() {
    if (!!app.globalData.userInfo && !!app.globalData.userInfo.openid) {
      this.setData({
        openid: app.globalData.userInfo.openid
      })
    }
  },
  changeData: function () {
    this.onLoad();//最好是只写需要刷新的区域的代码，onload也可，效率低，有点low
  },
  addBt() {
    wx.navigateTo({
      url: '../add/index'
    })
  },
});
