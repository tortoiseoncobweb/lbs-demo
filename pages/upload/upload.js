var util = require('../../utils/util.js')
var app = getApp()
Page({//地点标记分享内容
  data: {
    url1: null,
    pictures1: [],
    Content1: '这位客官潇洒的什么都没留下',
    label1: '真的没有标题啊',
  },
  bindViewTap: function () {
    var that = this;
    wx.chooseImage({
    
      count: 9,
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // 获取成功,将获取到的地址赋值给临时变量
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          //将临时变量赋值给已经在data中定义好的变量
          url1: tempFilePaths
        })
      },
    })
  },
  previewImage: function (e) {
    var that = this,
      //获取当前图片的下表
      index = e.currentTarget.dataset.index,
      //数据源
      pictures1 = this.data.url1;
    wx.previewImage({
      //当前显示下表
      current: pictures1[index],
      //数据源
      urls: pictures1
    })
  },
  bindTextAreaBlur: function (e) {
    if (e.detail && e.detail.value.length > 0) {
      if (e.detail.value.length > 5000) {
        //app.func.showToast('内容为12-500个字符','loading',1200);
      } else {
        this.setData({
          Content1: e.detail.value
        });
      }
    } else {
      this.setData({
        Content1: ''
      });
    } 
  },
  getlabel: function (e) {
    if (e.detail && e.detail.value.length > 0) {
      this.setData({
        label1: e.detail.value
      });
    } else {
      this.setData({
        label1: ''
      });
    } 
  },
  Upload1: function (e) {
    var that = this;
    wx.showLoading({
      title: '上传中',
    })
    if (that.data.url1 != null) {//多图上传
      var promise = Promise.all(that.data.url1.map((tempFilePath, index) => {
        return new Promise(function (resolve, reject) {
          wx.uploadFile({
            url: 'https://www.quququye.cn/file_upload',
            filePath: tempFilePath,
            name: 'photos',
            formData: {
              Content: that.data.Content1,
              longitude: app.globalData.locationInfo.longitude,
              latitude: app.globalData.locationInfo.latitude,
              avatarUrl: app.globalData.userInfo.avatarUrl,
              city: app.globalData.userInfo.city,
              gender: app.globalData.userInfo.gender,
              nickName: app.globalData.userInfo.nickName,
              province: app.globalData.userInfo.province,
              date: util.formatTime(new Date),
              label: that.data.label1,
              identify:0,
            },
            success: function (res) {
              resolve(res.data);
              console.log(tempFilePath);
            },
            fail: function (err) {
              setTimeout(function () {
                wx.hideLoading()
              }, 2000)
              reject(new Error('failed to upload file'));
              wx.showToast({
                title: '上传出错',
                image: '/pages/images/error.png',
                duration: 2000
              })
            }
          });
        });
      }));
      promise.then(function (results) {
        console.log(results);
        setTimeout(function () {
          wx.hideLoading()
        }, 2000),
          wx.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 2000,
            success: function (res) {
              wx.navigateBack({
                delta: 1
              })
            }
          })
      }).catch(function (err) {
        console.log(err);
      });
    } else {
      wx.request({
        url: 'https://www.quququye.cn/5',
        data: {
          Content: that.data.Content1,
          longitude: app.globalData.locationInfo.longitude,
          latitude: app.globalData.locationInfo.latitude,
          avatarUrl: app.globalData.userInfo.avatarUrl,
          city: app.globalData.userInfo.city,
          gender: app.globalData.userInfo.gender,
          nickName: app.globalData.userInfo.nickName,
          province: app.globalData.userInfo.province,
          date: util.formatTime(new Date),
          label: that.data.label1,
          identify: '0',
        }, 
        method:'POST',
        header: {
          'content-type':'application/json'
        },
        success: function (res) {
          console.log(res)
          wx.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 2000,
            success: function (res) {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        },
        fail: function (err) {
          wx.showToast({
            title: '上传出错',
            image: '/pages/images/error.png',
            duration: 2000
          })
        }
      })
    }
  }
})