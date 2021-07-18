<template>
	<div class="g-container f-flex">
		<side-bar />
		<div class="m-main">
			<AppMain/>
		</div>
	</div>
</template>

<script>
import SideBar from './SideBar'
import AppMain from './AppMain'
export default {
  name: "Layout",
  props: {
    msg: String
  },
  methods: {

  },
  components: { SideBar, AppMain }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
