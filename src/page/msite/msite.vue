<template>
  <div>

  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import headTop from '../../components/header/head'
import '../../style/swiper.min.css'
import '../../plugins/swiper.min.js'
import {msiteAddress, msiteFoodTypes, cityGuess} from '@/service/getData'
export default {
  data(){
      return{
          geohash:'',
          msiteTitle:'请选择地址...',
          foodTypes:[],
          hasGetData:false,
          imgBaseUrl:'https://fuss10.elemecdn.com', 
      }
  }
}
</script>

<style lang="scss" scoped>

</style>
