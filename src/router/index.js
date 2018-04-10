import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const city = r => require.ensure([], () => r(require('../page/city/city')), 'city')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const test = r => require.ensure([], () => r(require('../page/test')), 'test')





export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转home页面
        {
            path: '',
            redirect: '/home'
        },
        //首页城市列表页
        {
            path: '/home',
            component: home
        },
        {
            path:'/city/:cityid',
            component:city
        },
        {
            path:'/login',
            component:login
        },
        {
            path:'/test',
            component:test,
            meta:{
                title:'测试demo'
            }
        }
    ]
}]
