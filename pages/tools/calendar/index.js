const app = getApp();
const sys = require('../../../utils/sys.js')
const util = require('../../../utils/util.js')
Page({
  data: {
    calendarConfig: {
      defaultDay: true,
      showLunar: true,
      multi: false
    },
    dayMap:{},
    dayList:[],
    actionBtn: [
      {
        text: '跳转指定日期',
        action: 'jump',
        color: 'olive'
      },
      {
        text: '获取当前已选',
        action: 'getSelectedDay',
        color: 'red'
      },
      {
        text: '取消所有选中',
        action: 'cancelAllSelectedDay',
        color: 'mauve'
      },
      {
        text: '设置待办事项',
        action: 'setTodoLabels',
        color: 'cyan'
      },
      {
        text: '删除指定代办',
        action: 'deleteTodoLabels',
        color: 'pink'
      },
      {
        text: '清空待办事项',
        action: 'clearTodoLabels',
        color: 'red'
      },
      {
        text: '获取所有代办',
        action: 'getTodoLabels',
        color: 'purple'
      },
      {
        text: '禁选指定日期',
        action: 'disableDay',
        color: 'olive'
      },
      {
        text: '指定可选区域',
        action: 'enableArea',
        color: 'pink'
      },
      {
        text: '指定特定可选',
        action: 'enableDays',
        color: 'red'
      },
      {
        text: '选中指定日期',
        action: 'setSelectedDays',
        color: 'cyan'
      },
      {
        text: '周月视图切换',
        action: 'switchView',
        color: 'orange'
      },
      {
        text: '自定义配置',
        action: 'config',
        color: 'grey',
        disable: true
      },
      {
        text: '获取日历面板日期',
        action: 'getCalendarDates',
        color: 'purple'
      }
    ],
    checkbox: [
      {
        value: 0,
        name: '胸部',
        checked: false,
        hot: false,
      }, {
        value: 1,
        name: '背部',
        checked: false,
        hot: false,
      }, {
        value: 2,
        name: '大腿',
        checked: false,
        hot: false,
      }, {
        value: 3,
        name: '小腿',
        checked: false,
        hot: false,
      }, {
        value: 4,
        name: '肩部',
        checked: false,
        hot: false,
      }, {
        value: 5,
        name: '三头',
        checked: false,
        hot: false,
      }, {
        value: 6,
        name: '二头',
        checked: false,
        hot: false,
      }, {
        value: 7,
        name: '小臂',
        checked: false,
        hot: false,
      }, {
        value: 8,
        name: '腹肌',
        checked: false,
        hot: false,
      }, {
        value: 9,
        name: '有氧',
        checked: false,
        hot: false,
      }]
  },
  onLoad: function () {
    this.loadList()
  },

  loadList: function(){
    var _this = this;
    sys.postRequest('/api/v0/user/listUserConfig', {
      type: 'jsrl',
      openid: app.globalData.userInfo.openid
    }, function (res) {
      _this.setData({
        dayList: res.data.docs,
      })

      _this.calendar.clearTodoLabels()
      var days = []
      var daysMap = {}

      for (var i = 0; i < _this.data.dayList.length;i++){
        var cData = _this.data.dayList[i].cData
        var key = cData.year + cData.month + cData.day
        days.push(cData)
        daysMap[key] = _this.data.dayList[i]._id
      }
      _this.setData({
        dayMap:daysMap
      })
      _this.calendar.setTodoLabels({
        showLabelAlways: true,
        days: days
      });

    }, function (res) { })
  },

  afterTapDay(e) {
    console.log('afterTapDay', e.detail);
  },
  whenChangeMonth(e) {
    console.log('whenChangeMonth', e.detail);
  },
  whenChangeWeek(e) {
    console.log('whenChangeWeek', e.detail);
  },
  onTapDay(e) {
    console.log('onTapDay', e.detail);
  },
  afterCalendarRender(e) {
    console.log('afterCalendarRender', e);
  },
  onSwipe(e) {
    console.log('onSwipe', e);
  },
  showToast(msg) {
    if (!msg || typeof msg !== 'string') return;
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 1500
    });
  },
  generateRandomDate(type) {
    let random = ~~(Math.random() * 10);
    switch (type) {
      case 'year':
        random = 201 * 10 + ~~(Math.random() * 10);
        break;
      case 'month':
        random = (~~(Math.random() * 10) % 9) + 1;
        break;
      case 'date':
        random = (~~(Math.random() * 100) % 27) + 1;
        break;
      default:
        break;
    }
    return random;
  },
  handleAction(e) {
    const { action, disable } = e.currentTarget.dataset;
    if (disable) {
      this.showToast('抱歉，还不支持～😂');
    }
    this.setData({
      rst: []
    });
    const calendar = this.calendar;
    const { year, month } = calendar.getCurrentYM();
    switch (action) {
      case 'config':
        break;
      case 'jump': {
        const year = this.generateRandomDate('year');
        const month = this.generateRandomDate('month');
        const date = this.generateRandomDate('date');
        calendar[action](year, month, date);
        break;
      }
      case 'getSelectedDay': {
        const selected = calendar[action]();
        if (!selected || !selected.length)
          return this.showToast('当前未选择任何日期');
        // console.log('get selected days: ', selected);
        const rst = selected.map(item => JSON.stringify(item));
        this.setData({
          rst
        });
        break;
      }
      case 'cancelAllSelectedDay':
        calendar[action]();
        break;
      case 'setTodoLabels': {
        const days = [
          {
            year,
            month,
            day: this.generateRandomDate('date'),
            todoText: Math.random() * 10 > 5 ? '领奖日' : 'ss'
          }
        ];
        calendar[action]({
          showLabelAlways: true,
          days
        });
        console.log('set todo labels: ', days);
        break;
      }
      case 'deleteTodoLabels': {
        const todos = [...calendar.getTodoLabels()];
        if (todos && todos.length) {
          todos.length = 1;
          calendar[action](todos);
          const _todos = [...calendar.getTodoLabels()];
          setTimeout(() => {
            const rst = _todos.map(item => JSON.stringify(item));
            this.setData(
              {
                rst
              },
              () => {
                console.log('set todo labels: ', todos);
              }
            );
          });
        } else {
          this.showToast('没有待办事项');
        }
        break;
      }
      case 'clearTodoLabels':
        const todos = [...calendar.getTodoLabels()];
        if (!todos || !todos.length) {
          return this.showToast('没有待办事项');
        }
        calendar[action]();
        break;
      case 'getTodoLabels': {
        const selected = calendar[action]();
        if (!selected || !selected.length)
          return this.showToast('未设置待办事项');
        const rst = selected.map(item => JSON.stringify(item));
        rst.map(item => JSON.stringify(item));
        this.setData({
          rst
        });
        break;
      }
      case 'disableDay':
        calendar[action]([
          {
            year,
            month,
            day: this.generateRandomDate('date')
          }
        ]);
        break;
      case 'enableArea': {
        let sDate = this.generateRandomDate('date');
        let eDate = this.generateRandomDate('date');
        if (sDate > eDate) {
          [eDate, sDate] = [sDate, eDate];
        }
        const area = [`${year}-${month}-${sDate}`, `${year}-${month}-${eDate}`];
        calendar[action](area);
        this.setData({
          rstStr: JSON.stringify(area)
        });
        break;
      }
      case 'enableDays':
        const days = [
          `${year}-${month}-${this.generateRandomDate('date')}`,
          `${year}-${month}-${this.generateRandomDate('date')}`,
          `${year}-${month}-${this.generateRandomDate('date')}`,
          `${year}-${month}-${this.generateRandomDate('date')}`,
          `${year}-${month}-${this.generateRandomDate('date')}`
        ];
        calendar[action](days);
        this.setData({
          rstStr: JSON.stringify(days)
        });
        break;
      case 'switchView':
        if (!this.week) {
          calendar[action]('week');
          this.week = true;
        } else {
          calendar[action]();
          this.week = false;
        }
        break;
      case 'setSelectedDays':
        const toSet = [
          {
            year,
            month,
            day: this.generateRandomDate('date')
          },
          {
            year,
            month,
            day: this.generateRandomDate('date')
          }
        ];
        calendar[action](toSet);
        break;
      case 'getCalendarDates':
        this.showToast('请在控制台查看结果');
        console.log(calendar.getCalendarDates());
        break;
      default:
        break;
    }
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  resetCheckbox(){
    const rst = this.data.checkbox;
    for(var i = 0;i<rst.length;i++){
      rst[i].checked = false
    }
    this.setData({
      checkbox: rst
    })
  },
  deleteBt(e) {
    // console.log("id=" + e.currentTarget.id)
    this.setData({
      planId: e.currentTarget.id,
      modalName: "DialogModal"
    })
  },
  deleteModal(e) {
    var that = this;
    sys.postRequest('/api/v0/user/deleteUserConfig', {
      id: that.data.planId,
    }, function (res) {
      that.loadList()
    }, function (res) { })
    this.setData({
      modalName: null
    })
  },
  saveTodoLabels(e) {
    var _this = this;
    const selected = this.calendar.getSelectedDay();
    if (!selected || !selected.length)
      return this.showToast('当前未选择任何日期');

    var item = selected[0]
    var year = item.year
    var month = item.month
    var day = item.day
    var todoText = ''
    for (var i = 0; i < this.data.checkbox.length; i++) {
      if (this.data.checkbox[i].checked) {
        todoText = todoText + this.data.checkbox[i].name + ' '
      }
    }

    if (_this.data.dayMap[year+month+day] != null){
      sys.postRequest('/api/v0/user/deleteUserConfig', {
        id: _this.data.dayMap[year + month + day],
      }, function (res) { }, function (res) { })
    }


    if (todoText == '')
      return this.showToast('当前未选择任何部位');

    const dayData = { year, month, day, todoText };
    
    sys.postRequest('/api/v0/user/addUserConfig', {
      openid: app.globalData.userInfo.openid,
      type: 'jsrl',
      cDate: util.formatDate(new Date()),
      cData: dayData
    }, function (res) {
      _this.loadList()
      _this.resetCheckbox()
      _this.hideModal()
    }, function (res) {
      sys.showToast("数据保存失败！")
      _this.hideModal()
    })
  },
  ChooseCheckbox(e) {
    let items = this.data.checkbox;
    let values = e.currentTarget.dataset.value;
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      if (items[i].value == values) {
        items[i].checked = !items[i].checked;
        break
      }
    }
    this.setData({
      checkbox: items
    })
  }
})