const app = getApp()
const sys = require('../../../../utils/sys.js')

Page({
  data: {
    userInfo: {},
    planList: null,
    modalName: null,
    planId: null,
    openid: null,
    loadModal: false
  },
  onLoad() {
    if (!!app.globalData.userInfo && !!app.globalData.userInfo.openid){
      this.setData({
        openid: app.globalData.userInfo.openid
      })
      this.loadList()
    }
  },
  changeData: function () {
    this.onLoad();//最好是只写需要刷新的区域的代码，onload也可，效率低，有点low
  },

  loadList() {
    this.setData({
      loadModal: true
    })
    var that = this;
    console.log(app.globalData.userInfo)
    sys.postRequest('/api/v0/plan/getPlans', {
      pageSize: 999,
      filter: { openid: app.globalData.userInfo.openid }
    }, function (res) {
      that.setData({
        planList: res.data.data,
        loadModal: false
      })
    }, function (res) { 
      that.setData({
        loadModal: false
      })
    })
  },
  addBt() {
    wx.navigateTo({
      url: '../add/index'
    })
  },
  editBt(e) {
    wx.navigateTo({
      url: '../add/index?id=' + e.currentTarget.id
    })
  },

  deleteBt(e) {
    console.log("id=" + e.currentTarget.id)
    this.setData({
      planId: e.currentTarget.id,
      modalName: "DialogModal"
    })
  },

  shareBt(e) {
    console.log("id=" + e.currentTarget.id)
  },

  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  deleteModal(e) {
    var that = this;
    sys.postRequest('/api/v0/plan/deletePlan', {
      id: that.data.planId,
    }, function (res) {
      that.loadList()
    }, function (res) { })
    this.setData({
      modalName: null
    })
  },

  onShareAppMessage: function (e) {
    return {
      title: '健身计划' + '——' + '分享',
      path: '/pages/home/plan/view/index?id=' + e.target.id + '&nickname=' + app.globalData.userInfo.nickName + '&avatarurl=' + app.globalData.userInfo.avatarUrl,
      imageUrl: '/assets/images/banners/index-01.jpg'
    }
  }
})