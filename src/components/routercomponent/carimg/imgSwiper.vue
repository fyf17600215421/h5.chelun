<template>
   <div  v-show="showSwiper.show" class="swiper-container img-detail" @click="showSwiper.show=false">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in list" :key="index">   
                <li>
                    <img :src="item.Url.replace(/\{0\}/,'3')" alt="">
                </li>
            </div>
        </div>
            <div class="swiper-pagination img-swiper-count">
                
            </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import Swiper from "swiper";
export default {
    data(){
        return{
            list:[],
            mySwiper:null
        }
    },
    props:["showSwiper"],
    computed:{
        ...mapState({
            SerialID:state=>state.CarImg.SerialID,
            ImageID:state=>state.CarImg.ImageID,
            PageCount:state=>state.CarImg.PageCount
        }),
        mounted() {
            console.log(this.SerialID,this.ImageID)
             this.getList()
        },
    },
    watch:{
        showSwiper(){
            if(this.showSwiper.show) this.getList();
            this.mySwiper&&this.mySwiper.slideTo(this.showSwiper.index%30||0, 0, false);
        }
    },
    methods:{
        getList(){
            let time = new Date().getTime();
                let URL = `https://baojia.chelun.com/v2-car-getCategoryImageList.html?SerialID=${this.SerialID}&ImageID=${this.ImageID}&Page=${Math.ceil(this.showSwiper.index/30)}&PageSize=30&_${time}`
                fetch(URL).then(res=>{
                    res.json().then(body=>{
                        this.list=body.data.List;
                        setTimeout(()=>{
                            if(this.mySwiper==null){
                                this.mySwiper =  new Swiper(".swiper-container",{
                              })
                            }else{
                              this.mySwiper.update(true)
                            }
                           
                           localStorage.swiperImgId=this.ImageID;
                        })
                    })
                })
        }
    }
}
</script>

<style>
@import url("../../../../node_modules/swiper/dist/css/swiper.min.css");
@import url("../../../css/carImg.css");
</style>
