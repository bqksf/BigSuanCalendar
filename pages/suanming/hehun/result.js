// 在页面中定义插屏广告
let interstitialAd = null
const AV = require('../../../utils/av-weapp-min.js');
function insertStr(soure, start, newStr){   
  return soure.slice(0, start) + newStr + soure.slice(start);
}
Page({
  data: {
    content: "",
  },
  onLoad(options) {
    var paramsJson = options;
    paramsJson.hour1 == '未知时' && (paramsJson.hour1 = '');
    paramsJson.hour2 == '未知时' && (paramsJson.hour2 = '');
    paramsJson.sex = paramsJson.sex == '男' ? 1 : 0;
    paramsJson.date1 = insertStr(paramsJson.date1,4,'-2');
    paramsJson.date2 = insertStr(paramsJson.date2,4,'-2');
    AV.Cloud.run('heHun', paramsJson).then((data) => {
      this.setData({
        content: data
      });
    }, function (err) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '服务器错误，请再尝试一次。' + err,
      });
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
});