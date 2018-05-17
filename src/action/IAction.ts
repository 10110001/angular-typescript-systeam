/**
 * Created by liuyang on 15/12/31.
 */
/**
 * 组件行为接口
 */
export interface IAction {

  /**
   * 组件初始化之前
   */
  beforeInit(): void;

  /**
   * 组件初始化完成
   */
  afterInit(): void;

  /**
   * 请求前的处理
   */
  beforeRequest(): void;

  /**
   * 组件请求数据的的行为
   * 返回一个Promise
   * //TODO: 指定一个Promise的返回类型
   * @param params
   */
  request(params: any, ...any): any;

  /**
   * 请求成功
   * @param response
   */
  onSuccess(response: any): any;

  /**
   * 请求失败
   * @param error
   */
  onFailed(error: any): void;

  /**
   * 请求结束
   * 不论失败还是成功,都会执行此方法
   */
  onFinally(): void;
}
