<template>
  <div class="content">
    <span class="label">自定义复制指令(打开控制台查看效果)</span>
    <el-button type="primary" v-copy="content">点击复制</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "我是要复制的内容哦"
    };
  },
  created() {
  },
  mounted() {
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>
