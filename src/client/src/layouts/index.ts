const layouts = {
    empty: () => import(/* webpackChunkName: "layouts" */ "./empty.vue"),
    default: () => import(/* webpackChunkName: "layouts" */ "./default.vue")
}

export default layouts;
