// 日记聚合页
var app = getApp();
Page({
  data: {
    // 日记列表
    // TODO 从server端拉取
    diaries: null,
    // 是否显示loading
    showLoading: false,
    // loading提示语
    loadingMessage: '',
    
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
   this.getDiaries();
  },
  /**
   * 获取日记列表
   * 目前为本地缓存数据 + 本地假数据
   * TODO 从服务端拉取
   */
   getDiaries() {
     var that = this;
     var content= wx.getStorageSync("shuzu");
     console.log(content);
       that.setData({ diaries: content});
  },
  // 查看详情
   showDetail(event) {
     console.log(event);  
     if (event.currentTarget.dataset.identify == 0){
   wx.navigateTo({
     url: '../item/item?id=' + event.currentTarget.id
     });
     }
     if (event.currentTarget.dataset.identify == 1){
 wx.navigateTo({
   url: '../itme2/itme2?id=' + event.currentTarget.id
    });
     } else if (event.currentTarget.dataset.identify == 2){
       wx.navigateTo({
         url: '../item3/item3?id=' + event.currentTarget.id
       });
 }
  }
})
