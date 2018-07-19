var app = getApp()
var util = require('../../utils/util.js') 
Page({
  data: {
    map_width: 380,
    map_height: 380,
    lng:null,
    lat:null,
    shuzu :[], 
    markers: [],
    date:null,
  },
  
  //show current position
  onLoad: function () {
    var that = this;
    this.mapCtx = wx.createMapContext("map4select");
    // 获取定位，并把位置标示出来
    app.getLocationInfo(function (locationInfo) {
      that.setData({
        longitude: locationInfo.longitude,
        latitude: locationInfo.latitude,     
      })
    }) 
    app.getUserInfo(function(userInfo){
   //   console.log(userInfo)
    })

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          map_width: res.windowWidth,
          map_height: res.windowHeight,
          controls: [{
            id: 1,
            iconPath: '/pages/images/center.png',
            position: {
              left: res.windowWidth/2-15,
              top: res.windowHeight/2-15,
              width: 30,
              height: 30
            },
            clickable: true
          },
          {
            id: 2,
            iconPath: '/pages/images/refresh.png',
            position: {
            left: res.windowWidth/2+130,
            top: res.windowHeight/3+220,
            width: 40,
            height: 40
            },
          clickable: true
          },
          {
            id: 3,
            iconPath: '/pages/images/uppub.png',
            position: {
              left: res.windowWidth/2-100,
              top: res.windowHeight/4+355,
              width: 90,
              height: 90
            },
            clickable: true
          },
          {
            id: 4,
            iconPath: '/pages/images/2.png',
            position: {
              left: res.windowWidth/2 + 130,
              top: res.windowHeight /3+ 320,
              width: 40,
              height: 40
            },
            clickable: true
          }
          ,{
            id:5,
            iconPath:'/pages/images/lovec.png',
            position:{
              left: res.windowWidth/2-165,
              top: res.windowHeight/3+320,
              width: 45,
              height: 45
            },
             clickable: true
          },
          {
            id: 6,
            iconPath: '/pages/images/uppra.png',
            position: {
              left: res.windowWidth/2+15,
              top: res.windowHeight/4+355,
              width: 90,
              height: 90,
            },
            clickable: true
          },
          {
            id:7,
            iconPath:'/pages/images/list.png',
            position:{
              left: res.windowWidth / 2 -165,
              top: res.windowHeight / 3 + 220,
              width: 40,
              height: 40
            },
            clickable: true
          }     
          ]
        })
      }
    })
    this.getLngLat();
    this.refresh();
  },

onReady:function(){
  var that =this;
},
  //获取中间点的经纬度，并mark出来
  getLngLat: function () {
    var that = this;
    this.mapCtx = wx.createMapContext("map4select");
    this.mapCtx.getCenterLocation({
      success: function (res) {
        //console.log(res.longitude);
        that.setData({
          lng: res.longitude,
          lat: res.latitude,
        })
        return res;                
      }
    })
  },
  refresh: function(){//刷新地图
    var that = this;
   var shuzu=[]
    wx.request({
      url: 'https://www.quququye.cn/1',
      data: {
        longitude: this.data.lng,
        latitude: this.data.lat,
      },
      method: 'GET',
      header: {
        'content-type': 'Application/json'
      },
      success: function (res) {
        for (var i = 0; i < res.data.length; i++) {
         // console.log(res.data[i])
          var a = {};
          if (res.data[i].identify==2){//请求标注不同类型内容
          a.id = i;
          a.iconPath = '/pages/images/love.png';
          a.callout = { content: res.data[i].label, color: "#FFFFFF", fontSize: 13, borderRadius: 15, bgColor: "#ffb5c2", padding: 6, display: 'ALWAYS' } ;
          a.longitude = res.data[i].longitude;
          a.latitude = res.data[i].latitude;
          a.width = 50;
          a.height = 50;
          a.clickable = true;
          a.date = res.data[i].post_date;
          a.identify = res.data[i].identify;
          shuzu.push(a);  
           }
          else if (res.data[i].identify==0){
            a.id = i;
            a.iconPath ='/pages/images/pct.png'
            a.callout = { content: res.data[i].label, color: "#424058", fontSize: 13, borderRadius: 15, bgColor: "#fff668", padding: 6, display: 'ALWAYS' };
            a.longitude = res.data[i].longitude;
            a.latitude = res.data[i].latitude;
            a.width = 50;
            a.height = 50;
            a.clickable = true;
            a.date = res.data[i].post_date;
            a.identify = res.data[i].identify;
            shuzu.push(a);  
           }
            else {
            a.id = i;
            a.iconPath = '/pages/images/scre.png'
            a.callout = {content: res.data[i].label, color: "#424058", fontSize: 13, borderRadius: 15, bgColor: "#c9c9c9", padding: 6, display: 'ALWAYS' };
            a.longitude = res.data[i].longitude;
            a.latitude = res.data[i].latitude;
            a.width = 50;
            a.height = 50;
            a.clickable = true;
            a.date = res.data[i].post_date;
            a.identify = res.data[i].identify;
            shuzu.push(a);  
          }
        }
         that.setData({
          markers:[] = shuzu
        })
       // console.log(that.data.markers)
        wx.setStorageSync('shuzu', shuzu);
      }
    })
  },
   regionchange(e) {
    // 地图发生变化的时候，获取中间点，也就是用户选择的位置
    if (e.type == 'end') {
      this.getLngLat();
      this.refresh();
    }
  },
  markertap(e) {
    var a = wx.getStorageSync("shuzu")
    wx.setStorageSync("itemobj", e)
   
   var index=e.markerId
  // console.log(a[index].identify)
    if (a[index].identify==0){
    wx.navigateTo({
      url:'/pages/item/item',
      success: function(res) {
      },
      fail: function(res) {},
      complete: function(res) {},
    })
    } else if(a[index].identify==1){
      wx.navigateTo({
        url:'/pages/itme2/itme2',
        success: function (res) {
        },
        fail: function (res) { },
        complete: function (res) { },
      }) 
    } else if(a[index].identify==2){
      wx.navigateTo({
        url: '/pages/item3/item3',
        success: function (res) {
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  controltap(e){
  //  console.log(e.controlId);
    var id = e.controlId;
    switch(id){
      case 1:
        break;
      case 2:
        this.refresh();
        break;
      case 3:
        wx.navigateTo({
          url: '/pages/upload/upload',
        })
        break;
      case 4:
        this.mapCtx.moveToLocation()
        break;
      case 5:
       wx.navigateTo({
         url: '/pages/uploadl/loveup',
       })
       break;
       case 6:
       wx.navigateTo({
         url: '/pages/uploadpra/uploadpra',
       })
       break;
       case 7:
       wx.navigateTo({
         url: '/pages/list/list',
       })
    }        
  }
})