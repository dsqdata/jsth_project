const app = getApp()
const sys = require('../../../utils/sys.js')

Page({
  data: {
    userInfo: {},
    iconList: [
      { id: '01', icon: sys.url + '/jsth/icons/jsjh.png', color: 'red', badge: 1, name: '健身计划' },
      { id: '02', icon: sys.url + '/jsth/icons/zsfx.png', color: 'orange', badge: 0, name: '知识累积' },
    ],
    elements: [
      {
        title: 'BMR',
        name: '基础代谢',
        page: 'bmr/index',
        color: 'cyan',
        icon: 'hotfill'
      },
      {
        title: 'BMI',
        name: '身体质量',
        page: 'bmi/index',
        color: 'mauve',
        icon: 'profile'
      },
      {
        title: 'PRO',
        name: '蛋白质',
        page: 'pro/index',
        color: 'orange',
        icon: 'colorlens'
      },
      {
        title: 'EHR',
        name: '运动心率',
        page: 'ehr/index',
        color: 'blue',
        icon: 'like'
      }
    ],
  },
  onLoad() {
    if (!!app.globalData.userInfo && !!app.globalData.userInfo.openid){
      this.setData({
        openid: app.globalData.userInfo.openid
      })
    }
  },
  openUrl(e) {
    if (!!app.globalData.userInfo) {
      var url = e.currentTarget.dataset.url
      wx.navigateTo({
        url: url
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
      if (id==="01"){
        wx.navigateTo({
          url: '../../home/plan/list/index'
        })
      } else if (id === "02"){
        wx.navigateTo({
          url: '../../other/zsfx/index'
        })
      }
    } else {
      wx.navigateTo({
        url: '../../index/index'
      })
    }
  },

  
})