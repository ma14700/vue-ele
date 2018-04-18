<template>
  <div class="food_container"> 
      <head-top :head-title="headTitle" goBack='true'></head-top>
  </div>
</template>

<script>
import headTop from '../../components/header/head'
import {mapState,mapMutations} from 'vuex'
import shopList from '../../components/header/head'
import {getImgPath} from '../../components/common/mixin'
import {msiteAddress,foodCategory,foodDelivery,foodAcitvity} from '../../service/getData'
export default {
    data(){
        return{
            headTitle:'',
            geohash:'',
            foodTitle:'',
            restaurant_category_id: '', // 食品类型id值
            restaurant_category_ids: '', //筛选类型的id
            sortBy:'',//筛选条件
            category:null,
            categoryDetail:null,
            sortByType:null,
            Delivery:null,
            Activity:null,
            delivery_mode:null,
            support_ids:[],
            filterNum:0,
            confirmStatus:false
        }
    },
    components:{
        headTop,
        shopList
    },
    created(){
        this.initData();
    },
    mixins:[getImgPath],
    computed:{
        ...mapState([
            'latitude','longitude'
        ])
    },
    methods:{
        ...mapMutations([
            'RECORD_ADDRESS'
        ]),
        async initData(){
            this.geohash = this.$route.query.geohash;
            this.headTitle = this.$route.query.title;
            this.foodTitle = this.headTitle;
            this.restaurant_category_id = this.$route.restaurant_category_ids;
            //防止刷新页面时，vuex状态丢失
            if(!this.latitude){
                let res = await msiteAddress(this.geohash);
                this.RECORD_ADDRESS(res)
            }
            this.category = await foodCategory(this.latitude,this.longitude);
            this.category.forEach(item=>{
                if(this.restaurant_category_id == item.id){
                    this.categoryDetail = item.sub_categories
                }
            })
        }
    }
}
</script>

<style scoped>

</style>
