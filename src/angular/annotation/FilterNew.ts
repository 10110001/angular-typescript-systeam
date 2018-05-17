/**
 * Created by wangduo on 16/9/22.
 */

import {filterModule} from '../module/filterModule';
import {AnnotationHelper} from "../helpers/AnnotationHelper";

export function FilterNew(id: string) {
    return (TargetClass: any) => {
        if(id == undefined){
            id = AnnotationHelper.getIdFromClass(TargetClass);
        }
        filterModule.filter(id, TargetClass.Factory());
    };
}
