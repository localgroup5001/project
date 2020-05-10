import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// @ts-ignore
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import layouts from '@/layouts';

Vue.config.productionTip = false;

Vue.component('default-layout', layouts.default);

new Vue({
  router,
  store,
  // @ts-ignore
  vuetify,
  render: h => h(App)
}).$mount("#app");
