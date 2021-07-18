import axios from "axios";
import Cookies from "js-cookie";
import { Message, MessageBox } from "element-ui";

const service = axios.create({
  timeout: 6000,
  headers: {
   // 自行添加业务请求头
  },
});

// 根据实际情况自行修改,次为案例
service.interceptors.request.use(
  (config) => {
    if (
      !config.url.includes("hzzk-portal/sys/login") &&
      Cookies.get("pro__Access-Token")
    ) {
      config.headers["X-Access-Token"] = Cookies.get("pro__Access-Token");
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// http response 拦截器
service.interceptors.response.use(
  (response) => {
    const { data } = response;
    if (data.code === 200) {
      return Promise.resolve(data);
    } else if (/500/.test(data.code)) {
      if (data.code === 50002) {
        Cookies.remove("pro__Access-Token");
        Message({
          message: data.message,
          type: "error",
          duration: 2 * 1000,
          onClose: () => {
            location.replace("/");
          },
        });
      } else {
        Message({
          message: data.message,
          type: "error",
          duration: 2 * 1000,
        });
        return Promise.reject(data);
      }
    } else if (/400/.test(data.code)) {
      if (data.code === 40009) {
        // 权限不足
        Message({
          message: data.message,
          type: "error",
          duration: 2 * 1000,
        });
      } else {
        Message({
          message: data.message,
          type: "error",
          duration: 2 * 1000,
        });
        return Promise.reject(data);
      }
    } else if (/300/.test(data.code)) {
      Message({
        message: data.message,
        type: "info",
        duration: 2 * 1000,
      });
      return Promise.reject(data);
    } else {
      return Promise.reject(new Error(data.message || "Error"));
    }
  },
  (error) => {
    // 判断请求异常信息中是否含有超时timeout字符串
    if (error.message.includes("timeout")) {
      Message({
        message: "请求超时",
        type: "error",
      });
    }
    // token失效重定向至登陆页
    if (
      error.response.data.status === 500 &&
      error.response.data.message === "Token失效，请重新登录"
    ) {
      if (error.response.data.message === "Token失效，请重新登录") {
        MessageBox.alert("Token失效，请重新登录", "提示", {
          confirmButtonText: "重新登录",
          callback: () => {
            Cookies.remove("pro__Access-Token");
            location.replace("/");
          },
        });
      }
    } else if (error.response.status === 500) {
      // 直接捕获http请求的错误码， 而不是后端的返回体里的错误码
      Message({
        message: "服务器异常",
        type: "error",
        duration: 2 * 1000,
      });
    } else {
      Message({
        message: error.message,
        type: "error",
        duration: 2 * 1000,
      });
    }
    return Promise.reject(error);
  }
);

export default service;
