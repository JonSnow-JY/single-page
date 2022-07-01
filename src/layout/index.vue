<template lang="html">
  <div class="layout" flex="box:first">
    <div class="menu">
      <menu-com />
    </div>
    <div class="main">
      <el-scrollbar style="height: 100%">
        <div class="plr30 pb30">
          <header-com />
          <div class="content">
            <router-view />
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import MenuCom from "./components/menu";
import HeaderCom from "./components/header";

export default {
  name: "LayOut",
  components: { MenuCom, HeaderCom },
  mixins: [],
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.layout {
  background-color: $bg-2;
  height: 100vh;
  .main {
    height: 100vh;
  }
}
</style>
