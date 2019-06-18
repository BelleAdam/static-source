<template>
    <div class="content">
        <h1>mmt demo</h1>
        <a href="//wiki.corp.mama.cn/pages/viewpage.action?pageId=78208917">WIKI LINK</a>
        <div class="func-block">
            <h5>插入 script 标签</h5>
            <p v-show="scriptLoadingStatus">代码插入成功, 请在 devtool 的 Network 中查看统计请求的发送详情。</p>
            <div>
                <button v-if="!scriptLoadingStatus" v-on:click="logUsingScript">插入</button>
            </div>
        </div>

        <div class="func-block">
            <h5>使用 fe-core 引入</h5>
            <h6><code>mmt.config(siteId, sessionId)</code></h6>
            <p v-show="feCoreLoadingStatus">配置完成，请点击下面的操作调用统计 api。<br> 操作时，请打开 devtool 查看统计请求的发送详情。</p>
            <div v-show="feCoreLoadingStatus" class="fe-core-examples">
                <div class="func-block">
                    <h6><code>mmt.trackAutoPageview()</code></h6>
                    <p>自动统计一个链接（location.href)。</p>
                    <button v-on:click="trackAutoPageview()">自动统计链接</button>
                </div>

                <div class="func-block">
                    <h6><code>mmt.trackPageview(url)</code></h6>
                    <p>统计一个自定义链接（基于 location.domain)。</p>
                    <button v-on:click="trackPageview('/#/mmt/hello')">统计 /#/mmt/hello 链接</button>
                </div>

                <div class="func-block">
                    <h6><code>mmt.trackEvent(category, action, optLabel, optValue)</code></h6>
                    <p>发送一个事件触发统计请求。<br> 统计一个 category 为 demo，action 为 click, optLabel 为 demo， optValue 为 hello 的事件</p>
                    <button v-on:click="trackEvent('demo', 'click', 'demo', 'hello')">触发</button>
                </div>

                <div class="func-block">
                    <h6><code>mmt.setCustomVar(key, value)</code></h6>
                    <p>设置自定义变量，该变量会在整个会话中存在。<br> 设置一个自定义变量，key 为 demo ，value 为 hello</p>
                    <button v-on:click="setCustomVar('demo', 'hello')">触发</button>
                </div>
            </div>
            <div>
                <button v-if="!feCoreLoadingStatus" v-on:click="logUsingfeCore">引入</button>
            </div>
        </div>

        <div class="func-block">
            <h5>使用 vue 插件记录路由跳转链接</h5>
            <p v-show="usingVuePlugin">已经注册 vue 插件，可以在该单页页面中跳转，观察 devtool 请求的发送。</p>
            <button v-if="!usingVuePlugin" v-on:click="useVuePlugin">使用</button>
        </div>

    </div>
</template>

<script>
import mmt from 'fe-core/lib/mmt';
import mmtVuePlugin from 'fe-core/lib/mmt/index.vue';
import router from 'common/router';
import Vue from 'vue';

const siteId = 'demo';
const sessionId = 'demo';

export default {
  data() {
    return {
      scriptLoadingStatus: false,
      scriptLoadingLock: false,
      feCoreLoadingStatus: false,
      usingVuePlugin: mmtVuePlugin.isRegistered,
    };
  },
  methods: {
    logUsingScript() {
      if (!this.scriptLoadingStatus && !this.scriptLoadingLock) {
        this.scriptLoadingLock = true;
        console.log('log using script...');
        // 插入一个 script 标签
        let hm = document.createElement('script');
        hm.id = 'mmt';
        hm.src = `//static-public.mama.cn/fe-core/lib/mmt/mmt-v${mmt.version}.js`;
        let s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(hm, s);

        // 加载后 config
        hm.addEventListener('load', () => {
          window.mmt
            .config({
              siteId,
              sessionId,
            })
            .then(() => {
              window.mmt.trackAutoPageview();
            });

          this.scriptLoadingStatus = true;
        });

        hm.addEventListener('error', () => {
          this.scriptLoadingLock = false;
        });
      }
    },
    logUsingfeCore() {
      if (!this.feCoreLoadingStatus) {
        mmt.config(siteId, sessionId).then(() => {
          this.feCoreLoadingStatus = true;
        });
      }
    },
    trackPageview(url) {
      return mmt.trackPageview(url);
    },
    trackAutoPageview(url) {
      return mmt.trackAutoPageview();
    },
    trackEvent(category, action, optLabel, optValue) {
      return mmt.trackEvent(category, action, optLabel, optValue);
    },
    setCustomVar(key, value) {
      return mmt.setCustomVar(key, value);
    },
    useVuePlugin() {
      this.usingVuePlugin = true;
      mmtVuePlugin.isRegistered = true; // 设置一个提示
      Vue.use(mmtVuePlugin, {
        siteId,
        sessionId,
        router,
        beforeTrack(mmt, { url }) {
          console.log(`将要发送统计请求，url 为: ${url}`);
        },
      });
    },
  },
};
</script>

<style scoped="" lang="scss">
.content {
  width: 100%;
  height: 100%;
  padding: 30px;
}

.func-block {
  margin-top: 20px;
}

.fe-core-examples {
  p {
    margin-bottom: 10px;
  }
}

h5 {
  color: #3e3e3e;
}
</style>