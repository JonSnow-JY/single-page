<template lang="html">
  <div class="">
    <count-up :end="endNum" :duration="4" />
  </div>
</template>

<script>
export default {
  name: "NumCard",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {};
  },
  computed: {
    endNum() {
      return parseInt(Math.random() * 1000);
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
