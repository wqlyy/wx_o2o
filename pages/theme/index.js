// pages/theme/index.js
import Theme from './index.model.js';
const theme = new Theme();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id;
    this.data.name = options.name;
   
    this._loadData();
  },
  onReady(){
    wx.setNavigationBarTitle({
      title: this.data.name
    })
  },
  _loadData(){
    theme.getProductsData(this.data.id,(data)=>{
      this.setData({
        'themeInfo':data
      })
    })
  },
  /*跳转到商品详情*/
  onProductsItemTap: function (event) {
    var id = theme.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../product/index?id=' + id
    })
  },
})