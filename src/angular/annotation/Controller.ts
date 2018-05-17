/**
 * Created by wangduo on 16/4/1.
 */
import {controllerModule} from '../module/controllerModule';
import {routerModule} from '../module/routerModule';
import {ControllerConfig} from "./ControllerConfig";

/**
 *
 * @param  {ControllerConfig | string}      param
 *     param 为 string 时，
 *     		注册名为param的controller，可以在注册普通controller时使用
 *     param 为 ControllerConfig 时，
 *     		注册名为 `${param.routerName}Controller` 的controller，同时注册相关路由信息
 * @return {[type]}                [description]
 */
export function Controller(param: ControllerConfig | string) {
    return (TargetClass: any) => {
        var controllerConfig: ControllerConfig;
        var controllerName;
        if (typeof param == 'string') {
            controllerName = param;
        } else if (typeof param == 'object') {
            controllerConfig = param as ControllerConfig;
            controllerName = getControllerName(controllerConfig)
        }
        controllerModule.controller(controllerName, TargetClass);
        if(controllerConfig != undefined){
            routerModule.config([
                '$stateProvider', '$urlRouterProvider',
                ($stateProvider, $urlRouterProvider) => {
                    var routerConfigInfo = {
                        url: controllerConfig.url,
                        controller: `${controllerName} as vm`,
                        abstract: controllerConfig.abstract
                    };
                    if(controllerConfig.template){
                        angular.extend(routerConfigInfo, {
                            template: controllerConfig.template
                        })
                    }
                    if(controllerConfig.templateUrl){
                        angular.extend(routerConfigInfo, {
                            templateUrl: controllerConfig.templateUrl
                        })
                    }
                    $stateProvider.state(controllerConfig.routerName, routerConfigInfo);
                }]);
        }
    };
}

/**
 * 获取controllerName,
 * 配置了controllerConfig, 即router配置的情况
 * controllerName = routerName + 'Controller'
 * @param controllerConfig
 * @returns {any}
 */
function getControllerName(controllerConfig: ControllerConfig) {
    return `${controllerConfig.routerName}Controller`
}
