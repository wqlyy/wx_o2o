// pages/home/home.js
import Home from './index.model.js';
const home = new Home();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:'123'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {

    this._loadData();
  },
  _loadData(){
    let id = 1;
    home.getBannerData(id,(res)=>{
      this.setData({
        'bannerArr':res
      })
    })
    home.getThemeData(data=>{
      this.setData({
        'themeArr':data
      })
    })
    home.getRecentProducts(data=>{
      this.setData({
        'productsArr': data
      })
    })
  },
  onProductsItemTap(event){
    let id = home.getDataSet(event,'id');
    wx.navigateTo({
      url: '../product/index?id='+id,
    })
  },
  onThemeItemTap(event) {
    let id = home.getDataSet(event, 'id');
    let name = home.getDataSet(event, 'name');
    wx.navigateTo({
      url: '../theme/index?id=' + id + '&name='+name,
    })
  }
})