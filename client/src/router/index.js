import Vue from "vue";
import VueRouter from "vue-router";
import Temp_hum from "../views/Temp_hum.vue";
import GPS from "../views/GPS.vue";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/temp_hum",
    name: "Temp_hum",
    component: Temp_hum,
  },
  {
    path: "/gps",
    name: "GPS",
    component: GPS,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
