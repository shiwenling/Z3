/**
 * Created by TP on 2017/8/18.
 */
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';

//应用系统表单，系统名称校验   应用模块表单，模块名称校验
export function nameAsyncValidator(control: FormControl): any {
  const myreg = /^[\u4e00-\u9fa5\w\-]+$/;
  const valid = myreg.test(control.value);
  // console.log('sysname的校验结果是：' + valid);
  // return Observable.of(valid ? null : {sysnamevalid: true}).delay(5000);
  return valid ? null : {namevalid: true};
}
//表结构管理，项目名称校验
export function peojectnameValidator(control: FormControl): any {
  const myreg = /^[\u4e00-\u9fa5\w\.\-]+$/;
  const valid = myreg.test(control.value);
  // console.log('sysname的校验结果是：' + valid);
  // return Observable.of(valid ? null : {sysnamevalid: true}).delay(5000);
  return valid ? null : {projectnamevalid: true};
}
