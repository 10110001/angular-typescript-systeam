import {DefaultAction} from '../DefaultAction';
import {IGridAction} from "../../../action/IGridAction";
import {IPageInfo} from "../../../layout/pagination/IPageInfo";


/**
 * 请求参数
 * 通过query-param指定的参数,可以通过  gridRequestParams['key']的方式去取
 */
export interface GridRequestParams {

  /**
   * 页码
   */
  currentPage: number,
  /**
   * 翻页,每页数量
   */
  pageSize: number
}

/**
 * 额外的请求信息
 */
export interface GridExtralRequestParams {
  /**
   * 查询参数,推荐直接使用
   */
  params: GridRequestParams;

  /**
   * simple grid原始参数
   */
  orginalParams?: any;

  /**
   * 是否是初始化列表时调用的请求
   */
  isInitTableRequest?: boolean;

  /**
   * sort配置
   */
  sortSetting?: any;

  /**
   * 行为类型
   * undefined | 'search'
   */
  actionType?: string;
}

export class GridAction extends DefaultAction implements IGridAction{

  /**
   * 刷新grid的事件ID
   */
  refreshEventId: string;

  getRefreshEventId(): string {
    return this.refreshEventId
  }

  refresh: Function = (...any) => {};

  request(param: any, extraParams: GridExtralRequestParams): ng.IPromise<any> {
    return super.request(param);
  }

  /**
   * 返回result,交给下一步的 getItemList和getPageInfo使用
   * @param response
   * @returns {any}
   */
  onSuccess(response: any): any {
    return response.data;
  }

  /**
   * 从result中获取结果数组
   * result 是onSuccess中的返回值.
   * 如果onSuccess没有给出返回值.
   * 则这里的result为onSuccess的入参response
   * @param result
   */
  getItemList(result: any): any[] {
    return result.data;
  }

  /**
   * 从result中获取翻页信息
   * @param result
   */
  getPageInfo(result: any): IPageInfo {
    return {
      total: result.total,
      page: result.page,
      pageSize: result.pageSize
    }
  }
}
