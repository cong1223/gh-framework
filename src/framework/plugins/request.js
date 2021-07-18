import config from "./config";
import axios from "./axios";
const URI = config.uri;
export default {
  // 纯净的的get
  getRequest(url, params = {}, base = "BASE_URL") {
    return new Promise((resolve, reject) => {
      axios
        .get(URI[base] + url, {
          params: params,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  postRequest(url, params = {}, base = "BASE_URL") {
    return new Promise((resolve, reject) => {
      axios
        .post(URI[base] + url, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  arcApi(url, params = {}, method = "get", base = "HZZK_ARC_API") {
    if (method === "post") {
      return this.postRequest(url, params, base);
    } else {
      return this.getRequest(url, params, base);
    }
  },
  bossApi(url, params = {}, method = "get", base = "BASE_URL") {
    if (method === "post") {
      return this.postRequest("/boss" + url, params, base);
    } else {
      return this.getRequest("/boss" + url, params, base);
    }
  },
  sysApi(url, params = {}, method = "get", base = "BASE_URL") {
    if (method === "post") {
      return this.postRequest("/sys" + url, params, base);
    } else {
      return this.getRequest("/sys" + url, params, base);
    }
  },
};
