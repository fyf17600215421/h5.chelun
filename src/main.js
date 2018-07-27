// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from "./vuex/store.js";
import Fastclick from 'fastclick';
import VueLazyLoad from 'vue-lazyload';

import "./css/common.css";
import "./css/reset.css";
import "./css/style.css";
import "../serviceWorker"

import Totals from "./components/totals"
Vue.config.productionTip = false;
Vue.use(VueLazyLoad, {
    error: '../static/erro.jpg',
    loading: '../static/loading.jpg'
})
Vue.use(Totals);

Fastclick.attach(document.body);
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})