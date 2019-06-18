/**
 * 此模块用于演示 vuex 的基本应用流程，包含了 v-store 模块的主要演示逻辑
 */

import types from 'v-store/mutation-type';

// state
const state = {
    count: 0,
};

// getters
const getters = {
    doubleCount(state) {
        return state.count * 2;
    },
    isDoubleCountGreaterThenN(state, getters) {
        // 通过让 getter 返回一个函数，来实现给 getter 传参
        return function(N) {
            return getters.doubleCount > N;
        };
    },
};

// mutations
const mutations = {
    [types.MOD1.INCREMENT](state, payload) {
        // 这里的 `state` 对象是模块的局部状态
        if (payload && payload.n) {
            state.count += payload.n;
        } else {
            state.count++;
        }
    },
};

// actions
const actions = {
    incrementAsync({ commit, state, rootState }, payload) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                commit(types.MOD1.INCREMENT, payload);
                // 在模块内部改变其他模块的 state
                commit(`global/${types.MOD1.INCREMENT}`, null, { root: true });
                console.log(`在模块内部访问其他模块的 state：${rootState.global.count}`);

                resolve();
            }, 1000);
        });
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
};
