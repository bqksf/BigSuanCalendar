// 在页面中定义插屏广告
let interstitialAd = null
const AV = require('../../../utils/av-weapp-min.js');
Page({
  data: {
    title: "",
    zonghe: "",
    jiehun_time: "",
    taohua_num: "",
    peiou_xingge: "",
    wending_xishu: "",
    zhuwang_zhishu: "",
    zinv_yunshu: ""
  },
  onLoad(options) {
    var paramsJson = options;
    paramsJson.hour == '未知时' && (paramsJson.hour = '');
    paramsJson.hour = paramsJson.hour.replace(/[^0-9]/ig,"");
    paramsJson.sex = paramsJson.sex == '男' ? 1 : 0;
    AV.Cloud.run('yanYuan', paramsJson).then((data) => {
      //console.log(data);
      this.setData({
        title: data[0],
        zonghe: data[1],
        jiehun_time: data[2],
        taohua_num: data[3],
        peiou_xingge: data[4],
        wending_xishu: data[5],
        zhuwang_zhishu: data[6],
        zinv_yunshu: data[7]
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