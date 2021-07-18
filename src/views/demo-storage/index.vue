<template>
  <div class="content">
    <span class="label">缓存用户信息</span>
    <el-button type="primary" @click="saveUser">点击缓存</el-button>
    <span class="label">获取用户名字</span>
    <el-button type="primary" @click="getUserName">点击获取</el-button>
    <p>更多配置请自行扩展 (☞ﾟ∀ﾟ)☞</p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
  },
  mounted() {
  },
  methods: {
    saveUser() {
      // 这里的key在实际项目中也要配置化,统一管理
      const user = { name: "小聪忙", wechat: "YXC19970131" };
      this.storage.setItem("USER_INFO", user);
      this.$toast("success", "保存成功");
    },
    getUserName() {
      const user = this.storage.getItem("USER_INFO");
      if (user && user.name) {
        this.$toast("success", user.name);
      } else {
        this.$toast("error", "暂无用户缓存信息,请先缓存");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  padding: 50px;
}
</style>
