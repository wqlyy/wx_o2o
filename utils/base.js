import Config from './config.js';
class Base{
  constructor(){
    this.baseRequestUrl = Config.requestUrl;
  }
  request(params){
    if(!params.type){
      params.type = 'GET';
    }
    wx.request({
      url: this.baseRequestUrl + params.url,
      data:params.data,
      method:params.type,
      header:{
        'content-type':'application/json',
        'token':wx.getStorageSync('token')
      },
      success(res){
        params.callback && params.callback(res.data);
      },
      fail(err){
        console.log(err);
      }
    })
  }
  //获取元素绑定的自定义参数值
  getDataSet(event,key){
    return event.currentTarget.dataset[key];
  }
}

export default Base;