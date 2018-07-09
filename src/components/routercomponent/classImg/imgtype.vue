<template>
    <div class="type">
        <p data-hover="hover"  @click="changTypeid(0)">全部类型</p>
        <div class="shop-car-list">
            <p class="c-type">
                <span  v-for="(item,index) in yearList" :key="index" @click="changeYear(index)" :class="{active:index===yearIndex}">
                    {{item}}
                </span>
            </p>       
            <div v-for="(item,index) in typeList" :key="index">
                 <p>{{item.tit}}</p>
                 <ul>
                     <li v-for="(value,key) in item.list" :key="key">
                         <p>{{value.car_name}}</p>
                         <p>{{value.horse_power+'马力'+value.gear_num+'档'}}</p>
                         <p>
                            <span class="price-mess" v-if="value.market_attribute&&value.market_attribute.official_refer_price">
                                指导价 {{value.market_attribute.official_refer_price}}    
                            </span>
                            <span class="price-mess" v-if="value.market_attribute&&value.market_attribute.dealer_price_min">
                                {{value.market_attribute.dealer_price_min}}    
                            </span> 
                         </p>
                     </li>
                 </ul>
               </div> 
        </div>
    </div>
    
</template>

<script>
import {mapState,mapMutations} from "vuex";
export default {
    data(){
        return{
            yearList:[],
            typeList:[],
            yearIndex:0
        }
    },
    mounted() {
        this.yearList=JSON.parse(localStorage.yearList).splice(1);
        this.typeList=JSON.parse(localStorage.shopCarList);
    },
   methods:{
       getData(){
          console.log()
       },
       changeYear(index){
           this.yearIndex=index;
       },
       changTypeid(){
           this.$router.go(-1);
       }
   },
   destroyed() {
       
   },
}
</script>

<style>
@import url("../../../css/classimg.css");
</style>
