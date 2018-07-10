import vue from "vue";
import Dialog from "./dialog.vue";
let Totals = {
    install(vue, options) {
        console.log(vue, options);
        vue.component("Dialog", Dialog);
    }
}

export default Totals;