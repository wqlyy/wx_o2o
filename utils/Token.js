import Config from './config.js';

class Token {
  constructor(){
    console.log(Config.requestUrl);
    this.verifyUrl = Config.requestUrl + 'token/verify';
    this.tokenUrl = Config.requestUrl + 'token/user';
  }
  verify(){
    let token = wx.getStorageSync('token');
    if(!token){
      this.getTokenFromServer();
    }else{
      this._verifyFromServer(token);
    }
  }
  //从服务器获取令牌
  getTokenFromServer(callback){
    let that = this;
    wx.login({
      success: function (res) {
        wx.request({
          url: that.tokenUrl,
          method: 'POST',
          data: {
            code: res.code
          },
          success: function (res) {
            wx.setStorageSync('token', res.data.token);
            callBack && callBack(res.data.token);
          }
        })
      }
    })
  }
  // 携带令牌去服务器验证
  _verifyFromServer(token){
    let that = this;
    wx.request({
      url: that.verifyUrl,
      method: 'POST',
      data: {
        token: token
      },
      success: function (res) {
        var valid = res.data.isValid;
        if (!valid) {
          that.getTokenFromServer();
        }
      }
    })
  }
}

export default Token;