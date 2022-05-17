/* Core start */
import Vue from "vue";
import App from "./App.vue";
import store from "@/store";
import router from "@/router";
import VueRouter from "vue-router";
/* Core end */
/* Other start*/
import VueNoty from "vuejs-noty";
/* Other end*/

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueNoty);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
