import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";

import layouts from "@/layouts";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/login",
        name: "Login",
        component: () =>
            import(/* webpackChunkName: "login" */ "../views/Login.vue"),
        meta: {
            layout: layouts.empty
        }
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
