/**
 * 规范：只有 mutation 才需要使用常量替代事件类型，state、getter、action 都无需使用常量
 */

const GLOBAL_MUTATIONS = {
  INCREMENT: 'INCREMENT',
};
const MOD1_MUTATIONS = {
  INCREMENT: 'INCREMENT',
};
const MOD2_MUTATIONS = {
  INCREMENT: 'INCREMENT',
};

export default {
  GLOBAL: GLOBAL_MUTATIONS,
  MOD1: MOD1_MUTATIONS,
  MOD2: MOD2_MUTATIONS,
};
