<template>
     <div class="car-nav">
        <ul class="nav">
             <li v-for="(item,ind) in list" @click="scrollTos({content:item})" :key="ind">
                {{item}}
            </li>
        </ul>
    </div>    
</template>
<script>
import { mapState , mapMutations } from "vuex";
    export default {
        data(){
            return{
            }
        },
        props:["list"],
        methods:{
            ...mapMutations(["scrollTos"])
        }
    }
</script>
<style>

</style>
