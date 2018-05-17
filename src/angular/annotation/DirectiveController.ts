/**
 * Created by wangduo on 16/4/1.
 */
import {directiveModule} from '../module/directiveModule';
import {AnnotationHelper} from "../helpers/AnnotationHelper";

export function DirectiveController(id: string){
    return (TargetClass: any) => {
        if(id == undefined){
            id = AnnotationHelper.getIdFromClass(TargetClass);
        }
        directiveModule.controller(id, TargetClass);
    };
}
