import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const modulesIndex = {
    state: {
        scrollToItem: "B",
        rightListDialogUrl: null,
        rightListDialogShow: true
    },
    mutations: {
        scrollTos(state, obj) {
            state.scrollToItem = obj.content;
        },
        //获取首页dialog数据
        getRightDialog(state, obj) {
            let time = new Date().getTime();
            state.rightListDialogUrl = `https://baojia.chelun.com/v2-car-getMakeListByMasterBrandId.html?MasterID=${obj.MasterID}&_${time}`;
        },
        //是否显示首页右侧栏的dialog框
        rightListDialogShowChange(state, obj) {
            state.rightListDialogShow = obj;
        }
    }
}

const modulesImg = {
    state: {
        SerialID: "000",
        ImageID: null,
        PageCount: 0
    },
    mutations: {
        changeSerialID: (state, text) => {
            state.SerialID = text;
        },
        changeImageID: (state, text) => {
            state.ImageID = text;
        },
        changePageCount: (state, text) => {
            state.PageCount = text;
        }
    }
}


const modulesAskMinPrice = {
    state: {
        url: ""
    },
    mutations: {
        changeAskMinPriceUrl: (state, text) => {
            state.url = text;
        }
    }
}



export default new Vuex.Store({
    modules: {
        Index: modulesIndex,
        CarImg: modulesImg,
        AskMinPrice: modulesAskMinPrice
    }
})