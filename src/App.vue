<template>
  <div id="app">
    <Index>
       <h3 class="loading">loading........</h3>
    </Index>
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
