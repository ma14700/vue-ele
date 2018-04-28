<template>
  <div>
    <head-top signin-up="msite">
      <router-link :to="'/search/geohash'" class="link_search" slot="search">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
	    			<circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none"/>
	    			<line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
	    		</svg>
      </router-link>
      <router-link to="/home" slot="msite-title" class="msite_title">
        <span class="title_text ellipsis">{{msiteTitle}}</span>
      </router-link>
    </head-top>
    <div class="msite_nav">
      <div v-for="(item,index) in foodTypes" :key='index' v-if="foodTypes.length" class="nav_content">
        <router-link :to="{path:'/food',query:{geohash,title:foodItem.title,restaurant_category_id: getCategoryId(foodItem.link)}}" v-for="foodItem in item" :key="foodItem.id" class="nav_router" tag="div" >
            <figure>
              <img :src="imgBaseUrl + foodItem.image_url">
              <figcaption>{{foodItem.title}}</figcaption>
            </figure>
        </router-link>
      </div>
    </div>
    <div class="shop_list_container">
      <div class="shop_header">
        <svg class="shop_icon">
	    			<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
	    		</svg>
	    	<span class="shop_header_title">附近商家</span>
      </div>
      <shop-list v-if="hasGetData" :geohash="geohash"></shop-list>
    </div>
    <food-guide></food-guide>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import headTop from '../../components/header/head'
import shopList from '@/components/common/shoplist'
import {msiteAddress, msiteFoodTypes, cityGuess} from '@/service/getData'
import foodGuide from '../../components/footer/footGuide'
export default {
  data(){
      return{
          geohash:'',
          msiteTitle:'请选择地址...',
          foodTypes:[],
          hasGetData:false,
          imgBaseUrl:'https://fuss10.elemecdn.com', 
      }
  },
  async beforeMount(){
    //判断是否是跳转过来的
    if(!this.$route.query.geohash){
      const address = await cityGuess();
      this.geohash = address.latitude+','+address.longitude;
    }else{
      this.geohash = this.$route.query.geohash;
    }
      console.log(this.geohash)
    this.SAVE_GEOHASH(this.geohash);
  
    //获取位置信息
    let res = await msiteAddress(this.geohash);
    this.msiteTitle = res.name;
    //记录当前经纬度
    this.RECORD_ADDRESS(res);
    this.hasGetData = true;
  },
  mounted(){
    //获取当行视频列表
    msiteFoodTypes(this.geohash).then(res=>{
      let resLength = res.length;
      let resArr = [...res];
      let foodArr = [];
      for(let i = 0,j=0;i<resLength;i+=4,j++){
        foodArr[j] = resArr.splice(0,8);
      }
      this.foodTypes = foodArr
    }).then(res=>{

    })
  },
  methods:{
     ...mapMutations([
      'RECORD_ADDRESS','SAVE_GEOHASH'
    ]),
    getCategoryId(url){
    		let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name',''));
    		if (/restaurant_category_id/gi.test(urlData)) {
    			return JSON.parse(urlData).restaurant_category_id.id
    		}else{
    			return ''
    		}
    }
  },
  components:{
    headTop,
    shopList,
    foodGuide
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
  .link_search{
    left:.8rem;
    @include wh(.9rem,.9rem);
    @include ct;
  }
  .msite_title{
    @include center;
    width: 50%;
    color: #fff;
    text-align: center;
    margin-left: -0.5rem;
    .title_text{
      @include sc(.8rem,#fff);
      text-align: center;
      display: block;
    }
  }
  .msite_nav{
    width: 100vw;
    display: flex;
    margin-top: 2.1rem;
    background: #fff;
    padding-bottom: 10px;
    .nav_router{
      text-align: center;
      width: 50%;
      float: left;
      @include sc(10px,#333);
      img{
        width: 1.8rem;
        height: 1.8rem;
      }
      figcaption{
        text-align: center;
      }
    }
  }
  .shop_list_container{
		margin-top: .4rem;
		border-top: 0.025rem solid $bc;
		background-color: #fff;
		.shop_header{
			.shop_icon{
				fill: #999;
				margin-left: 0.6rem;
				vertical-align: middle;
				@include wh(0.6rem, 0.6rem);
			}
			.shop_header_title{
				color: #999;
				@include font(0.55rem, 1.6rem);
			}
		}
	}
</style>
