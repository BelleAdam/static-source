<template>
    <div class="content">
        <h1>音乐组件demo</h1>
        <h2>step 1：注册音乐组件</h2>
        <button v-on:click="inject()" v-show="!isSetInject" title="MusicObject.inject()">注册</button>
        <button v-on:click="inject(true)" v-show="!isSetAutoInject" title="MusicObject.inject()">自动注册</button>
        <button v-on:click="cancelAutoInject()" v-show="isSetAutoInject">取消自动注入</button>
        <h3 v-show="!isSetAutoInject">注入选项</h3>
        <div v-show="!isSetInject">
            <div class="input-group">
                <input type="checkbox" v-model="injectConf.autoplay"/>
                <label title="autoplay" v-on:click="injectConf.autoplay = !injectConf.autoplay">自动播放</label>
            </div>

            <div class="input-group">
                <input type="checkbox" v-model="injectConf.loop"/>
                <label title="loop" v-on:click="injectConf.loop = !injectConf.loop">循环播放</label>
            </div>


            <div class="input-group">
                <label title="className">指示元素类名</label>
                <input v-model="injectConf.className"/>
            </div>

            <div class="input-group">
                <label title="className">指示元素(播放时）类名</label>
                <input v-model="injectConf.activeClassName"/>
            </div>
        </div>

        <p>授权状态：{{injectedText}}</p>

        <h2>step 2: 各种操作</h2>
        <div v-show="isInjected">
            <p>主要功能</p>
            <button v-on:click="pause()" title="MusicObject.pause()">暂停</button>
            <button v-on:click="play()" title="MusicObject.play()">播放</button>
            <button v-on:click="load(2)" v-if="playingMusicId === 1"
                    title="MusicObject.load(gUtils.assetsURL('music/music-component-2.mp3'))">切换音乐 2
            </button>
            <button v-on:click="load(1)" v-if="playingMusicId === 2"
                    title="MusicObject.load(gUtils.assetsURL('music/music-component.mp3'))">切换音乐 1
            </button>
            <p>辅助功能</p>
            <button v-on:click="waitUntilPause()" title="MusicObject.waitUntilPause()">等待至停止</button>
            <button v-on:click="waitUntilPlay()" title="MusicObject.waitUntilPlay()">等待至播放</button>
        </div>
        <p v-show="!isInjected">请先获得授权（用户操作）</p>

        <!--<g-music-component :msrc="musicSrc" autoplay="false" loop="false" :pause="pauseMusic" v-on:init=""></g-music-component>-->
    </div>
</template>

<style lang="scss" scoped>
    .content {
        width: 100%;
        height: 1209px;
        padding: 0 30px;
    }

    .input-group {
        line-height: 2;
        padding-bottom: 10px;
    }

    h1 {
        font-size: 50px;
    }

    h2 {
        font-size: 42px;
    }

    h3 {
        font-size: 36px;
    }

    button {
        font-size: 28px;
    }

    input {
        font-size: 28px;
    }

    label {
        font-size: 24px;
    }

    p {
        font-size: 24px;
    }
</style>

<script>
    import gUtils from "build-util";
    import siteConfig from "site-config";
    let mo = null;

    const COMPONENT_MUSIC_KEYS = siteConfig.LOCAL_STORAGE_KEYS.COMPONENT_MUSIC;

    export default {
        data() {
            return {
                isInjected: false,
                isSetInject: false,
                isSetAutoInject: !!localStorage.getItem(COMPONENT_MUSIC_KEYS.BOOT_INJECT),
                musicSrc: gUtils.assetsURL("music/music-component.mp3"),
                injectConf: {
                    autoplay: true,
                    loop: true,
                    className: "g-music",
                    activeClassName: "g-music--active"
                },
                playingMusicId: 1,
                pauseMusic: true
            };
        },
        computed: {
            injectedText() {
                return this.isInjected ? "已授权" : "未授权";
            }
        },
        methods: {
            inject(isAuto) {
                if (isAuto) {
                    localStorage.setItem(COMPONENT_MUSIC_KEYS.BOOT_INJECT, true);
                    localStorage.setItem(COMPONENT_MUSIC_KEYS.INJECT_CONF, JSON.stringify(this.injectConf));
                    alert("浏览器将刷新.. 若无反应，请手动刷新一次。");
                    setTimeout(() => {
                        location.reload(true);
                    }, 500);
                } else {
                    this.musicObject.inject(gUtils.assetsURL("music/music-component.mp3"), this.injectConf)
                        .then((m) => {
                            mo = m;
                            this.isInjected = true;
                        })
                        .catch((e) => {

                        });
                    this.isSetInject = true;
                }
            },
            cancelAutoInject() {
                localStorage.removeItem(COMPONENT_MUSIC_KEYS.BOOT_INJECT);
                localStorage.removeItem(COMPONENT_MUSIC_KEYS.INJECT_CONF);
                alert("浏览器将刷新.. 若无反应，请手动刷新一次。");
                setTimeout(() => {
                    location.reload(true);
                }, 500);
            },
            pause() {
                mo.pause();
            },
            play() {
                mo.play();
            },
            waitUntilPause() {
                mo.waitUntilPause().then(() => {
                    alert("停止播放。");
                });
            },
            waitUntilPlay() {
                mo.waitUntilPlay().then(() => {
                    alert("开始播放。")
                })
            },
            load(id) {
                if (id === 2) {
                    mo.load(gUtils.assetsURL("music/music-component-1.mp3"));
                } else {
                    mo.load(gUtils.assetsURL("music/music-component.mp3"));
                }

                this.playingMusicId = id;
            }
        },
        mounted() {
            if (this.isSetAutoInject) {
                this.injectConf = JSON.parse(localStorage.getItem(COMPONENT_MUSIC_KEYS.INJECT_CONF)) || this.injectConf;
                this.inject();
            }
        }
    }
</script>