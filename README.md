![](https://cdn.jsdelivr.net/gh/cong1223/cloudimg@master/img/20210718073815.jpeg)

### 关于`gh-framework`

`gh-framework`旨在解决`vue2`环境下(思想可用于任何框架项目，不局限于vue2)的前端工程化问题，它将封装`vue`项目中常用的工具库和配置文件并将其可移植化，例如`axios`、`constants(常量)`、`directives(指令)`、`services(数据请求层)`、`config(配置文件)`、`mixin(全局混入)`、`utils(工具集)`、`context(上下文)`。本方案本人已在5+项目上应用，包括一个大型前端项目。

> github地址(示例代码): https://github.com/cong1223/gh-framework

### 特性

1. 高度封装：高度封装项目常用工具和配置，不写重复代码。
2. 快速移植化：封装一次，其他类型项目可复制粘贴，快速聚拢重复代码，根据业务需求小部分修改即可，如果后端返回数据格式一致，那么`services`都不需要修改即可应用。
3. 不具有破坏性：新项目如果想尝试这套解决方案，那么可以移植次方案，并且对你原先的项目不具有破坏性，可以同时兼容。
4. 快速开发体验：一次封装，永久安逸，告别繁琐的导入/导出，`this`.万物。

### 适用人群

1. 对前端工程化具有强烈学习兴趣的初中级前端程序员；
2. 前端项目中扮演captain角色的程序员；
3. 快速交付型创业程序员；
4. 兼职接单程序员；

### 项目结构介绍

忽略了vue项目基本项目结构文件

```
|-- node_mudules
|-- public
|-- src
    |-- assets // 静态资源文件夹
    |-- config // 配置文件文件夹
    |-- const // 常量配置文件夹
    |-- framework // gh-framework 文件夹
        |-- directives // 全局指令文件夹
        |-- mixin // 全局mixin混入文件夹
        |-- plugins // framework 核心工具集的配置入口
        |-- utils // 全局工具集文件夹
        |-- ui // 全局通用ui组件文件夹
        |-- config.js // 文件名映射配置文件(重要)
        |-- index.js // 导出为vue能安装的framework插件（封装为install函数）
    |-- services // 数据请求层文件夹
|-- .browserslistrc
|-- .eslintrc.js
|--	.gitignore
|-- babel.config.js
|-- package.json
|-- README.md
|-- yarn.lock
```

###  framework

`framework`文件夹就是`gh-framework`的核心思想所在，高度聚拢项目公共代码，使用变得可以快速移植化，一个项目做完了，可以立马复制`framework`文件夹到另外一个新的项目，唯一不同的就是业务代码部分。此文件夹可以根据自己的业务需求继续扩展其他通用逻辑，封装方法参考`directives`、`utils`等。

#### directives

全局指令封装集文件夹，将项目中常用指令统一管理，全局安装。

文件夹项目结构如下：

```
|-- directives
    |-- debounce.js // 防止按钮在短时间内被多次点击，使用防抖函数限制规定时间内只能点击一次
    |-- loadmore.js // element-ui下拉框下拉更多
    |-- draggable.js // 实现一个拖拽指令，可在页面可视区域任意拖拽元素
    |-- copy.js // 复制粘贴指令
    |-- emoji.js // 不能输入表情和特殊字符，只能输入数字或字母等
    |-- lazyload.js // 实现一个图片懒加载指令，只加载浏览器可见区域的图片
    |-- longpress.js // 实现长按，用户需要按下并按住按钮几秒钟，触发相应的事件
    |-- permission.js // 权限指令，对需要权限判断的 Dom 进行显示隐藏
    |-- watermark.js // 给整个页面添加背景水印
    |-- // 更多其他指令...
    |-- index.js // 统一出口
```

> 以上更多通用指令请在示例项目中查看获取

debounce.js

```javascript
// 防止按钮在短时间内被多次点击，使用防抖函数限制规定时间内只能点击一次
const debounce = {
  inserted: function (el, binding) {
    let timer
    el.addEventListener('keyup', () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        binding.value()
      }, 1000)
    })
  }
}

export default debounce
```

loadmore.js

```javascript
// element-ui下拉框下拉更多
const loadmore = {
  bind (el, binding) {
    // 获取element-ui定义好的scroll盒子
    const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
    SELECTWRAP_DOM && SELECTWRAP_DOM.addEventListener('scroll', function () {
      const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight
      if (CONDITION) {
        binding.value()
      }
    })
  }
}

export default loadmore
```

index.js

```javascript
import loadmore from './loadmore'
import debounce from './debounce'
// 自定义指令
const directives = {
  loadmore,
  debounce
}

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key])
    })
  }
}
```



#### mixin

全局混入，一些全局的方法和属性可以定义在此文件中，比如路由跳转，封装后可以更灵活的处理路径和参数问题，比如全局的toast、二次弹窗等等。

文件夹项目结构如下：

```
|-- mixin
    |-- index.js
```

index.js

```javascript
export default {
  data() {
    return {};
  },
  computed: {},
  created() {
  },
  mounted() {
  },
  methods: {
    // 二次弹窗, 命令方式调用
    $confirmBox(title, message, handleConfirm, handleCancel, options) {
      const {
        confirmButtonText = "确认",
        showCancelButton = true,
        // eslint-disable-next-line no-unused-vars
        confirmButtonType = "primary"
      } = options || {};
      return this.$messageBox({
        title,
        message,
        showCancelButton, // 根据业务需求扩展
        confirmButtonText, // 根据业务需求扩展
        customClass: "zk-confirm-box",
        closeOnClickModal: false,
        confirmValidate: (action, component, done, instance) => {
          // component : 自定义传入的component的组件实例
          if (action === "cancel") {
            if (handleCancel) {
              handleCancel();
            }
            return done();
          } else {
            instance.confirmButtonLoading = true;
          }
          handleConfirm(done, instance);
        }
      }).catch(() => {
      });
    },
    // 可扩展自定义弹窗内容, 给components传自定义组件即可
    $messageBox(
      {
        component = null,
        componentName = "",
        confirmData = {},
        confirmValidate = () => {
        },
        ...rest
      }
    ) {
      const h = this.$createElement;
      return new Promise((resolve, reject) => {
        this.$msgbox({
          message: h(component, {
            props: { confirmData }
          }),
          beforeClose: (action, instance, done) => {
            const cptInstance = instance.$children.find(child => {
              return child.$options.name === componentName;
            });
            confirmValidate(action, cptInstance, done, instance);
          },
          ...rest
        })
          .then(resolve)
          .catch(reject);
      });
    },
    // 修改通知的默认时间
    $toast(type, msg, duration, callback) {
      this.$message({ type: type, message: msg, duration: duration || 1500, onClose: callback });
    },
    getParams(type = "params", key) {
      const params = this.$route[type];
      if (Object.keys(params).length) {
        if (key) {
          return params[key];
        } else {
          return params;
        }
      } else {
        return null;
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    goto(name, params = {}, isReplace) {
      params = params || {};
      return new Promise((resolve) => {
        if (name) {
          if (name.indexOf("/") >= 0) {
            if (isReplace) {
              this.$router.replace({
                path: name, params
              }, () => {
                resolve && resolve();
              });
            } else {
              this.$router.push({
                path: name, params
              }, () => {
                resolve && resolve();
              });
            }
          } else {
            if (isReplace) {
              this.$router.replace({
                name, params
              }, () => {
                resolve && resolve();
              });
            } else {
              this.$router.push({
                name, params
              }, () => {
                resolve && resolve();
              });
            }
          }
        }
      });
    }
  }
};
```

#### plugins

此文件夹统一收揽了所有framework管理下的"插件"，那些我们封装好了的工具集我们称为framework的插件集。

文件夹项目结构如下：

```
|-- plugins
    |-- axios.js // 封装后的axios插件
    |-- config.js // 配置文件插件
    |-- const.js // 常量定义插件
    |-- request.js // axios的上层请求封装插件
    |-- service.js // 接口请求，数据处理层插件
    |-- storage.js // localStorage插件
    |-- utils.js // 自定义封装工具集插件
```

axios.js

```javascript
// 根据自己实际业务需求配置，此配置文件仅供参考

import axios from 'axios'
import Cookies from 'js-cookie'
import {
  Message,
  MessageBox
} from 'element-ui'

const service = axios.create({
  timeout: 6000,
  headers: {
    'X-User-Agent': 'boss',
    'X-Ent': '0'
  }
})

service.interceptors.request.use(config => {
  if (!config.url.includes('hzzk-portal/sys/login') && Cookies.get('pro__Access-Token')) {
    config.headers['X-Access-Token'] = Cookies.get('pro__Access-Token');
  }
  return config;
}, err => {
  return Promise.reject(err);
})

// http response 拦截器
service.interceptors.response.use(
  response => {
    const { data } = response;
    if (data.code === 200) {
      return Promise.resolve(data);
    } else if (/500/.test(data.code)) {
      if (data.code === 50002) {
        Cookies.remove('pro__Access-Token');
        Message({
          message: data.message,
          type: 'error',
          duration: 2 * 1000,
          onClose: () => {
            location.replace('/');
          }
        })
      } else {
        Message({
          message: data.message,
          type: 'error',
          duration: 2 * 1000
        })
        return Promise.reject(data)
      }
    } else if (/400/.test(data.code)) {
      if (data.code === 40009) {
        // 权限不足
        Message({
          message: data.message,
          type: 'error',
          duration: 2 * 1000
        })
      } else {
        Message({
          message: data.message,
          type: 'error',
          duration: 2 * 1000
        })
        return Promise.reject(data)
      }
    } else if (/300/.test(data.code)) {
      Message({
        message: data.message,
        type: 'info',
        duration: 2 * 1000
      })
      return Promise.reject(data)
    } else {
      return Promise.reject(new Error(data.message || 'Error'))
    }
  },
  error => {
    // 判断请求异常信息中是否含有超时timeout字符串
    if (error.message.includes('timeout')) {
      Message({
        message: '请求超时',
        type: 'error'
      })
    }
    // token失效重定向至登陆页
    if (error.response.data.status === 500 && error.response.data.message === 'Token失效，请重新登录') {
      if (error.response.data.message === "Token失效，请重新登录") {
        MessageBox.alert('Token失效，请重新登录', '提示', {
          confirmButtonText: '重新登录',
          callback: () => {
            Cookies.remove('pro__Access-Token');
            location.replace('/')
          }
        });
      }
    } else if (error.response.status === 500) {
      // 直接捕获http请求的错误码， 而不是后端的返回体里的错误码
      Message({
        message: '服务器异常',
        type: 'error',
        duration: 2 * 1000
      })
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 2 * 1000
      })
    }
    return Promise.reject(error)
  },
)

export default service

```

config.js

```javascript
import config from '../config'

let constant = {};
for (let i in config.config) {
  let file = config.config[i];
  constant[i] = require('../../config/' + file).default; // 具体路径根据你实际项目中config所在路径配置，这里配置适用于我当前项目所配置的文件夹路径
}
export default constant;
```

const.js

```javascript
import config from '../config'

const consts = {};

for (const i in config.const) {
  const fileName = config.const[i];
  consts[i] = require('../../const/' + fileName).default; // 具体路径根据你实际项目中const所在路径配置
}
export default consts;
```

context.js

```javascript
import storage from './storage'

export default {
  // 获取用户
  user() {
    return storage.getItem('userInfo') || {}
  },
  // 设置用户
  setUser(user) {
    storage.setItem('userInfo', user)
  },
  curEnterpriseId() {
    return this.user().curEnterpriseId;
  }
}
```

request.js

```javascript
// url配置根据自己实际项目进行配置

import config from './config';
import axios from './axios';
const URI = config.uri;
export default {
  // 纯净的的get
  getRequest(url, params = {}, base = 'BASE_URL') {
    return new Promise((resolve, reject) => {
      axios.get(URI[base] + url, {
        params: params
      }).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err)
      })
    })
  },
  postRequest(url, params = {}, base = 'BASE_URL') {
    return new Promise((resolve, reject) => {
      axios.post(URI[base] + url, params)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err)
        })
    });
  },
  arcApi(url, params = {}, method = 'get', base = 'HZZK_ARC_API') {
    if (method === 'post') {
      return this.postRequest(url, params, base);
    } else {
      return this.getRequest(url, params, base);
    }
  },
  bossApi(url, params = {}, method = 'get', base = 'BASE_URL') {
    if (method === 'post') {
      return this.postRequest('/boss' + url, params, base);
    } else {
      return this.getRequest('/boss' + url, params, base);
    }
  },
  sysApi(url, params = {}, method = 'get', base = 'BASE_URL') {
    if (method === 'post') {
      return this.postRequest('/sys' + url, params, base);
    } else {
      return this.getRequest('/sys' + url, params, base);
    }
  }
}
```

services.js

```javascript
import config from '../config'

const service = {};

for (const i in config.service) {
  const fileName = config.service[i];
  Object.defineProperty(service, i, {
    get() {
      return Reflect.construct(require('../../services/' + fileName).default, []); // 实例化类
    }
  });
}
export default service;
```

storage.js

```javascript
export default {
  getItem(k) {
    const jsonStr = window.localStorage.getItem(k.toString());
    return jsonStr ? JSON.parse(jsonStr) : null;
  },
  setItem(k, value) {
    value = JSON.stringify(value);
    try {
      window.localStorage.setItem(k, value);
    } catch (e) {
      this.removeItem(k);
    }
  },
  removeItem(k) {
    window.localStorage.removeItem(k);
  },
  clear() {
    window.localStorage.clear();
  },
  key(index) {
    return window.localStorage.key(index);
  },
  getItemByIndex(index) {
    const item = {
      keyName: '',
      keyValue: ''
    };
    item.keyName = this.key(index);
    item.keyValue = this.getItem(item.keyName);
    return item;
  }
}
```

utils.js

```javascript
import config from '../config'

const utils = {};

for (const i in config.utils) {
  const fileName = config.utils[i];
  utils[i] = require('../utils/' + fileName).default; // 具体路径根据你实际项目中const所在路径配置
}
export default utils;
```

#### utils

封装的公共工具集

文件夹项目结构如下：

```
|-- utils
    |-- array.js
    |-- index.js
    |-- //更多自定义封装的工具...
```

array.js

```
export default {
  /**
   * 根据数组中对象的某个属性值进行去重
   * @param arr: 需要去重的数组
   * @param key: 根据对象中的哪个属性进行去重
   * @returns {*}
   */
  unique(arr, key) {
    const res = new Map();
    return arr.filter((a) => !res.has(a[key]) && res.set(a[key], 1))
  }
  // ===== 更多工具函数 =====
}
```

index.js

```javascript
import array from './array'

export {
  array,
  // more util func
}
```

#### ui

全局公用ui组件

文件夹项目结构如下：

```
|-- ui
    |-- components // 放置组件文件夹
        |-- scroll-view // 组件名称
            |-- index.vue // 当前组件入口文件
        |-- index.js // 统一组件出口
```

scroll-view/index.vue

```javascript
<!-- 滚动加载组件 -->
<template>
  <div id="scroll-view">
    <slot></slot>
    <p v-if="loading">加载中...</p>
    <p v-if="noMore">没有更多了</p>
  </div>
</template>
<script>
export default {
  props: {
    // 列表的总页数
    pages: {
      type: [String, Number],
      default: 0
    }
  },
  data() {
    return {
      page: 1,
      currLength: 0, // 当前列表长度
      loading: false
    }
  },
  computed: {
    noMore () {
      return this.currLength >= this.total;
    }
  },
  mounted() {
    const ScrollView = document.querySelector('#scroll-view');
    ScrollView.addEventListener("scroll", (event) => {
      const scrollDistance =
        event.target.scrollHeight -
        event.target.offsetHeight -
        event.target.scrollTop;
      if (this.loading) return;
      if (this.page < this.pages && scrollDistance <= 0) {
        this.loading = true;
        this.$emit('load', ++this.page, () => {
          this.loading = false;
        })
      }
    });
  },
  methods: {
    refresh() {
      this.page = 1;
      this.$emit('load', this.page, () => {
        this.loading = false;
      });
    }
  }
}
</script>

<style scoped lang="scss">
 #scroll-view {
   width: 100%;
   height: 100%;
   overflow: auto;
   p {
     line-height: 1.5em;
     font-size: 14px;
     color: #5e6d82;
     text-align: center;
     padding: 16px 0;
   }
   &::-webkit-scrollbar {
     display:none
   }
 }
</style>
```

components/index.js

```javascript
import ZkScrollView from './zk-scroll-view'
export {
  ZkScrollView,
  // more components
}
```

#### config.js

所有framework下的插件文件名的映射配置文件，这里配置的映射名可以使用`this`访问，告别繁琐的`import`

```javascript
export default {
  const: {
    account: 'AccountConstants', // 通过this.const.account访问到AccountConstants.js文件
    // more constants file map
  },
  service: {
    user: 'UserService', // 通过this.service.user访问到UserService.js文件
    enterprise: 'EnterpriseService', // 通过this.service.enterprise访问到EnterpriseService.js文件
    // more service file map
  },
  utils: {
    array: 'array', // 通过this.service.user访问到UserService.js文件
    // more utils file map
  },
  config: {
    uri: 'uri'，// 通过this.config.uri访问到config/uri.js文件
    // more config file map
  }
};

```



#### index.js

封装framework的install方法，以供vue在main.js中安装它，并且挂载文件到`Vue.prototype`，以便全局通过`this`访问到framework下的公有插件。

```javascript
import storage from './plugins/storage.js';
import Const from './plugins/const';
import service from './plugins/service';
import config from './plugins/config';
import mixin from './mixin';
import utils from './plugins/utils';
import context from './plugins/context';
import { ZkScrollView } from './zk-ui/components';
import Directives from './directives'

export default {
  install(Vue, option) {
    Vue.prototype.storage = storage;
    Vue.prototype.config = config;
    Vue.prototype.context = context;
    Vue.prototype.const = Const;
    Vue.prototype.$const = Const; // 标签中不能使用const关键字,而js中访问的是this作用域下的const字段
    Vue.prototype.service = service;
    Vue.prototype.utils = utils;
    Vue.mixin(mixin);
    Vue.use(Directives);
    Vue.component('zk-scroll-view', ZkScrollView);
  }
}
```



### services

把`services`、`const`、`config`单独提到`src`下也根据实际情况而定,考虑到这三个文件夹跟实际业务息息相关，所以单独提出来，只要在framework下配置好实际路径关联起来就ok。

前端人一定要摒弃的陋习，`vue`文件中大量操作`model`,甚至在`template`中写大量的数据处理逻辑来渲染相关数据，这会让你的项目变得越来越复杂且不可维护，并且会生成更多的冗余代码。

> vue项目四点忠告：
>
> 1. template中尽量不要写表达式，巧用computed
> 2. view与model分离，vue文件尽量写ui相关代码，数据处理（后端无法处理的数据需要前端处理的）在service中处理
> 3. 常量日常化，尽量不要出现魔法变量，这会让项目变得越来越不可维护
> 4. 文件夹层级分明

文件夹项目结构如下：

```
|-- services
    |-- abstract
        |-- BaseService.js // service文件中不能通过this获取framework下的插件，这里统一在基类里面引用，使其在service文件中也能通过this获取插件。
    |-- UserService.js
    |-- EnterpriseService.js
    |-- // 更多业务Service
```

BaseService.js

```javascript
import request from "../../framework/plugins/request";
import storage from "../../framework/plugins/storage";
import service from "../../framework/plugins/service";
import utils from "../../framework/plugins/utils";
import config from "../../framework/plugins/config";
import Const from "../../framework/plugins/const";
import context from "../../framework/plugins/context";
import dayjs from "dayjs";

export default class BaseService {
  constructor() {
    this.request = request;
    this.storage = storage;
    this.service = service;
    this.utils = utils;
    this.$dayjs = dayjs;
    this.const = Const;
    this.config = config;
    this.context = context;
  }

  /**
   * 刷选出接口返回的有用数据(data),异常捕获处理
   * @param promise
   * @param isTotal, 是否返回全部的json数据
   * @returns {Promise<T>}
   */
  output(promise, isTotal = false) {
    return new Promise((resolve, reject) => {
      promise.then((resp) => {
        if (!resp) {
          reject();
        } else {
          if (resp.success) {
            if (resp.code === 200) {
              resp = resp.result;
              if (isTotal) {
                resolve(resp);
              } else {
                resolve((resp && resp.list) || (resp && resp.data) || resp);
              }
            } else {
              reject(resp);
            }
          } else {
            reject(resp);
          }
        }
      }, (resp) => {
        reject(resp);
      });
    });
  }
```

举个例子，编写业务service

UserService.js

```javascript
import BaseService from "./abstract/BaseService";

/**
 * 用户管理
 */
export default class UserService extends BaseService {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super()
  }

  /**
   * 登录
   * @returns {Promise<T>}
   */
  login(username, password) {
    const params = {
      username,
      password
    };
    return super.output(this.request.postRequest('/sys/login', params), true);
  }

  /**
   * 通用短信验证码
   * @returns {Promise<T>}
   */
  getSmsCode(params) {
    return super.output(this.request.postRequest('/sys/sms', params), true);
  }
  /**
   * 重置密码
   * @returns {Promise<T>}
   */
  resetPassword(params) {
    return super.output(this.request.postRequest('/sys/user/findBackPassword', params), true);
  }
}
```

EnterpriseService.js

```javascript
import BaseService from "./abstract/BaseService";

/**
 * 组织架构管理
 */
export default class EnterpriseService extends BaseService {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super()
  }

  /**
   * 获取企业成员
   * @param enterpriseId
   * @param page
   * @param pageSize
   * @param option
   * @param realName: 成员名字,搜索用
   * @returns {Promise<T>}
   */
  async getEnterpriseUserList(enterpriseId, realName, page = 1, pageSize = 50) {
    let params = {
      enterpriseId,
      option: 0,
      realName,
      page,
      pageSize
    };
    params = this.utils.obj.deleteEmptyProperty(params);
    const result = await super.output(this.request.getRequest('/structure/queryUser', params), true);
    // 数据逻辑处理在service中处理后返回给View页面使用
    if (result && result.list && result.list.user) {
      result.list.user.forEach(item => {
        if (item.createTime) {
          item.createTime = this.$dayjs(item.createTime).format(
            "YYYY-MM-DD HH:mm:ss"
          )
        }
        item.statusText = this.const.account.UserStatus.getCnameByValue(item.status);
      })
    }
    return result;
  }
}
```

### const

常量定义文件所在目录

文件夹项目结构如下：

```
|-- const
    |-- abstract
        |-- BaseConstant.js	// 封装常量类工具
    |-- TemplateConstants.js
    |-- // more constants files
```

BaseConstant.js

```javascript
/**
 * 枚举常量基础类
 * @Author 王聪
 * @cdate 2018-01-20 14:35
 */
export default class BaseConstant {
  constructor(name, value, cname, desc) {
    this._name = name;
    this._value = value;
    this._cname = cname;
    this._desc = desc;
  }

  name() {
    return this._name;
  }

  cname() {
    return this._cname;
  }

  value() {
    return this._value;
  }

  numberValue() {
    return parseInt(this.value())
  }

  desc() {
    return this._desc;
  }

  /**
   * 获得所有常量的map
   * @returns {{}}
   */
  static getEnumMap() {
    const prototypeMap = Object.getOwnPropertyDescriptors(this);
    const enumMap = {};
    for (const prototypeName in prototypeMap) {
      const val = prototypeMap[prototypeName].value;
      if ((val instanceof BaseConstant) && val._name) {
        enumMap[val._name] = val;
      }
    }
    return enumMap;
  }

  /**
   * 获得所有常量的数组
   * @returns {Array}
   */
  static getEnumList() {
    const prototypeMap = Object.getOwnPropertyDescriptors(this);
    const enumList = [];
    for (const prototypeName in prototypeMap) {
      const val = prototypeMap[prototypeName].value;
      if ((val instanceof BaseConstant) && val._name) {
        enumList.push(val);
      }
    }
    return enumList;
  }

  static getValueByName(name) {
    const enumMap = this.getEnumMap();
    const _enum = enumMap[name];
    return _enum ? _enum.value() : null;
  }

  static getNameByValue(value) {
    const enumList = this.getEnumList();
    let name = null;
    enumList.find((_enum) => {
      if (_enum.value() == value) {
        name = _enum.name();
        return true;
      }
    });
    return name;
  }

  static getCnameByName(name) {
    const enumMap = this.getEnumMap();
    const _enum = enumMap[name];
    return _enum ? _enum.cname() : null;
  }

  static getCnameByValue(value) {
    const enumList = this.getEnumList();
    let cname = null;
    enumList.find((_enum) => {
      if (_enum.value() === value) {
        cname = _enum.cname();
        return true;
      }
    });
    return cname;
  }

  static getCnameByBitValue(value) {
    const enumList = this.getEnumList();
    const cnameArr = [];
    enumList.forEach((_enum) => {
      if ((value & _enum.value()) !== 0) {
        cnameArr.push(_enum.cname());
      }
    });
    return cnameArr.join(',');
  }

  /**
   * 给饿了么的select组件用
   * name为组件的value
   * cname为组件的label
   * @returns {*}
   */
  static getSelectOptionsByCnameAndName() {
    const enumList = this.getEnumList();
    const options = [];
    enumList.forEach((_enum) => {
      options.push({
        value: _enum.name(),
        label: _enum.cname()
      });
    });
    return options;
  }

  static getSelectOptionsByCnameAndNameWithAll(option = { label: '全部', value: '' }) {
    const options = this.getSelectOptionsByCnameAndName()
    option = !option ? { label: '全部', value: '' } : option
    options.unshift(option)
    return options;
  }

  /**
   * 给饿了么的select组件用
   * value为组件的value
   * cname为组件的label
   * @returns {*}
   */
  static getSelectOptionsByCnameAndValue() {
    const enumList = this.getEnumList();
    const options = [];
    enumList.forEach((_enum) => {
      options.push({
        value: _enum.value(),
        label: _enum.cname()
      });
    });
    return options;
  }

  static getSelectOptionsByCnameAndValueWithAll(option = { label: '全部', value: '' }) {
    const options = this.getSelectOptionsByCnameAndValue()
    option = !option ? { label: '全部', value: '' } : option
    options.unshift(option)
    return options;
  }

  /**
   * 查询按位与的位数的值是否在值内
   * @param value
   * @return boolean
   */
  isAttrIn(value) {
    if (value == null) {
      return false;
    }
    value = parseInt(value)
    return (value & this.numberValue()) == this.numberValue();
  }

  /**
   * 原属性中添加属性
   * @param attr
   * @return
   */
  addAttr(attr) {
    return this.numberValue() | (!attr ? 0 : attr);
  }

  /**
   * 原属性中去掉属性
   * @param attr
   * @return
   */
  removeAttr(attr) {
    if (!attr || attr <= 0) {
      //logger.debug("原属性值 attribute="+attr+",不需要remove");
      return 0;
    }
    return ~this.numberValue() & attr;
  }

  /**
   * 获取属性位置，相当于log2 + 1
   * @return
   */
  getAttrPos() {
    return Math.log(this.numberValue()) / Math.log(2) + 1;
  }
}
```

举例常量类的编写: TemplateConstants.js

```javascript
import BaseConstant from './abstract/BaseConstant'
export default class TemplateConstants {
  /**
   * 模板类型
   */
  static TemplateType = class TemplateType extends BaseConstant {
    static SYS_ENG_PROJECT = new BaseConstant("工程项目", '4', '系统工程模板');
  }

  /**
   * 模板角色权限
   * @type {TemplateConstants.Role}
   */
  static PerRole = class PerRole extends BaseConstant {
    static MANAGER = new BaseConstant("MANAGER", '1', '职责管理员');
    static NORMAL = new BaseConstant("NORMAL", '2', '职责普通人员');
    static ADMIN = new BaseConstant("ADMIN", '0', '所有');
  }

  /**
   * 文件夹权限
   * @type {TemplateConstants.Role}
   */
  static PerFolder = class PerFolder extends BaseConstant {
    static READ = new BaseConstant("READ", '0', '只读');
    static DOWNLOAD = new BaseConstant("DOWNLOAD", '2', '下载');
    static WRITE = new BaseConstant("WRITE", '3', '编辑');
    static HEAD = new BaseConstant("HEAD", '4', '负责人');
  }
}

```

### config

项目配置文件目录

文件夹项目结构如下：

```
|-- config
    |-- uri.js
```

uri.js

```javascript
let BASE_URL = ''
let HZZK_FT_API = ''
let HZZK_ARC_API = ''
let HZZK_OCR_API = ''
let PERMISSION_API = ''

switch (process.env.NODE_ENV) {
  case 'development':
    PERMISSION_API = 'https://test.xxx.com'
    BASE_URL = 'https://test.xxx.com/hzzk-portal'
    HZZK_FT_API = 'https://test.xxx.com/hzzk-ft'
    HZZK_ARC_API = 'https://test.xxx.com/hzzk-arc'
    HZZK_OCR_API = 'https://test.xxx.com/hzzk-ocr'
    break
  case 'test':
    PERMISSION_API = 'https://test.xxx.com'
    BASE_URL = 'https://test.xxx.com/hzzk-portal'
    HZZK_FT_API = 'https://test.xxx.com/hzzk-ft'
    HZZK_ARC_API = 'https://test.xxx.com/hzzk-arc'
    HZZK_OCR_API = 'https://test.xxx.com/hzzk-ocr'
    break
  case 'production':
    PERMISSION_API = 'https://hzzk.xxx.com'
    BASE_URL = 'https://hzzk.xxx.com/hzzk-portal'
    HZZK_FT_API = 'https://hzzk.xxx.com/hzzk-ft'
    HZZK_ARC_API = 'https://hzzk.xxx.com/hzzk-arc'
    HZZK_OCR_API = 'https://hzzk.xxx.com/hzzk-ocr'
    break
  case 'local':
    PERMISSION_API = 'http://192.168.0.108:20001'
    BASE_URL = 'http://192.168.0.108:20001/hzzk-portal'
    HZZK_FT_API = 'http://192.168.0.108:20001/hzzk-ft'
    HZZK_ARC_API = 'http://192.168.0.108:20001/hzzk-arc'
    HZZK_OCR_API = 'http://192.168.0.108:20001/hzzk-ocr'
    break
}

export default { BASE_URL, HZZK_FT_API, HZZK_ARC_API, HZZK_OCR_API, PERMISSION_API }
```

### 安装

打开`vue`入口文件，例如`main.js`:

```javascript
import GhFramework from './framework';

Vue.use(Framework);
```

这样，就能完全应用以上配置所有插件。

### 应用

举例说完了framework的一个整体框架和各个插件的独立配置外，以下用代码片段展示在项目中如何应用这些插件。

- 自定义指令(directives)

```javascript
<el-button type="primary" v-copy="content">点击复制</el-button>
```



- 全局混入中部分方法的应用

```javascript
// 跳转首页
this.goto('/');
// 返回上一页
this.goBack();
// showToast
this.$toast("success", "调用成功!");
// $confirmBox
this.$confirmBox("取消下载", `确定要取消该下载任务吗?`, (done, instance) => {
  setTimeout(() => {
    done();
    instance.confirmButtonLoading = false;
  }, 1500);
});
```

- 使用全局公共工具集

```javascript
uniqueArr() {
  const arr = [{ name: "王", age: 2 }, { name: "叶", age: 4 }, { name: "张", age: 2 }];
  console.log(this.utils.array.unique(arr, "age")) // [{ name: "王", age: 2 }, { name: "叶", age: 4 }]
},
deleteEmptyProperty() {
  const params = {
    name: '小聪忙',
    age: 24,
    address: '',
    job: undefined,
    phone: null
  };
  console.log(this.utils.obj.deleteEmptyProperty(params))  //{name: '小聪忙',age: 24}
}
```



- 使用全局ui组件

```vue
<template>
  <scroll-view style="height: 300px; background-color: #d0e5f2" :pages="pages"@load="load">
    <div v-for="(num, index) in list" :key="index">
      {{ num }}
        </div>
  </scroll-view>
</template>
export default {
  data() {
    return {
      pages: 3, // 总页数
      list: []
    };
  },
  methods: {
    load(page = 1, next) {
      setTimeout(() => {
        if (page === 1) {
          this.list = Array.from({ length: 100 }, (v, k) => k);
        } else {
          this.list.push(...Array.from({ length: 100 }, (v, k) => k));
        }
        next && next();
      }, 1000);
    }
  }
}
```



- 使用全局配置文件

```javascript
// 获取uri配置文件中的BASE_URL
const baseUrl = this.config.uri.BASE_URL;
```



- 使用全局常量

```javascript
// 获取普通人员角色
this.const.template.PerRole.NORMAL.value() // "2"
this.const.template.PerRole.NORMAL.name() // "NORMAL"
// 获取文件夹权限集合，适用于element-ui的el-select组件
const perOptions = this.const.template.PerRole.getSelectOptionsByCnameAndValue(); // [{label: "只读", value: ""0},{...}]
// 根据value获取对应的值的描述信息(例子: 下载权限对应的value是'2')
this.const.template.PerFolder.getCnameByValue("2") // "下载"
```



- 使用services进行后台数据请求

```javascript
this.service.enterprise.getEnterpriseUserList(
  'xxxxx',
  this.keywords,
  this.page,
  this.pageSize
).then(res => {
  console.log(res)
  // TODO: 处理返回数据
}).catch(e =>  {
  console.log(e)
  // TODO: 处理错误返回数据
})
```

- 使用本地缓存

```javascript
// 缓存用户信息
// 这里的key在实际项目中也要配置化,统一管理
const user = { name: "小聪忙", wechat: "YXC19970131" };
this.storage.setItem("USER_INFO", user);
this.$toast("success", "保存成功");

// 获取用户名
const user = this.storage.getItem("USER_INFO");
if (user && user.name) {
  this.$toast("success", user.name);
} else {
  this.$toast("error", "暂无用户缓存信息,请先缓存");
}
```





### 总结

`gh-framework`就是以封装、快速移植为目的而诞生的一种工程化思维，可以达到帮助开发者和小型团队快速搭建项目，复制项目，移植项目核心代码的目的。其与webpack、gitLab等工具结合，可以实现一个编码、打包、部署结合一体的完整前端工程。

