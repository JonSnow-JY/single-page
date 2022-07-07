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
          data: [
            "2022-01",
            "2022-02",
            "2022-03",
            "2022-04",
            "2022-05",
            "2022-06",
            "2022-07",
          ],
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: "5%",
          right: "5%",
          bottom: "8%",
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [320, 450, 901, 934, 1100, 1330, 1680],
            type: "line",
            smooth: true,
            symbol: "circle",
          },
        ],
      };
      this.myChart.setOption(option);
    },
    /**
     * 重置
     */
    async doResize() {
      await this.$nextTick();
      this.myChart.resize();
    },
  },
};
</script>

<style lang="scss" scoped>
.echart-wrap {
}
</style>
