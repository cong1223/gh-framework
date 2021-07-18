<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.content {
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  span.label {
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #262626;
  }
  .el-button, .el-select {
    margin-bottom: 32px;
  }
  p {
    color: #8c8c8c;
    font-size: 14px;
  }
}
</style>
