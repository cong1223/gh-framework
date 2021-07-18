export default {
  /**
   * 根据数组中对象的某个属性值进行去重
   * @param arr: 需要去重的数组
   * @param key: 根据对象中的哪个属性进行去重
   * @returns {*}
   */
  unique(arr, key) {
    const res = new Map();
    return arr.filter((a) => !res.has(a[key]) && res.set(a[key], 1));
  },
};
