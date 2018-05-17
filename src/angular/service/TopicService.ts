/**
 * Created by wangduo on 16/3/30.
 */
'use strict';
declare var angular: ng.IAngularStatic;
import {Service} from '../annotation/Service';

@Service('agility.topic.service')
@Service('agility.service.topic')
export class TopicService {

  static $inject=['$rootScope', '$q'];
  constructor(public $rootScope, public $q){
  }

  publish(channelId:string, content?:any, needModalResult?:boolean){
    if(needModalResult === true){
      var deferred  = this.$q.defer();
      if(angular.isString(content)){
        content = {
          message: content,
          modalResultDeferred: deferred
        }
      }else{
        content.modalResultDeferred = deferred;
      }
      this.$rootScope.$emit(channelId, content)
      return deferred.promise;
    }
    this.$rootScope.$emit(channelId, content)
  }

  subscribe(channelId:string, handler: Function = undefined){
    return this.$rootScope.$on(channelId, handler)
  }
}
