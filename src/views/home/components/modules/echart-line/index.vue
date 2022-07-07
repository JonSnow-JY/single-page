<template lang="html">
  <div class="">
    <div ref="main" class="wh100"></div>
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
      const myChart = echarts.init(this.$refs.main);
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
      myChart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped></style>
