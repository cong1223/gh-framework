<template>
  <el-aside width="260px" class="aside">
    <el-menu :default-active="$route.name" router>
      <el-menu-item
        v-for="(item, index) in menus"
        :key="index"
        :index="item.name"
        :route="{ path: item.path }"
      >
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
import { routes } from "@/router";

export default {
  name: "Menu",
  components: {},
  data() {
    return {
      menus: []
    };
  },
  created() {
    this.menus = routes.filter(r => r.meta.isMenuItem)[0].children;
  }
};
</script>

<style lang="scss" scoped>
.aside {
  height: 100vh;
}
</style>
