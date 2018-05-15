import Config from './config.js';
import Token from './Token.js';
class Base{
  constructor(){
    this.baseRequestUrl = Config.requestUrl;
  }
  request(params,noRefetch){
    let that = this;
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
        let code = res.statusCode.toString();
        let startChar = code.charAt(0);
        if(startChar == '2'){
          params.callback && params.callback(res.data);
        }else{
          if(code == '401'){
            if (!noRefetch){
              that._refetch(params);
            }
          }
          if(noRefetch){
            params.ecallback && params.ecallback(res.data);
          }
          
        }
        
      },
      fail(err){
        console.log(err);
      }
    })
  }
  _refetch(params){
    const token = new Token();
    token.getTokenFromServer((token)=>{
      this.request(params,true);
    });
  }
  //获取元素绑定的自定义参数值
  getDataSet(event,key){
    return event.currentTarget.dataset[key];
  }
}

export default Base;