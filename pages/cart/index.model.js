import Base from '../../utils/base.js';

class Cart extends Base{
  constructor(){
    super();
    this._storageKeyName = 'cart';
  }
  add(item,counts){
    let cartData = this.getCartDataFromLocal();
    let isHasInfo = this._isHasThatOne(item.id,cartData);
    if(isHasInfo.index == -1){
      item.counts = counts; 
      item.selectStatus = true;//设置选中状态
      cartData.push(item);
    }else{
      cartData[isHasInfo.index].counts += counts;
    }
    wx.setStorageSync(this._storageKeyName, cartData);
  }
  //从缓存中读取购物车数据
  getCartDataFromLocal(){
    let res = wx.getStorageSync(this._storageKeyName);
    if(!res){
      res=[];
    }
    return res;
  }
  /**
   * 计算购物车商品总数量
   * flag 为true时要考虑选择状态
   */
  getCartTotalCounts(flag){
    let data = this.getCartDataFromLocal();
    let counts = 0;
    for(let i=0;i<data.length;i++){
      if(flag){
        if(data[i].selectStatus){
          counts += data[i].counts;
        }
      }else{
        counts += data[i].counts;
      }
    }
    return counts;
  }
  /**
   * 判断某个商品是否已经被添加到购物车中，并且返回这个商品的数据以及所在数组中的序号
   */
  _isHasThatOne(id,arr){
    let item = null;
    let result = {index:-1};
    for(let i = 0;i < arr.length; i++){
      item = arr[i];
      if(item.id == id){
        result = {
          index:i,
          data:item
        }
        break;
      }
    }
    return result;
  }

  _changeCount(id,counts){
    let cartData = this.getCartDataFromLocal();
    let hasInfo = this._isHasThatOne(id,cartData);
    if(hasInfo.index != -1){
      if(hasInfo.data.counts > 1){
        cartData[hasInfo.index].counts += counts;
      }
    }
    // this.execSetStorageSync(cartData);//更新本地缓存
    wx.setStorageSync(this._storageKeyName, cartData);//更新本地缓存

  }

  addCounts(id){
    this._changeCount(id,1);
  }
  cutCounts(id) {
    this._changeCount(id, -1);
  }
  delete(ids){
    if(!(ids instanceof Array)){
      ids = [ids];
    }
    let cartData = this.getCartDataFromLocal();
    for(let i=0;i<ids.length;i++){
      let hasInfo = this._isHasThatOne(ids[i],cartData);
      if (hasInfo.index != -1){
        cartData.splice(hasInfo.index,1);
      }
    }
    wx.setStorageSync(this._storageKeyName,cartData);
  }
  execSetStorageSync(data){
    wx.setStorageSync(this._storageKeyName, data);
  }
}

export default Cart;