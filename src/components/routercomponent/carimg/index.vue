<template>
    <div class="car-content-img">
       <div class="flex-row tit">
           <span>颜色</span>
           <span>车款</span>
       </div>
        <ul class="img-default" v-for="(item,index) in list" :key="index">
               <li v-for="(value,key) in item.List" :key="key" v-if="key==0">
                   <img :style="`background-image: url(${value.Url.replace(/\{0\}/,'3')})`" alt="">
                   <div @click="getMoneyImgList(item,1)">
                       <p>{{item.Name}}</p>
                       <p>{{item.Count}}</p>
                   </div>
               </li>
                <li v-else @click="checkLookImg(item,key)">
                   <img :style="`background-image: url(${value.Url.replace(/\{0\}/,'3')})`" alt="">
               </li>
        </ul>
        <ul class="img-list" v-if="moneyImgList.length" @scroll="loadingmore(moneyImgList)">
             <li v-for="(item,index) in moneyImgList" :key="index"  @click="checkLookImg(moneyImgList,index)">
                    <img :style="`background-image: url(${item.Url.replace(/\{0\}/,'3')})`"  alt="">
             </li>
         </ul>
        <Imgswiper :showSwiper="showSwiper" ></Imgswiper>
    </div>
</template>

<script>
import {mapState,mapMutations} from "vuex";
import Imgswiper from "./imgSwiper";
export default {
    data(){
        /** 
         list:默认img列表跑
         moneyImgList：下拉加载更多图片容器
         key：防止下拉加载连续触发
         listId：SerialID
         ImgId：ImageID
         IMGpage：加载更多page页码
         maxLength：控制下拉加载 峰值
         showSwiper:是否单独展示大图片
        */
        return{
            list:{},
            moneyImgList:[],
            key:true,
            listId:null,
            ImgId:null,
            IMGpage:1,
            maxLength:0,
            showSwiper:false
        }
    },
    components:{
        Imgswiper
    },
    mounted(){
        this.changeSerialID(this.$route.query.id);
        let time = new Date().getTime();
        this.getList("https://baojia.chelun.com/v2-car-getImageList.html?SerialID="+this.SerialID+"&_"+time+"","list");
    },
    computed:{
       ...mapState({
           SerialID:state=>state.CarImg.SerialID,
           ImageID:state=>state.CarImg.ImageID
       })
    },
    watch:{
        SerialID(){
            console.log(this.SerialID);
        },
        IMGpage(){
           this.changePageCount(this.IMGpage)
        }
    },
    methods:{
        ...mapMutations(["changeSerialID","changeImageID","changePageCount"]),
        //获取数据
        getList(URL,content){
            fetch(URL).then(res=>{
                res.json().then(body=>{
                   if(body.code===1){
                       if(content==="moneyImgList"){
                           this[content] = this[content].concat(body.data.List);
                       }else{
                           this[content]=body.data;
                       }
                    }else{
                        alert(body.msg)
                    }
                })
                    this.key=true;
            })
        },
        //下载加载更多
        getMoneyImgList(imgmess,i){
           if(imgmess){
                this.maxLength=imgmess.Count;
                this.changeImageID(imgmess.Id);
           } 
            this.key=false;
            let time = new Date().getTime();
            let URL = `https://baojia.chelun.com/v2-car-getCategoryImageList.html?SerialID=${this.SerialID}&ImageID=${this.ImageID}&Page=${i}&PageSize=30&_${time}`
            this.getList(URL,"moneyImgList")
        },
        //触发下拉加载更多
        loadingmore(moneyImgList){
           
           let target = event.target; 
           if(this.key&&target.children.length/3*135-736-target.scrollTop<100&&this.moneyImgList.length<this.maxLength){
               this.getMoneyImgList(undefined,this.IMGpage+=1);
           }
        },
        //显示图片轮播
        checkLookImg(item,index){
            let id = item.Id || this.ImageID;
             this.changeImageID(id);
            this.showSwiper={show:true,index}
        }
    }
}
</script>

<style scoped>
@import url("../../../css/carImg.css");
</style>
