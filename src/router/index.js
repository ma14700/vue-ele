import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const city = r => require.ensure([], () => r(require('../page/city/city')), 'city')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const test = r => require.ensure([], () => r(require('../page/test')), 'test')
const msite = r => require.ensure([], () => r(require('../page/msite/msite')), 'msite')
const food = r => require.ensure([], () => r(require('../page/food/food')), 'food')
const shop = r => require.ensure([], () => r(require('../page/shop/shop')), 'shop')
const foodDetail = r => require.ensure([], () => r(require('../page/shop/children/foodDetail')), 'foodDetail')
const shopDetail = r => require.ensure([], () => r(require('../page/shop/children/shopDetail')), 'shopDetail')
const shopSafe = r => require.ensure([], () => r(require('../page/shop/children/children/shopSafe')), 'shopSafe')
const confirmOrder = r => require.ensure([], () => r(require('../page/confirmOrder/confirmOrder')), 'confirmOrder')
const profile = r => require.ensure([], () => r(require('../page/profile/profile')), 'profile')

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
            component: shop,
            children: [{
                path: 'foodDetail', //食品详情页
                component: foodDetail,
            }, {
                path: 'shopDetail', //商铺详情页
                component: shopDetail,
                children: [{
                    path: 'shopSafe', //商铺安全认证页
                    component: shopSafe,
                }, ]
            }]        
        },
        //确认订单页
        {
            path: '/confirmOrder',
            component: confirmOrder,
            // children: [{
            //     path: 'remark', //订单备注
            //     component: remark,
            // }, {
            //     path: 'invoice', //发票抬头
            //     component: invoice,
            // }, {
            //     path: 'payment', //付款页面
            //     component: payment,
            // }, {
            //     path: 'userValidation', //用户验证
            //     component: userValidation,
            // }, {
            //     path: 'chooseAddress', //选择地址
            //     component: chooseAddress,
            //     children: [{
            //         path: 'addAddress', //添加地址
            //         component: addAddress,
            //         children: [{
            //             path: 'searchAddress', //搜索地址
            //             component: searchAddress,
            //         }]
            //     }, ]
            // }, ]
        },
        //个人信息页
        {
            path:'/profile',
            component:profile
        }
    ]
}]
