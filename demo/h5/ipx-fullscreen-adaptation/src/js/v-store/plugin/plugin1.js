/**
 * vuex 插件 1，用于演示插件的粒度以及在插件内提交 Mutation
 */

import types from 'v-store/mutation-type';

export default store => {
    // 注册监听 store 的 mutation
    store.subscribe((mutation, state) => {
        if (mutation.type === `mod1/${types.MOD1.INCREMENT}`) {
            // 触发 mod1 的 某个 mutation 时，也触发 mod2 的某个mutation
            store.commit(`mod2/${types.MOD2.INCREMENT}`);
        }
        console.log(`使用 mutation 钩子获取到的 mutation 类型：${mutation.type}`);
    });
};
