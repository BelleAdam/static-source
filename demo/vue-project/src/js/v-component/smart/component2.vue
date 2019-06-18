<template>

<div class="component2">
    <h3>组件 2</h3>
    <p>把组件 1 改变的状态同步到组件 2</p>
    <p>count = {{count}}</p>
</div>

</template>

<script>
/**
 * 此组件用于配合 component1 演示 vuex 的基本使用，逻辑较为简单
 */

export default {
  data() {
    return {};
  },
  components: {},
  computed: {
    count() {
      return this.$store.state.mod1.count;
    },
  },
};
</script>

<style scoped="" lang="scss">
@import '~scss/vue';

.component2 {
  margin-top: 20px;
  padding: 20px 10px;
  border: 1px solid #ddd;
}
</style>
