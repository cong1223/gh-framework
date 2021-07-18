import BaseService from "./abstract/BaseService";

/**
 * 组织架构管理
 */
export default class EnterpriseService extends BaseService {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  /**
   * 获取企业成员
   * @param enterpriseId
   * @param page
   * @param pageSize
   * @param option
   * @param realName: 成员名字,搜索用
   * @returns {Promise<T>}
   */
  async getEnterpriseUserList(enterpriseId, realName, page = 1, pageSize = 50) {
    let params = {
      enterpriseId,
      option: 0,
      realName,
      page,
      pageSize
    };
    params = this.utils.obj.deleteEmptyProperty(params);
    const result = await super.output(
      this.request.getRequest("/structure/queryUser", params),
      true
    );
    if (result && result.list && result.list.user) {
      result.list.user.forEach((item) => {
        if (item.createTime) {
          item.createTime = this.$dayjs(item.createTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        }
        item.statusText = this.const.account.UserStatus.getCnameByValue(
          item.status
        );
      });
    }
    return result;
  }

  /**
   * boss系统组织管理结构角色列表
   * @returns {Promise<T>}
   */
  getRoleList() {
    return super.output(this.request.bossApi("/bossRoleMenu"));
  }

  /**
   * 查询boss系统指定角色的用户列表
   * @param roleId: 角色id
   * @param page
   * @param pageSize
   * @returns {Promise<T>}
   */
  getAdminListByRole(roleId, page = 1, pageSize = 50) {
    const params = {
      page,
      pageSize,
      roleId
    };
    return super.output(this.request.bossApi("/bossAdminList", params), true);
  }

  /**
   * boss系统添加管理员
   * @param roleId
   * @param phone
   * @returns {Promise<T>}
   */
  addBossAdmin(roleId, realName, phone) {
    return super.output(
      this.request.bossApi("/addBossAdmin", { roleId, realName, phone }, "post")
    );
  }

  /**
   * boss系统删除角色人员
   * @param roleId: 角色id
   * @param ids: 用户id集合
   * @returns {Promise<T>}
   */
  removeBossAdmin(roleId, ids) {
    return super.output(
      this.request.bossApi("/deleteBossAdmin", { roleId, ids }, "post")
    );
  }

  /**
   * 创建模块控制(模块管理新增)
   * @param component: 组件ID
   * @param type: 限制用户类型（2--用户；1--企业）
   * @param id
   * @param limitType: 0--禁止；1--开放类型
   * @param deadline
   * @param description
   * @returns {Promise<_.LoDashFp.T>}
   */
  createPerLimit(component, type, id, limitType, deadline, description) {
    const idType =
      type === this.const.structure.UserType.USER.value()
        ? "userId"
        : "enterpriseId";
    let params = {
      component,
      type,
      limitType,
      deadline,
      description,
      [idType]: id
    };
    params = this.utils.obj.deleteEmptyProperty(params);
    return super.output(
      this.request.bossApi("/createPerLimit", params, "post")
    );
  }

  /**
   * 根据名称模糊查询权限列表(模块管理查模块列表)
   * @param perName: 权限名称
   * @param pageNum
   * @param pageSize
   */
  getPerList(perName = "", pageNum = 1, pageSize = 10) {
    const params = {
      perName,
      pageNum,
      pageSize
    };
    return super.output(
      this.request.sysApi("/permission/getPerList", params),
      true
    );
  }
}
