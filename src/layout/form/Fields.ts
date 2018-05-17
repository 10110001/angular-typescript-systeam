export class FormField {
  /**
   * 字段
   * @type {string}
   */
  key: string;
  //字段 别名， alias to key
  name: string;

  /**
   * text | select | password | checkbox | radio | date | custom
   * @type {string}
   */
  type: string;

  /**
   * 表单项左侧的label
   */
  label: string;

  /**
   * 字段的描述信息
   */
  description: string;

  /**
   * 标题css样式
   */
  labelCss: string;

  /**
   * 表单项css样式
   */
  formItemCss: string;

  // template: string;

  templateUrl: string;

  /**
   * ['value-min=10','value-max=20']
   * @type {string[]}
   */
  attributes: string[];

  /**
   * validators
   * @type {any[]}
   */
  validators: any[];

  /**
   * 是否必填项
   * @type {any[]}
   */
  required: boolean;
}
export namespace Field {

  export class Option {
    name: string;
    value: any;
    default: boolean = false;
  }

  export class Radio extends FormField {

    type: string = 'radio';

    options: Option[];
  }

  export class Text extends FormField {
    type: string = 'text';
    /**
     * 默认值
     * @type {string}
     */
    value: string;
  }

  export class Password extends FormField {
    type: string = 'password';
  }

  export class Checkbox extends FormField {
    type: string = 'checkbox';

    options: Option[];
  }

  export class Select extends FormField {
    type: string = 'select';

    options: Option[]
  }

  export class Textarea extends FormField {
    type: string = 'textarea';
    lines: number = 4;
  }

  export class Custom extends FormField {
    type: string = 'custom';

    templateUrl: string;
  }

}
