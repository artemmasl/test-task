import Vue from "vue";
import VueRouter from "vue-router";
import test from "../layouts/DefaultLayout";
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: test,
    },
  ],
});

export default router;
