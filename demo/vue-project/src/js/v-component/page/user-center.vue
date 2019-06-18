<template>

<div class="user-center">
    <demo></demo>
    <component1></component1>
    <component2></component2>
</div>

</template>

<script>
import demo from 'v-component/smart/demo.vue';
import component1 from 'v-component/smart/component1.vue';
import component2 from 'v-component/smart/component2.vue';
import demoMixin from 'v-mixin/demo-mixin';

export default {
  mixins: [demoMixin],
  data() {
    return {};
  },
  components: {
    demo,
    component1,
    component2,
  },
};
</script>

<style scoped="" lang="scss">
@import '~scss/vue';

.user-center {
  padding: 20px;
}
</style>
