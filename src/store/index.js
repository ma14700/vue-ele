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
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
})