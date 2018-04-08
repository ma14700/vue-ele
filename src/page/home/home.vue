<template>
  <div>
      <span>当前定位城市：</span>
      <span>定位不准时，请在城市列表中选择</span>
  </div>
</template>

<script>
import {cityGuess} from '../../service/getData'
export default {
    data(){
      return{
        guessCity:''
      }
    },
    mounted(){
      cityGuess().then(res=>{
        this.guessCity = res.name;
        this.guessCityid= res.ids
      })
    }
}
</script>

<style lang="scss" scoped>

</style>

