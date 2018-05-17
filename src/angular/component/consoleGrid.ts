import {Module} from '../module';
import {GridAction, IGridAction, GridLayout, GridConfig, GridExtralRequestParams} from '../../../angular';
import {InjectHelper} from '../helpers/InjectHelper';
import {Controller} from "../annotation/Controller";

declare var angular: ng.IAngularStatic;

Module.directive('consoleGrid', ConsoleGrid);
function ConsoleGrid() {
  return {
    scope: {
      'queryParams': '=?',
      'layoutId': '@',
      'actionId': '@'
    },
    controller: 'ConsoleGridController as vm',
    template: `
      <div aliyun-simple-grid
        columns="vm.columns"
        config="vm.gridConfig"
        pagination-info="vm.pageInfo"
        store="vm.itemList"
        loading-state="vm.isLoading"
        render-table="vm.updateTableData(data)"
        >
      </div>
    `
  }
}

@Controller('ConsoleGridController')
class ConsoleGridController {
  static $inject = ['$scope', '$injector','agility.service.topic'];

  action: IGridAction;

  gridConfig: any;

  columns: any[];

  isLoading: boolean = false;

  itemList: any[];

  defaultPageSize: number;

  pageInfo: {
    total: number,
    page: number,
    pageSize: number
  };

  constructor(public scope: any, public injector: ng.auto.IInjectorService, public serviceTopic) {
    var self = this;

    var layout = InjectHelper.getLayout(scope.layoutId, injector) as GridLayout;
    this.action = InjectHelper.getAction(scope.actionId, injector, scope) as GridAction;
    this.action.beforeInit();

    //the other settings
    this.gridConfig = this.getGridConfig(layout);
    this.columns = layout.columns;

    var refreshEventId = this.action.getRefreshEventId();
    if (refreshEventId) {
      serviceTopic.subscribe(refreshEventId, (event, data) => {
        self.updateTableData();
      });
    }

    this.action.refresh = angular.bind(this, this.updateTableData);

    this.action.afterInit();
  }

  private getGridConfig(layout: GridConfig): any {
    var config: any = {};
    angular.extend(config, layout)
    var pagination = layout.pagination || layout.paginationInfo;
    if (pagination) {
      config.paginationSupport = true;
      config.page = pagination.page || pagination.currentPage;
      config.pageSize = pagination.pageSize;
      this.defaultPageSize = pagination.pageSize;
      config.paginationInfo = {
        maxSize: pagination.maxSize,
        showPageGoto: pagination.showPageGoto,
        page: pagination.currentPage,
        pageSize: pagination.pageSize
      }
    } else {
      config.paginationSupport = false;
    }

    if (layout.searchItems) {
      config.searchSupport = true;
      config.searchItems = layout.searchItems;
    }
    return config;
  }

  updateTableData(data?: GridExtralRequestParams) {
    var self = this;
    var action = this.action;
    if (!data) {
      data = {
        params: {
          currentPage: null,
          pageSize: null
        }
      }
    }
    angular.extend(data.params, self.scope.queryParams);
    action.beforeRequest();
    self.isLoading = true;

    //set default pagination value
    this.setDefaultPageInfo(data);

    action.request(data.params, data).then((response) => {
      var result = action.onSuccess(response);
      self.itemList = action.getItemList(result || response);
      if (self.gridConfig.paginationSupport) {
        self.pageInfo = action.getPageInfo(result || response);
      }
    }, (error) => {
      action.onFailed(error);
    })['finally'](() => {
      self.isLoading = false;
      action.onFinally();
    });
  }

  private setDefaultPageInfo(request: GridExtralRequestParams) {
    request.params.currentPage = request.params.currentPage || 1;
    request.params.pageSize = request.params.pageSize || this.defaultPageSize;
  }
}
