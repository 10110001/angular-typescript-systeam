/**
 * Created by liuyang on 15/12/24.
 * 表单组件
 * 交互行为:
 * 表单
 */
import {FormLayout} from "../../layout/form/FormLayout";
import {Module} from '../module';
import {InjectHelper} from '../helpers/InjectHelper';
import {FormAction} from '../action/form/FormAction';
import {Field, FormField} from '../../layout/form/Fields';

Module.directive('consoleForm', ConsoleForm);
function ConsoleForm(): ng.IDirective {
  return {
    scope: {
      formData: '=',
      formValid: '=?',
      formScope: '=?',
      layoutId: '@',
      actionId: '@'
    },
    transclude: true,
    controller: 'consoleFormController as vm',
    template: `
      <div class="clearfix"
        simple-form-new
        name="formScope"
        result="vm.formData"
        fields="vm.formFields"
        options="vm.formConfig"
        on-submit="onSubmit(formData)">

        <div ng-transclude></div>
      </div>
    `
  }
}

var fieldHandler = {
  'select': handleSelectField,
  'radio': handleRadioField
};

class ConsoleFormController {
  static $inject = ['$scope', '$injector'];

  formFields: any[] = [];
  formData;
  formConfig;
  onSubmit: any;

  constructor(public scope, public injector) {
    var self = this;

    var layout = InjectHelper.getLayout(scope.layoutId, injector) as FormLayout;

    var action
    if (scope.actionId) {
      action = InjectHelper.getAction(scope.actionId, injector, scope) as FormAction;
    } else {
      action = new FormAction(scope, injector);
    }

    action.beforeInit()

    this.setFormFieldFromLayout(layout);
    this.setFormConfigFromLayout(layout);

    this.formData = scope.formData || {};

    this.onSubmit = (formData) => {
      action.beforeRequest();
      action.request(self.formData).then((response) => {
        action.onSuccess(response);
      }, (err) => {
        action.onFailed(err);
      })['finally'](() => {
        action.onFinally();
      });
    }

    this.watchFormValid();
    this.watchFormData();
    action.afterInit();
  }

  setFormConfigFromLayout(layout: FormLayout): void {
    aliasProperty(layout, 'uniqueFormId', 'formName');
    aliasProperty(layout, 'formStyle', 'cssClass');
    this.formConfig = {
      uniqueFormId: layout['uniqueFormId'],
      formStyle: layout['formStyle']
    };
  }

  setFormFieldFromLayout(layout: FormLayout): void {
    var self = this;
    if (angular.isArray(layout.fields)) {
      layout.fields.forEach((field) => {
        self.formFields.push(parseField(field));
      });
    }
  }

  watchFormValid() {
    var scope = this.scope;
    scope.$watch('formScope.$invalid', () => {
      if (!scope.formScope) {
        return;
      }
      scope.formValid = !scope.formScope.$invalid;
    });
  }

  watchFormData() {
    var scope = this.scope;
    scope.$watch('vm.formData', () => {
      scope.formData = scope['vm'].formData;
    }, true);
  }
}
Module.controller('consoleFormController', ConsoleFormController);


function parseField(originField: FormField) {
  var field = angular.copy(originField);

  aliasProperty(field, 'key', 'name');
  aliasProperty(field, 'labelWidth', 'labelCss');
  aliasProperty(field, 'formItemWidth', 'formItemCss');

  var extraHandler = fieldHandler[field.type] || angular.noop;
  extraHandler(field);
  return field;
}

function handleRadioField(field: Field.Radio) {
  if (angular.isArray(field.options)) {
    field.options.forEach((option: Field.Option) => {
      aliasProperty(option, 'checked', 'default')
    });
  }
  return field;
}

function handleSelectField(field: Field.Select) {
  if (angular.isArray(field.options)) {
    field.options.forEach((option: Field.Option) => {
      aliasProperty(option, 'selected', 'default');
    });
  }
  return field;
}

function aliasProperty(object: any, origin: string, alias: string) {
  if (!object[origin]) {
    object[origin] = object[alias]
  }
}
