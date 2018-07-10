<template>
   <div class="car-content-mess">
        <div class="img-box" @click="$router.push({path:'/img',query:{id:data.SerialID}})">
            <img v-lazy="data.CoverPhoto" alt="">
            <span class="pictrue-count">
                {{data.pic_group_count}} 张
           </span>
        </div>
        <div class="info">
            <div class="left">
                <h3 class="price" v-if="data.market_attribute&&data.market_attribute.dealer_price">
                    {{data.market_attribute.dealer_price}}
                </h3> 
                <p class="price-mess" v-if="data.market_attribute&&data.market_attribute.official_refer_price">
                  指导价： {{data.market_attribute.official_refer_price}}    
               </p> 
            </div>
            <div class="right-btn">
                    <button type="button" @click="askMess(data)">{{data.BottomEntranceTitle}}</button>
            </div>
        </div>   
        <div class="year-list">
            <span v-for="(item,index) in years" :key="index" @click="showYear=item" :class="{'active':item===showYear}">
                 {{item}}
            </span>
        </div>
        <div class="shop-car-list">
               <div v-for="(item,index) in shopCarList" :key="index">
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
                         <button :data-id="value.car_id" data-hover="hover">询问底价</button>
                     </li>
                 </ul>
               </div>
        </div>
    </div>
</template>

<script>
import {SERIAL_MSSAGE} from "../../api/request.js";
import {mapState,mapMutations} from "vuex";
export default {
    data(){
        return{
            data:[],
            years:[],
            shopCarList:[],
            shopCarListType:[],
            showYear:"全部"
        }
    },
    mounted(){
        fetch(SERIAL_MSSAGE(this.$route.query.id)).then(res=>{
            res.json().then(body=>{
               if(body.code===1){
                   this.data = body.data;
                   this.getYears(body.data.list);
               }else{
                   alert(body.msg);
               }
            })
        })
    },
    watch:{
        showYear(){
            this.getYears(this.data.list)
        }
    },
    methods:{
        ...mapMutations(["changeAskMinPriceUrl","changeColorID","changeCarTypeID","changeClassText"]),
        askMess(list){
            var str = list.BottomEntranceLink;
            var substr2  = str.match(/car\/(\S*)/);
            this.changeAskMinPriceUrl("https://baojia.chelun.com/v2-dealer-alllist.html?carId="+substr2[1]+"&cityId=201&_1530875910088");
            this.$router.push({path:"/askminprice"})
        },
        getYears(list){
            let years = ["全部"];
            let key = true;
            this.shopCarList=[];
            if(this.showYear.length==2){
                this.shopCarList=list;
                key=false;
            }
            list.forEach(element => {
                let year = element.market_attribute.year;
                if(key&&year==this.showYear){
                    this.shopCarList.push(element);
                }
                years.push(year);
            });
            this.years = [...new Set(years)];
            this.getShopCar();
        },
        getShopCar(){
            let type = [];
            let shopCarList = [];
            this.shopCarList.forEach((item)=>{
               type.push(item.exhaust_str+'/'+item.max_power_str+" "+item.inhale_type);
            })
            this.shopCarListType = [...new Set(type)];

            this.shopCarListType.forEach((value)=>{
                let obj = {
                    tit:value,
                    list:[]
                };
                 this.shopCarList.forEach((item)=>{
                    if(item.exhaust_str+'/'+item.max_power_str+" "+item.inhale_type===value){
                        obj.list.push(item);
                    }
                 })
                 shopCarList.push(obj);
            })
           this.shopCarList=shopCarList;  
           localStorage.shopCarList=JSON.stringify(this.shopCarList);
           localStorage.yearList=JSON.stringify(this.years);
        }
    },
    destroyed() {
        this.changeColorID(0);
        this.changeCarTypeID(0);
        this.changeClassText({name:'ColorText',text:'color'});
        this.changeClassText({name:'TypeText',text:'type'});
    }
}
</script>

<style>

</style>
