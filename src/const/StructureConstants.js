import BaseConstant from "./abstract/BaseConstant";
export default class StructureConstants {
  /*
   * 用户类型（2--用户；1--企业）
   */
  static UserType = class UserType extends BaseConstant {
    static USER = new BaseConstant("user", "2", "user", "用户");
    static ENTERPRISE = new BaseConstant(
      "enterprise",
      "1",
      "enterprise",
      "企业"
    );
  };

  /*
   * 限制类型（0--禁止；1--开放类型）
   */
  static LimitType = class LimitType extends BaseConstant {
    static DISABLED = new BaseConstant("DISABLED", "0", "禁止");
    static ACTIVE = new BaseConstant("ACTIVE", "1", "开放");
  };

  /*
   * 模块开启状态（0-未开启；1-开启）
   */
  static SWITCH_STATUS = class LimitType extends BaseConstant {
    static DISABLED = new BaseConstant("DISABLED", "0", "未开启");
    static ACTIVE = new BaseConstant("ACTIVE", "1", "已开启");
  };
}
