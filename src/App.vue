<template>
  <div id="app">
    <keep-alive  include="index">
      <router-view>
        <h3 class="loading">loading........</h3>
      </router-view>
    </keep-alive>
  </div>
</template>

<script>
import Index from "./components/indexlist/indexlist.vue"
export default {
  name: 'App',
  data(){
    return{

    }
  },
  components:{
    Index
  }
}
</script>

<style>
</style>
