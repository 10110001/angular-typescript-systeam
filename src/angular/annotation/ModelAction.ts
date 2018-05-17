/**
 * Created by wangduo on 16/4/1.
 */
import {modelModule} from '../module/modelModule';
import {AnnotationHelper} from "../helpers/AnnotationHelper";

export function ModelAction(id: string) {
    return (TargetClass: any) => {
        if(id == undefined){
            id = AnnotationHelper.getIdFromClass(TargetClass);
        }
        modelModule.service(id+'.action', TargetClass);
    };
}
