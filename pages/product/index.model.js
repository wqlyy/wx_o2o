import Base from '../../utils/base.js';

class Product extends Base{
  constructor(){
    super();
  }
  getDetailInfo(id,callback){
    var params = {
      url:'product/'+id,
      callback(data){
        callback&&callback(data)
      }
    }
    this.request(params);
  }
}

export default Product;