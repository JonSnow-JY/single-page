<template lang="html">
  <div class="menu-wrap">
    <el-scrollbar style="height: 100%">
      <div class="ptb25 logo-wrap">
        <img class="ml15" src="@/assets/imgs/logo.png" alt="" />
      </div>
      <el-menu
        :default-active="defaultActive"
        class="menu mlr15"
        @select="handleSelect"
      >
        <template v-for="(item, index) in menuList">
          <!-- 两级 -->
          <el-submenu v-if="item.children" :key="index" :index="item.name">
            <template slot="title">
              <i class="icon iconfont" :class="item.meta.icon"></i>
              <span slot="title" class="ml15 pt2">{{ item.meta.title }} </span>
            </template>
            <template v-for="(item1, index1) in item.children">
              <el-menu-item
                v-if="!item1.children"
                :key="`${index}-${index1}`"
                :index="item1.name"
              >
                <i class="icon iconfont icon-weixuanzhongyuanquan"></i>
                <span slot="title" class="ml15 pt2">{{
                  item1.meta.title
                }}</span>
              </el-menu-item>
              <el-submenu v-else :key="item1.name" :index="item1.name">
                <template slot="title">
                  <i class="icon iconfont" :class="item.meta.icon"></i>
                  <span slot="title">{{ item1.meta.title }} </span>
                </template>
                <el-menu-item
                  v-for="(item2, index1) in item1.children"
                  :key="`${index}-${index1}`"
                  :index="item2.name"
                >
                  <span class="empty"></span>
                  <span v-if="!item2.children" slot="title">{{
                    item2.title
                  }}</span>
                </el-menu-item>
              </el-submenu>
            </template>
          </el-submenu>
          <!-- 一级 -->
          <el-menu-item v-else :key="item.name" :index="item.name">
            <i class="icon iconfont" :class="item.meta.icon"></i>
            <span slot="title" class="title ml15 pt4">{{
              item.meta.title
            }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { menuList } from "router/modules/auth";

export default {
  name: "MenuCom",
  components: {},
  mixins: [],
  props: {},
  data() {
    return { defaultActive: this.$route.name, savedAside: [], menuList };
  },
  computed: {},
  watch: {
    $route(val) {
      this.defaultActive = val.name;
    },
  },
  created() {},
  mounted() {},
  methods: {
    /**
     * 菜单选择
     */
    handleSelect(name) {
      this.$router.push({ name });
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-wrap {
  width: 260px;
  background-color: $bg-1;
  position: relative;
  height: 100vh;
  &::v-deep .el-menu {
    border: none;
    background-color: $bg-1;
    .el-menu-item,
    .el-submenu__title {
      font-weight: bold;
      border-radius: 4px;
      height: 47px;
      line-height: 1;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      padding-left: 20px !important;
      background-color: $bg-2;
      i {
        transition: color 0.4s;
      }
      color: rgba(255, 255, 255, 0.7);
      &.is-active {
        background-color: $primary-1;
        color: #fff;
        padding-left: 30px !important;
      }
    }
    .el-menu--inline {
      .el-menu-item {
        background-color: transparent;
        &.is-active {
          background-color: $primary-1;
          color: #fff;
        }
      }
    }
    .el-submenu__icon-arrow {
      font-weight: bold;
    }
    .el-menu-item {
      transition: all 0.4s;
      &:not(.is-active):hover {
        transform: translateX(10px);
        color: #fff;
        i {
          color: #fff;
        }
      }
    }
  }
  .logo-wrap {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    background-color: $bg-1;
  }
  .menu {
    padding-top: 93px;
  }
}
</style>
