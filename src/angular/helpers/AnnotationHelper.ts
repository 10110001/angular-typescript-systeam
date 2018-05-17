/**
 * Created by wangduo on 16/4/27.
 */
export class AnnotationHelper{
  static getIdFromClass(targetClass) {
    let className = targetClass.name;
    let id = className.substring(0,1).toUpperCase( ) + className.substring(1);
    return id;
  }
}
