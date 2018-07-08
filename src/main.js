// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from "./vuex/store.js";

import "./css/common.css";
import "./css/reset.css";
import "./css/style.css";

Vue.config.productionTip = false;
import VueLazyLoad from 'vue-lazyload';
Vue.use(VueLazyLoad, {
    error: '../static/erro.jpg',
    loading: '../static/loading.jpg'
})

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})