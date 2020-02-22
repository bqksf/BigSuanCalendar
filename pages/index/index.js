const AV = require('../../utils/av-weapp-min.js');
// 在页面中定义插屏广告
let interstitialAd = null
Page({
  data: {
    statusBarHeight: wx.getSystemInfoSync().statusBarHeight,
    tipText: "此页面内容仅供娱乐使用",
    modal: "您可以点击下边的联系客服，告诉我们程序改进建议",
    whatBtn: "改进建议"
  },
  onLoad() {
    AV.Cloud.run('daSuan').then((data) => {
      this.setData({
        tipText: data.tipText,
        whatBtn: data.whatBtn,
        modal: data.modal
      });
    }, function (err) {
    });
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
  onShareAppMessage() { },
  //页面跳转事件
  toDaSuan() {
    wx.navigateTo({
      url: "../bigsuan/bigsuan"
    });
  },
  toKnowMore() {
    wx.showModal({
      title: "提示",
      content: this.data.modal,
      showCancel: false
    });
  }
});