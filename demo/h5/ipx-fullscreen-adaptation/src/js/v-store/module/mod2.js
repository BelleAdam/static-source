/**
 * 此模块用于配合 mod1 演示 vuex 的基本使用，逻辑较为简单
 */

import types from 'v-store/mutation-type';

// state
const state = {
    count: 0,
};

// getters
const getters = {};

// mutations
const mutations = {
    [types.MOD2.INCREMENT](state) {
        // 这里的 `state` 对象是模块的局部状态
        state.count++;
    },
};

// actions
const actions = {};

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
};
