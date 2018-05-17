declare module aliyun {

  /**
   * 后端返回结果
   */
  interface ResponseBaseResult {
    code: string;
    data: any;
    message: string;
  }

  /**
   * 模态框
   */
  interface ModalInstance {
    result: ng.IPromise<any>
  }
  /**
   * aliyunDialog
   */
  interface DialogService {
    showDialog(dialogOptions): ModalInstance,
    showDialogByUrl(url: string, callback?: Function, passedObject?: any): ModalInstance,
    showMessageDialog(options: any, callback?: Function, passedObject?: any): ModalInstance,
    showMessageDialogSimple(title: string, message: string, buttons?: any[], passedObject?: any): ModalInstance
  }
}
