import Vue from "vue";
import Router from "vue-router";
import Layout from "@/layout";

Vue.use(Router);


export const routes = [
  {
    path: "/",
    component: () => import("@/views"),
    meta: {
      level: 1,
      isMenuItem: false
    }
  },
  {
    path: "/guide",
    name: "guide",
    component: Layout,
    redirect: { name: "directives" },
    meta: {
      level: 1,
      isMenuItem: true
    },
    children: [{
      path: "directives",
      name: "directives",
      component: () => import("@/views/demo-directives"),
      meta: {
        title: "自定义指令"
      }
    }, {
      path: "mixin",
      name: "mixin",
      component: () => import("@/views/demo-mixin"),
      meta: {
        title: "全局混入"
      }
    }, {
      path: "services",
      name: "services",
      component: () => import("@/views/demo-services"),
      meta: {
        title: "数据请求"
      }
    }, {
      path: "utils",
      name: "utils",
      component: () => import("@/views/demo-utils"),
      meta: {
        title: "函数工具集"
      }
    }, {
      path: "ui",
      name: "ui",
      component: () => import("@/views/demo-ui"),
      meta: {
        title: "全局组件"
      }
    }, {
      path: "config",
      name: "config",
      component: () => import("@/views/demo-config"),
      meta: {
        title: "全局配置"
      }
    }, {
      path: "constants",
      name: "constants",
      component: () => import("@/views/demo-constants"),
      meta: {
        title: "常量"
      }
    }, {
      path: "storage",
      name: "storage",
      component: () => import("@/views/demo-storage"),
      meta: {
        title: "本地缓存"
      }
    }]
  }
];

const routerConfig = new Router({
  mode: "history",
  base: "/",
  routes: routes
});
export default routerConfig;
