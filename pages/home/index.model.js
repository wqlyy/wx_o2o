import Base from '../../utils/base.js';
class Home extends Base{
  getBannerData(id,callback){
    var params = {
      url:'banner/'+id,
      callback:function(res){
        callback&&callback(res.items);
      }
    }
    this.request(params);
  }
  getThemeData(callback){
    var params = {
      url:'theme?ids=1,2,3',
      callback:callback
    }
    this.request(params);
  }
  getRecentProducts(callback){
    var params = {
      url:'product/recent',
      callback(res){
        callback&&callback(res)
      }
    }
    this.request(params);
  }
}

export default Home;