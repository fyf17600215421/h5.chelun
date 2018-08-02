<template>
    <div :class="{right:true,rightback:rightListDialogShow}" ref="rightList">
        <div v-for="(item,index) in list" class="car-content" :key="index" >
            <div class="list-tit" :key="index" >{{item.GroupName}}</div>
                 <ul>
                     <li  class="carlist" v-for="(item,index) in item.GroupList" :key="index" >
                         <router-link :to="{path:'/content',query:{id:item.SerialID}}">
                            <span class="img-box">
                                    <img  :src="item.Picture" alt="">
                            </span>
                            <div class="text-box">
                                 <span class="car-name text-nobr" >
                                       {{item.AliasName}}
                                 </span>
                                 <span class="car-price">
                                     {{item.DealerPrice}}
                                </span>
                           </div>
                    </router-link>
                </li>
            </ul>
        </div> 
    </div>
</template>
<script>
import { mapState , mapMutations } from "vuex";
    export default {
        data(){
            return {
                list:null
            }
        },
        computed:{
            ...mapState({
                rightListDialogUrl:state=>state.Index.rightListDialogUrl,
                rightListDialogShow:state=>state.Index.rightListDialogShow
            })
        },
        watch:{
            rightListDialogUrl(){
                this.getData(this.rightListDialogUrl,this)
            }
        },
        mounted(){
            this.touchMove();
            console.log(this.$store)
        },
        methods:{
            ...mapMutations(["rightListDialogShowChange"]),
            getData(rightListDialogUrl,that){
              fetch(rightListDialogUrl).then(res=>{
                   res.json().then(res=>{
                       if(res.code===1){
                         that.list=res.data;
                         that.rightListDialogShowChange(false);
                       }else{
                           alert(res.msg);
                       }
                   })
                })
               .catch((e)=>{
                  if(e) throw e;
               })
            },
            touchMove(){
                let dom = this.$refs.rightList;
                let start = 0,
                    end=0;
                dom.ontouchstart=(e)=>{
                    start=e.changedTouches[0].pageX;
                    console.log(dom)
                }
                dom.ontouchend=(e)=>{
                 end=e.changedTouches[0].pageX;
                    if(end-start>=100){
                       this.rightListDialogShowChange(true);
                    }
                }
            }
        }
    }
</script>
<style>

</style>
