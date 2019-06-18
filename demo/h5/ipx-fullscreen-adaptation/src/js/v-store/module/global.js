/**
 * 每个项目的 vuex 模块都要有一个全局模块，并命名为 global.js，存放于 v-store/module/global.js
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
    [types.GLOBAL.INCREMENT](state) {
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
