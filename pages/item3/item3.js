var app;
Page({

  /**
   * 表白信内容页面的初始数据
   */
  data: {
    shuzu: [],
    imgUrls: [],
    text: '',
    date: '2017',
    aurl: '',
    userinfo: 'id',
    tag: '',
    lng: '',
    lat: '',
  },

  onLoad: function (options) {
    var that = this
    var a = options.id
    console.log(a)
    if (a == null) {
      that.refresh();
    } else if (a !== null) {
      that.refresh2(a);
    }
  },
  onReady: function () {

  },
  onShow: function () {
  },
  onHide: function () {
  },
  onUnload: function () {
  },
  refresh: function () {
    var that = this;
    var a = wx.getStorageSync("itemobj") 
    var b = wx.getStorageSync('shuzu')
    wx.request({
      url: 'https://www.quququye.cn/2',
      data: {
        longitude: b[a.markerId].longitude,
        latitude: b[a.markerId].latitude,
        date: b[a.markerId].date, 
      },
      method: 'GET',
      header: {
        'content-type': 'Application/json'
      },
      success: function (res) {
        that.setData({
          imgUrls: [] = res.data.img,
          text: res.data.data.Content,
          date: res.data.data.post_date,
          aurl: res.data.data.avatarUrl,
          userinfo: res.data.data.nickName,
          label: res.data.data.label,
          lng: res.data.data.longitude,
          lat: res.data.data.latitude,
        })
      }
    })
  },
  refresh2: function (a) {
    var that = this;
    var b = wx.getStorageSync('shuzu')
    console.log(a);
    console.log(b);
    wx.request({
      url: 'https://www.quququye.cn/2',
      data: {
        longitude: b[a].longitude,
        latitude: b[a].latitude,
        date: b[a].date,
      },
      method: 'GET',
      header: {
        'content-type': 'Application/json'
      },
      success: function (res) {
        //console.log(res.data.img)
        that.setData({
          imgUrls: [] = res.data.img,
          text: res.data.data.Content,
          date: res.data.data.post_date,
          aurl: res.data.data.avatarUrl,
          userinfo: res.data.data.nickName,
          label: res.data.data.label,
          lng: res.data.data.longitude,
          lat: res.data.data.latitude,
        })
      }
    })
  },
  previewImage: function (e) {
    var that = this,
      //获取当前图片的下表
      index = e.currentTarget.dataset.index,
      //数据源
      pictures = this.data.imgUrls;
    wx.previewImage({
      //当前显示下表
      current: pictures[index],
      //数据源
      urls: pictures
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },

})