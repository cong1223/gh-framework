<!-- 滚动加载组件 -->
<template>
  <div id="scroll-view">
    <slot />
    <p v-if="loading" class="tip">加载中...</p>
    <p v-if="!loading && noMore" class="tip">没有更多了</p>
  </div>
</template>
<script>
export default {
  props: {
    // 列表的总页数
    pages: {
      type: [String, Number],
      default: 0
    }
  },
  data() {
    return {
      page: 1,
      loading: false
    }
  },
  computed: {
    noMore () {
      return (this.page >= this.pages) && (this.pages > 1);
    }
  },
  mounted() {
    const ScrollView = document.querySelector('#scroll-view');
    ScrollView.addEventListener("scroll", (event) => {
      const scrollDistance =
        event.target.scrollHeight -
        event.target.offsetHeight -
        event.target.scrollTop;
      if (this.loading) return;
      if (this.page < this.pages && scrollDistance <= 0) {
        this.loading = true;
        this.$emit('load', ++this.page, () => {
          this.loading = false;
        })
      }
    });
  },
  methods: {
    refresh() {
      this.page = 1;
      this.$emit('load', this.page, () => {
        this.loading = false;
      });
    }
  }
}
</script>

<style lang="scss" scoped>
#scroll-view {
  width: 100%;
  height: 100%;
  overflow: auto;
  p.tip {
    line-height: 1.5em;
    font-size: 14px;
    color: #5e6d82;
    text-align: center;
    padding: 16px 0;
  }
  &::-webkit-scrollbar {
    display:none
  }
}
</style>

