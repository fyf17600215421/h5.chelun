<template>
  <div id="app">
    <router-view>
       <h3 class="loading">loading........</h3>
    </router-view>
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
