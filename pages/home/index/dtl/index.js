//index.js
//获取应用实例
const app = getApp();
const WxParse = require('../../../../wxParse/wxParse.js');
const sys = require('../../../../utils/sys.js')

Page({
  data: {
    autoplay: true,
    interval: 3000,
    duration: 1000,
    articlesDetail: {},
    comments: {},
    commentsTotalItems: 0
  },

  //事件处理函数
  swiperchange: function (e) {
    //console.log(e.detail.current)
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  onLoad: function (e) {
    if (e.inviter_id) {
      wx.setStorage({
        key: 'inviter_id_' + e.id,
        data: e.inviter_id
      })
    }
    var that = this;
    wx.request({
      url: sys.url + '/api/v0/content/getContent',
      data: {
        id: e.id
      },
      success: function (res) {
        console.log(res)
        that.setData({
          articlesDetail: res.data.data,
        });
        res.data.data.comments = res.data.data.comments.replace(/src=\"\//g, 'src="https://cms.dsqhost.com/');
        WxParse.wxParse('article', 'html', res.data.data.comments, that, 5);
      }
    })

    // wx.request({
    //   url: sys.url + '/api/v0/message/getList',
    //   data: {
    //     contentId: e.id,
    //     pageSize: 999,
    //     apiSource: "client"
    //   },
    //   success: function (res) {
    //     console.log(res.data.docs)
    //     // that.setData({
    //     //   comments: res.data.docs,
    //     //   commentsTotalItems: res.data.pageInfo.totalItems
    //     // });
    //   }
    // })
  },
  onShareAppMessage: function () {
    return {
      title: this.data.articlesDetail.title,
      path: '/pages/home/index/dtl/index?id=' + this.data.articlesDetail._id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
