import BaseConstant from "./abstract/BaseConstant";
export default class ArchiveConstants {
  static Level = class Level extends BaseConstant {
    /*
     * 秘密等级
     */
    static SECRET = new BaseConstant("mm", 1, "秘密级文件");
    static CONFIDENTIAL = new BaseConstant("jm", 2, "机密级文件");
    static TOP_SECRET = new BaseConstant("um", 3, "绝密级文件");
    static DESTROY = new BaseConstant("ad", 4, "档案销毁");
  };

  /*
  流程执行类型
   */
  static PerformType = class PerformType extends BaseConstant {
    static NEED_ALL = new BaseConstant("NEED_ALL", 1, "需要所有人通过");
    static NOT_NEED_ALL = new BaseConstant(
      "NOT_NEED_ALL",
      0,
      "不需要所有人通过"
    );
  };

  /*
  文档类型
   */
  static ArcType = class ArcType extends BaseConstant {
    static CAD = new BaseConstant("CAD", "FMT08", "CAD文件");
    static DOC = new BaseConstant("DOC", "FMT01", "文档");
    static PICTURE = new BaseConstant("PICTURE", "FMT02", "图片");
    static AUDIO = new BaseConstant("AUDIO", "FMT03", "音频");
    static VIDEO = new BaseConstant("VIDEO", "FMT04", "视频");
    static RAR = new BaseConstant("RAR", "FMT07", "压缩包");
    static OTHER = new BaseConstant("OTHER", "FMT06", "其它");
  };
}
