import {Layout} from '../Layout';
import {FormField} from './Fields';

export class FormLayout implements Layout {
  /**
   * 表单名称
   */
  formName: string;

  /**
   * 表单css样式
   */
  cssClass: string;

  /**
   * fields
   */
  fields: FormField[];
}
