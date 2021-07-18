import BaseConstant from "./abstract/BaseConstant";
export default class TradeConstants {
  /**
   * 支付方式
   */
  static PayWays = class PayWays extends BaseConstant {
    static ALI = new BaseConstant("ALI", "1", "支付宝支付");
    static WX = new BaseConstant("WX", "2", "微信支付");
  };

  /**
   * 支付状态
   */
  static OrderStatus = class OrderStatus extends BaseConstant {
    static SUCCESS = new BaseConstant("SUCCESS", "1", "已支付");
    static FAIL = new BaseConstant("FAIL", "0", "支付失败");
  };
}
