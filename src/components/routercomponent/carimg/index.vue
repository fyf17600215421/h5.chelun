<template>
    <div class="car-content-img">
       <div class="flex-row tit">
            <span>
                <router-link to="color">
                    {{ColorText}}^
                </router-link>
           </span>
            <span>
                 <router-link to="type">
                    {{TypeText}}
                </router-link>
           </span>
          
       </div>
       <div v-if="list.length===0">
           <h1>
               无此颜色的车
           </h1>
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
            showSwiper:false,
            imgIndex:0
        }
    },
    components:{
        Imgswiper
    },
    mounted(){
        this.changeSerialID(this.$route.query.id);
        let time = new Date().getTime();
        let Url ="https://baojia.chelun.com/v2-car-getImageList.html?SerialID="+this.SerialID+"&_"+time+"";
        if(this.ColorID&&this.CarTypeID){
                Url = `https://baojia.chelun.com/v2-car-getImageList.html?SerialID=${this.SerialID}&ColorID=${this.ColorID}&CarID=${this.CarTypeID}&_${time}`
            }else if(this.CarTypeID){
                Url = `https://baojia.chelun.com/v2-car-getImageList.html?SerialID=${this.SerialID}&CarID=${this.CarTypeID}&_${time}`
            }else if(this.ColorID) {
                Url = `https://baojia.chelun.com/v2-car-getImageList.html?SerialID=${this.SerialID}&ColorID=${this.ColorID}&_${time}`
            }
        this.getList(Url,"list");
    },
    computed:{
       ...mapState({
           SerialID:state=>state.CarImg.SerialID,
           ImageID:state=>state.CarImg.ImageID,
           ColorID:state=>state.CarImg.ColorID,
           ColorText:state=>state.CarImg.ColorText,
           CarTypeID:state=>state.CarImg.CarTypeID,
           TypeText:state=>state.CarImg.TypeText
       })
    },
    watch:{
        imgIndex(){
           this.changePageCount(Math.ceil(this.imgIndex/30))
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
            if(this.ColorID&&this.CarTypeID){
                URL = `https://baojia.chelun.com/v2-car-getCategoryImageList.html?SerialID=${this.SerialID}&ImageID=${this.ImageID}&ColorID=${this.ColorID}&CarID=${this.TypeText}&Page=${i}&PageSize=30&_${time}`
            }else if(this.CarTypeID){
                URL = `https://baojia.chelun.com/v2-car-getCategoryImageList.html?SerialID=${this.SerialID}&ImageID=${this.ImageID}&CarID=${this.TypeText}&Page=${i}&PageSize=30&_${time}`
            }else if(this.ColorID) {
                URL = `https://baojia.chelun.com/v2-car-getCategoryImageList.html?SerialID=${this.SerialID}&ImageID=${this.ImageID}&ColorID=${this.ColorID}&Page=${i}&PageSize=30&_${time}`
            }
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
             this.imgIndex=index;
            this.showSwiper={show:true,index}
        }
    }
}
</script>

<style scoped>
@import url("../../../css/carImg.css");
</style>
