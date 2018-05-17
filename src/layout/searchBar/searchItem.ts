export interface SearchItem {
  /**
   * search key
   * @type {string}
   */
  value: string;

  /**
   * search text
   * @type {string}
   */
  text: string;

  /**
   * placeholder
   * @type {[type]}
   */
  placeholder?: string;

  /**
   * 类型，undefined | date
   * @type {[type]}
   */
  type?: string;
}
