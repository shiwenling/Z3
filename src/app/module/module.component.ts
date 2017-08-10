import { Component, OnInit, NgModule } from '@angular/core';
import { ModuleService } from './module.service';
import { Module } from './module';
import { Schematable} from './schema-table';
import {Subject} from 'rxjs/Subject';


@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css'],

})
export class ModuleComponent implements OnInit {
  modules: Module[];
  schematables: Schematable[];
  page:number = 1;
  start:number;
  end:number;
  start1:number;
  end1:number;
  schemaItems:number = 21;
  tableItems:number = 21;
  chooseSchemaItems:number = 21;
  totalItems:number = 16;
  pageSize:number = 10;
  title:string;
  isChecked:boolean;  //全选/全不选
  module = new Subject<string>();
  schematable = new Subject<string>();
  isHidden:boolean = false;


  constructor(
    private moduleService: ModuleService
  ) { }

  ngOnInit(): void {
    this.getModules();
    this.getSchematables();
    this.pagination();
    this.getPage();
  }
  getModules(): void {
    this.moduleService.getModules().then(modules => this.modules = modules);

  }
  getSchematables(): void {
    this.moduleService.getSchematables().then(schematables => this.schematables = schematables);
  }

  //tab切换操作
  choose(para:string):void {
    if (para=='Schema'){
      this.isHidden = false;
    }
    else if(para == '核心表'){
      this.isHidden = true;
    }
  }

  setTitle(tit:string){
    this.title = tit;
  }
  pagination() {
    this.start = (this.page-1) * this.pageSize;
    this.end = (this.page)* this.pageSize;
  }
  getPage() {
    this.start1 = (this.page-1) * this.pageSize;
    this.end1 = (this.page)* this.pageSize;
  }

}
