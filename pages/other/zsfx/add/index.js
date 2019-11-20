const sys = require('../../../../utils/sys.js')
const util = require('../../../../utils/util.js')
const app = getApp()
Page({
  data: {
    imgList: [],
    detailPics: []
  },
  onLoad(options) { },
  onReady() {
    wx.hideLoading()
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  titleInput(e) {
    this.setData({
      titleValue: e.detail.value
    })
  },
  saveBt() {
    // console.log(this.data.imgList)
    // console.log(this.data.detailPics)
    // if (!!!this.data.titleValue) {
    //   sys.showToast("请输入标题")
    //   return false
    // }
    if (!!!this.data.textareaAValue) {
      sys.showToast("请输入分享内容")
      return false
    }
    sys.postRequest('/api/v0/user/addUserShare', {
      openid: app.globalData.userInfo.openid,
      nickName: app.globalData.userInfo.nickName,
      avatarUrl: app.globalData.userInfo.avatarUrl,
      detailPics: this.data.detailPics,
      // title: this.data.titleValue,
      content: this.data.textareaAValue,
      date: util.formatDate(new Date())
    }, function (res) {
      var pages = getCurrentPages(); //当前页面栈
      if (pages.length > 1) {
        var beforePage = pages[pages.length - 2]; //获取上一个页面实例对象
        beforePage.changeData(); //触发父页面中的方法
      }
      wx.navigateBack({
        delta: 1
      })
    }, function (res) {
      sys.showToast("分享保存失败！")
    })

  },

  ChooseImage() {
    var that = this;

    wx.chooseImage({
      count: 9, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: (res) => {

        that.uploadimg({
          url: sys.url + '/api/v0/upload/files?type=images', //这里是你图片上传的接口
          path: res.tempFilePaths, //这里是选取的图片的地址数组
        });

        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
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
      title: '删除照片',
      content: '确定要删除这张照片吗？',
      cancelText: '再想想',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.data.detailPics.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList,
            detailPics: this.data.detailPics
          })
        }
      }
    })
  },

  uploadimg: function (data) {
    wx.showLoading({
      title: '上传中...',
      mask: true,
    })
    var that = this,
      i = data.i ? data.i : 0,
      success = data.success ? data.success : 0,
      fail = data.fail ? data.fail : 0;
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      name: 'file',
      formData: null,
      success: (resp) => {
        wx.hideLoading();
        success++;
        var str = resp.data //返回的结果，可能不同项目结果不一样
        var pic = JSON.parse(str);
        // var pic_name = that.data.showUrl + pic.Data;
        var detailPics = that.data.detailPics;
        detailPics.push(pic.data.path)
        that.setData({
          detailPics: detailPics
        })
      },
      fail: (res) => {
        fail++;
        // console.log('fail:' + i + "fail:" + fail);
      },
      complete: () => {
        i++;
        if (i == data.path.length) { //当图片传完时，停止调用     
          // console.log('执行完毕');
          // console.log('成功：' + success + " 失败：" + fail);
          var myEventDetail = {
            picsList: that.data.detailPics
          } // detail对象，提供给事件监听函数
          var myEventOption = {} // 触发事件的选项
          that.triggerEvent('myevent', myEventDetail, myEventOption)
        } else { //若图片还没有传完，则继续调用函数
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data);
        }
      }
    });
  },
})