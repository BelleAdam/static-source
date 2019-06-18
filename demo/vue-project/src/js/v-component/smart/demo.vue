<template>

<div class="demo-component">
    <h3>{{tipMsg}}</h3>
    <p>使用 scss 引用静态资源演示：</p>
    <p class="scss-assets-demo"></p>
</div>

</template>

<script>
import siteConfig from 'site-config';
import constants from 'common/constant';
import ajax from 'common/ajax';
import util from 'common/util';
import buildUtil from 'build-util';

export default {
  data() {
    return {
      tipMsg: '请打开 console 查看 JS 演示示例',
    };
  },
  mounted() {
    console.log('站点配置信息获取示例：' + siteConfig.API_BASE_URL);
    console.log('站点常量信息获取示例：' + constants.STATUS_CODE.NOT_FOUND);
    console.log('本地工具模块使用示例：' + util.getNumber());
    console.log('获取静态资源路径示例：' + buildUtil.assetsURL('img/avatar.png'));
    console.log('获取静态资源路径示例：' + buildUtil.staticFilesURL('img/avatar.png'));

    /*
        console.log('AJAX 请求使用示例（因为接口不存在，所以报错正常，此处演示能发出 ajax 请求即可）：');

        ajax
            .get('/user?ID=12345')
            .then(function(response) {
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            });
        */
  },
};
</script>

<style scoped="" lang="scss">
@import '~scss/vue';
.demo-component {
  z-index: zindex('second');

  .scss-assets-demo {
    width: 60px;
    height: 60px;
    background: assetsURL('img/avatar.png') no-repeat;
    background-size: contain;
    z-index: $zindex-fixed;
  }
}
</style>
