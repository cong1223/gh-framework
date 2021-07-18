import BaseConstant from "./abstract/BaseConstant";
export default class StampConstants {
  /*
  章类型
   */
  static StampType = class StampType extends BaseConstant {
    static PERSONAL_SIGN = new BaseConstant("PERSONAL_SIGN", "0", "签名章");
    static PRACTICE = new BaseConstant("PRACTICE", "4", "注册章"); // 执业章
    // static PERSONAL_SQUARE = new BaseConstant("PERSONAL_SQUARE", '5', "方章");
    static CUSTOM = new BaseConstant("CUSTOM", "2", "自定义章"); // 单位公章
    static PLOT = new BaseConstant("PLOT", "1", "出图章"); // 企业章
  };

  /*
   章的归属类型
   */
  static OwnerType = class OwnerType extends BaseConstant {
    static PERSONAL = new BaseConstant("PERSONAL", "1", "个人");
    static ENTERPRISE = new BaseConstant("ENTERPRISE", "2", "企业");
  };

  /*
   章状态
   */
  static Status = class Status extends BaseConstant {
    static CA_STATUS_WAIT_APPLY = new BaseConstant(
      "CA_STATUS_WAIT_APPLY",
      "1",
      "待绑定"
    );
    static CA_STATUS_WAIT_APPROVE = new BaseConstant(
      "CA_STATUS_WAIT_APPROVE",
      "2",
      "审核中"
    );
    static CA_STATUS_USING = new BaseConstant("CA_STATUS_USING", "3", "使用中");
    static CA_STATUS_APPROVE_DENY = new BaseConstant(
      "CA_STATUS_APPROVE_DENY",
      "4",
      "审核未通过"
    );
    static CA_STATUS_OVERDUE = new BaseConstant(
      "CA_STATUS_OVERDUE",
      "5",
      "已过期"
    );
  };

  /*
   申请信息操作类型
   */
  static ApplyInfoType = class ApplyInfoType extends BaseConstant {
    static CREATE = new BaseConstant("CREATE", "1", "开户");
    static UPDATE = new BaseConstant("UPDATE", "2", "变更");
    static RENEWAL = new BaseConstant("RENEWAL", "3", "续费");
    static REVOKE = new BaseConstant("REVOKE", "4", "吊销");
  };

  /*
   激活码状态
   */
  static KeyStatus = class KeyStatus extends BaseConstant {
    static UNUSED = new BaseConstant("UNUSED", "1", "未使用");
    static USED = new BaseConstant("USED", "2", "已使用");
    static OBSOLETE = new BaseConstant("OBSOLETE", "3", "已废弃");
  };

  /*
   审批状态
   */
  static ApprovalStatus = class ApprovalStatus extends BaseConstant {
    static TODO = new BaseConstant("待审批", "1", "待审批");
    static PASS = new BaseConstant("通过", "2", "已通过");
    static REFUSE = new BaseConstant("拒绝", "3", "已拒绝");
    static UNDO = new BaseConstant("已撤回", "4", "已撤回");
  };

  /*
   审批操作
   */
  static ApprovalOperate = class ApprovalOperate extends BaseConstant {
    static PASS = new BaseConstant("通过", "1");
    static REFUSE = new BaseConstant("拒绝", "2");
  };
}
