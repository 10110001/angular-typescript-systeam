import {Layout} from '../Layout';
import {GridColumn} from './GridColumn';
import {Pagination} from '../pagination/Pagination';
import {SearchItem} from "../searchBar/searchItem";

export class GridLayout implements Layout {

  /**
   * 列定义
   * @type {GridColumn[]}
   */
  columns: GridColumn[];

  /**
   * 翻页信息，若不指定，则认为不支持翻页
   * @type {Pagination}
   */
  pagination: Pagination;
  /**
   * alias to pagination
   */
  paginationInfo: Pagination;

  /**
   * 搜索框，如
   * [
        {value:'deviceName',text:'磁盘名称',placeholder:'请输入磁盘名称进行模糊查询'},
        {value:'deviceNo',text:'磁盘ID',placeholder:'请输入磁盘ID进行精确查询'},
        {value:'instanceId',text:'实例ID',placeholder:'请输入实例ID进行精确查询'},
        {value:'instanceName',text:'实例名称',placeholder:'请输入实例名称进行模糊查询',type:'date'}
      ]
   * @type {SearchItem[]}
   */
  searchItems: SearchItem[];

  /**
   * 客户端排序
   * @type {boolean}
   */
  clientSort: boolean = false;

  /**
   * 服务端排序
   * false，如果设置为true。并且具体的列的设置serverSortEnabled就会执行服务端排序。
   * 如果同时将clientSort和erverSort都设置为true。将自动serverSort设置为false
   * @type {boolean}
   */
  serverSort: boolean = false;

  /**
   * 如果属性为true，则固定tfoot，使得批量操作栏固定在浏览器底部
   * @type {boolean}
   */
  tfootPositionFixed: boolean = false;

  /**
   * bindOnce 支持
   * @type {boolean}
   */
  useBindOnce: boolean = true;

  /**
   * true: 首列将为checkbox
   * @type {boolean}
   */
  checkboxSupport: boolean = false;

  /**
   * 迭代器名称，在fieldDirective中获取当前项的名称
   * 默认为 item
   * @type {string}
   */
  rowItemName: string;

  /**
   * {
        region: [
          {id:'all',text:'全部'},
          {id:'Prepaid',text:'包年包月'},
          {id:'AfterPay',text:'按量'}
        ],
        region2: [
          {id:'all',text:'全部'},
          {id:'Prepaid',text:'包年包月'},
          {id:'AfterPay',text:'按量'}
        ]
      }
   * @type {any}
   */
  filterItems: any;

  /**
   * {
        region: 'Prepaid'
      }
   * @type {any}
   */
  preSelectionFilter: any;

  /**
   * {
        key: 'deviceNo',
        value: 'testinfo'
      }
   * @type {any}
   */
  preSelectionSearch: any;


  tagSearchSupport: boolean = false;
  /**
   * {
        selectedTags:[],
        keyList:[],
        valueList:[]
      }
   * @type {any}
   */
  tagSearch: any;
}

/**
 * Alias to GridLayout
 */
export class GridConfig extends GridLayout {
}
