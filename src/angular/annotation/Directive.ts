/**
 * Created by wangduo on 16/4/1.
 */
import {directiveModule} from '../module/directiveModule';
import {DirectiveFactory} from "../helpers/DirectiveFactory";
import {AnnotationHelper} from "../helpers/AnnotationHelper";

export function Directive(id: string) {
    return (TargetClass: any) => {
        if(id == undefined){
            id = AnnotationHelper.getIdFromClass(TargetClass);
        }
        directiveModule.directive(id, DirectiveFactory.getFactoryFor(TargetClass));
    };
}
