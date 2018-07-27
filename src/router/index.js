import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Indexs from "../components/indexlist/indexlist.vue";
import Content from "../components/routercomponent/cartmessage";
import Img from "../components/routercomponent/carimg/index.vue";
import Askminprice from "../components/routercomponent/askminprice.vue";
import ImgColor from "../components/routercomponent/classImg/imgcolor.vue";
import ImgType from "../components/routercomponent/classImg/imgtype.vue"

export default new Router({
    routes: [{
            path: "/",
            name: "index",
            component: Indexs,
            meta: {
                keepAlive: true
            }
        }, {
            path: "/content",
            name: "content",
            component: Content,
            meta: {
                keepAlive: false
            }
        },
        {
            path: "/img",
            name: "img",
            component: Img,
            meta: {
                keepAlive: false
            }
        }, {
            path: "/askminprice",
            name: "askminprice",
            component: Askminprice,
            meta: {
                keepAlive: false
            }
        }, {
            path: "/color",
            name: "color",
            component: ImgColor,
            meta: {
                keepAlive: false
            }
        }, {
            path: "/type",
            name: "type",
            component: ImgType,
            meta: {
                keepAlive: false
            }
        }
    ]
})