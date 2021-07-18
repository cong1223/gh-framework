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
      keyName: "",
      keyValue: "",
    };
    item.keyName = this.key(index);
    item.keyValue = this.getItem(item.keyName);
    return item;
  },
};
