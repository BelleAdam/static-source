import siteConfig from 'site-config';
import constants from 'common/constant';
import ajax from 'common/ajax';
import util from 'common/util';
import buildUtil from 'build-util';
import userPannel from 'tpl/user-pannel.art';

console.log('站点配置信息获取示例：' + siteConfig.API_BASE_URL);
console.log('站点常量信息获取示例：' + constants.STATUS_CODE.NOT_FOUND);
console.log('本地工具模块使用示例：' + util.getNumber());
console.log('获取静态资源路径示例：' + buildUtil.assetsURL('img/avatar.png'));
console.log('获取静态资源路径示例：' + buildUtil.staticFilesURL('img/avatar.png'));
console.log('artTemplate 示例：' + userPannel({ name: 'fe' }));

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

export default {};
