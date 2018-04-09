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