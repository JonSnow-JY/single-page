import "flex.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "element-ui/lib/theme-chalk/reset.css";
import "assets/scss/public.scss";

import customPlugin from "plugin/customPlugin";

// 全局组件
import "@/components";

export default {
  async install(Vue) {
    Vue.use(customPlugin);
    Vue.use(ElementUI, { size: "small" });
  },
};
