/**
 * 每个项目的 vuex 插件都要有一个全局插件，并命名为 global.js，存放于 v-store/plugin/global.js
 */

export default store => {
    // 注册监听 store 的 mutation
    store.subscribe((mutation, state) => {
        // 每次 mutation 之后调用
        // mutation 的格式为 { type, payload }
        console.log(`使用 mutation 钩子获取到的 mutation 类型：${mutation.type}`);
    });
    // 注册监听 store 的 action
    store.subscribeAction((action, state) => {
        console.log(`使用 action 钩子获取到的 action 类型：${action.type}`);
    });
};
