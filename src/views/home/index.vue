<template lang="html">
  <div class="wrapper">
    <div class="header ptb8 pr10 bgf" flex="dir:right">
      <el-button type="primary" class="ml8" plain>调整布局</el-button>
    </div>

    <div class="content" flex>
      <div class="left flex0 p10">
        <el-row :gutter="10">
          <el-col v-for="(item, index) in tableData" :key="index" :span="12">
            <div
              class="item lh20 r4 p10 ftcc mtb5 pointer"
              draggable="true"
              unselectable="on"
              @drag="drag"
              @dragend="dragend"
            >
              {{ item.alias }}
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="right" flex-box="1">
        <!-- <div v-if="!layout.layout.length" class="empty-wrap fcc">
          <el-empty description="请从左侧拖拽添加模块" />
        </div> -->

        <!-- <div v-else id="content"> -->
        <div id="content">
          <grid-layout
            ref="gridlayout"
            :layout.sync="layout"
            :col-num="12"
            :row-height="30"
            :is-draggable="true"
            :is-resizable="true"
            :vertical-compact="true"
            :use-css-transforms="true"
            @layout-updated="layoutUpdatedHandler"
          >
            <grid-item
              v-for="(item, index) in layout"
              :key="index"
              :x="item.x"
              :y="item.y"
              :w="item.w"
              :h="item.h"
              :i="item.i"
              @resize="resizeHandler"
              @move="moveHandler"
              @resized="resizedHandler"
              @moved="movedHandler"
            >
              <el-card shadow="never" class="page_card" style="height: 100%">
                <el-tag size="mini" type="info" slot="header"
                  >Card {{ item.i }}</el-tag
                >
                <template v-if="item.i === '0'">
                  <div class="mb20">拖拽卡片调整位置</div>
                  <div class="mb20">拖拽卡片右下角的手柄调整卡片大小</div>
                  <div class="mb20">在控制台打印出数据变化</div>
                </template>
              </el-card>
            </grid-item>
          </grid-layout>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GridLayout, GridItem } from "vue-grid-layout";
// import { getLayout, addLayout } from "api/agent";
import tableData from "./config";

let mouseXY = { x: null, y: null };
let DragPos = { x: null, y: null, w: 1, h: 1, i: null };

export default {
  name: "HomeCom",
  components: { GridLayout, GridItem },
  mixins: [],
  props: {},
  data() {
    return {
      moduleDrawVisible: false,
      tableData,
      layout: [
        // { x: 0, y: 0, w: 4, h: 10, i: "0" },
        // { x: 4, y: 0, w: 2, h: 5, i: "1" },
        // { x: 6, y: 0, w: 4, h: 5, i: "2" },
        // { x: 10, y: 0, w: 2, h: 10, i: "3" },
        // { x: 4, y: 5, w: 4, h: 5, i: "4" },
        // { x: 8, y: 5, w: 2, h: 5, i: "5" },
        // { x: 0, y: 10, w: 8, h: 5, i: "6" },
        // { x: 8, y: 10, w: 4, h: 5, i: "7" },
      ],
      // layout: {
      //   layout: [
      //     // { x: 0, y: 0, w: 4, h: 10, i: "0" },
      //     // { x: 4, y: 0, w: 2, h: 5, i: "1" },
      //     // { x: 6, y: 0, w: 4, h: 5, i: "2" },
      //     // { x: 10, y: 0, w: 2, h: 10, i: "3" },
      //     // { x: 4, y: 5, w: 4, h: 5, i: "4" },
      //     // { x: 8, y: 5, w: 2, h: 5, i: "5" },
      //     // { x: 0, y: 10, w: 8, h: 5, i: "6" },
      //     // { x: 8, y: 10, w: 4, h: 5, i: "7" },
      //   ],
      //   colNum: 12,
      //   rowHeight: 30,
      //   isDraggable: true,
      //   isResizable: true,
      //   isMirrored: false,
      //   verticalCompact: true,
      //   margin: [10, 11],
      //   useCssTransforms: true,
      // },
    };
  },
  computed: {},
  watch: {},
  created() {
    // await getLayout();
  },
  mounted() {
    // 加载完成后显示提示
    // this.showInfo();
    // this.submitData();
    document.addEventListener(
      "dragover",
      function (e) {
        mouseXY.x = e.clientX;
        mouseXY.y = e.clientY;
      },
      false
    );
  },
  methods: {
    log(arg1 = "log", ...logs) {
      if (logs.length === 0) {
        console.log(arg1);
      } else {
        logs.forEach((e) => {
          console.log(e);
        });
        console.groupEnd();
      }
    },
    // async submitData() {
    //   await addLayout({
    //     layouts: [
    //       { alias: "aaa", layout: "aaa" },
    //       { alias: "bbb", layout: "bbb" },
    //       { alias: "ccc", layout: "ccc" },
    //     ],
    //   });
    // },
    // 显示提示
    showInfo() {
      // this.$notify({
      //   title: "提示",
      //   message:
      //     "你可以按住卡片拖拽改变位置；或者在每个卡片的右下角拖动，调整卡片大小",
      // });
    },
    // 测试代码
    layoutUpdatedHandler(newLayout) {
      console.group("layoutUpdatedHandler");
      newLayout.forEach((e) => {
        console.log(
          `{'x': ${e.x}, 'y': ${e.y}, 'w': ${e.w}, 'h': ${e.h}, 'i': '${e.i}'},`
        );
      });
      console.groupEnd();
    },
    resizeHandler(i, newH, newW) {
      this.log("resizeHandler", `i: ${i}, newH: ${newH}, newW: ${newW}`);
    },
    moveHandler(i, newX, newY) {
      this.log("moveHandler", `i: ${i}, newX: ${newX}, newY: ${newY}`);
    },
    resizedHandler(i, newH, newW, newHPx, newWPx) {
      this.log(
        "resizedHandler",
        `i: ${i}, newH: ${newH}, newW: ${newW}, newHPx: ${newHPx}, newWPx: ${newWPx}`
      );
    },
    movedHandler(i, newX, newY) {
      this.log("movedHandler", `i: ${i}, newX: ${newX}, newY: ${newY}`);
    },
    drag() {
      let parentRect = document
        .getElementById("content")
        .getBoundingClientRect();
      let mouseInGrid = false;
      if (
        mouseXY.x > parentRect.left &&
        mouseXY.x < parentRect.right &&
        mouseXY.y > parentRect.top &&
        mouseXY.y < parentRect.bottom
      ) {
        mouseInGrid = true;
      }
      if (
        mouseInGrid === true &&
        this.layout.findIndex((item) => item.i === "drop") === -1
      ) {
        this.layout.push({
          x: (this.layout.length * 2) % (this.colNum || 12),
          y: 0,
          w: 4,
          h: 10,
          i: "drop",
        });
      }
      let index = this.layout.findIndex((item) => item.i === "drop");
      if (index !== -1) {
        try {
          this.$refs.gridlayout.$children[
            this.layout.length
          ].$refs.item.style.display = "none";
        } catch (e) {
          console.log(e);
        }
        let el = this.$refs.gridlayout.$children[index];
        el.dragging = {
          top: mouseXY.y - parentRect.top,
          left: mouseXY.x - parentRect.left,
        };
        let new_pos = el.calcXY(
          mouseXY.y - parentRect.top,
          mouseXY.x - parentRect.left
        );
        if (mouseInGrid === true) {
          this.$refs.gridlayout.dragEvent(
            "dragstart",
            "drop",
            new_pos.x,
            new_pos.y,
            1,
            1
          );
          DragPos.i = String(index);
          DragPos.x = this.layout[index].x;
          DragPos.y = this.layout[index].y;
        }
        if (mouseInGrid === false) {
          this.$refs.gridlayout.dragEvent(
            "dragend",
            "drop",
            new_pos.x,
            new_pos.y,
            1,
            1
          );
          this.layout = this.layout.filter((obj) => obj.i !== "drop");
        }
      }
    },
    dragend() {
      let parentRect = document
        .getElementById("content")
        .getBoundingClientRect();
      let mouseInGrid = false;
      if (
        mouseXY.x > parentRect.left &&
        mouseXY.x < parentRect.right &&
        mouseXY.y > parentRect.top &&
        mouseXY.y < parentRect.bottom
      ) {
        mouseInGrid = true;
      }
      if (mouseInGrid === true) {
        this.$refs.gridlayout.dragEvent(
          "dragend",
          "drop",
          DragPos.x,
          DragPos.y,
          1,
          1
        );
        this.layout = this.layout.filter((obj) => obj.i !== "drop");
        this.layout.push({
          x: DragPos.x,
          y: DragPos.y,
          w: 4,
          h: 10,
          i: DragPos.i,
        });
        this.$refs.gridlayout.dragEvent(
          "dragend",
          DragPos.i,
          DragPos.x,
          DragPos.y,
          1,
          1
        );
        try {
          this.$refs.gridlayout.$children[
            this.layout.length
          ].$refs.item.style.display = "block";
        } catch (e) {
          console.log(e);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$boxShadow: 0px 2px 10px -4px rgba(122, 149, 164, 0.5);
.page {
  .vue-grid-layout {
    background-color: #f8f8f9;
    border-radius: 4px;
    margin: -10px;
    .page_card {
      height: 100%;
      user-select: none;
      cursor: pointer;
    }
    .vue-resizable-handle {
      opacity: 0.3;
      &:hover {
        opacity: 1;
      }
    }
  }
}

.wrapper {
  .header {
    box-shadow: $boxShadow;
  }
}

.empty-wrap {
  height: calc(100vh - 50px);
}

.content {
  .left {
    width: 300px;
    height: calc(100vh - 50px);
    overflow: auto;
    overflow-x: hidden;
    box-shadow: $boxShadow;
    .item {
      height: 60px;
      border: 1px solid #ebebeb;
      transition: all 0.1s linear;
      user-select: none;

      &:hover {
        box-shadow: $boxShadow;
      }
    }
  }
  .right {
    height: calc(100vh - 50px);
    overflow: auto;
    overflow-x: hidden;
    #content {
      height: calc(100vh - 50px);
    }
  }
}
</style>
