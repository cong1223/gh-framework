export default {
  deleteEmptyProperty(obj) {
    const object = obj;
    for (const i in object) {
      const value = object[i];
      if (typeof value === "object") {
        if (Array.isArray(value)) {
          if (value.length === 0) {
            delete object[i];
            continue;
          }
        }
        if (value === null) {
          delete object[i];
        }
        this.deleteEmptyProperty(value);
      } else {
        if (value === "" || value === null || value === undefined) {
          delete object[i];
        }
      }
    }
    return object;
  }
};
