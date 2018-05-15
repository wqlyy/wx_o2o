import Base from '../../utils/base.js';

class Category extends Base{
  constructor(){
    super();
  }
  getCategoryType(callback){
    let params={
      url:'category/all',
      callback(data){
        callback&&callback(data)
      }
    }
    this.request(params);
  }
  getProductsByCategory(id,callback){
    var params = {
      url:'product/by_category?id='+id,
      callback(data){
        callback&&callback(data);
      }
    }
    this.request(params);
  }
}

export default Category;