<template lang="html">
  <div class="header pt18 r8">
    <div class="plr20 r8 content" flex="main:justify cross:center">
      <div class="fac">
        <i
          v-if="$route.meta.showBack"
          class="iconfont icon-fanhui2 mr16 fz20 pointer"
          @click="$router.go(-1)"
        ></i>
        <i class="iconfont icon-shuaxin2 fz20 pointer"></i>
      </div>
      <div class="right fac">
        <i class="iconfont icon-search fz20 pointer"></i>
        <i class="iconfont icon-quanping_o fz20 ml30 pointer"></i>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link ml30 mr10 pointer">
            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus" command="userInfo"
              >个人资料</el-dropdown-item
            >
            <el-dropdown-item icon="el-icon-plus" command="update"
              >修改资料</el-dropdown-item
            >
            <el-dropdown-item icon="el-icon-plus" divided command="logout"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { logOut } from "api/user";

export default {
  name: "HeaderCom",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async handleCommand(val) {
      switch (val) {
        case "userInfo":
          break;
        case "update":
          break;
        case "logout":
          await logOut();
          this.$router.replace({ name: "login" });
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: $bg-2;
  .content {
    background-color: $bg-1;
    height: 60px;
  }
  i {
    color: #c2c6dc;
  }
}
.iconfont {
  &:hover {
    color: #fff;
  }
}
</style>
