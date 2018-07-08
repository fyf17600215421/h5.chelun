import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
import Content from "../components/routercomponent/cartmessage";
import Img from "../components/routercomponent/carimg/index.vue";
import Askminprice from "../components/routercomponent/askminprice.vue";

export default new Router({
    routes: [{
            path: "/content",
            name: "content",
            component: Content
        },
        {
            path: "/img",
            name: "img",
            component: Img
        }, {
            path: "/askminprice",
            name: "askminprice",
            component: Askminprice
        }
    ]
})