import {serviceModule} from '../module/serviceModule';
import {AnnotationHelper} from "../helpers/AnnotationHelper";

export function Service(id: string) {
  return (TargetClass: any) => {
    if(id == undefined){
      id = AnnotationHelper.getIdFromClass(TargetClass);
    }
    serviceModule.service(id, TargetClass);
  };
}
