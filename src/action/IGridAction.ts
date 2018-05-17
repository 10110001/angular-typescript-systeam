/**
 * Created by liuyang on 16/1/8.
 */
import {IAction} from "./IAction";
import {IPageInfo} from "../layout/pagination/IPageInfo";

export interface IGridAction extends IAction {

  /**
   * 刷新grid的事件ID
   */
  getRefreshEventId(): string;

  /**
   * 刷新方法,可以在组件中赋值此属性,方便用户直接调用
   */
  refresh: Function;

  /**
   * 从result中获取结果数组
   * result 是onSuccess中的返回值.
   * 如果onSuccess没有给出返回值.
   * 则这里的result为onSuccess的入参response
   * @param result
   */
  getItemList(result: any): any[];

  /**
   * 从result中获取翻页信息
   * @param result
   */
  getPageInfo(result: any): IPageInfo;
}