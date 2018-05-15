// pages/order/index.js
import Cart from '../cart/index.model.js';
import Address from '../../utils/address.js';
import Order from './index.model.js';
const cart = new Cart();
const address = new Address();
const order = new Order();

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
    let productArr;
    this.data.account = options.account;
    productArr = cart.getCartDataFromLocal(true);
    this.setData({
      productsArr:productArr,
      account:options.account,
      orderStatus:0
    });
    address.getAddress((res)=>{
      this._bindAddressInfo(res);
    })
  },
  editAddress(event){
    let that = this;
    wx.chooseAddress({
      success(res){
        let addressInfo={
          name:res.userName,
          mobile:res.telNumber,
          totalDetail: address.setAddressInfo(res)
        }
        that._bindAddressInfo(addressInfo);
        // 保存地址
        address.submitAddress(res,(flag)=>{
          if(!flag){
            that.showTips('操作提示','地址信息更新失败！')
          }
        })
      }
    });
  },
  /*绑定地址信息*/
  _bindAddressInfo(addressInfo){
    this.setData({
      addressInfo:addressInfo
    })
  },
  showTips(title,content,flag){
    wx.showModal({
      title: title,
      content: content,
      showCancel:false,
      success(res){
        if(flag){
          wx.switchTab({
            url: '/pages/my/index',
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})