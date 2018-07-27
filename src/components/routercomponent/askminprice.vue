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
                        <input type="text" placeholder="输入你的真实中文姓名"  v-model="name">
                    </li> 
                    <li>
                        <span>手机</span>
                         <input type="tel" placeholder="输入你的真实手机号码"  v-model="telphone">
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
import { mapState,mapMutations } from "vuex";
export default {
    data(){
        return{
            list:null,
            todolist:[]
        }
    },
    mounted() {
        this.getMessage(this.Url);
        localStorage.doList=JSON.stringify([]);
    },
    computed:{
        ...mapState({
            Url:state=>state.AskMinPrice.url,
            nameMessage:state=>state.AskMinPrice.name,
            telphoneMessage:state=>state.AskMinPrice.telphone,
            doList:state=>state.AskMinPrice.doList,
            listType:state=>state.AskMinPrice.listType
        }),
        name:{
            get(){
                return this.nameMessage;
            },
            set(value){
                console.log(value);
                this.changeMessage({attribute:"name",content:value})
            }
        },
        telphone:{
            get(){
                return this.telphoneMessage;
            },
            set(value){
                this.changeMessage({attribute:"telphone",content:value})
            } 
        }
      
    },
    watch:{
        listType(){
            if(this.listType!=="all"){
                this.todolist=this.doList.filter((item)=>{
                        if(item.over==(this.listType=="over")){
                            return item;
                        }
                })
            }else{
                this.todolist=this.doList;
            }
        }   
    },
    methods:{
        ...mapMutations(["changeMessage","addDoList","overList","changeListType"]),
         getMessage(url){
             fetch(url).then(res=>{
                res.json().then(body=>{
                    this.list=body.data;
                    console.log(this.list)
                })
            })
        },
        add(){
            let value = this.$refs.inp.value;
            let prevList = JSON.parse(localStorage.doList);
            if(prevList.indexOf(value) !=-1) {
                alert("您已经添加了");
            }else{
                this.addDoList({text:value,over:false})
                prevList.push(value);
                localStorage.doList=JSON.stringify(prevList);
            }
            this.$refs.inp.value="";
            this.todolist=this.doList
        },
        over(index){
            if(this.doList[index].over){
                alert("您已确定完成该事件！！！！");
                return;
            }
            this.overList(index);
        },
        changeType(e){
            let html = e.target.innerHTML;
            this.changeListType(html);
        }
    },
    destroyed() {
        this.changeMessage({attribute:"telphone",content:""})
        this.changeMessage({attribute:"name",content:""})
    },
   
}
</script>

<style scoped>
@import url("../../css/askminprice.css");
.to-do-list{
    background: #fff;
    position: absolute;
    top: .3rem;
    bottom: 0;
    width: 100%;
}
.to-do-list>div{
    display: flex;
    justify-content: space-around;
}
.to-do-list li{
    padding: .1rem;
    text-indent: 2em;
    font-size: .18rem;
}
.to-do-list li.over{
    text-decoration:line-through;
    color: #ccc;
    font-size: .16rem; 
    }
    .type{
        margin: 20px;
    }
</style>
