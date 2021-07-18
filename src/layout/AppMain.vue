<template>
  <section class="app-main">
    <div class="app-content">
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key" />
      </transition>
    </div>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    key() {
      return this.$route.path;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-main {
  width: 100%;
  position: relative;
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;

  .app-content {
    flex: 1;
    overflow: hidden;
  }
}
</style>
