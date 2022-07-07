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
     * 计划选择
     */
    handleItemCodeChange(item) {
      // 关闭弹窗，item值为null，故做兼容
      if (!item) return;
      const { jcnr_1, qtbm_2, xtbm_3, zhqj_4, xcbz_7, id } = item;
      this.id = id;
      // 设置选中数据对象
      this.selectedItemObj = {
        jcnr_1,
        qtbm_2,
        xtbm_3: xtbm_3 ? xtbm_3.split(",") : [],
        zhrq_6: zhqj_4,
        xcbz_7,
        id_4: id,
      };
    },
    /**
     * 额外的搜索参数
     */
    searchObjFormat() {
      return {
        itemCode: "330300000030",
        queryParams: JSON.stringify([
          {
            // 获取未执行的数据
            name: "jczt_6",
            value: "1",
            eq: "1",
          },
        ]),
      };
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
