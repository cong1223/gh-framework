import config from "../config";

const consts = {};

for (const i in config.const) {
  const fileName = config.const[i];
  consts[i] = require("../../const/" + fileName).default;
}
export default consts;
