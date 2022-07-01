import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ele from "plugin/ele";

Vue.config.productionTip = false;

Vue.use(ele);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
