<template>
    <div class="index" :class="['bg', bgClass[bgActive], bgSizeClass[bgSizeActive], bgPositionClass[bgPositionActive], bgColorClass[bgColorActive]]">
        <div class="btn-wrap">
            <p>背景切换：</p>
            <a
            v-for="(item, index) in bg"
            :class="['btn-change', {'btn-change--active': index === bgActive}]"
            @click.prevent="changeBg(index)"
            >{{item}}</a>
        </div>
        <div class="btn-wrap">
            <p>背景适应方式切换：</p>
            <a
            v-for="(item, index) in bgSize"
            :class="['btn-change', {'btn-change--active': index === bgSizeActive}]"
            @click.prevent="changeBgSize(index)"
            >{{item}}</a>
        </div>

        <div class="btn-wrap">
            <p>等比适应的Y轴对齐方式：</p>
            <a
            v-for="(item, index) in bgPosition"
            :class="['btn-change', {'btn-change--active': index === bgPositionActive}]"
            @click.prevent="changeBgPosition(index)"
            >{{item}}</a>
        </div>

        <div class="btn-wrap">
            <p>背景颜色填充：</p>
            <a
            v-for="(item, index) in bgColor"
            :class="['btn-change', {'btn-change--active': index === bgColorActive}]"
            @click.prevent="changeBgColor(index)"
            >{{item}}</a>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'

    export default {
        data() {
            return {
                bgActive: 0,
                bgClass: ['bg-top', 'bg-center', 'bg-bottom', 'bg-i6'],
                bg: ['高1600', '高1600', '高1600', '高1250'],

                bgSizeActive: 0,
                bgSizeClass: ['bg-default', 'bg-contain', 'bg-cover'],
                bgSize: ['等宽', '等比', '铺满'],

                bgPositionActive: 0,
                bgPositionClass: ['bg-position-top', 'bg-position-center', 'bg-position-bottom'],
                bgPosition: ['顶部对齐', '垂直居中', '底部对齐'],

                bgColorActive: 0,
                bgColorClass: ['bg-color-none', 'bg-color1', 'bg-color2'],
                bgColor: ['不填充', '颜色填充1', '颜色填充2'],
            };
        },
        created() {

        },
        components: {},
        methods: {
            changeBg(index) {
                this.bgActive = index;
            },
            changeBgSize(index) {
                this.bgSizeActive = index;
            },
            changeBgPosition(index) {
                this.bgPositionActive = index;
            },
            changeBgColor(index) {
                this.bgColorActive = index;
            }
        }
    };
</script>

<style lang="scss">
    @import '~scss/vue';
    html,
    body {
        height: 100%;
        color: #ffe222;
    }
    .bg {
        background-position: center;
        background-repeat: no-repeat;
    }

    .bg-top {
        background-image: assetsURL('img/bg-top.jpg');
    }
    .bg-center {
        background-image: assetsURL('img/bg-center.jpg');
    }
    .bg-bottom {
        background-image: assetsURL('img/bg-bottom.jpg');
    }
    .bg-i6 {
        background-image: assetsURL('img/bg-i6.jpg');
    }
    .bg-default {
        background-size: 750px auto;
    }
    .bg-contain {
        background-size: contain;
    }
    .bg-cover {
        background-size: cover;
    }
    .bg-position-top {
        background-position: center 0;
    }
    .bg-position-center {
        background-position: center center;
    }
    .bg-position-bottom {
        background-position: center bottom;
    }
    .bg-color-none {
        background-color: rgba(0, 0, 0, 0);
    }
    .bg-color1 {
        background-color: #000;
    }
    .bg-color2 {
        background-color: #539ce8;
    }
    #app,
    .index {
        height: 100%;
    }
    .btn-wrap {
        padding: 30px 0 30px 30px;
    }
    .btn-change {
        margin-right: 16px;
        display: inline-block;
        line-height: 70px;
        padding: 0 30px;
        color: #000;
        background: #f2f2f2;
        border-radius: 70px;
        border: 1px solid #fff;
    }
    .btn-change--active {
        color: #333;
        background: #ffe222;
        border: 1px solid #ffe222;
    }
</style>
