// 在页面中定义插屏广告
let interstitialAd = null
Page({
  data: {
    sex: ["男", "女"],
    sexIndex: 0,
    year: ["2000", "2001"],
    yearIndex: 0,
    month: ["01", "02"],
    monthIndex: 0,
    day: ["01", "02"],
    dayIndex: 0,
    time: ["0时", "1时"],
    timeIndex: 0,
  },
  onLoad() {
    this.initForm();
    // 在页面onLoad回调事件中创建插屏广告实例
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-db4f18975ce2d5f7'
      })
      interstitialAd.onLoad(() => { })
      interstitialAd.onError((err) => { })
      interstitialAd.onClose(() => { })
    }
  },
  onshow() {
    // 在适合的场景显示插屏广告
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
  },
  taoButton(){
    const {sex,year,month,day,time,sexIndex,yearIndex,monthIndex,dayIndex,timeIndex} = this.data;
    wx.navigateTo({
      url: './result?sex='+sex[sexIndex]+'&year='+year[yearIndex]+'&month='+month[monthIndex]+'&day='+day[dayIndex]+'&hour='+time[timeIndex],
    });
  },
  initForm(){
    let year = [];
    for (let i = 70; i <= 99; i++) {
      year.push("19"+i);
    }
    for (let i = 0; i <= 9; i++) {
      year.push("200"+i);
    }
    for (let i = 10; i <= 30; i++) {
      year.push("20"+i);
    }
    let day = [];
    for (let i = 1; i <= 31; i++) {
      day.push(i);
    }
    let month = [];
    for (let i = 1; i <= 12; i++) {
      month.push(i);
    }
    let time = [];
    time.push('未知时');
    for (let i = 0; i <= 23; i++) {
      time.push(i+"时");
    }
    this.setData({
        year: year,
        month: month,
        day: day,
        time: time
    });
  },
  bindSexChange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);

    this.setData({
      sexIndex: e.detail.value
    })
  },
  bindYearChange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);

    this.setData({
      yearIndex: e.detail.value
    })
  },
  bindMonthChange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);

    this.setData({
      monthIndex: e.detail.value
    })
  },
  bindDayChange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);

    this.setData({
      dayIndex: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);

    this.setData({
      timeIndex: e.detail.value
    })
  },
  onShareAppMessage() { },
  //页面跳转事件
  toDaSuan() {
    wx.navigateTo({
      url: "../bigsuan/bigsuan"
    });
  },
});