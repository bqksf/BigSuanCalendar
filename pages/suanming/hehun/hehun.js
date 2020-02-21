// 在页面中定义插屏广告
let interstitialAd = null
Page({
  data: {
    sex: ["男", "女"],
    sexIndex: 0,
    time: ["0时", "1时"],
    timeIndex: 0,
    date: "2000-01-01",
    date2: "2000-01-01",
    time2: ["0时", "1时"],
    time2Index: 0,
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
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindDate2Change: function (e) {
    this.setData({
      date2: e.detail.value
    })
  },
  taoButton() {
    const { sex, date, date2, time, time2, sexIndex, timeIndex, time2Index } = this.data;
    wx.navigateTo({
      url: './result?sex=' + sex[sexIndex] + '&date1=' + date + '&date2=' + date2 + '&hour1=' + time[timeIndex]+ '&hour2=' + time2[time2Index],
    });
  },
  initForm() {
    let time = [];
    time.push('未知时');
    for (let i = 0; i <= 23; i++) {
      time.push(i + "时");
    }
    this.setData({
      time: time,
      time2: time
    });
  },
  bindSexChange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);

    this.setData({
      sexIndex: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);

    this.setData({
      timeIndex: e.detail.value
    })
  },
  bindTime2Change: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);

    this.setData({
      time2Index: e.detail.value
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