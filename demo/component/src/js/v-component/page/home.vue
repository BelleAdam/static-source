<template>
<div>
    <h3>公共组件列表</h3>
    <hr>
    <ul>
        <li>
            <a href="#/mcropper/">mcropper</a>
        </li>
        <li>
            <a href="#/mlottery/">mlottery</a>
        </li>
        <li>
            <a href="#/mshare/">mshare</a>
        </li>
        <li>
            <a href="#/music-object/">music-object</a>
        </li>
    </ul>
    <hr>
    <p class="tip">请使用移动版模式浏览公共组件 demo</p>
</div>

</template>

<script>
export default {
    data() {
        return {};
    },
    components: {},
};
</script>

<style scoped="" lang="scss">
@import '~scss/vue';

h3 {
    font-size: 36px;
}

ul {
    font-size: 36px;
}

.tip {
    font-size: 24px;
    color: #f00;
}
</style>
