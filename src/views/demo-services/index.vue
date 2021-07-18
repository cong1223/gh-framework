<template>
  <div class="content">
    <span class="label">获取企业成员(测试接口)</span>
    <el-button type="primary" @click="getEntUserList">点击获取</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "我是要复制的内容哦",
      page: 1,
      pageSize: 100,
      keywords: ''
    };
  },
  methods: {
    getEntUserList() {
      this.$toast('success', '仅提供代码案例,请修改url, 测试自己的接口~');
      // this.service.enterprise.getEnterpriseUserList(
      //   '333629005125795881',
      //   this.keywords,
      //   this.page,
      //   this.pageSize
      // ).then(res => {
      //   console.log(res)
      //   // TODO: 处理返回数据
      // }).catch(e =>  {
      //   console.log(e)
      //   // TODO: 处理错误返回数据
      // })
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  padding: 50px;
}
</style>
