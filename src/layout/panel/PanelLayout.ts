import {Layout} from "../Layout";

export interface PanelCell {

  /**
   * label 名
   * @type {string}
   */
  name: string;

  /**
   * 使用双向绑定
   * @type {boolean}
   */
  bindable?: boolean;

  /**
   * 通过bindScope，引用对应字段
   * 如：
   * bindScope.instanceId
   * @type {string}
   */
  field?: string;

  /**
   * 复杂情况，需要用html
   * @type {[type]}
   */
  fieldDirective?: string;

  /**
   * 是否进行字符的截断
   * @type {boolean}
   */
  truncateText?: boolean;

  /**
   * truncateTextLength: "40"
   * @type {string}
   */
  truncateTextLength?: string;
}

export class PanelLayout implements Layout {

  /**
   * 标题
   */
  title: string;

  /**
   * header 上的操作栏html
   * 可以使用directive
   * @type {string}
   */
  headerToolbar: string;

  /**
   * 定义有几列
   * @type {number}
   */
  columnsCount: number = 2;

  /**
   * 定义各列宽度比
   * 比如 columnsCount = 3时,可以用 '1:2:1'
   * @type {string}
   */
  defaultColumnsDivision: string = '1:1';

  /**
   * 每一项定义
   */
  items: PanelCell[];

  /**
   * 可以重新任何aliyunsimpletable的任何方法
   */
  decorator: any
}
