import request from "../../framework/plugins/request";
import storage from "../../framework/plugins/storage";
import service from "../../framework/plugins/service";
import utils from "../../framework/plugins/utils";
import config from "../../framework/plugins/config";
import Const from "../../framework/plugins/const";
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
  }

  /**
   *
   * @param promise
   * @param isTotal, 是否返回全部的json数据
   * @returns {Promise<T>}
   */
  output(promise, isTotal = false) {
    return new Promise((resolve, reject) => {
      promise.then(
        (resp) => {
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
        },
        (resp) => {
          reject(resp);
        }
      );
    });
  }

  outputWithMessage(promise) {
    return new Promise((resolve, reject) => {
      promise.then(
        (resp) => {
          if (!resp) {
            reject();
          } else {
            if (resp.success) {
              if (resp.code === 200) {
                resolve(resp);
              } else {
                reject(resp);
              }
            } else {
              reject(resp);
            }
          }
        },
        (resp) => {
          reject(resp);
        }
      );
    });
  }
}
