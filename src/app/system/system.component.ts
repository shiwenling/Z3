import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { SystemService } from './system.service';
import {System} from './system';
// import {Subject} from 'rxjs/Subject';

import { FormControl} from '@angular/forms';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {User} from './user';

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
  sysnameValue: string;
  sysPeopleValue: string;
  sysDescValue: string;
  sysidValue: number;
  //搜索条参数
  dbSearch:string;
  sysnameSearch:string;

  constructor(
    private systemService: SystemService,
    private changeDetectorRef: ChangeDetectorRef,

  ) {
    this.titleFilter.valueChanges
      .debounceTime(500)
      .subscribe(
        value => this.keyword = value
      );

  }
  ngOnInit(): void {
    this.getSystems();
    this.getUsers();
    this. pagination();
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
    const sys = sysform.form.value;
    // console.log(sysform);
    if (sys.id) {
      this.systemService.update(sys,sys.id).subscribe(system => {
        for(this.system of this.systems) {
          if(this.system.id === system.id) {
            this.system.sysname = system.sysname;
            this.system.principal = system.principal;
            this.system.comments = system.comments;
          }
        }
      })
    }else {
      if(sysform.valid){
        // console.log(sysform.form);
        this.systemService.create(sys).subscribe(system => {
          this.systems.push(system);
        } );
        sysform.form.reset();

      }

    }
  }

  delete(system: System): void{
    this.systemService
      .delete(system.id)
      .subscribe(() => {
        this.systems = this.systems.filter(s => s !== system);
        if (this.selectedSystem === system) { this.selectedSystem = null; }
      });
  }


}
