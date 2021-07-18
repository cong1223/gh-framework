<template>
  <div class="content">
    <span class="label">获取uri配置文件中的BASE_URL</span>
    <el-button type="primary" @click="getBaseUrlConfig">点击获取</el-button>
    <p>更多配置请自行扩展 (☞ﾟ∀ﾟ)☞</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  created() {
  },
  mounted() {
  },
  methods: {
    getBaseUrlConfig() {
      this.$toast('success', `BASE_URL ===> ${this.config.uri.BASE_URL}`, 3000);
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  padding: 50px;
}
</style>
