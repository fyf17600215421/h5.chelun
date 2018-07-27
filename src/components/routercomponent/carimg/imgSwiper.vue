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
    mounted() {
    },
    computed:{
        ...mapState({
            SerialID:state=>state.CarImg.SerialID,
            ImageID:state=>state.CarImg.ImageID,
            PageCount:state=>state.CarImg.PageCount,
            ColorID:state=>state.CarImg.ColorID
        }),
    },
    watch:{
        /**
         * PrevPageCount 上次进入swiper组件的page值
         * PrevImgId  上次进入swiper组件的imgID值
         */
        showSwiper(){
            let PrevPageCount = localStorage.PageCount-0,
                PrevImgId= localStorage.ImgId-0;

            if(PrevPageCount!==this.PageCount||PrevImgId!==this.ImageID) this.getList();
            this.mySwiper&&this.mySwiper.slideTo(this.showSwiper.index%30||0, 0, false);
            localStorage.PageCount=this.PageCount;
            localStorage.ImgId=this.ImageID;
        }
    },
    methods:{
        getList(){
            let time = new Date().getTime();
            let payLoad = `SerialID=${this.SerialID}&ImageID=${this.ImageID}&Page=${Math.ceil(this.showSwiper.index/30)||1}&PageSize=30&_${time}`
           if(this.ColorID&&this.CarTypeID){
                payLoad = `SerialID=${this.SerialID}&ImageID=${this.ImageID}&ColorID=${this.ColorID}&CarID=${this.TypeText}&Page=${Math.ceil(this.showSwiper.index/30)||1}&PageSize=30&_${time}`
            }else if(this.CarTypeID){
                payLoad = `SerialID=${this.SerialID}&ImageID=${this.ImageID}&CarID=${this.TypeText}&Page=${Math.ceil(this.showSwiper.index/30)||1}&PageSize=30&_${time}`
            }else if(this.ColorID) {
                payLoad = `SerialID=${this.SerialID}&ImageID=${this.ImageID}&ColorID=${this.ColorID}&Page=${Math.ceil(this.showSwiper.index/30)||1}&PageSize=30&_${time}`
            }
            let URL = "https://baojia.chelun.com/v2-car-getCategoryImageList.html?"+payLoad;
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
                        })
                    })
                })
        }
    },
    destroyed() {
         localStorage.removeItem("PageCount");
         localStorage.removeItem("ImgId");
    },
}
</script>

<style>
@import url("../../../../node_modules/swiper/dist/css/swiper.min.css");
@import url("../../../css/carImg.css");
</style>
