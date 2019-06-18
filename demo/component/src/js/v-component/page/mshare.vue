<template>
<div>
    <div class="guide" v-if="isShowGuide" @click="hideShareGuide">
        <h4 class="guide__txt">分享引导</h4>
    </div>
    <div class="container">
        <div class="panel">
            <div class="panel-header">
                <div class="panel-title">Web 分享演示 Demo</div>
            </div>
            <div class="panel-nav"></div>
            <div class="panel-body">
                <div class="form-horizontal">
                    <div class="form-group">
                        <div class="col-3">
                            <label for="" class="form-label">分享标题</label>
                        </div>
                        <div class="col-9">
                            <input type="text" v-model="data.shareTitle" class="form-input">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-3">
                            <label for="" class="form-label">分享描述</label>
                        </div>
                        <div class="col-9">
                            <input type="text" v-model="data.shareDesc" class="form-input">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-3">
                            <label for="" class="form-label">分享链接</label>
                        </div>
                        <div class="col-9">
                            <input type="text" v-model="data.shareLink" value="http://act.mama.cn/subject/index-id-fedemo.html" class="form-input">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-3">
                            <label for="" class="form-label">缩略图</label>
                        </div>
                        <div class="col-9">
                            <select class="form-select" name="" v-model="data.shareThumb">
                                <option value="http://static.mama.cn/record/record-pc/common/images/logo-record.png">亲子记 Logo</option>
                                <option value="http://static.mama.cn/std/images/new/yygj.png">孕管 Logo</option>
                                <option value="">空</option>
                            </select>
                        </div>
                    </div>

                </div>
            </div>
            <div class="panel-footer">
                <div class="form-horizontal">
                    <div class="form-group">
                        <button @click="updateShareInfo" class="btn btn-primary btn-block">动态设置分享信息</button>
                    </div>
                </div>
                <div class="form-horizontal">
                    <div class="form-group">
                        <button @click="clickShowShareGuideBtn" class="btn btn-primary btn-block">弹出分享引导</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data () {
        return {
            isShowGuide: false,
            data: {
                shareTitle: '',
                shareDesc: '',
                shareLink: '',
                shareThumb: '',
            },
        };
    },
    beforeCreate () {
        // 因为 spectre.css 这个 UI 框架在 viewport 为 width=750 时显示有问题, 手动修改 viewport 属性
        document.querySelector('meta[name=viewport]')
                .setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
        document.getElementsByTagName('html')[0]
                .classList.add('spectre');
    },
    destroyed () {
        document.querySelector('meta[name=viewport]')
                .setAttribute('content', 'width=750, user-scalable=no');
        document.getElementsByTagName('html')[0]
                .classList.remove('spectre');
    },
    methods: {
        updateShareInfo () {
            let config = {
                title: this.data.shareTitle,
                desc: this.data.shareDesc,
                link: this.data.shareLink,
                imgUrl: this.data.shareThumb,
            };
            window.mShare.updateConfig(config);
            alert('设置成功');
        },
        hideShareGuide () {
            this.isShowGuide = false;
        },
        showShareGuide () {
            this.isShowGuide = true;
        },
        clickShowShareGuideBtn () {
            window.mShare.showShareGuide(this.showShareGuide);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "~fe-core/scss/base/variable";
.guide {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .7);
    z-index: $zindex-fixed;
    &__txt {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
    }
}
</style>