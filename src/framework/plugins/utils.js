import config from "../config";

const utils = {};

for (const i in config.utils) {
  const fileName = config.utils[i];
  utils[i] = require("../utils/" + fileName).default;
}
export default utils;
