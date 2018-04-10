<template>
  <div>

  </div>
</template>

<script>
import qs from 'qs';
export default {
    data(){
        return{
            queryParams:{
                currentPage:1,
                pageSize:10
            }
        }
    },
    methods:{
        handlePageNoChange(e){
            this.queryParams.currentPage = e;
            this.replaceRouter();
        },
        replaceRouter(){
            const query = qs.stringify(this.queryParams);
            // 跳转url但是不添加记录
            this.$router.replace(`${location.pathname}?${query}`);
        },
        routeChange(){
            this.assignParams();
            this.fecthData();
        },
        assignParams(){
            // 浅拷贝复制
            // Object.assign(target, ...sources)
            //target目标对象，sources源对象
            this.queryParams = Object.assign({},this.queryParams,this.$router.$query)
        }
    },
    mounted(){
        this.assignParams();
        this.fecthData();
    },
    watch:{
        $route:'routeChange'
    }
}
</script>

<style lang="scss">

</style>

