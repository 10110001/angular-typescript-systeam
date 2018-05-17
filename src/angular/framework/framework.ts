/**
 * 框架辅助设定
 */
export class Framework {

  /**
   * 加载所有脚本
   * @param  {[type]} webpackRequire [description]
   * @return {[type]}                [description]
   */
  static loadAllScript(webpackRequire) {
    webpackRequire.keys().forEach(function(modulePath) {
      webpackRequire(modulePath);
    });
  }

  /**
   * 初始化路由配置，
   * 根据views的路径来设定
   * 如 views目录下有
   * home.html
   * instance/list.html
   * instance/detail.html
   *
   * 会自动对应找controller：
   * homeController
   * instanceController
   * listController
   * detailController
   *
   * 生成的路由中，instance为abstract的路由
   *
   * @param  {[type]} webpackRequire    [description]
   * @param  {[type]} stateModule       [description]
   * @param  {[type]} templateUrlPrefix [description]
   * @return {[type]}                   [description]
   */
  static initStates(webpackRequire, stateModule, templateUrlPrefix) {
    var req = webpackRequire;
    var stateConfigs = [];
    req.keys().forEach((pathName) => {
      pathName = pathName.replace('./', '');
      var templateUrl = templateUrlPrefix + pathName;
      var url = pathName.replace('.html', '');
      var name = url.replace(/\//g, '.');
      var urlSplitResult = url.split('/');
      var controllerName = urlSplitResult[urlSplitResult.length - 1] + 'Controller';

      setStateConfigs(templateUrl, stateConfigs, name);
    });
    stateModule.config([
      '$stateProvider',
      ($stateProvider) => {
        stateConfigs.forEach((item) => {
          $stateProvider.state(item.name, item)
        });
      }
    ]);
    console.info(`init state: ${angular.toJson(stateConfigs, true)}`);
  }
}

/**
 * 设置stateConfig，如果是abstract，则递归执行
 * @param  {[type]} templateUrl     [description]
 * @param  {[type]} stateConfigs    [description]
 * @param  {[type]} name            [description]
 * @param  {[type]} parentStateName [description]
 * @return {[type]}                 [description]
 */
 function setStateConfigs(templateUrl, stateConfigs, name, parentStateName?) {
   var nameArray = name.split('.');
   var stateName = nameArray[0];
   var isAbstract = nameArray.length > 1;

   if (!isStateExist(stateConfigs, name)) {
     var config: any = {
       name: stateName,
       url: '/' + stateName,
       controller: stateName + 'Controller'
     };
     if (parentStateName) {
       config.name = parentStateName + '.' + stateName;
     }
     if (isAbstract) {
       config.abstract = true;
       config.template = '<div ui-view></div>';
     } else {
       config.templateUrl = templateUrl;
     }

     stateConfigs.push(config);
   }

   if (isAbstract) {
     nameArray.shift();
     var childStateName = nameArray.join('.');
     setStateConfigs(templateUrl, stateConfigs, childStateName, stateName);
   }
 }

 function isStateExist(stateConfigs, name) {
   for (var i=0; i<stateConfigs.length; i++) {
     if (stateConfigs[i].name == 'name') {
       return true;
     }
   }
 }
