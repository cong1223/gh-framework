import BaseConstant from "./abstract/BaseConstant";
export default class AccountConstants {
  /*
   * 企业账号状态
   * 0--正常;1--冻结;2--待审核;4--审核已拒绝
   */
  static EntStatus = class EntStatus extends BaseConstant {
    static NORMAL = new BaseConstant("NORMAL", "0", "正常");
    static FREEZE = new BaseConstant("FREEZE", "1", "冻结");
    static AUDITED = new BaseConstant("AUDITED", "2", "待审核");
    static REFUSED = new BaseConstant("REFUSED", "4", "审核已拒绝");
  };

  /*
   * 个人用户账号状态
   * 1-正常,2--已冻结,3--待注册激活,4--注销
   */
  static UserStatus = class UserStatus extends BaseConstant {
    static NORMAL = new BaseConstant("NORMAL", "1", "正常");
    static FREEZE = new BaseConstant("FREEZE", "2", "已冻结");
    static PENDINGREG = new BaseConstant("AUDITED", "3", "待注册激活");
    static LOGOUT = new BaseConstant("REFUSED", "4", "注销");
  };

  /*
   * 企业账号类型
   * 企业账号1；待审核企业2
   */
  static EntAccountType = class EntAccountType extends BaseConstant {
    static ENTERPRISE = new BaseConstant("ENTERPRISE", "1", "企业账号1");
    static AUDITEDENT = new BaseConstant("AUDITEDENT", "2", "待审核企业");
  };

  /**
   * 账号套餐类型
   */
  static AccountPackageType = class AccountPackageType extends BaseConstant {
    static NORMAL = new BaseConstant("NORMAL", "2_1", "企业基础班");
    static FREE = new BaseConstant("FREE", "2_0", "免费版");
    static ADVANCED = new BaseConstant("ADVANCED", "2_2", "企业高级版");
  };

  /**
   * cdc类型
   */
  static CDCType = class CDCType extends BaseConstant {
    static NONE = new BaseConstant("NONE", "3_0", "无");
    static GRAPH_MODULE = new BaseConstant("GRAPH_MODULE", "3_1", "出图模块");
    static SIGNATURE_MODULE = new BaseConstant(
      "SIGNATURE_MODULE",
      "3_2",
      "签章模块"
    );
    static CHECK_MODULE = new BaseConstant("CHECK_MODULE", "3_3", "校审模块");
    static REFINED_COLL_MODULE = new BaseConstant(
      "REFINED_COLL_MODULE",
      "3_4",
      "精细化协同模块"
    );
    static ALL_EXCEPT_SIGNATURE = new BaseConstant(
      "ALL_EXCEPT_SIGNATURE",
      "3_7",
      "全模块，不含签章模块"
    );
    static ALL_MODULE = new BaseConstant("ALL_MODULE", "3_9", "全模块");
    static GRAPH_AND_SIGNATURE = new BaseConstant(
      "GRAPH_AND_SIGNATURE",
      "3_A",
      "出图模块，签章模块"
    );
    static GRAPH_AND_CHECK = new BaseConstant(
      "GRAPH_AND_CHECK",
      "3_B",
      "出图模块，校审模块"
    );
    static GRAPH_AND_REFINED_COLL = new BaseConstant(
      "GRAPH_AND_REFINED_COLL",
      "3_C",
      "出图模块，精细化协同模块"
    );
    static CHECK_AND_REFINED_COLL = new BaseConstant(
      "CHECK_AND_REFINED_COLL",
      "3_D",
      "校审模块，精细化协同模块"
    );
    static GRAPH_AND_CHECK_AND_SIGNATURE = new BaseConstant(
      "GRAPH_AND_CHECK_AND_SIGNATURE",
      "3_E",
      "出图模块，签章模块，校审模块"
    );
    static GRAPH_AND_REFINED_COLL_AND_SIGNATURE = new BaseConstant(
      "GRAPH_AND_REFINED_COLL_AND_SIGNATURE",
      "3_F",
      "出图模块，签章模块，精细化协同模块"
    );
  };
}
