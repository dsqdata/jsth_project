const sys = require('../../../../utils/sys.js')
const util = require('../../../../utils/util.js')
var app = getApp();
Page({
  data: {
    id: null,
    nickname:null,
    title: null,
    content: null,
    formats: {},
    readOnly: false,
    placeholder: '请输入计划内容 ......',
    editorHeight: 300,
    keyboardHeight: 0,
    isIOS: false,
    colors: ["red", "blue", "green", "pink", "grey", "yellow", "orange", "brown", "mauve", "purple", "brown"]
  },
  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },
  titleChange(e) {
    console.log(e);
    this.setData({
      title: e.detail.value
    })
  },
  onLoad(options) {
    const that = this
    var id = options.id;
    var nickname = options.nickname;
    var avatarurl = options.avatarurl
    this.setData({
      id: id,
      nickname: nickname
    })
    if(!!id){
      sys.postRequest('/api/v0/plan/getOne', {id:id},function(res){
        that.setData({
          title : res.title,
          content : decodeURIComponent(res.content)
        })
        wx.createSelectorQuery().select('#editor').context(function (rs) {
          that.editorCtx = rs.context
          that.editorCtx.setContents({html: decodeURIComponent(res.content)})
        }).exec()
      },function(res){})
    }
    const platform = wx.getSystemInfoSync().platform
    const isIOS = platform === 'ios'
    this.setData({ isIOS })
    this.updatePosition(0)
    let keyboardHeight = 0
    wx.onKeyboardHeightChange(res => {
      if (res.height === keyboardHeight) return
      const duration = res.height > 0 ? res.duration * 1000 : 0
      keyboardHeight = res.height
      setTimeout(() => {
        wx.pageScrollTo({
          scrollTop: 0,
          success() {
            that.updatePosition(keyboardHeight)
            that.editorCtx.scrollIntoView()
          }
        })
      }, duration)

    })
  },
  updatePosition(keyboardHeight) {
    const toolbarHeight = 50 + 100
    const { windowHeight, platform } = wx.getSystemInfoSync()
    let editorHeight = keyboardHeight > 0 ? (windowHeight - keyboardHeight - toolbarHeight) : windowHeight
    this.setData({ editorHeight, keyboardHeight })
  },
  calNavigationBarAndStatusBar() {
    const systemInfo = wx.getSystemInfoSync()
    const { statusBarHeight, platform } = systemInfo
    const isIOS = platform === 'ios'
    const navigationBarHeight = isIOS ? 44 : 48
    return statusBarHeight + navigationBarHeight
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
    }).exec()

    // wx.createSelectorQuery().select('#editor').context(function (res) {
    //   that.editorCtx = res.context;
    //   console.log("初始化成功：" + wx.getStorageSync("content"))
    //   if (wx.getStorageSync("content")) { // 设置~历史值
    //     that.editorCtx.insertText(wx.getStorageSync("content")) // 注意：插入的是对象
    //   }
    // }).exec()
  },
  blur() {
    this.editorCtx.blur()
  },
  format(e) {
    let { name, value } = e.target.dataset
    if (!name) return
    // console.log('format', name, value)
    this.editorCtx.format(name, value)

  },
  // 获取内容
  onContentChange(e) {
    this.setData({
      content: e.detail,
    })
    console.log(e.detail)
    wx.setStorageSync("content", e.detail)
  },
  onStatusChange(e) {
    const formats = e.detail
    this.setData({ formats })
  },
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function () {
        console.log('insert divider success')
      }
    })
  },
  clear() {
    this.editorCtx.clear({
      success: function (res) {
        console.log("clear success")
      }
    })
  },
  removeFormat() {
    this.editorCtx.removeFormat()
  },
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },
  insertImage() {
    const that = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        that.editorCtx.insertImage({
          src: res.tempFilePaths[0],
          data: {
            id: 'abcd',
            role: 'god'
          },
          width: '80%',
          success: function () {
            console.log('insert image success')
          }
        })
      }
    })
  }
})
