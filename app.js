//app.js
App({
  config:{host:'quququye.cn'},
  onLaunch: function () {
    console.log('app on launch')
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //console.log(this.globalData.locationInfo)
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({       
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  //get locationInfo
  getLocationInfo: function (cb) {
    var that = this;
    if (this.globalData.locationInfo) {
      cb(this.globalData.locationInfo)
    } else {
      wx.getLocation({
        type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
        success: function (res) {
          that.globalData.locationInfo = res;
          cb(that.globalData.locationInfo)
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
      
    }
  },
  getSystemInfo:function(cb) {
    var that = this;
    if(this.globalData.SystemInfo){
      typeof cb =="function" && cb(that.globalData.SystemInfo)
    }
    else{
      wx.getSystemInfo({
        success: function (res) {
          that.globalData.SystemInfo = res;
          cb(that.globalData.SystemInfo)
        },
        fail: function(){
          //fail
        },
        complete: function(){
          //complete
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    SystemInfo: null,
    locationInfo: null
  }
})