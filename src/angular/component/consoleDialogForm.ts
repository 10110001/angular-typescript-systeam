/**
 * Created by liuyang on 15/12/31.
 * 弹框表单组件
 * 交互行为:
 * 点击 按钮/链接 --> 弹框 --> 填写表单 --> 点击确定提交表单 --> 发起请求 --> 弹框关闭
 */
import {Module} from "../module";
import {DialogFormAction} from "../action/dialogForm/DialogFormAction";
import {DialogFormLayout} from "../../layout/dialogForm/DialogFormLayout";
import {InjectHelper} from "../helpers/InjectHelper";

Module.directive('consoleDialogForm', ConsoleDialogForm);

ConsoleDialogForm.$inject = ['$templateCache', '$injector', 'aliyunDialog'];
function ConsoleDialogForm($templateCache, $injector, aliyunDialog: aliyun.DialogService) {
  return {
    scope: {
      actionId: '@',
      layoutId: '@',
      formData: '='
    },
    link: (scope, element) => {
      var templateUrl = 'agility/consoleDialogForm/dialog.html';
      setDialogTemplateUrl($templateCache, templateUrl);

      var layout = InjectHelper.getLayout(scope.layoutId, $injector) as DialogFormLayout;
      var action: DialogFormAction = InjectHelper.getAction(scope.actionId, $injector, scope);

      element.on('click', () => {
        var modalInstance: aliyun.ModalInstance = aliyunDialog.showDialogByUrl(templateUrl, (dialogScope) => {
          dialogScope.dialogTitle = layout.getDialogTitle();
          dialogScope.confirmButtonText = layout.confirmButtonText || 'OK';
          dialogScope.cancelButtonText = layout.cancelButtonText;
          dialogScope.formData = scope.formData;
          dialogScope.layoutId = scope.layoutId;
          dialogScope.actionId = scope.actionId;
        });

        modalInstance.result.then((result) => {
          if (result == false) {
            return;
          }
          action.beforeRequest();
          action.request(result).then((response) => {
            action.onSuccess(response);
          }, (err) => {
            action.onFailed(err);
          })['finally'](() => {
            action.onFinally();
          });
        });
      });
    }
  }
}

function setDialogTemplateUrl($templateCache, url) {
  var template =  `
  <div>
    <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal"
              data-ng-click="close(false)" aria-hidden="true">&times;</button>
      <h5 class="modal-title">{{dialogTitle}}</h5>
    </div>
    <div class="modal-body">
      <div console-form
        layout-id="{{layoutId}}"
        action-id="{{actionId}}"
        form-data="formData"
        form-valid="formValid"></div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-primary" ng-disabled="!formValid"  data-ng-click="close(formData)">{{confirmButtonText}}</button>
      <button ng-if="cancelButtonText" class="btn btn-default" data-ng-click="close(false)">{{cancelButtonText}}</button>
    </div>
  </div>
  `
  if ($templateCache && url) {
    $templateCache.put(url, template);
  }
  return template;
}
