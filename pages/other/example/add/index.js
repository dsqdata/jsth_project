var QQMapWX = require('../../../../utils/qqmap-wx-jssdk.min.js');
const net = require('../../../../utils/sys.js')
const util = require('../../../../utils/util.js')
const app = getApp()
var qqmapsdk;
Page({
  data: {
    title: "",
    content: "",
    imgList: [],
    date: util.formatTime(new Date()),
    address: "",
    lat: "",
    lng: ""
  },

  inputTitle: function (e) {
    this.setData({
      title: e.detail.value
    })
  },

  inputWord: function (e) {
    this.setData({
      content: e.detail.value
    })
  },

  onLoad: function (options) {
    this.setData({
      projectId: options.project_id
    })
    qqmapsdk = new QQMapWX({
      key: 'JZ2BZ-M6NRJ-DKTFM-FEVNH-TWJEH-E3BMT'
    });

    var that = this;
    qqmapsdk.reverseGeocoder({
      success: function (res) {//成功后的回调
        that.setData({
          address: res.result.address,
          lat: res.result.ad_info.location.lat,
          lng: res.result.ad_info.location.lng
        })
        console.log(res)
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    })
  },
  onclick(event) {
    console.log(this.data)

    net.postRequest('/api/jjkjjXmjd', {
      time: this.data.date,
      mainId: this.data.projectId,
      content: this.data.content,
      images: this.data.showImgUrl,
      videos: this.data.showVidUrl,
      field1: this.data.address,
      field2: this.data.lat,
      field3: this.data.lng
    }, function (res) {

      wx.navigateBack({
        delta: 1         // 返回上一页
      });
      console.log(res)
    }, function (res) {
      console.log(res)
    });
  },
  ChooseImage() {
    var that = this;
    wx.chooseImage({
      count: 9, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }

        for (var i = 0; i < that.data.imgList.length;i++){
          console.log(res.tempFilePaths[i])
          wx.uploadFile({
            url: net.baseUrl + '/file/upload',
            filePath: res.tempFilePaths[i],
            name: 'file',
            formData: null,
            success: (resp) => {
              console.log(resp)
            }
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '删除确认',
      content: '确定要删除这张照片吗？',
      cancelText: '取消',
      confirmText: '确认',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
})