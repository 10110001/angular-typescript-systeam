export interface GridColumn {
  /**
   * 列名，th中展示
   * 表头要显示的名字。@required。table header name property
   * @type {string}
   */
  name: string;

  /**
   * 取值字段
   * 表头对应的field。field to iterator, generator dependency on rowItemName.
   * @type {[type]}
   */
  field?: string;

  /**
   * filter
   * angular 过滤器。 formatter function for field.
   * @type {[type]}
   */
  filter?: string;

  /**
   * 复杂的field，fieldDirective
   * 配置此项，将采用directive来渲染单元格。need special directive for the field. If this property is setting, @filed @htmlField @truncate
   * @type {[type]}
   */
  fieldDirective?: string;

  /**
   * css class
   * 对该列的自定义css。css property setting.
   * @type {[type]}
   */
  cssProperty?: string;

  /**
   * 如果是html的内容将自动采用html格式文本 if field is html, set the proeprty to true, use bo-html or bind-html.
   * @type {boolean}
   */
  htmlField?: boolean;

  /**
   * 文字是否要截断。 if field is true, it will auto add the  aliyun-truncate-text directive.
   * @type {boolean}
   */
  truncateText?: boolean;

  /**
   * 如果文字需要截断默认的长度为12。if truncateText is set to true, need this property to specify the max length to show ...
   * @type {number}
   */
  truncateTextLength?: number;

  /**
   * 如果属性设置为true，则强制使用bindable。
   * @type {boolean}
   */
  bindable?: boolean;

  /**
   * [disableSort description]
   * @type {boolean}
   */
  disableSort?: boolean;

  /**
   * 如果clientSort被设置为true，可以通过设置这个属性将某些行禁止客户端sort
   * @type {Function}
   */
  sortFunction?: Function;

  /**
   * 只有全局设置serverSort并且当前列的属性设置为true的时候才可以支持服务端排序。
   * @type {boolean}
   */
  serverSortEnabled?: boolean;
}
