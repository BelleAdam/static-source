<template>
<div class="container">
    <webmap-static></webmap-static>
    <webmap1></webmap1>
    <webmap2></webmap2>
    <webmap3></webmap3>
    <webmap4></webmap4>
    <webmap5></webmap5>
    <webmap6></webmap6>
</div>
</template>

<script>
import WebmapStatic from '../smart/webmap-static.vue';
import Webmap1 from '../smart/webmap-1.vue';
import Webmap2 from '../smart/webmap-2.vue';
import Webmap3 from '../smart/webmap-3.vue';
import Webmap4 from '../smart/webmap-4.vue';
import Webmap5 from '../smart/webmap-5.vue';
import Webmap6 from '../smart/webmap-6.vue';

export default {
    data() {
        return {};
    },
    beforeCreate() {
        document.querySelector('meta[name=viewport]')
                .setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
        document.getElementsByTagName('html')[0]
                .classList.add('spectre');
    },
    destroyed() {
        document.querySelector('meta[name=viewport]')
                .setAttribute('content', 'width=750, user-scalable=no');
        document.getElementsByTagName('html')[0]
                .classList.remove('spectre');
    },
    components: {
        WebmapStatic,
        Webmap1,
        Webmap2,
        Webmap3,
        Webmap4,
        Webmap5,
        Webmap6,
    },
};
</script>

<style lang="scss">
.container img {
    width: 100%;
}
.card {
    margin: .4rem 0;
}
.m-t {
    margin-top: .75rem;
}
.webmap {
    height: 400px;
    * {
        box-sizing: border-box;
    }
}
</style>