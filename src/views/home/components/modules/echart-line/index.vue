<template lang="html">
  <div style="height: 100%">
    <div ref="main" class="full echart-wrap" style="height: 100%"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "EchartLine",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  async mounted() {
    await this.$nextTick();
    this.doInit();
  },
  methods: {
    /**
     * 初始化
     */
    doInit() {
      this.myChart = echarts.init(this.$refs.main);
      const option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true,
          },
        ],
      };
      this.myChart.setOption(option);
    },
    /**
     * 重置
     */
    doResize() {
      this.myChart.resize();
    },
  },
};
</script>

<style lang="scss" scoped>
.echart-wrap {
}
</style>
