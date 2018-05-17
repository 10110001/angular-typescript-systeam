/**
 * Created by wangduo on 16/4/1.
 */
import {filterModule} from '../module/filterModule';
import {AnnotationHelper} from "../helpers/AnnotationHelper";

export function Filter(id: string) {
    return (TargetClass: any) => {
        console.warn('deprecated annotation, please use FilterNew')
        if(id == undefined){
            id = AnnotationHelper.getIdFromClass(TargetClass);
        }
        filterModule.filter(id, TargetClass.filter);
    };
}
