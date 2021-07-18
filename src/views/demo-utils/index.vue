<template>
  <div class="content">
    <span class="label">根据数组中对象的某个属性值进行去重(const arr = [{name: '王', age: 2},{name: '叶', age: 4},{name: '张', age: 2}])</span>
    <el-button type="primary" @click="uniqueArr">点击处理</el-button>
    <span class="label">删除对象中为空的属性({
        name: '小聪忙',
        age: 24,
        address: '',
        job: undefined,
        phone: null
      })</span>
    <el-button type="primary" @click="deleteEmptyProperty">点击处理</el-button>
    <p>更多函数工具请自行扩展 (☞ﾟ∀ﾟ)☞</p>
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
  methods: {
    uniqueArr() {
      const arr = [{ name: "王", age: 2 }, { name: "叶", age: 4 }, { name: "张", age: 2 }];
      this.$toast('success', this.utils.array.unique(arr, "age"), 5000);
    },
    deleteEmptyProperty() {
      const params = {
        name: '小聪忙',
        age: 24,
        address: '',
        job: undefined,
        phone: null
      };
      this.$toast('success', this.utils.obj.deleteEmptyProperty(params), 5000);
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  padding: 50px;
}
</style>
