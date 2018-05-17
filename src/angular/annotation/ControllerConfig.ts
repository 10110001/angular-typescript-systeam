/**
 * Created by wangduo on 16/4/1.
 */
import {routerModule} from '../module/routerModule';

/**
 * 参考 https://angular-ui.github.io/ui-router/site/#/api/ui.router.state.$stateProvider
 */
export interface  ControllerConfig {
    routerName: string
    url: string
    abstract?: boolean
    template?: string
    templateUrl?: string
    templateProvider?: Function | any[];
    controller?: string | Function | any[];
    controllerProvider?: Function | any[];
    controllerAs?: string;
    parent?: string | any;
    resolve?: any;
    views?: any;
    onEnter?: Function | any[];
    onExit?: Function | any[];
    reloadOnSearch?: boolean;
    data?: any;
    params?: any;    
}
