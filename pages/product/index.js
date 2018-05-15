// pages/product/product.js
import Product from './index.model.js';
import Cart from '../cart/index.model.js';
const product = new Product();
const cart = new Cart();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: false,
    hiddenSmallImg: true,
    countsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    productCounts: 1,
    currentTabsIndex: 0,
    cartTotalCounts: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id=options.id;
    this.data.id = id;
    this._loadData(id);
  },
  _loadData(){
    product.getDetailInfo(this.data.id,(data)=>{
      console.log(data);
      this.setData({
        cartTotalCounts: cart.getCartTotalCounts(),
        product:data
      })
    }) 
  },
  bindPickerChange(event){

    // let index = event.detail.value;
    // let selectCount = this.data.countsArray[index];
    // this.setData({
    //   productCount: selectCount
    // });
    this.setData({
      productCounts: this.data.countsArray[e.detail.value],
    })
  },
  onTabsItemTap(event){
    let index = product.getDataSet(event,'index');
    this.setData({
      currentTabsIndex:index
    });
  },
  onAddingToCartTap(event){
    //防止快速点击
    if (this.data.isFly) {
      return;
    }
 
    // let counts = this.data.cartTotalCounts + this.data.productCount;
    // this.setData({
    //   cartTotalCounts: cart.getCartTotalCounts()
    // });
    this._flyToCartEffect(event);
    this.addToCart();
  },
  addToCart(){
    var tempObj = {}, keys = ['id', 'name', 'main_img_url', 'price'];
    for (var key in this.data.product) {
      if (keys.indexOf(key) >= 0) {
        tempObj[key] = this.data.product[key];
      }
    }

    cart.add(tempObj, this.data.productCounts);
  },
  /*跳转到购物车*/
  onCartTap: function () {
    wx.switchTab({
      url: '/pages/cart/index'
    });
  },
/*加入购物车动效*/
  _flyToCartEffect(events) {
    //获得当前点击的位置，距离可视区域左上角
    var touches = events.touches[0];
    var diff = {
      x: '25px',
      y: 25 - touches.clientY + 'px'
    },
      style = 'display: block;-webkit-transform:translate(' + diff.x + ',' + diff.y + ') rotate(350deg) scale(0)';  //移动距离
    this.setData({
      isFly: true,
      translateStyle: style
    });
    var that = this;
    setTimeout(() => {
      that.setData({
        isFly: false,
        translateStyle: '-webkit-transform: none;',  //恢复到最初状态
        isShake: true,
      });
      setTimeout(() => {
        var counts = that.data.cartTotalCounts + that.data.productCounts;
        that.setData({
          isShake: false,
          cartTotalCounts: counts
        });
      }, 200);
    }, 1000);
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
      path: 'pages/product/index?id=' + this.data.id
    }
  }
})