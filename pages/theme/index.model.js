import Base from '../../utils/base.js';

class Theme extends Base{
  constructor(){
    super();
  }
  //获取主题下面的商品列表
  getProductsData(id,callback){
    var params = {
      url:'theme/'+id,
      callback(data){
        callback&&callback(data);
      }
    }
    this.request(params);
  }
}

export default Theme;