import config from "../config";

const service = {};

for (const i in config.service) {
  const fileName = config.service[i];
  Object.defineProperty(service, i, {
    get() {
      return Reflect.construct(
        require("../../services/" + fileName).default,
        []
      );
    },
  });
}
export default service;
