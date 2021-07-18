<template>
  <div class="content">
    <span class="label">调用goto方法</span>
    <el-button type="primary" @click="goto('/', { data: 'some data' })">跳转至首页并携带参数</el-button>
    <span>调用goBack</span>
    <el-button type="primary" @click="goBack">返回上一页</el-button>
    <span>调用toast</span>
    <el-button type="primary" @click="showToast">show success toast</el-button>
    <span>调用二次弹窗,自定义内容</span>
    <el-button type="primary" @click="showConfirmDialog">确认删除吗?</el-button>
    <p>更多内容,请自行扩展 (☞ﾟ∀ﾟ)☞</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "我是要复制的内容哦"
    };
  },
  methods: {
    showToast() {
      this.$toast("success", "调用成功!");
    },
    showConfirmDialog() {
      this.$confirmBox("取消下载", `确定要取消该下载任务吗?`, (done, instance) => {
        setTimeout(() => {
          done();
          instance.confirmButtonLoading = false;
        }, 1500);
      });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
