/**
 * Created by liuyang on 16/01/02.
 * panel组件
 * 无交互行为,纯展示类组件
 */
import {Module} from "../module";
import {PanelLayout} from "../../layout/panel/PanelLayout";
import {InjectHelper} from "../helpers/InjectHelper";
import {PanelAction} from "../action/panel/PanelAction";

Module.directive('consolePanel', ConsolePanel);

var template = `
<div aliyun-simple-table-new
  config="config"
  items="items"
  bind-scope="instanceItem"></div>`;

ConsolePanel.$inject = ['$injector', '$compile']
function ConsolePanel($injector, $compile) {

  function linkFunction(scope, element, attr) {

  }

  return {
    scope: {
      layoutId: '@',
      actionId: '@',
      instanceItem: '='
    },
    controller: 'agility.panelController as vm',
    template: `

    `
  };
}

class ConsolePanelController {
  static $inject = ['$scope', '$injector', '$element', '$compile'];
  constructor(public scope, public injector, public $element, public $compile: ng.ICompileService) {
    this.checkProperty();
    this.init();
  }

  checkProperty() {
    if (!this.scope.layoutId) {
      throw new Error('请指定 layoutId')
    }
  }

  init() {
    var self = this;
    var scope = this.scope;
    var layout = InjectHelper.getLayout(scope.layoutId, this.injector) as PanelLayout;
    scope.config = getPanelConfigFromLayout(layout);
    scope.items = layout.items;
    if(scope.actionId){
      scope.action = InjectHelper.getAction(scope.actionId, this.injector, scope) as PanelAction;
    }
    if(scope.action) scope.action.init(this.injector, scope.instanceItem);

    scope.$watch('items', (newValue) => {
      if (!newValue) {
        return;
      }
      self.$element.html(template);
      self.$compile(self.$element.contents())(scope);
    })
  }
}
Module.controller('agility.panelController', ConsolePanelController)

function getPanelConfigFromLayout(layout: PanelLayout) {
  var config: any = {
    showHeader: false,
    useBindOnce: false,
    toggleShow:{
      hideToggle:true //隐藏这个组件
    },
    layout: {
      columns: (layout.columnsCount || 2).toString(),
      defaultColumnsDivision: layout.defaultColumnsDivision || "1:1" // 默认情况下布局大小的分布
    },
    decorator: layout.decorator
  }

  if (layout.title) {
    config.showHeader = true;
    config.header = {
      title: layout.title,
      toolbar: layout.headerToolbar
    }
  }
  return config;
}
