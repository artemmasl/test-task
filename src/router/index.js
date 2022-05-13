import Vue from "vue";
import VueRouter from "vue-router";
import DefaultLayout from "../layouts/DefaultLayout";
import Home from "../views/Home";
import Market from "../views/Market";
import Basket from "../views/Basket";
import Profile from "../views/Profile";
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: DefaultLayout,
      children: [
        {
          path: "/home",
          component: Home,
        },
        {
          path: "/catalog",
          component: Market,
        },
        {
          path: "/basket",
          component: Basket,
        },
        {
          path: "/profile",
          component: Profile,
        },
      ],
    },
  ],
});

export default router;
