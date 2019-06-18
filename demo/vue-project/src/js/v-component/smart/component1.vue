<template>

<div class="component1">
    <h3>组件 1</h3>
    <p>
        <button type="button" @click="changeStatusSync">同步改变状态</button>
        <button type="button" @click="changeStatusAsync">异步改变状态（延时一秒）</button>
    </p>
    <p>count = {{count}}</p>
</div>

</template>

<script>
/**
 * 此组件用于演示 vuex 的基本应用流程，包含了 v-store 模块的主要演示逻辑
 */

import types from 'v-store/mutation-type';

export default {
  data() {
    return {};
  },
  mounted() {
    // 在组件内触发 mutation，变更状态（分模块触发）
    this.$store.commit(`global/${types.GLOBAL.INCREMENT}`);
    this.$store.commit(`mod1/${types.MOD1.INCREMENT}`);
    this.$store.commit(`mod2/${types.MOD2.INCREMENT}`);
    // 在组件内使用 state
    console.log(`在组件内使用 state：${this.$store.state.mod1.count}`);
    // 在组件内使用 getters
    console.log(`在组件内使用 getters：${this.$store.getters['mod1/doubleCount']}`);
    console.log(`在组件内使用 getters：${this.$store.getters['mod1/isDoubleCountGreaterThenN'](10)}`);
  },
  components: {},
  computed: {
    count() {
      // 同步 state 到模板
      return this.$store.state.mod1.count;
    },
  },
  methods: {
    changeStatusSync() {
      // 直接触发 mutation 来同步改变状态
      this.$store.commit(`mod1/${types.MOD1.INCREMENT}`, { n: 2 });
    },
    changeStatusAsync() {
      // 使用 action 来异步改变状态
      this.$store.dispatch(`mod1/incrementAsync`, { n: 2 }).then(() => {
        // do something
      });
    },
  },
};
</script>

<style scoped="" lang="scss">
@import '~scss/vue';

.component1 {
  padding: 20px 10px;
  border: 1px solid #ddd;
}
</style>
