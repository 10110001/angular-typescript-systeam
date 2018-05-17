import {DefaultAction} from '../DefaultAction';

export abstract class CommandAction extends DefaultAction {

  /**
   * 是否需要弹窗
   * true - 需要弹框
   * false - 不需要弹框
   * @type {boolean}
   */
  withDialog: boolean = true;

  /**
   * 弹窗标题
   * @return {string} [description]
   */
  getTitle(instance: any): string {
    if (this.withDialog == true) {
      console.warn('withDialog == true 时, 请覆盖 getTitle 方法');
    }
    return '弹窗标题';
  };

  /**
   * 弹窗文案
   * @param  {any}    instance [description]
   * @return {string}          [description]
   */
  getContent(instance: any): string {
    if (this.withDialog == true) {
      console.warn('withDialog == true 时, 请覆盖 getContent 方法');
    }
    return '弹窗内容';
  };

  /**
   * 点击取消时的行为
   */
  onCancel(): void {

  }
}
