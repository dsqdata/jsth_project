const app = getApp()
const sys = require('../../../utils/sys.js')

Page({
  data: {
    userInfo: {},
    iconList: [
      { id: '01', icon: sys.url + '/jsth/icons/jh.png', color: 'yellow', badge: 1, name: '健身计划' },
      { id: '02', icon: sys.url + '/jsth/icons/tz.png', color: 'red', badge: 1, name: '体重记录' },
      { id: '03', icon: sys.url + '/jsth/icons/dis.png', color: 'olive', badge: 1, name: '目标记录' },
      { id: '04', icon: sys.url + '/jsth/icons/tw.png', color: 'blue', badge: 1, name: '体围记录' },
      { id: '05', icon: sys.url + '/jsth/icons/rl.png', color: 'blue', badge: 1, name: '健身日历' }
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
  },
  openUrl(e) {
    var url = e.currentTarget.dataset.url
    this.navigateTo(url)
  },
  clickItem(e) {
    var id = e.currentTarget.id
    if (id === "01") {
      this.navigateTo('../../home/plan/list/index')
    } else if (id === "02") {
      this.navigateTo('./tz/list/index')
    } else if (id === "03") {
      this.navigateTo('./mb/list/index')
    } else if (id === "04") {
      this.navigateTo('./tw/list/index')
    } else if (id === "05") {
      this.navigateTo('../../tools/calendar/index')
    }
  },
  navigateTo(url) {
    if (app.globalData.userLogin) {
      wx.navigateTo({ url: url })
    } else {
      wx.navigateTo({ url: '../../index/index' })
    }
  }
})