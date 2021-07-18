<template>
  <div class="content">
    <span class="label">滚动加载组件</span>
    <scroll-view style="height: 300px; background-color: #d0e5f2" :pages="pages" @load="load">
      <div v-for="(num, index) in list" :key="index">
        {{ num }}
      </div>
    </scroll-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pages: 3, // 总页数
      list: []
    };
  },
  created() {
  },
  mounted() {
    this.load();
  },
  methods: {
    load(page = 1, next) {
      setTimeout(() => {
        if (page === 1) {
          this.list = Array.from({ length: 100 }, (v, k) => k);
        } else {
          this.list.push(...Array.from({ length: 100 }, (v, k) => k));
        }
        next && next();
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  padding: 50px;
}
</style>
