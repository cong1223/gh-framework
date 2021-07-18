<template>
  <div>
    <img alt="Vue logo" src="https://cdn.jsdelivr.net/gh/cong1223/cloudimg@master/img/20210718073751.jpeg" />
    <h1>
      <a href="#" class="title">gh-framework 轻量级的前端工程化解决方案</a>
    </h1>
    <el-button type="primary" @click="toGuide">快速开始 <i class="iconfont iconRight" /></el-button>
  </div>
</template>

<script>
export default {
  methods: {
    toGuide() {
      this.goto("/guide");
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}

.title {
  display: block;
  text-decoration: none;
  text-align: center;
  line-height: 1.5;
  margin: 20px 0;
  background-image: -webkit-linear-gradient(left, #3498db, #f47920 10%, #d71345 20%, #f7acbc 30%, #ffd400 40%, #3498db 50%, #f47920 60%, #d71345 70%, #f7acbc 80%, #ffd400 90%, #3498db);
  color: transparent;
  background-size: 200% 100%;
  animation: slide 5s infinite linear;
  font-size: 40px;
  -webkit-background-clip: text;
}

@keyframes slide {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}
</style>
