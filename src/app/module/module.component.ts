import { Component, OnInit, NgModule } from '@angular/core';
import { ModuleService } from './module.service';
import { Module } from './module';
import {Schema} from './schema';
import {Subject} from 'rxjs/Subject';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {nameAsyncValidator} from '../validator/validators';
import {CoreTable} from './table';


@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css'],

})
export class ModuleComponent implements OnInit {
  modules: Module[];
  module: Module;
  schemas: Schema[];
  schema: Schema;
  coretables: CoreTable[];
  coretable: CoreTable;
  title:string;     //弹框标题
  // module = new Subject<string>();
  // schematable = new Subject<string>();
  isHidden:boolean = false;     //tab页显示/隐藏active类
  isChecked:boolean;  //全选/全不选
  //分页条参数
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
  //模块搜索参数
  sysnameSearch: string = '不限';
  moduleSearch: string ;
  sysnames:string[] = ['0401','0405','11','DDL','Z3','dev','DDLAUDIT2','DDLAUDIT','111'];
  //新增、修改模块弹框中form中的参数
  moduleform: FormGroup;
  moduleidValue: number;
  modulenameValue: string;
  sysnameValue: string;
  modulePeopleValue: string;
  moduleDescValue: string;
  //关联schema搜索参数
  dbnames:string[] = ['ddlpreview2','ddltest1','ddltest2','rac10g','zen_idb10g','aaa','sddd','abc','bcd'];
  dbnameSearch: string = '不限';
  //新增、修改核心表弹框form中的参数
  coretableform: FormGroup;
  coretableIdValue: number;
  coretablenameValue: string;
  coretableDescValue:string;

  constructor(
    private moduleService: ModuleService,
    fb: FormBuilder
  ) {
    this.moduleform = fb.group({
      id: [''],
      modulename: ['', [Validators.required, nameAsyncValidator]],
      sysname: [''],
      principal: [''],
      comments:['']
    });
    this.coretableform = fb.group({
      id: [''],
      tablename: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_]*$')]],
      tablecomments:['']
    })
  }

  ngOnInit(): void {
    this.getModules();
    this.getSchemas();
    this.getCoreTables();
    this.pagination();
    this.getPage();
  }
  getModules(): void {
    this.moduleService.getModules().subscribe(modules => this.modules = modules);

  }
  getSchemas(): void {
    this.moduleService.getSchemas().subscribe(schemas => this.schemas = schemas);
  }
  getCoreTables(): void {
    this.moduleService.getCoreTables().subscribe(coretables => this.coretables = coretables);
  }

  search(searchform){
    this.moduleService.search(searchform.value).subscribe(modules => this.modules = modules);
  }
  searchSchema(searchSchemaform) {
    this.moduleService.searchSchema(searchSchemaform.value).subscribe(schemas => this.schemas = schemas);
  }

  refreshModule(){
    this.moduleService.getModules().subscribe(modules => this.modules = modules);
    this.sysnameSearch = '不限';
    this.moduleSearch = '';
  }
  refreshSchema(){
    this.moduleService.getSchemas().subscribe(schemas => this.schemas = schemas);
  }
  refreshCoreTable(){
    this.moduleService.getCoreTables().subscribe(coretables => this.coretables = coretables);
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

  setTitle(tit:string, module: any, coretable: any){
    this.title = tit;
    if (tit == '修改模块') {
      this.moduleidValue = module.id;
      this.modulenameValue = module.modulename;
      this.sysnameValue = module.sysname;
      this.modulePeopleValue = module.principal;
      this.moduleDescValue = module.comments;
    }else if (tit == '新增模块') {
      this.moduleidValue = null;
      this.modulenameValue = '';
      this.sysnameValue = 'dev';
      this.modulePeopleValue = 'dev';
      this.moduleDescValue = '';
    }else if( tit == '新增核心表'){
      this.coretableIdValue = null;
      this.coretablenameValue = '';
      this.coretableDescValue = '';

    }else if(tit == '修改核心表') {
      this.coretableIdValue = coretable.id;
      this.coretablenameValue = coretable.tablename;
      this.coretableDescValue = coretable.tablecomments;
    }
  }
  pagination() {
    this.start = (this.page-1) * this.pageSize;
    this.end = (this.page)* this.pageSize;
  }
  getPage() {
    this.start1 = (this.page-1) * this.pageSize;
    this.end1 = (this.page)* this.pageSize;
  }
  save(moduleform){
    const module = moduleform.value;
    if (module.id) {
      this.moduleService.update(module,module.id).subscribe(module => {
        for(this.module of this.modules) {
          if(this.module.id === module.id) {
            this.module.modulename =  module.modulename;
            this.module.sysname = module.sysname;
            this.module.principal = module.principal;
            this.module.comments = module.comments;
          }

        }
      });
    }else {
      if(moduleform.valid){
        this.moduleService.create(module).subscribe(module => {
          this.modules.push(module);
        } );
      }
    }
  }
  saveCoretable(form){
    const coretable = form.value;
    if (coretable.id) {
      this.moduleService.updateCoreTable(coretable,coretable.id).subscribe(coretable => {
        for(this.coretable of this.coretables) {
          if(this.coretable.id === coretable.id) {
            this.coretable.tablename =  coretable.tablename;
            this.coretable.tablecomments = coretable.tablecomments;
          }

        }
      });
    }else {
      if(form.valid){
        this.moduleService.createCoreTable(coretable).subscribe(coretable => {
          this.coretables.push(coretable);
        } );
      }
    }
  }

  deleteModule(module: Module): void{
    this.moduleService
      .deleteModule(module.id)
      .subscribe(() => {
        this.modules = this.modules.filter(m => m !== module);
      });
  }
  deleteSchema(schema: Schema): void{
    this.moduleService
      .deleteSchema(schema.dbPk)
      .subscribe(() => {
        this.schemas = this.schemas.filter(s => s !== schema);
      });
  }
  deleteTable(coretable: CoreTable): void {
    this.moduleService
      .deleteCoreTable(coretable.id)
      .subscribe(() => {
        this.coretables = this.coretables.filter(s => s !== coretable);
      });

  }


}
