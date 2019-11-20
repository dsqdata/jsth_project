const app = getApp()
const sys = require('../../../utils/sys.js')
Page({
  data: {
    Height: 0,
    scale: 13,//缩放级别，取值范围为3-20
    latitude: "",//中心纬度
    longitude: "",//中心经度
    markers: [],//标记点
    controls: [],
    circles: [],//circles
  },

  onLoad: function () {
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        //设置map高度，根据当前设备宽高满屏显示
        _this.setData({
          view: {
            Height: res.windowHeight
          }
        })
      }
    })

    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          circles: [{
            latitude: res.latitude,
            longitude: res.longitude,
            color: '#FF0000DD',
            fillColor: '#7cb5ec88',
            radius: 1500,
            strokeWidth: 1
          }]
        })
      }
    })
    sys.postRequest('/api/v0/user/getUserLocal', { pageSize: 99999 }, function (res) {
      var location = []
      res.data.docs.forEach((item, index, arr) => { // item为arr的元素，index为下标，arr原数组
        var marker = {
          id: item._id,
          latitude: item.wxUserInfo.location.latitude,
          longitude: item.wxUserInfo.location.longitude,
          width: 30,
          height: 30,
          iconPath: item.wxUserInfo.avatarUrl,
          title: item.wxUserInfo.nickName
        }
        location.push(marker)
      })
      _this.setData({
        markers: location
      })
    }, function (res) {
      console.log(res)
    })

  },

  regionchange(e) {
    console.log("regionchange===" + e.type)
  },

  //点击merkers
  markertap(e) {
    console.log(e.markerId)
    wx.navigateTo({
      url: '../../other/userinfo/index?id=' + e.markerId
    })

    // wx.showActionSheet({
    //   itemList: ["A"],
    //   success: function (res) {
    //     console.log(res.tapIndex)
    //   },
    //   fail: function (res) {
    //     console.log(res.errMsg)
    //   }
    // })
  },

  //点击缩放按钮动态请求数据
  controltap(e) {
    var that = this;
    console.log("scale===" + this.data.scale)
    if (e.controlId === 1) {
      // if (this.data.scale === 13) {
      that.setData({
        scale: --this.data.scale
      })
      // }
    } else {
      //  if (this.data.scale !== 13) {
      that.setData({
        scale: ++this.data.scale
      })
      // }
    }

  },

})