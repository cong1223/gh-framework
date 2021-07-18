import BaseConstant from "./abstract/BaseConstant";
export default class HelpConstants {
  /*
   模块
   */
  static ModuleList = class ModuleList extends BaseConstant {
    static FIRST_USE = new BaseConstant("首次使用营造狮必读", "1");
    static THE_NEW_USER = new BaseConstant("新手入门", "2");
    static WEB = new BaseConstant("WEB端模块教程", "3");
    static PC = new BaseConstant("PC端模块教程", "4");
    static SYNERGY = new BaseConstant("精细化协同设计教程", "5");
  };
}
