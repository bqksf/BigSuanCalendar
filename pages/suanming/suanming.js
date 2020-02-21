// pages/suanming/suanming.js
// 在页面中定义插屏广告
let interstitialAd = null
Page({
  data: {
    statusBarHeight: wx.getSystemInfoSync().statusBarHeight
  },
  onLoad() {// 在页面onLoad回调事件中创建插屏广告实例
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
  toYanyuan() {
    wx.navigateTo({
      url: './yanyuan/yanyuan'
    });
  },
  toHehun() {
    wx.navigateTo({
      url: './hehun/hehun'
    });
  },
  onShareAppMessage: function () {

  }
})