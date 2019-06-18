<template>
<div class="container" id="mcropper">
    <input type="file" @change="changeAvatarInput" class="hidden" id="input-avatar">
    <div class="card">
        <div class="card-header">
            <div class="card-title h5">MCropper.js</div>
            <div class="card-subtitle text-gray">图片裁剪功能演示 Demo</div>
        </div>
        <div class="card-image">
            <img id="avatar-img" :src="base64" alt="">
        </div>
        <div class="card-body">
            <div class="m-t btn btn-primary btn-block" @click="selectAvatar4Rectangle">弹出矩形选择区域来裁剪图片</div>
            <div class="m-t btn btn-primary btn-block" @click="selectAvatar4Round">弹出圆形选择区域来裁剪图片</div>
            <div class="m-t btn btn-primary btn-block" @click="selectAvatar4Direct">直接在显示区域裁剪图片</div>
            <div class="m-t btn btn-primary btn-block" @click="outputBase64">在控制台输出 Base64 并显示大图</div>
        </div>
    </div>
    <div class="card">
        <div class="card-header">
            <div class="card-title h5">MFile.js</div>
            <div class="card-subtitle text-gray">文件上传功能演示 Demo</div>
        </div>
        <div class="card-body">
            <div class="desc">注意: 获取七牛 Token 的功能仅能在 npm run dev 下运行.</div>
            <form class="form-horizontal">
                <div class="form-group">
                    <div class="col-12">
                        <label class="form-label" for="input-token">token</label>
                    </div>
                    <div class="col-12">
                        <input class="form-input" type="text" id="input-token" placeholder="token" v-model="token">
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-12">
                        <label class="form-label" for="input-key">key</label>
                    </div>
                    <div class="col-12">
                        <input class="form-input" type="text" id="input-key" placeholder="设置文件上传到七牛服务的路径" v-model="key">
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-12">
                        <label class="form-label" for="input-baseurl">baseURL</label>
                    </div>
                    <div class="col-12">
                        <input class="form-input" type="text" id="input-baseurl" placeholder="设置请求的七牛接口 URL" v-model="baseURL">
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-12">
                        <label class="form-label" for="input-imageurl">
                            imageURL (上传成功后才会显示)
                            <a v-show="imageURL" :href="imageURL">点击打开</a>
                        </label>
                    </div>
                    <div class="col-12">
                        <input class="form-input" type="text" id="input-imageurl" placeholder="上传成功图片的 URL" v-model="imageURL">
                    </div>
                </div>
            </form>
            <div class="m-t btn btn-primary btn-block" @click="getQiNiuToken">获取七牛 Token 和配置信息 (From ACT API)</div>
            <div class="m-t btn btn-primary btn-block" @click="uploadImage">将上方的预览图片上传到七牛 CDN</div>
        </div>
    </div>
</div>
</template>

<script>
import MCropper from 'fe-core/lib/mcropper';
import 'cropperjs/dist/cropper.css';
import 'fe-core/lib/mcropper/mcropper.scss';
import mfileUtil from 'fe-core/util/mfile';
import buildUtil from 'build-util';
import CRC32 from 'crc-32';
import ajax from 'common/ajax';
import config from 'site-config';

export default {
    data () {
        return {
            base64: '',
            mCropperIns: null,
            isDirectCrop: false,
            isRoundCrop: false,
            baseURL: '',
            token: '',
            key: '',
            imageURL: '',
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
        getCrc32(base64) {
            return CRC32.bstr(window.atob(base64.split(',')[1])) >>> 0;
        },
        getQiNiuToken() {
            ajax({
                url: config.API.GET_QINIU_TOKEN_FROM_ACT,
            }).then(res => {
                console.log('getQiNiuToken:', res);
                if (res.data.code == 0) {
                    let data = res.data.data;
                    this.token = data.args.token;
                    this.key = data.args.key;
                    this.baseURL = data.upload_api;
                } else {
                    throw new Error(res.data.msg);
                }
            }).catch(err => {
                console.error(err);
                console.error('注意: 获取七牛 token 接口仅能在 npm run dev 模式下访问.');
            });
        },
        uploadImage() {
            mfileUtil.upload({
                base64: this.base64,
                baseURL: "//up-z0.qiniu.com",
                token: this.token,
                urlParam: {
                    crc32: this.getCrc32(this.base64),
                    key: this.key,
                }
            }).then(res => {
                console.log('uploadImage:', res);
                this.imageURL = `http://qimg.mama.cn/${this.key}`;
                alert('上传成功!!!');
            }).catch(err => {
                console.error(err);
                alert('上传失败, 请打开控制台查看相关信息.');
            });
        },
        outputBase64() {
            this.base64 = this.mCropperIns.getCroppedCanvas().toDataURL();
        },
        selectAvatar4Rectangle() {
            this.isDirectCrop = false;
            this.isRoundCrop = false;
            document.getElementById('input-avatar').click();
        },
        selectAvatar4Round() {
            this.isDirectCrop = false;
            this.isRoundCrop = true;
            document.getElementById('input-avatar').click();
        },
        selectAvatar4Direct() {
            this.isDirectCrop = true;
            this.isRoundCrop = false;
            document.getElementById('input-avatar').click();
        },
        changeAvatarInput(e) {
            if (this.mCropperIns) {
                this.mCropperIns.destroy && this.mCropperIns.destroy();
                this.mCropperIns = null;
            }
            let file = e.target.files[0];
            if (file) {
                let options = {
                    round: this.isRoundCrop,
                    cropperJS: {},
                };
                if (this.isDirectCrop) {
                    options.injectElementID = '#avatar-img';
                    options.cropperJS.viewMode = 3;
                }
                options.cropperJS.callback4OK = croppedCanvas => {
                    this.base64 = croppedCanvas.toDataURL();
                };
                options.cropperJS.callback4Cancel = () => {
                    console.log('callback4Cancel');
                };
                this.mCropperIns = new MCropper(file, options);
            }
        },
    },
};
</script>

<style lang="scss" scoped="">
#avatar-img,
#output-img {
    width: 100%;
    height: 100%;
}
.card {
    margin-top: .4rem;
    margin-bottom: .4rem;
}
.m-t {
    margin-top: .75rem;
}
</style>