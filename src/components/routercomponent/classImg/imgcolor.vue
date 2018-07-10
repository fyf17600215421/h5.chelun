<template>
    <div class="color">
        <p data-hover="hover"  @click="changeColorid({ColorId:0,Name:'color'})">全部颜色</p>
        <div>
            <p class="c-type">
                <span  v-for="(item,key,index) in list" :key="index" @click="changeYear(index)" :class="{active:index===yearIndex}">
                    {{key}}
                </span>
            </p>        
            <ul>
                <li index="0"  data-hover="hover" v-for="(item,index) in colorList[yearIndex]" :key="index" :data-id="item.ColorId" @click="changeColorid(item)">
                    <span :style="'background:'+item.Value+''"></span>
                    {{item.Name}}   
                </li>
            </ul>  
        </div>
    </div>
</template>

<script>
import {mapState,mapMutations} from "vuex";
export default {
    data(){
        return{
            list:null,
            colorList:[],
            yearIndex:0
        }
    },
    created() {
        if(localStorage.list&&localStorage.colorList){
            this.list=JSON.parse(localStorage.list);
            this.colorList=JSON.parse(localStorage.colorList);
        }else{
            this.getData();
        }
    },
    computed:{
        ...mapState({
            SerialID:state=>state.CarImg.SerialID
        })
    },
   methods:{
       ...mapMutations(["changeColorID","changeClassText"]),
       getData(){
            let time = +new Date();
            let Url = "https://baojia.chelun.com/v2-car-getModelImageYearColor.html?SerialID="+this.SerialID+"&_"+time+"";
            fetch(Url).then(res=>{
                res.json().then(body=>{
                  if(body.code==1){
                      this.list=body.data;
                      for( let key in this.list){
                          this.colorList.push(this.list[key]);
                      }
                     localStorage.colorList= JSON.stringify(this.colorList);
                     localStorage.list= JSON.stringify(this.list);
                  }else{ alert(body.msg);}
                })
            })
       },
       changeYear(index){
           this.yearIndex=index;
       },
       changeColorid(item){
           this.changeColorID(item.ColorId);
           this.changeClassText({name:'ColorText',text:item.Name});
           this.$router.go(-1);
       }
   },
   destroyed() {
       localStorage.removeItem("list");
       localStorage.removeItem("colorList");
   },
}
</script>

<style>
@import url("../../../css/classimg.css");
</style>
