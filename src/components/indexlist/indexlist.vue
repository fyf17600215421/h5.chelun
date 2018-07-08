<template>
    <div class="main"> 
        <div class="index-list" ref="indexMain">
            <div class="car-list">
                <div class="car-content" v-for="(item,index) in list"  :key="index">
                    <div class="list-tit" :key="index" :ref="item.tit" v-show="item.tit!=='#'">{{item.tit}}</div>
                        <ul class="list">
                          <li  v-for="(item,index) in item.list"  :key="index" @click="getRightDialog(item)">
                             <span class="img-box"><img v-lazy="item.CoverPhoto" alt=""></span>
                             <span class="text  text-nobr">
                              {{item.Name}}
                            </span>
                         </li>
                      </ul>
                </div>
            </div>
         <Rightnav :list="rightList" ></Rightnav>
         <RightDialog></RightDialog>
        </div>
        <router-view/>
   </div>
</template>
<script>
import { INDEX_LIST_URL } from "../../api/request.js";
import { newData } from "./utils.js";
import { mapState , mapMutations } from "vuex";
import Rightnav from "./rightnavlist";
import RightDialog from "./rightlist"
export default {
    data(){
        return{
            list:null,
            rightList:null
        }
    },
    mounted(){
        fetch(INDEX_LIST_URL).then(res=>{
           res.json().then(res=>{
             newData(res.data,this);
           })
        })
        .catch((err)=>{
            if(err) throw err;
        })
    },
    computed:{
        ...mapState({
           scrollToItem:state=>state.Index.scrollToItem
        })
    },
    watch:{
        scrollToItem(){
            this.scrollto(this.scrollToItem,this)
        }
    },
    methods:{
        ...mapMutations(["getRightDialog","rightListDialogShowChange"]),
        scrollto(indexList,that){
        indexList==="#" ? 
        that.$refs.indexMain.scrollTo(0,0) :
        that.$refs.indexMain.scrollTo(0,that.$refs[indexList][0].offsetTop);
       }
    },
    components:{
        Rightnav,
        RightDialog
    }
}    
</script>
<style>

</style>
