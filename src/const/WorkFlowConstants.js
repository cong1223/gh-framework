import BaseConstant from "./abstract/BaseConstant";
export default class WorkFlowConstants {
  /*
   * 审批周期
   */
  static ValidTime = class ValidTime extends BaseConstant {
    static WEEK = new BaseConstant("WEEK", "0", "7天");
    static HALF_MONTH = new BaseConstant("HALF_MONTH", "1", "14天");
    static MONTH = new BaseConstant("MONTH", "2", "1个月");
    static QUARTER = new BaseConstant("QUARTER", "3", "3个月");
  };

  /*
   * 流程状态
   */
  static FlowStatus = class STATUS extends BaseConstant {
    static ARC_WORKFLOW_NOT_LAUNCH = new BaseConstant(
      "ARC_WORKFLOW_NOT_LAUNCH",
      "0",
      "审批流程未开始",
      "审批流程未开始"
    );
    static ARC_WORKFLOW_IN_PROGRESS = new BaseConstant(
      "ARC_WORKFLOW_IN_PROGRESS",
      "1",
      "进行中",
      "正在审批"
    );
    static ARC_WORKFLOW_RECALL = new BaseConstant(
      "ARC_WORKFLOW_RECALL",
      "2",
      "已撤回",
      "撤回"
    );
    static ARC_WORKFLOW_SHALL_NOT_PASS = new BaseConstant(
      "NOT_PASS",
      "3",
      "已拒绝"
    );
    static ARC_WORKFLOW_PASS = new BaseConstant(
      "ARC_WORKFLOW_PASS",
      "4",
      "已通过"
    );
    static ARC_FORCE_RECALL = new BaseConstant(
      "ARC_FORCE_RECALL",
      "5",
      "强制收回"
    );
    static ARC_WORKFLOW_DONE = new BaseConstant(
      "ARC_WORKFLOW_DONE",
      "9",
      "审批正常结束"
    );
  };

  /*
   * 审批类型
   */
  static ApprovalType = class ValidTime extends BaseConstant {
    static BORROW = new BaseConstant("BORROW", "0", "借阅");
    static PUBLISH = new BaseConstant("PUBLISH", "1", "出版");
    static DESTROY = new BaseConstant("DESTROY", "2", "销毁");
  };
}
