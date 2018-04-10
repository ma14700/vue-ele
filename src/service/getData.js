import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'

export const cityGuess = ()=>fetch('api/v1/cities',{
    type:'guess'
});

//获取用户信息
export const getUser = ()=>fetch('api/v1/user',{user_id:getStore('user_id')})

//个人中心编辑地址
export const getAddressList = (user_id) => fetch('api/v1/users'+user_id+'/addresses')

//获取首页热门城市
export const hotcity =()=>fetch('api/v1/cities',{
    type:'hot'
})

//获取首页所以城市
export const groupcity =() =>fetch('api/v1/cities',{
    type:'group'
})

//获取当前跳转城市
export const currentcity = (number) => fetch('api/v1/cities/'+number);

//获取搜索地址
export const searchplace = (cityid,value) =>fetch('api/v1/pois',{
    type:'search',
    city_id:cityid,
    keyword:value
})

//获取短信验证
export const mobileCode = phone => fetch('api/v4/moble/verify_code/send',{
    mobile:phone,
    scene:'login',
    type:'sms'
},'POST')

//检测账号是否存在
export const checkExsis = (checkNumber,type) => fetch('api/v1/users/exists',{
    [type]:checkNumber,
    type
})

//手机账号登录
export const sendLogin = (code,mobile,validate_token)=>fetch('api/v1/login/app_mobile',{
    code,
    mobile,
    validate_token
},'POST')

//获取图片验证码
export const getcaptchas = ()=>fetch('api/v1/captchas',{},'POST')

//账号密码登录
export const accountLogin = (username,password,captcha_code) => fetch('api/v2/login',{
    username,
    password,
    captcha_code
},'POST')