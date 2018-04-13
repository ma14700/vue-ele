import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
    latitude:'',
    longitude:'',
    userInfo:null,
    emoveAddress:[],//移除地址
    login: true,//是否登录
    geohash: '31.22299,121.36025',//地址geohash值
    latitude: '', // 当前位置纬度
	longitude: '', // 当前位置经度
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
})