export interface Pagination {
  /**
   * 当前页码
   * @type {number}
   */
  currentPage?: number;
  /**
   * alias to currentPage
   */
  page?: number;

  /**
   * 每页数量
   * @type {number}
   */
  pageSize: number;

  /**
   * 支持分页时，最多展示多少个页码
   * @type {number}
   */
  maxSize?: number;

  /**
   * 是否显示goto
   * @type {boolean}
   */
  showPageGoto?: boolean;
}
