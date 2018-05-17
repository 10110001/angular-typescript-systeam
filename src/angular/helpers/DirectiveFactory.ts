/**
 * Created by wangduo on 16/4/1.
 */
export class DirectiveFactory{
    public static getFactoryFor(classType: any): ng.IDirectiveFactory {
        var factory = (...args: any[]): any => {
            var newInstance = Object.create(classType.prototype);
            newInstance.constructor.apply(newInstance, args);
            return newInstance;
        }
        factory.$inject = classType.$inject;
        return factory;
    }
}