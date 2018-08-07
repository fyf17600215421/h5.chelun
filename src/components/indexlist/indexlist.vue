<template>
    <div class="main"> 
        <div class="index-list" ref="indexMain">
            <div class="car-list">
                <div class="car-content" v-for="(item,index) in list"  :key="index">
                    <div class="list-tit" :key="index" :ref="item.tit" v-show="item.tit!=='#'">{{item.tit}}</div>
                        <ul class="list">
                          <li  v-for="(item,index) in item.list"  :key="index" @click.stop="getRightData(item)">
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
   </div>
</template>
<script>
import { mapState , mapMutations ,mapActions} from "vuex";
import Rightnav from "./rightnavlist";
import RightDialog from "./rightlist"
export default {
    name:"index",
    data(){
        return{
        
        }
    },
    mounted(){
        this.getIndexList();
    },
    computed:{
        ...mapState({
           scrollToItem:state=>state.Index.scrollToItem,
           list:state=>state.Index.indexList,
           rightList:state=>state.Index.rightNavList,
           rightListDialogShow:state=>state.Index.rightListDialogShow
        })
    },
    watch:{
        scrollToItem(){
            this.scrollto(this.scrollToItem,this)
        }
    },
    methods:{
        ...mapActions(["getIndexList"]),
        ...mapMutations(["getRightDialog","rightListDialogShowChange"]),
        scrollto(indexList,that){
        indexList==="#" ? 
        that.$refs.indexMain.scrollTo(0,0) :
        that.$refs.indexMain.scrollTo(0,that.$refs[indexList][0].offsetTop);
       },
       getRightData(item){
           let localStorage_MasterID = localStorage.MasterID,
               item_MasterID = item.MasterID,
               RightDialog=this.rightListDialogShow;
          if(!localStorage_MasterID||item_MasterID!=localStorage_MasterID){
             localStorage.MasterID=item_MasterID;
             return this.getRightDialog(item);
          }
          if(RightDialog){
              this.rightListDialogShowChange(false);
           }
       }
    },
    destroyed() {
        this.rightListDialogShowChange(true);
        localStorage.MasterID=undefined;
    },
    components:{
        Rightnav,
        RightDialog
    }
}    
</script>
<style>

</style>
