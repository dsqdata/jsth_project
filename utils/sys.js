
const baseUrl = 'https://cms.dsqhost.com'

// const baseUrl = 'http://localhost:8081'


//post请求
function postRequest(url, params, success, fail) {
  this.postRequestLoading(url, params, "", success, fail)
}

//根据判断message 是否显示loading
function postRequestLoading(url, params, message, success, fail) {
  if (message != "") {
    wx.showLoading({
      title: message,
    })
  }
  const postRequestTask = wx.request({
    url: baseUrl + url,
    data: params,
    header: {
      'content-type': 'application/json;charset=UTF-8'
    },
    method: 'POST',
    success: function (res) {
      if (message != "") {
        wx.hideLoading()
      }
      if (res.statusCode == 200) {
        success(res.data)
      } else {
        fail(res)
      }
    },
    fail: function (res) {
      if (message != "") {
        wx.hideLoading()
      }
      fail(res)
    }
  })
}

//get请求
function getRequest(url, params, success, fail) {
  this.getRequestLoading(url, params, "", success, fail)
}

function getRequestLoading(url, params, message, success, fail) {
  if (message != "") {
    wx.showLoading({
      title: message,
    })
  }
  const getRequestTask = wx.request({
    url: baseUrl + url,
    data: params,
    header: {
      'Content-Type': 'application/json'
    },
    method: 'GET',
    success: function (res) {
      if (message != "") {
        wx.hideLoading()
      }
      if (res.statusCode == 200) {
        success(res.data)
      } else {
        fail(res)
      }
    },
    fail: function (res) {
      if (message != "") {
        wx.hideLoading()
      }
      fail(res)
    }
  })
}

//取消post请求
function abortPostRequest(url, params, success, fail) {
  postRequestTask.abort()
}

//取消get请求
function abortGetRequest(url, params, success, fail) {
  getRequestTask.abort()
}

function showToast(msg) {
  wx.showToast({
    title: msg,
    icon: 'none',
    duration: 2000
  })
}

function login(){
  // 获取用户信息
  wx.getSetting({
    success: res => {
      if (res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            wx.login({
              success: res => {
                sys.postRequest('/api/v0/user/getCode',
                  { jscode: res.code },
                  function (res) {
                    var openid = res.data.openid;
                    if (!!!openid) {
                      sys.showToast("微信请求接口错误，请稍后再试！");
                    } else {
                      app.globalData.openid = openid
                      app.globalData.userInfo.openid = openid
                      wx.getLocation({
                        type: 'wgs84',
                        altitude: true,
                        success(res) {
                          app.globalData.userInfo.location = res
                        },
                        complete(res) {
                          sys.postRequest('/api/v0/user/doRegWx', app.globalData.userInfo,
                            function (res) { },
                            function (res) { }
                          )
                        }
                      })
                    }
                  }, function (res) {
                    sys.showToast("网络请求错误！");
                  })
              },
              fail: function (res) {
                console.log(res)
              }
            });
          }
        })
      } else {
        wx.reLaunch({
          url: '../../index/index',
        })
      }
    }
  })
}

module.exports = {
  url: baseUrl,
  postRequest: postRequest,
  postRequestLoading: postRequestLoading,
  getRequest: getRequest,
  getRequestLoading: getRequestLoading,
  abortPostRequest: abortPostRequest,
  abortGetRequest: abortGetRequest,
  showToast: showToast
}