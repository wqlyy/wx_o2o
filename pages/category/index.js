// pages/category/index.js
import Category from '../category/index.model.js';
const category = new Category();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    transClassArr: ['tanslate0', 'tanslate1', 'tanslate2', 'tanslate3', 'tanslate4', 'tanslate5'],
    currentMenuIndex: 0,
    loadingHidden: false,
    currentMenuIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData();
  },
  _loadData(callback){
    category.getCategoryType((categoryData)=>{
      var that = this;
      category.getCategoryType((categoryData) => {

        that.setData({
          categoryTypeArr: categoryData,
          loadingHidden: true
        });

        that.getProductsByCategory(categoryData[0].id, (data) => {
          var dataObj = {
            products: data,
            topImgUrl: categoryData[0].img.url,
            title: categoryData[0].name
          };
          that.setData({
            loadingHidden: true,
            categoryInfo0: dataObj
          });
          callback && callback();
        });
      });
    })
    
  },
  changeCategory(event){
    let index = category.getDataSet(event,'index');
    let id = category.getDataSet(event, 'id');
    this.setData({
      currentMenuIndex: index
    });
    //如果数据是第一次请求
    if (!this.isLoadedData(index)) {
      var that = this;
      this.getProductsByCategory(id, (data) => {
        that.setData(that.getDataObjForBind(index, data));
      });
    }
  },
  isLoadedData(index) {
    if (this.data['categoryInfo' + index]) {
      return true;
    }
    return false;
  },
  getDataObjForBind: function (index, data) {
    var obj = {},
      arr = [0, 1, 2, 3, 4, 5],
      baseData = this.data.categoryTypeArr[index];
    for (var item in arr) {
      if (item == arr[index]) {
        obj['categoryInfo' + item] = {
          procucts: data,
          topImgUrl: baseData.img.url,
          title: baseData.name
        };

        return obj;
      }
    }
  },
  getProductsByCategory: function (id, callback) {
    category.getProductsByCategory(id, (data) => {
      callback && callback(data);
    });
  },

  /*跳转到商品详情*/
  onProductsItemTap: function (event) {
    var id = category.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../product/index?id=' + id
    })
  },

  /*下拉刷新页面*/
  onPullDownRefresh: function () {
    this._loadData(() => {
      wx.stopPullDownRefresh()
    });
  },

  //分享效果
  onShareAppMessage: function () {
    return {
      title: '零食商贩 Pretty Vendor',
      path: 'pages/category/category'
    }
  }
})