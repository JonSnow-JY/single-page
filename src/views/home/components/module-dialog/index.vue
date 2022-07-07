<template lang="html">
  <el-dialog
    width="700px"
    title="模块选择"
    :close-on-click-modal="false"
    append-to-body
    :visible="dialogVisible"
    @close="close"
  >
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="address" label="地址" />
    </el-table>

    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" :disabled="!id" @click="submitData"
        >确定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import dialogMixin from "mixins/dialogMixin";
import tableMixin from "mixins/tableMixin";

export default {
  name: "ModelDialog",
  components: {},
  mixins: [dialogMixin, tableMixin],
  props: {},
  data() {
    return {
      // 不直接拉取数据
      loadDataDirectory: false,
      // 接口api
      // getTableListSyncMethod: SmartFormList,
    };
  },
  computed: {},
  mounted() {},
  methods: {
    /**
     * 初始化弹窗
     */
    initForm() {
      // this.getTableData();
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
      return [];
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__body {
  padding: 10px 20px;
}
</style>
