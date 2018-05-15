// pages/cart/index.js
import Cart from './index.model.js';
const cart = new Cart();
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

  },
  onHide(){
    cart.execSetStorageSync(this.data.cartData)
  },
  onShow(){
    let cartData = cart.getCartDataFromLocal();
    // let countsInfo = cart.getCartTotalCounts(true);
    let cal = this._calcTotalAccountAndCounts(cartData)
    this.setData({
      selectedCounts: cal.selectedCounts,
      selectedTypeCounts: cal.selectedTypeCounts,
      account:cal.account,
      cartData:cartData,
    })
  },
  _calcTotalAccountAndCounts(data){
    let length = data.length;
    // 所需计算选中的总价格
    let account = 0;
    // 选中商品总个数
    let selectedCounts = 0;
    // 选中商品类型总数
    let selectedTypeCounts = 0;

    let multiple = 100;//*100避免浮点数精度问题
    for (let i = 0; i < length;i++){
      if(data[i].selectStatus){
        account += data[i].counts * multiple * Number(data[i].price)*multiple;
        selectedCounts += data[i].counts;
        selectedTypeCounts++;
      }
    }
    return {
      selectedCounts:selectedCounts,
      selectedTypeCounts:selectedTypeCounts,
      account:account / (multiple * multiple)
    }
  },

  toggleSelect(event){
    let id = cart.getDataSet(event,'id');
    let status = cart.getDataSet(event,'status');
    let index = this._getProductIndexById(id);
    this.data.cartData[index].selectStatus = !status;
    this._resetCartData();
    
  },
  toggleSelectAll(event){
    let status = cart.getDataSet(event, 'status') == 'true';
    let data = this.data.cartData;
    let len = data.length;
    for(let i=0;i<len;i++){
      data[i].selectStatus = !status;
    }
    this._resetCartData();
  },
  _resetCartData(){
    let newData = this._calcTotalAccountAndCounts(this.data.cartData);//重新计算
    this.setData({
      selectedCounts: newData.selectedCounts,
      selectedTypeCounts: newData.selectedTypeCounts,
      account: newData.account,
      cartData: this.data.cartData,
    })
  },
  //根据id获取下标
  _getProductIndexById(id){
    let data = this.data.cartData;
    let len = data.length;
    for(let i=0;i<len;i++){
      if(data[i].id==id){
        return i;
      }
    }
  },
  changeCounts(event){
    let id = cart.getDataSet(event,'id');
    let type = cart.getDataSet(event,'type');
    let index = this._getProductIndexById(id);
    let counts = 1;
    if(type=="add"){
      cart.addCounts(id);
    }else{
      counts = -1;
      cart.cutCounts(id);
    }
    this.data.cartData[index].counts += counts;
    this._resetCartData();
  },
  delete(event){
    let id = cart.getDataSet(event,'id');
    let index = this._getProductIndexById(id);
    this.data.cartData.splice(index,1);//删除某一项商品
    this._resetCartData();
    cart.delete(id);
  },
  submitOrder(event){
    wx.navigateTo({
      url:'../order/index?account='+this.data.account+'&from=cart'
    })
  }

})