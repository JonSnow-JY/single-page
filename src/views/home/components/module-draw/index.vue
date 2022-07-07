<template lang="html">
  <el-drawer
    size="600px"
    title="模块选择"
    :close-on-click-modal="false"
    append-to-body
    :visible="dialogVisible"
    @close="close"
  >
    <div class="table-wrap">
      <el-scrollbar style="height: 100%">
        <div class="plr20 pt10 pb20">
          <el-table v-if="dialogVisible" :data="tableData" border>
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column prop="alias" label="模块名" />
            <el-table-column prop="style_text" label="样式" />
          </el-table>
        </div>
      </el-scrollbar>
    </div>
    <div class="mt20 pr20" flex="dir:right">
      <el-button type="primary" class="ml10">确定</el-button>
      <el-button @click="close">取消</el-button>
    </div>
  </el-drawer>
</template>

<script>
import dialogMixin from "mixins/dialogMixin";
import tableData from "./config";

export default {
  name: "ModelDialog",
  components: {},
  mixins: [dialogMixin],
  props: {},
  data() {
    return {
      tableData,
    };
  },
  computed: {},
  mounted() {},
  methods: {
    /**
     * 初始化弹窗
     */
    initForm() {
      this.tableDataFormat();
    },
    /**
     * 提交
     */
    async submitData() {
      try {
        this.$emit("success", this.selectedItemObj);
        this.close();
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * 列表数据格式化
     */
    tableDataFormat() {
      this.tableData.map((item) => {
        const { style, name } = item;
        if (name === "clue") {
          item.style_text = { 1: "轮播", 2: "分页" }[style];
        } else {
          item.style_text = { 1: "数字卡片", 2: "折线图" }[style];
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-drawer__header {
  margin-bottom: 10px;
}

.table-wrap {
  height: calc(100vh - 128px);
  overflow: auto;
  overflow-x: hidden;
}

::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
