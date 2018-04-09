import {getUser,getAddressList} from '../service/getData'
import {GET_USERINFO,SAVE_ADDRESS} from './mutation-types'
    
export default{
    async getUserInfo({
        commit,state
    }){
        let res = await getUser();
        commit(GET_USERINFO,res);
    },
    async saveAddress({
        commit,
        state
    }){
        if(state.removeAddres.length>0) return;
        let addres = await getAddressLis(state.userInfo.user_id);
        commit(SAVE_ADDRESS,addres);
    }   
}