import {FormLayout} from "../form/FormLayout";

export class DialogFormLayout extends FormLayout {

  public confirmButtonText: string = '确定';
  public cancelButtonText: string = '取消';

  public title: string = '标题';
  /**
   * 设置弹窗标题
   * @returns {string}
   */
  getDialogTitle(): string {
    return this.title;
  }
}
