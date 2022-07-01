import Vue from "vue";
import VueRouter from "vue-router";

const _import = require("@/libs/util.import." + process.env.NODE_ENV);

// import cookies from "libs/util.cookies";

const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return VueRouterPush.call(this, location).catch((err) => err);
};
const VueRouterReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return VueRouterReplace.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: "/",
    name: "home",
    component: _import("home"),
    meta: {
      title: "配置",
    },
  },
];

Vue.use(VueRouter);

const router = new VueRouter({
  base: "",
  routes,
  scrollBehavior: () => ({ y: 0 }),
});

/**
 * 路由拦截
 */
// router.beforeEach((to, from, next) => {
//   if (to.name === "login" || to.meta.white === "1") {
//     next();
//   } else {
//     // 验证用户是否登录
//     const token = cookies.get("token");
//     if (token) {
//       // 输入不存在的路由，返回之前的路由
//       if (!to.matched.length) {
//         next({ name: from.name });
//       } else {
//         next();
//       }
//     } else {
//       next({ name: "login" });
//     }
//   }
// });

// router.afterEach((to) => {
//   document.title = to.meta.title;
// });

export default router;
