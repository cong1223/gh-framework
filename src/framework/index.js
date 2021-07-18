import storage from "./plugins/storage.js";
import Const from "./plugins/const";
import service from "./plugins/service";
import config from "./plugins/config";
import mixin from "./mixin";
import utils from "./plugins/utils";
import { ScrollView } from "./ui/components";
import Directives from "./directives";

export default {
  install(Vue) {
    Vue.prototype.storage = storage;
    Vue.prototype.config = config;
    Vue.prototype.const = Const;
    Vue.prototype.$const = Const; // 标签中不能使用const关键字,而js中访问的是this作用域下的const字段
    Vue.prototype.service = service;
    Vue.prototype.utils = utils;
    Vue.mixin(mixin);
    Vue.use(Directives);
    Vue.component("scroll-view", ScrollView);
  },
};
