import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const city = r => require.ensure([], () => r(require('../page/city/city')), 'city')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const test = r => require.ensure([], () => r(require('../page/test')), 'test')
const msite = r => require.ensure([], () => r(require('../page/msite/msite')), 'msite')
const food = r => require.ensure([], () => r(require('../page/food/food')), 'food')
const shop = r => require.ensure([], () => r(require('../page/shop/shop')), 'shop')


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
        },
        //所有商铺列表页
        {
            path: '/msite',
            component: msite,
            meta: { keepAlive: true },
        },
        //特色商铺列表页
        {
            path: '/food',
            component: food
        },
        {
            path: '/shop',
            component:shop
        }
    ]
}]
