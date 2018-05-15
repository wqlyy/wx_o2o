import Base from './base.js';
import Config from './config.js';

class Address extends Base{
  constructor(){
    super();
  }
  setAddressInfo(res){
    // console.log(res);
    let province = res.provinceName || res.province;
    let city = res.cityName || res.city;
    let county = res.countyName || res.county;
    let detail = res.detailInfo || res.detail;
    let totalDetail = city + county + detail;
    if (!this.isCenterCity(province)){
      totalDetail = province + totalDetail;
    }
    // console.log(totalDetail);
    return totalDetail;
  }
  /*是否为直辖市*/
  isCenterCity(name){
    let centerCitys = ['北京市','天津市','上海市','重庆市'];
    let flag = centerCitys.indexOf(name) >= 0;
    return flag;
  }
  /*更新保存地址*/
  submitAddress(data,callback){
    data = this._setUpAddress(data);
    let params = {
      url:'address',
      type:'post',
      data:data,
      callback(res){
        callback && callback(true,res);
      },
      fail(err){
        callback&&callback(false,res);
      }
    }
    this.request(params);
  }
  _setUpAddress(res){
    let formData = {
      name:res.userName,
      province:res.provinceName,
      city:res.cityName,
      county:res.countyName,
      mobile:res.telNumber,
      detail:res.detailInfo
    }

    return formData;
  }
}

export default Address;