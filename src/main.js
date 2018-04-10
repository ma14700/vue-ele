import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/index'
import store from './store/'
import {routerMode} from './config/env'
import './config/rem'
import FastClick from 'fastclick'

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

Vue.use(VueRouter)
// 自定义埋点
Vue.directive('stat',{
	// bind: 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。
	// el: 指令所绑定的元素，可以用来直接操作 DOM 。binding: 一个对象，包含以下属性：
	bind(el,binding){
		el.addEventListener('click',()=>{
			const data = binding.value;
			let prefix = 'store';
			if(OS.isAndroid || OS.isPhone){
				prefix = 'mall';
			}
			analytics.request({
				ty: `${prefix}_${data.type}`,
				dc: data.desc || ''
			  }, 'n');
		},false)
	}
})

const router = new VueRouter({
	routes,
	mode: routerMode,
	strict: process.env.NODE_ENV !== 'production',
	scrollBehavior (to, from, savedPosition) {
	    if (savedPosition) {
		    return savedPosition
		} else {
			if (from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop;
			}
		    return { x: 0, y: to.meta.savedPosition || 0 }
		}
	}
})

new Vue({
	router,
	store,
}).$mount('#app')

