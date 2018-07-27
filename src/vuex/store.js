import Vue from "vue";
import Vuex from "vuex";
import createdLooger from "vuex/dist/logger";

import { INDEX_LIST_URL } from "../api/request";
import { IndexList } from "./utils";

Vue.use(Vuex);

const modulesIndex = {
    state: {
        indexList: null,
        rightNavList: null,
        scrollToItem: "B",
        rightListDialogUrl: null,
        rightListDialogShow: true
    },
    mutations: {
        addIndexList: (state, payload) => {
            state.indexList = payload.list;
            state.rightNavList = payload.rightList;
        },
        //滚动至某个
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
    },
    actions: {
        getIndexList: ({ commit }, payload) => {
            fetch(INDEX_LIST_URL).then(res => {
                    res.json().then(res => {
                        let data = IndexList(res.data);
                        commit("addIndexList", data);
                    })
                })
                .catch((err) => {
                    if (err) throw err;
                })
        }
    }
}

const modulesImg = {
    state: {
        SerialID: 0,
        ImageID: 0,
        PageCount: 0,
        ColorID: 0,
        ColorText: "color",
        TypeText: "type",
        CarTypeID: 0
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
        },
        changeColorID: (state, text) => {
            state.ColorID = text;
        },
        changeCarTypeID: (state, text) => {
            state.CarTypeID = text;
        },
        changeClassText: (state, { name, text }) => {
            state[name] = text;
        }
    }
}

const modulesAskMinPrice = {
    state: {
        url: "",
        name: "",
        telphone: "",
        doList: [],
        listType: "all"
    },
    mutations: {
        changeAskMinPriceUrl: (state, text) => {
            state.url = text;
        },
        changeMessage: (state, text) => {
            state[text.attribute] = text.content;
        },
        addDoList: (state, text) => {
            state.doList.push(text);
        },
        overList: (state, text) => {
            state.doList[text].over = true;
        },
        changeListType: (state, payload) => {
            state.listType = payload;
        }
    }
}

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        Index: modulesIndex,
        CarImg: modulesImg,
        AskMinPrice: modulesAskMinPrice
    },
    strict: debug,
    plugins: debug ? [createdLooger()] : []
})