<template>
  <div class="content">
    <span class="label">模板角色类型常量(应用于element-ui下拉选择组件,并设置默认值)</span>
    <el-select v-model="value" placeholder="placeholder">
      <el-option
        v-for="item in perOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <span class="label">根据后端返回的value获取对应的值的描述信息(例子: 下载权限对应的value是'2')</span>
    <el-button type="primary" @click="getPerDesc">点击获取对应的权限描述</el-button>
    <p>更多方法请查看源码, 更多配置请自行扩展 (☞ﾟ∀ﾟ)☞</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: this.const.template.PerRole.NORMAL.value(),
      perOptions: this.const.template.PerRole.getSelectOptionsByCnameAndValue()
    };
  },
  created() {
  },
  mounted() {
  },
  methods: {
    getPerDesc() {
      this.$toast('success', `值为2,对应的权限名是: ${this.const.template.PerFolder.getCnameByValue("2")}`, 3000);
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  padding: 50px;
}
</style>
