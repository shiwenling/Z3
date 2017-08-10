import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {ObjectService} from './object.service';
import {Table} from './table';
import {Sequence} from './sequence';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  objects: Object[];
  tables: Table[];
  sequences: Sequence[];
  object = new Subject<string>();
  table = new Subject<string>();
  page:number = 1;
  start:number;
  end:number;
  totalItems:number = 23;
  tableItems:number = 24;
  pageSize:number = 10;
  tableTitle:string;  //创建表的title
  sequenceTitle:string; //创建序列的title
  sequenceNameValue:string;  //序列modal中“序列名称”的值

  sequenceName:string;  //创建表中“序列名称”的值
  isHidden:boolean;   //创建表modal设置是否隐藏“序列”一行
  isHiddenSeqName:boolean;  //创建表modal设置是否隐藏“序列名”一行
  isReadonly:boolean;  //创建表modal设置"表名"一行是否可编辑
  isEditButton:boolean;  //切换显示“查看序列属性按钮”， “修改序列属性按钮”
  itemValueToSet:string = '创建新序列';   //设置序列名的默认值

  selectSequence:boolean;   //序列modal设置是否显示“序列” "序列名"一行
  seqs:string[]=['创建新序列','选择已有序列','不使用序列'];
  selected:boolean;   //修改现有表modal设置“采集表”和“归档表”二选一
  isHiddenSeq:boolean;  //修改现有序列modal设置radio对应显示页面
  isHiddenTab:boolean  //修改现有表modal设置radio对应显示页面

  constructor(
    private objectService: ObjectService
  ) { }

  ngOnInit() {
    this.getObjects();
    this.pagination();
    this.getPage();
  }
  getObjects():void {
    this.objectService.getObjects().then(objects => this.objects = objects);
    this.objectService.getTables().then(tables => this.tables = tables);
    this.objectService.getSequences().then(sequences => this.sequences = sequences);

  }
  pagination() {
    this.start = (this.page-1) * this.pageSize;
    this.end = (this.page)* this.pageSize;
  }
  getPage(){
    this.start = (this.page-1) * this.pageSize;
    this.end = (this.page)* this.pageSize;
  }
  tableModal(tit:string){
    if(tit == '创建表'){
      this.tableTitle = '创建表';
      this.isReadonly = false;   //设置"表名"一行是否可编辑
      this.isHiddenSeqName = false;
      this.isHidden = false;  //不隐藏“序列”一行
      this.itemValueToSet = '创建新序列';

    }else if( tit == '修改现有表') {
      this.tableTitle = '修改现有表';
      this.isHidden = true;  //隐藏“序列”一行
      this.isReadonly = true;  //设置“表名”只读
      this.isEditButton = false; //设置序列名
      this.isHiddenSeqName = false;
      this.sequenceName = '';

    }else if (tit == '拷贝表'){
      this.tableTitle = '创建表';
      this.isReadonly = false;
      this.isHidden = false;
      this.itemValueToSet = '不使用序列';

    }else if (tit == '归档表修改') {
      this.tableTitle = '修改现有表';
      this.isReadonly = true;  //设置“表名”只读
      this.isHidden = true;  //隐藏“序列”一行
      this.isEditButton = false; //设置序列名  (分两种情况：或者为查看序列属性， 或者为修改序列属性。。。未完待续)
      this.isHiddenSeqName = false;
      this.sequenceName = '';

    }else if(tit == '采集表基线'){

    }
  }

  sequenceModal(tit:string) {
    if(tit == '修改序列属性') {
      this.sequenceTitle = '修改序列属性';
      this.sequenceNameValue = 'SQL_';
      this.selectSequence = false;

    }else if(tit == '创建序列'){
      this.sequenceTitle = '创建序列';
      this.sequenceNameValue = '';
      this.selectSequence = true;

    }
  }

  //根据不同的序列显示不同的序列名
  selectOption(sequenceValue){
    if (sequenceValue == '创建新序列'){
      this.sequenceName = 'SQL_';
      this.isEditButton = false;
      this.isHiddenSeqName = false;
    }else if( sequenceValue == '选择已有序列'){
      this.isEditButton = true;
      this.isHiddenSeqName = false;
    }else if(sequenceValue == '不使用序列'){
      this.isHiddenSeqName = true;
    }
  }

  //已采集表toggle操作
  showSelected(){
    this.selected = !this.selected;

  }

  //修改现有表和修改现有序列序列modal 设置radio对应不同页面
  choose(para:string){
    if(para == '已归档表') {
      this.isHiddenTab = false;
    }else if( para == '已采集表'){
      this.isHiddenTab = true;
    }else if ( para=='已归档序列'){
      this.isHiddenSeq = false;
    }else if (para== '已采集序列'){
      this.isHiddenSeq = true;
    }

  }

}
