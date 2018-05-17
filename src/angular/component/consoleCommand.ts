/**
 * Created by liuyang on 15/12/31.
 * 命令组件
 * 交互行为:
 * withDialog == true(默认值)时:
 *    点击 按钮/链接 --> 弹框确认 --> 发出请求 --> 弹框关闭
 * withDialog == false时
 *    点击 按钮/链接 --> 发出请求
 */
import {Module} from '../module'
import {InjectHelper} from '../helpers/InjectHelper';
import {CommandAction} from '../action/command/CommandAction';

Module.directive('consoleCommand', ConsoleCommand);

ConsoleCommand.$inject = ['$injector', '$q'];
function ConsoleCommand($injector, $q: ng.IQService): ng.IDirective {
  return {
    scope: {
      actionId: '@',
      item: '='
    },
    link: (scope: any, element) => {
      var action = InjectHelper.getAction(scope.actionId, $injector, scope) as CommandAction;
      var dialogService = $injector.get('aliyunDialog') as aliyun.DialogService;

      var title = action.getTitle(scope.item) as string;
      var message = action.getContent(scope.item) as string;

      action.beforeInit();
      element.on('click', () => {
        var actionPromise;
        if (action.withDialog == true) {
          actionPromise = dialogService.showMessageDialogSimple(title, message).result;
        } else {
          var defered = $q.defer()
          actionPromise = defered.promise;
          defered.resolve(true);
        }
        actionPromise.then((result) => {
          if (result == false) {
            action.onCancel();
            return;
          }
          action.beforeRequest();

          action.request(scope.item).then((response) => {
            action.onSuccess(response);
          }, (error) => {
            action.onFailed(error);
          })['finally'](() => {
            action.onFinally();
          });
        }, () => {
          action.onFinally();
        });
      });
      action.afterInit();
    }
  }
}
