// 权限指令，对需要权限判断的 Dom 进行显示隐藏
function checkArray(key) {
  // 权限列表开始
  const arr = [];
  // 权限列表结束
  const index = arr.indexOf(key);
  if (index > -1) {
    return true; // 有权限
  } else {
    return false; // 无权限
  }
}

const permission = {
  inserted: function (el, binding) {
    const permission = binding.value; // 获取到 v-permission的值
    if (permission) {
      const hasPermission = checkArray(permission);
      if (!hasPermission) {
        // 没有权限 移除Dom元素
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  },
};

export default permission;
