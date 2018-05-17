import {Layout} from '../../../layout';
import {DefaultAction} from '../action/DefaultAction'
export class InjectHelper {

  /**
   * 默认注册器
   * @param id
   * @param someClass
   * @param module
   */
  static regist(id: string, someClass: any, module: ng.IModule) {
    module.service(id, [someClass]);
  }

  /**
   * 获取layout
   * @param layoutId
   * @param injector
   * @returns {any}
   */
  static getLayout(layoutId, injector): Layout {
    return injector.get(layoutId)
  }

  /**
   * 获取action
   * @param actionId
   * @param injector
   * @param scope
   * @returns {any}
   */
  static getAction(actionId, injector, scope): DefaultAction {
    var action: DefaultAction = injector.get(actionId);
    action.$scope = scope;
    action.$injector = injector;
    return action;
  }
}
