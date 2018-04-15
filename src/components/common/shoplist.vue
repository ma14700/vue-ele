<template>
  <div class="shoplist_container">
      <ul v-load-more="loadMore" v-if="shopListArr.length" type="1">
        <router-link :to="{path: 'shop', query:{geohash, id: item.id}}"  v-for="item in shopListArr" tag="li" :key="item.id" class="shop_li">
          <div>
            <img :src="imgBaseUrl+item.image_path" alt="" class="shop_img">
          </div>
          <div class="shop_right">
            <div class="shop_detail_header">
              <h4 :class="item.is_premium?'premium':''" class="shop_title ellipsis">
                {{item.name}}
              </h4>
              <h5 class="rating_order_num">
                <div class="rating_order_num_left">
                  <div class="rating_section">
                    <rating-star>

                    </rating-star>
                  </div>
                </div>
              </h5>
            </div>
          </div>
        </router-link>
      </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {shopList} from '../../service/getData'
import {imgBaseUrl} from '../../config/env'
import {showBack,animate} from '../../config/mUtils'
import {loadMore,getImgPath} from './mixin'
import loading from './loading'
import ratingStar from './ratingStar'
export default {
  data(){
    return{
      offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
			shopListArr:[], // 店铺列表数据
			preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
			showBackStatus: false, //显示返回顶部按钮
			showLoading: true, //显示加载动画
			touchend: false, //没有更多数据
			imgBaseUrl,
    }
  },
  mounted(){
    this.initData();
  },
  components:{
    loading,
    ratingStar
  },
  props: ['restaurantCategoryId', 'restaurantCategoryIds', 'sortByType', 'deliveryMode', 'supportIds', 'confirmSelect', 'geohash'],
  mixins:[loadMore,getImgPath],
  computed:{
    ...mapState([
      'latitude','longitude'
    ])
  },
  updated(){

  },
  methods:{
    async initData(){
      //获取数据
      let res = await shopList(this.latitude,this.longitude,this.offset,this.restaurantCategoryId);
      this.shopListArr = [...res];
      if(res.length<20){
        this.touchend = true;
      };
      this.hideLoading();
      showBack(status=>{
        this.showBackStatus = status;
      })
    },
    //达到底部加载更多数据
    async loadMore(){
      if(this.touchend){
        return
      }
      if(this.preventRepeatReuqest){
        return
      }
      this.showLoading = true;
      this.preventRepeatReuqest = true;
      this.offset +=20;
      let res = await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId);
      this.hideLoading();
      //相当于concat
      this.showListArr = [...this.shopListArr,...res];
      if(res.length<20){
        this.touchend = true;
        return
      }
      this.preventRepeatReuqest = false;
    },
    //返回顶部
    backTop(){
      animate(document.body,{scrollTop:'0'},400,'ease-out');
    },
    //加载页面
    hideLoading(){
      this.showLoading = false;
    },
    //监听父级传过来的数据变化
    async listenPropChange(){
      this.showLoading = true;
      this.offset = 0;
      let res = await shopList(this.latitude, this.longitude, this.offset, '', this.restaurantCategoryIds, this.sortByType, this.deliveryMode, this.supportIds);
      this.hideLoading();
      this.shopListArr = [...res];
    },
    zhunshi(supports){
      let zhunStatus;
      if((supports instanceof Array) && supports.length){
        supports.forEach(item=>{
          if(item.icon_name === '准'){
            zhunStatus = true;
          }
        })
      }else{
        zhunStatus = false;
      }
      return zhunStatus;
    }
  },
  watch:{
    //监听父级传来的Ids，当发生变化时，重新获取数据
    restaurantCategoryIds(value){
      this.listenPropChange();
    },
    sortByType(value){
      this.listenPropChange();
    },
    confirmSelect(value){
      this.listenPropChange();
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  .sholist_container{
    background: #fff;
    margin-bottom: 2rem;
  }
  .shop_li{
    display: flex;
    border-bottom: 0.025rem solid #f1f1f1;
    padding: 0.7rem 0.4rem;
  }
  .shop_img{
    @include wh(2.7rem,2.7rem);
    display: block;
    margin-right: 0.4rem;
  }
  .list_back_li{
    height: 4.85rem;
    .list_back_svg{
      @include wh(100%,100%)
    }
  }
  .shop_right{
    flex:auto;
    .shop_detail_header{
      @include fj;
      align-items:center;
      .shop_title{
        width:8.5rem;
        color: #333;
        padding-top: .01rem;
        @include font(0.65rem,0.65rem,'PingFangSC-Regular');
        font-weight: 700;
      }
    }
  }
</style>

