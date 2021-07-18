import BaseConstant from "./abstract/BaseConstant";
export default class TemplateConstants {
  /**
   * 模板类型
   */
  static TemplateType = class TemplateType extends BaseConstant {
    static SYS_ENG_PROJECT = new BaseConstant("工程项目", "4", "系统工程模板");
  };

  /**
   * 模板角色权限
   * @type {TemplateConstants.Role}
   */
  static PerRole = class PerRole extends BaseConstant {
    static MANAGER = new BaseConstant("MANAGER", "1", "职责管理员");
    static NORMAL = new BaseConstant("NORMAL", "2", "职责普通人员");
    static ADMIN = new BaseConstant("ADMIN", "0", "所有");
  };

  /**
   * 文件夹权限
   * @type {TemplateConstants.Role}
   */
  static PerFolder = class PerFolder extends BaseConstant {
    static READ = new BaseConstant("READ", "0", "只读");
    static DOWNLOAD = new BaseConstant("DOWNLOAD", "2", "下载");
    static WRITE = new BaseConstant("WRITE", "3", "编辑");
    static HEAD = new BaseConstant("HEAD", "4", "负责人");
  };
}
