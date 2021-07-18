import config from "../config";

let constant = {};
for (let i in config.config) {
  let file = config.config[i];
  constant[i] = require("../../config/" + file).default;
}
export default constant;
