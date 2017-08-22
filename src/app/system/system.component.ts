import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { SystemService } from './system.service';
import {System} from './system';
// import {Subject} from 'rxjs/Subject';

import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {User} from './user';
import { nameAsyncValidator} from '../validator/validators';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css'],
})
export class SystemComponent implements OnInit {
  systems: System[];
  users: User[];
  system: System;
  selectedSystem: System;
  isChecked:boolean;
  title:string ;
  //分页条相关参数
  page:number = 1;
  start:number;
  end:number;
  dbItems:number = 14;
  totalItems:number = 14;
  pageSize:number = 10;
  // system = new Subject<string>();
  public  titleFilter: FormControl = new FormControl();
  public  keyword: string;
  //弹框form参数
  sysform: FormGroup;
  sysnameValue: string;
  sysPeopleValue: string;
  sysDescValue: string;
  sysidValue: number;
  //搜索条参数
  dbSearch:string;
  sysnameSearch:string;



  formErrors = {
    'sysname': '',
    'comments': ''
  };
  validationMessages = {
    'name': {
      'required': '应用系统名称不能为空',
      'maxlength': '应用系统名称的长度不得超过21',
      'pattern': '应用系统名称只可包含中文、英文字符、数字或下划线，不可包含空格'
    },
    'comments': {
      'maxlength': '备注说明长度不可大于40',
    }
  };


  constructor(
    private systemService: SystemService,
    private changeDetectorRef: ChangeDetectorRef,
    fb: FormBuilder

  ) {
    this.titleFilter.valueChanges
      .debounceTime(500)
      .subscribe(
        value => this.keyword = value
      );
    this.sysform = fb.group({
      sysId:[''],
      // sysname: ['', [Validators.required, Validators.maxLength(21), Validators.pattern("^[\u4e00-\u9fa5\w\-]+$")]],
      sysname: ['', [Validators.required,  nameAsyncValidator]],
      principal: [''],
      comments:['']
    })

  }



  ngOnInit(): void {
    this.getSystems();
    this.getUsers();
    this. pagination();
    this.sysform.valueChanges.subscribe(data => this.onValueChanged(data));
  }
  onValueChanged(data) {
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = this.sysform.get(field);
      if (control && control.dirty && !control.valid && control.touched ) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + '';
        }
      }
    }
  }


  getSystems(): void {
     this.systemService.getSystems().subscribe(systems => this.systems = systems);
  }
  getUsers(): void {
    this.systemService.getUsers().subscribe(users => this.users = users);
  }
  pagination() {
    this.start = (this.page-1) * this.pageSize;
    this.end = (this.page)* this.pageSize;
  }
  // search(term: string): void {
  //   // this.system.next(term);
  // }
  setTitle(tit:string, sys:any){
    this.title = tit;
    if (tit == '修改应用系统') {
      this.sysidValue = sys.id;
      this.sysnameValue = sys.sysname;
      this. sysPeopleValue = sys.principal;
      this.sysDescValue = sys.comments;
    }else {
      this.sysidValue = null;
      this.sysnameValue = '';
      this. sysPeopleValue = 'dev';
      this.sysDescValue = '';
    }
  }

  search(searchform){
    this.systemService.search(searchform.value).subscribe(systems => this.systems = systems);
  }
  refresh(){
    this.systemService.getSystems().subscribe(systems => this.systems = systems);
    this.sysnameSearch = '';
    this.dbSearch = '';
  }

  save(sysform){
    const sys = sysform.value;
    // console.log(sysform);
    if (sys.sysId) {
      this.systemService.update(sys,sys.sysId).subscribe(system => {
        for(this.system of this.systems) {
          if(this.system.sysId === system.sysId) {
            this.system.sysname = system.sysname;
            this.system.principal = system.principal;
            this.system.comments = system.comments;
          }
        }
      });
    }else {
      if(sysform.valid){
        // console.log(sysform.form);
        this.systemService.create(sys).subscribe(system => {
          this.systems.push(system);
        } );
      }
    }
  }

  delete(system: System): void{
    this.systemService
      .delete(system.sysId)
      .subscribe(() => {
        this.systems = this.systems.filter(s => s !== system);
        if (this.selectedSystem === system) { this.selectedSystem = null; }
      });
  }


}
