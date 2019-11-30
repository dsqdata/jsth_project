//index.js
//获取应用实例
const sys = require('../../../utils/sys.js')
const util = require('../../../utils/util.js')
var app = getApp()

let chart = null // 先声明一个变量用以后面做F2的new
function tzChartInit(canvas, width, height, F2) { // F2实现回调的方法，方法名用来最后赋值绑定
  new Promise(function (resolve, reject) {
    sys.postRequest('/api/v0/user/listUserConfig', {
      type: 'tz',
      openid: app.globalData.userInfo.openid
    }, function (res) {
      var cdt = []
      for (var i = 0; i < res.data.docs.length; i++) {
        var obj = res.data.docs[i]
        cdt.push({ date: obj.cDate, steps: obj.cData })
      }
      resolve(cdt) // 将数据返回给到new上进行then索取
    }, function (res) { });
  }).then((data) => {
    chart = new F2.Chart({ el: canvas, width, height: '100' })
    processChart(chart, data)
  });
  return chart;
}
function tzChartDemoInit(canvas, width, height, F2) { // F2实现回调的方法，方法名用来最后赋值绑定
  var data = [{ date: '2018-09-09', steps: 89 }, { date: '2019-09-09', steps: 189 }]
  chart = new F2.Chart({ el: canvas, width, height: '100' });
  processChart(chart, data)
  return chart;
}
function processChart(chart, data) {
  chart.source(data, {
    date: {
      type: 'timeCat',
      range: [0, 1],
      mask: 'MM-D'
    },
    steps: {
      ticks: [200],
      formatter: function formatter(val) {
        return val === 200 ? '200kg' : 0;
      }
    }
  });
  chart.axis('date', {
    line: {
      stroke: '#ffffff'
    },
    label: function label(text, index, total) {
      const cfg = {
        textAlign: 'center',
        fill: '#85A5FF',
        fontSize: 12,
        fontWeight: 300
      };
      if (index === 0) {
        cfg.textAlign = 'start';
        cfg.text = text.split('-').join('月');
      } else {
        cfg.text = text.split('-')[1];
      }
      if (index === total - 1) {
        cfg.textAlign = 'end';
        cfg.fill = '#ffffff';
        cfg.fontWeight = 'normal';
      }
      return cfg;
    }
  });
  chart.axis('steps', {
    position: 'right',
    label: {
      fill: '#CFFFFE',
      fillOpacity: 0.5,
      fontSize: 9,
      fontWeight: 300
    },
    grid: {
      stroke: '#85A5FF'
    }
  });
  chart.area().position('date*steps').style({
    fill: 'l(-90) 0.03:rgba(216,216,216,0.10) 1:#6E6CD8',
    fillOpacity: 1
  });
  chart.line().position('date*steps').color('#EFDBFF').size(1.5);
  chart.point().position('date*steps').color('#EED5FF').size(2.5);
  chart.render();
}

Page({
  data: {
    isLoginFlag: false,
    date: util.formatDateZh(new Date()),
    userInfo: null,

    text: "健身团钬新增体重记录、目标记录、体围记录、健身记录，优化知识页面等",
    marqueePace: 1, //滚动速度
    marqueeDistance: 0, //初始滚动距离
    marquee_margin: 30,
    size: 14,
    interval: 20, // 时间间隔

    cardCur: 0,
    skin: false,
    url: sys.url,
    iconList: [
      {
        id: '01',
        icon: sys.url + '/jsth/icons/xb.png',
        color: 'red',
        badge: 1,
        name: '胸部训练'
      },
      {
        id: '02',
        icon: sys.url + '/jsth/icons/bb.png',
        color: 'orange',
        badge: 0,
        name: '背部训练'
      },
      {
        id: '03',
        icon: sys.url + '/jsth/icons/tb.png',
        color: 'yellow',
        badge: 0,
        name: '腿部训练'
      },
      {
        id: '04',
        icon: sys.url + '/jsth/icons/tub.png',
        color: 'olive',
        badge: 0,
        name: '臀部训练'
      },
      {
        id: '05',
        icon: sys.url + '/jsth/icons/fb.png',
        color: 'cyan',
        badge: 0,
        name: '腹部训练'
      },
      {
        id: '06',
        icon: sys.url + '/jsth/icons/jb.png',
        color: 'blue',
        badge: 0,
        name: '肩部训练'
      },
      {
        id: '07',
        icon: sys.url + '/jsth/icons/sb.png',
        color: 'purple',
        badge: 0,
        name: '手臂训练'
      },
      {
        id: '08',
        icon: sys.url + '/jsth/icons/plt.png',
        color: 'mauve',
        badge: 0,
        name: '普拉提'
      }
    ],
    swiperList: [
      {
        id: 0,
        type: 'image',
        url: sys.url + '/jsth/banners/index-05.png'
      }, {
        id: 1,
        type: 'image',
        url: sys.url + '/jsth/banners/index-01.jpg'
      }, {
        id: 2,
        type: 'image',
        url: sys.url + '/jsth/banners/index-02.jpg'
      }, {
        id: 3,
        type: 'image',
        url: sys.url + '/jsth/banners/index-03.jpg'
      }, {
        id: 4,
        type: 'image',
        url: sys.url + '/jsth/banners/index-04.jpg'
      }],

    zsList: [],

  },
  onLoad: function () {
    var _this = this
    if (app.globalData.userLogin) {
      _this.setData({
        isLoginFlag: app.globalData.userLogin,
        userInfo: app.globalData.userInfo,
        xmgm: {
          onInit: tzChartInit //这里就是在js中用到的方法名
        },
      })
      wx.getLocation({
        type: 'wgs84',
        altitude: true,
        success(res) {
          app.globalData.userInfo.location = res
        },
        complete(res) {
          sys.postRequest('/api/v0/user/doRegWx', app.globalData.userInfo,
            function (res) {
              app.globalData.loginUser = res.data
            },
            function (res) { }
          )
        }
      })
    } else {
      _this.setData({
        xmgm: {
          onInit: tzChartDemoInit //这里就是在js中用到的方法名
        },
      })
    }
    sys.getRequest('/api/v0/content/getList?model=1', {}, function (res) {
      _this.setData({
        zsList: res.data.docs
      })
    }, function (res) { })
  },

  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  onShow: function () {
    // var that = this;
    // var length = that.data.text.length * that.data.size; //文字长度
    // var windowWidth = wx.getSystemInfoSync().windowWidth; // 屏幕宽度
    // that.setData({
    //   length: length,
    //   windowWidth: windowWidth
    // });
    // that.scrolltxt(); // 第一个字消失后立即从右边出现
  },
  openMore() {
    this.navigateTo('./list/index')
  },
  clickItem(e) {
    var id = e.currentTarget.id
    this.navigateTo('../../other/action/list/index?id=' + id)
  },
  openZs(e) {
    var id = e.currentTarget.id
    this.navigateTo('./dtl/index?id=' + id)
  },
  openTools(e) {
    var id = e.currentTarget.id
    console.log(id)
    if (id == 0) {
      this.navigateTo('../../tools/calendar/index')
    } else if (id == 1) {
      this.navigateTo('../tools/tz/list/index')
    } else if (id == 2) {
      this.navigateTo('../tools/tw/list/index')
    } else if (id == 3) {
      this.navigateTo('../tools/mb/list/index')
    } else if (id == 4) {
      this.navigateTo('../plan/list/index')
    }

  },
  navigateTo(url) {
    if (app.globalData.userLogin) {
      wx.navigateTo({ url: url })
    } else {
      wx.navigateTo({ url: '../../index/index' })
    }
  },

  onShareAppMessage: function () {
    return {
      title: wx.getStorageSync('appName') + '——' + app.globalData.shareProfile,
      path: '/pages/home/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  scrolltxt: function () {
    var that = this;
    var length = that.data.length; //滚动文字的宽度
    var windowWidth = that.data.windowWidth; //屏幕宽度
    if (length > windowWidth) {
      var interval = setInterval(function () {
        var maxscrollwidth = length + that.data.marquee_margin; //滚动的最大宽度，文字宽度+间距，如果需要一行文字滚完后再显示第二行可以修改marquee_margin值等于windowWidth即可
        var crentleft = that.data.marqueeDistance;
        if (crentleft < maxscrollwidth) { //判断是否滚动到最大宽度
          that.setData({
            marqueeDistance: crentleft + that.data.marqueePace
          })
        } else {
          //console.log("替换");
          that.setData({
            marqueeDistance: 0 // 直接重新滚动
          });
          clearInterval(interval);
          that.scrolltxt();
        }
      }, that.data.interval);
    } else {
      that.setData({
        marquee_margin: "1000"
      }); //只显示一条不滚动右边间距加大，防止重复显示
    }
  },
  goLogin() {
    wx.navigateTo({
      url: '../../index/index'
    })
  },
})