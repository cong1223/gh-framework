import copy from "./copy";
import loadmore from "./loadmore";
import longpress from "./longpress";
import debounce from "./debounce";
import lazyload from "./lazyload";
import permission from "./permission";
import watermark from "./watermark";
import draggable from "./draggable";
import emoji from "./emoji";
// 自定义指令
const directives = {
  copy,
  loadmore,
  longpress,
  debounce,
  lazyload,
  permission,
  watermark,
  draggable,
  emoji,
};

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key]);
    });
  },
};
