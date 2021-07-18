import Vue from "vue";
import App from "./App.vue";
import Framework from "./framework";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router";
import "@/css/index.scss";

Vue.config.productionTip = false;
Vue.use(Framework);
Vue.use(ElementUI);

new Vue({
  render: (h) => h(App),
  router
}).$mount("#app");
