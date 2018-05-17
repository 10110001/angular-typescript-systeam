import {IAction} from '../../action/IAction';

export class DefaultAction implements IAction {

  constructor(public $injector: any = null, public $scope: any = null) {

  }

  beforeInit(): void {

  }

  afterInit(): void {

  }

  beforeRequest(): void {

  }

  request(params: any, ...any): ng.IPromise<any> {
    var $q = this.$injector.get('$q');
    var deferred = $q.defer();
    deferred.resolve();
    return deferred.promise;
  }

  onSuccess(response: any) {

  }

  onFailed(error: any): void {

  }

  onFinally(): void {

  }
}
