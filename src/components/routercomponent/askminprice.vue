<template>
    <div class="ask-min-price">
       <header>
           <p>可向多个商家咨询最低价，商家及时回复</p>
       </header>
       <div class="content">
            <div class="q-info flex-row">
               <img :src="list&&list.details.serial.Picture" alt="">
               <div class="flex-column flex-centerX">
                   <p>{{list&&list.details.serial.AliasName}}</p>
                   <p>{{list&&list.details.car_name}}</p>
              </div>
            </div>
            <div class="self-info">
                <p class="tip">个人信息</p>
                <ul>
                    <li>
                        <span>姓名</span> 
                        <input type="text" placeholder="输入你的真实中文姓名" maxlength="4">
                    </li> 
                    <li>
                        <span>手机</span>
                         <input type="tel" placeholder="输入你的真实手机号码" maxlength="11">
                    </li> 
                    <li>
                        <span>城市</span>
                         <span>北京</span>
                    </li>
                </ul>
                <div class="quotation">
                    <button data-hover="hover">询最低价</button>
                </div>
            </div>
            <div class="dealer-info">
                <p class="tip">选择报价经销商</p>
                <ul v-if="list">
                    <li  data-hover="hover" data-id="100051064" class="active" v-for="(item,index) in list.list" :key="index">
                        <p><span>{{item.dealerShortName}}</span> <span>{{item.vendorPrice.split(".")[0]}}万</span></p> 
                        <p><span>{{item.address}}</span> <span>售{{item.saleRange}}</span></p>
                    </li>
                </ul>
            </div>
       </div>
      
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    data(){
        return{
            list:null
        }
    },
    mounted() {
        this.getMessage(this.Url)
    },
    computed:{
        ...mapState({
            Url:state=>state.AskMinPrice.url
        })
    },
    methods:{
         getMessage(url){
             fetch(url).then(res=>{
                res.json().then(body=>{
                    this.list=body.data;
                    console.log(this.list)
                })
            })
        }
    }
   
}
</script>

<style scoped>
@import url("../../css/askminprice.css");
</style>
