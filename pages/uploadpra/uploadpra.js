var util = require('../../utils/util.js')
var app = getApp()
Page({//地点标记秘密
  data: {
    url2: null,
    pictures2: [],
    Content2: '这个秘密声音小到听不到啊！',
    label2: '嘘~~~'
  },

  bindViewTap2: function () {
    var that = this;
    wx.chooseImage({
      // 设置最多可以选择的图片张数，默认9,如果我们设置了多张,那么接收时//就不在是单个变量了,
      count: 9,
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // 获取成功,将获取到的地址赋值给临时变量
        var tempFilePaths = res.tempFilePaths;
        that.setData({
          //将临时变量赋值给已经在data中定义好的变量
          url2: tempFilePaths
        })

      },
    })
  },

  previewImage2: function (e) {
    var that = this,
      //获取当前图片的下表
      index = e.currentTarget.dataset.index,
      //数据源
      pictures2 = this.data.url2;
    wx.previewImage({
      //当前显示下表
      current: pictures2[index],
      //数据源
      urls: pictures2
    })
  },

  bindTextAreaBlur2: function (e) {
    if (e.detail && e.detail.value.length > 0) {
      if (e.detail.value.length > 5000) {
        //app.func.showToast('内容为12-500个字符','loading',1200);
      } else {
        this.setData({
          Content2: e.detail.value
        });
      }
    } else {
      this.setData({
        Content2: ''
      });
    } console.log(this.data.Content2);
  },

  getlabel2: function (e) {
    if (e.detail && e.detail.value.length > 0) {
      this.setData({
        label2: e.detail.value
      });
    } else {
      this.setData({
        label2: ''
      });
    } console.log(this.data.label2);
  },

  Upload2: function (e) {
    var that = this;
    wx.showLoading({
      title: '上传中',
    })
    if (that.data.url2 != null) {
      var promise = Promise.all(that.data.url2.map((tempFilePath, index) => {
        return new Promise(function (resolve, reject) {
          wx.uploadFile({
            url: 'https://www.quququye.cn/file_upload',
            filePath: tempFilePath,
            name: 'photos',
            formData: {
              Content: that.data.Content2,
              longitude: app.globalData.locationInfo.longitude,
              latitude: app.globalData.locationInfo.latitude,
              avatarUrl: app.globalData.userInfo.avatarUrl,
              city: app.globalData.userInfo.city,
              gender: app.globalData.userInfo.gender,
              nickName: app.globalData.userInfo.nickName,
              province: app.globalData.userInfo.province,
              date: util.formatTime(new Date),
              label: that.data.label2,
              identify: 1,
            },
            success: function (res) {
              resolve(res.data);

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
          Content: that.data.Content2,
          longitude: app.globalData.locationInfo.longitude,
          latitude: app.globalData.locationInfo.latitude,
          avatarUrl: app.globalData.userInfo.avatarUrl,
          city: app.globalData.userInfo.city,
          gender: app.globalData.userInfo.gender,
          nickName: app.globalData.userInfo.nickName,
          province: app.globalData.userInfo.province,
          date: util.formatTime(new Date),
          label: that.data.label2,
          identify: 1,
        },
        method: 'POST',
        header: {
          'content-type': 'Application/json'
        },
        success: function (res) {
          console.log(res),
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
  },

})