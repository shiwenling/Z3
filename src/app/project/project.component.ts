import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {ObjectService} from './object.service';
import {Object} from './object';
import {Table} from './table';
import {Sequence} from './sequence';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {valueValidator} from '../validator/validators';
import {concatMap} from 'rxjs/operator/concatMap';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  objects: Object[];
  object: Object;
  tables: Table[];
  sequences: Sequence[];
  // object = new Subject<string>();
  table = new Subject<string>();
  page = 1;
  start: number;
  end: number;
  totalItems = 23;
  tableItems= 24;
  pageSize = 10;
  // 搜索条参数
  objectType: string[] = ['不限', '表', '序列'];
  objectTypeSearch = '不限';
  objectNameSearch: string;
  // 创建表
  tableTitle: string;  // 创建表的title
  sequenceName: string;  // 创建表中“序列名称”的值
  isHidden: boolean;   // 创建表modal设置是否隐藏“序列”一行
  isHiddenSeqName: boolean;  // 创建表modal设置是否隐藏“序列名”一行
  isReadonly: boolean;  // 创建表modal设置"表名"一行是否可编辑
  isEditButton: boolean;  // 切换显示“查看序列属性按钮”， “修改序列属性按钮”
  itemValueToSet = '创建新序列';   // 设置序列名的默认值
  tableform: FormGroup;
  dataFuncs: string[] = ['业务数据', '配置数据', '业务数据备份', '日志'];

  // 创建序列
  sequenceTitle: string; // 创建序列的title
  // sequenceNameValue:string;  // 序列modal中“序列名称”的值
  isHiddenTopSeq: boolean;   // 序列modal设置是否显示“序列” 一行
  isHiddenTopSeqName: boolean;   // 序列modal设置是否显示 "序列名"一行
  isSeqReadonly: boolean;  // 设置序列表单是否是“只读”
  isHiddenForm: boolean;  // 设置整个表单是否隐藏（只有选择不使用序列时隐藏）
  isSelfGrowReadonly: boolean;   // 设置序列表单中“自增值”是否为“只读”
  isCacheReadonly: boolean;   // 设置序列表单中“缓存大小”是否为“只读”
  isDescribeReadonly: boolean;   // 设置序列表单中“描述”是否为“只读”
  seqValue = '创建新序列';     // 设置序列名的默认值
  seqs: string[]= ['创建新序列', '选择已有序列', '不使用序列'];
  sequenceform: FormGroup;
  sequenceIdValue: number;
  sequenceNameValue: string;    // 序列modal中“序列名称”的值
  sequenceMaxValue: number;
  sequenceMinValue = 1;
  selfGrowValue = 1;
  sequenceCacheValue = 20;
  cycleValue: boolean;
  orderValue: boolean;
  sequencecommentsValue: string;
  isMaxValueMin: boolean;
  isMinValueMax: boolean;



  selected: boolean;   // 修改现有表modal设置“采集表”和“归档表”二选一
  isHiddenSeq: boolean;  // 修改现有序列modal设置radio对应显示页面
  isHiddenTab: boolean;  // 修改现有表modal设置radio对应显示页面

  constructor(
    private objectService: ObjectService,
    fb: FormBuilder
  ) {
    this.tableform = fb.group({
      tableId: [''],
      tableName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_]*$')]],  // 中英文、数字、下划线
      tablePk: ['', Validators.required],
      tableDateFunction: [''],
      select: [''],
      tableSequence: [''],
      tablecomments: ['', Validators.required],
    });
    this.sequenceform = fb.group({
      sequenceId: [''],
      sequenceName: ['' , [Validators.required, Validators.pattern('^[a-zA-Z0-9_]*$')]],
      maxValue: [ , valueValidator],
      minValue: [ 1 , valueValidator],
      selfGrowValue: [1],
      cacheValue: [20],
      cycle: [false],
      order: [false],
      sequencecomments: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.getObjects();
    this.pagination();
    this.getPage();
  }
  getObjects(): void {
    this.objectService.getObjects().subscribe(objects => this.objects = objects);
    this.objectService.getTables().subscribe(tables => this.tables = tables);
    this.objectService.getSequences().subscribe(sequences => this.sequences = sequences);

  }
  search(searchform) {
    this.objectService.search(searchform.value).subscribe(objects => this.objects = objects);
  }
  refresh() {
    this.objectService.getObjects().subscribe(objects => this.objects = objects);
    this.objectTypeSearch = '不限';
    this.objectNameSearch = '';
  }

  delete(object: Object):void {
    this.objectService
      .delete(object.id)
      .subscribe(() => {
        this.objects = this.objects.filter(o => o !== object);
      });
  }

  pagination() {
    this.start = (this.page - 1) * this.pageSize;
    this.end = (this.page) * this.pageSize;
  }
  getPage() {
    this.start = (this.page - 1) * this.pageSize;
    this.end = (this.page) * this.pageSize;
  }
  tableModal(tit: string) {
    if (tit === '创建表') {
      this.tableTitle = '创建表';
      this.isReadonly = false;   // 设置"表名"一行是否可编辑
      this.isHiddenSeqName = false;
      this.isHidden = false;  // 不隐藏“序列”一行
      this.itemValueToSet = '创建新序列';
      this.sequenceName = 'SQL_';

    }else if ( tit === '修改操作') {
      this.tableTitle = '修改现有表';
      this.isHidden = true;  // 隐藏“序列”一行
      this.isReadonly = true;  // 设置“表名”只读
      this.isEditButton = false; // 设置序列名  设置序列名  (分两种情况：或者为查看序列属性， 或者为修改序列属性。。。未完待续)
      this.isHiddenSeqName = false;
      this.sequenceName = '';

    }else if (tit === '拷贝表') {
      this.tableTitle = '创建表';
      this.isReadonly = false;
      this.isHidden = false;
      this.itemValueToSet = '不使用序列';
      this.isHiddenSeqName = true;

    }else if (tit === '归档表修改') {
      this.tableTitle = '修改现有表';
      this.isReadonly = true;  // 设置“表名”只读
      this.isHidden = true;  // 隐藏“序列”一行
      this.isEditButton = false; // 设置序列名  (分两种情况：或者为查看序列属性， 或者为修改序列属性。。。未完待续)
      this.isHiddenSeqName = false;
      this.sequenceName = '';

    }else if (tit === '采集表基线' || tit === '对比表基线') {
      this.tableTitle = '修改现有表';
      this.isReadonly = true;  // 设置“表名”只读
      this.isHidden = true;  // 隐藏“序列”一行
      this.isEditButton = false; // 设置序列名
      this.isHiddenSeqName = false;
      this.sequenceName = '';

    }
  }

  chooseModal(value: string) {
    if (value === '表') {
      this.tableTitle = '修改现有表';
      this.isHidden = true;  // 隐藏“序列”一行
      this.isReadonly = true;  //  设置“表名”只读
      this.isEditButton = false; // 设置序列名  设置序列名  (分两种情况：或者为查看序列属性， 或者为修改序列属性。。。未完待续)
      this.isHiddenSeqName = false;
      this.sequenceName = '';
    } else if (value === '序列') {
      this.sequenceTitle = '修改序列属性';
      this.isHiddenTopSeq = true;   // 是否隐藏最上面“序列”一行
      this.isHiddenTopSeqName = true; // 是否隐藏最上面“序列名”一行
      this.sequenceNameValue = 'SQL_';  // 修改序列属性的序列名称为'SQL_'+'表名'
      this.isSeqReadonly = false;  // 表单是否“只读”
      this.isSelfGrowReadonly = false;
      this.isCacheReadonly = false;
      this.isDescribeReadonly = false;
    }
    if (value === '序列') {
      console.log('运行')
      return true;
    }else {
      return false;
    }
  }

  sequenceModal(tit: string, object) {
    if (tit === '创建序列') {
      this.sequenceTitle = '创建序列';
      this.isHiddenTopSeq = true;   // 是否隐藏最上面“序列”一行
      this.isHiddenTopSeqName = true; // 是否隐藏最上面“序列名”一行
      this.sequenceNameValue = '';  // 序列名称的默认值
      this.isSeqReadonly = false;  // 表单是否“只读”
      this.isSelfGrowReadonly = false;
      this.isCacheReadonly = false;
      this.isDescribeReadonly = false;



    } else if (tit === '修改操作') {
      this.sequenceTitle = '修改序列属性';
      this.isHiddenTopSeq = true;   // 是否隐藏最上面“序列”一行
      this.isHiddenTopSeqName = true; // 是否隐藏最上面“序列名”一行
      this.isSeqReadonly = false;  // 表单是否“只读”
      this.isSelfGrowReadonly = false;
      this.isCacheReadonly = false;
      this.isDescribeReadonly = false;
      this.sequenceNameValue = object.objectName;  // 修改序列属性的序列名称为 表格中的数据
      this.sequencecommentsValue = object.comments;
      this.sequenceIdValue =  object.id;

    } else if (tit === '修改序列属性') {
      this.sequenceTitle = '修改序列属性';
      this.sequenceNameValue = 'SQL_';  // 修改序列属性的序列名称为'SQL_'+'表名'
      this.isSeqReadonly = false;  // 表单是否“只读”
      this.isSelfGrowReadonly = false;
      this.isCacheReadonly = false;
      this.isDescribeReadonly = false;
      if ( this.isHidden === true ) {
        this.isHiddenTopSeq = false;   // 是否隐藏最上面“序列”一行
        this.isHiddenTopSeqName = true;  // 是否隐藏“序列名”一行

      }else if ( this.isHidden === false ) {
        this.isHiddenTopSeq = true;   // 是否隐藏最上面“序列”一行
        this.isHiddenTopSeqName = true;  // 是否隐藏“序列名”一行
      }

    }else if (tit === '查看序列属性') {
      this.sequenceTitle = '查看序列属性';
      this.isHiddenTopSeq = true;   // 是否隐藏最上面“序列”一行
      this.isHiddenTopSeqName = true; // 是否隐藏最上面“序列名”一行
      this.sequenceNameValue = 'SQL_';  // 修改序列属性的序列名称为'SQL_'+'表名'
      this.isSeqReadonly = true;  // 表单是否“只读”
      this.isSelfGrowReadonly = true;
      this.isCacheReadonly = true;
      this.isDescribeReadonly = true;

    }else if (tit === '归档序列修改') {
      this.sequenceTitle = '修改序列属性';
      this.isHiddenTopSeq = true;   // 是否隐藏最上面“序列”一行
      this.isHiddenTopSeqName = true; // 是否隐藏最上面“序列名”一行
      this.sequenceNameValue = 'SQL_';  // 修改序列属性的序列名称为 表格中的数据
      this.isSeqReadonly = true;  // 表单是否“只读”
      this.isSelfGrowReadonly = false;
      this.isCacheReadonly = false;
      this.isDescribeReadonly = false;

    }else if (tit === '采集序列查看') {
      this.sequenceTitle = '查看序列信息';
      this.isHiddenTopSeq = true;   // 是否隐藏最上面“序列”一行
      this.isHiddenTopSeqName = true; // 是否隐藏最上面“序列名”一行
      this.sequenceNameValue = 'SQL_';  // 修改序列属性的序列名称为 表格中的数据
      this.isSeqReadonly = true;  // 表单是否“只读”
      this.isSelfGrowReadonly = true;
      this.isCacheReadonly = true;
      this.isDescribeReadonly = true;

    }else if (tit === '采集序列基线') {
      this.sequenceTitle = '修改现有序列';
      this.isHiddenTopSeq = true;   //  是否隐藏最上面“序列”一行
      this.isHiddenTopSeqName = true; // 是否隐藏最上面“序列名”一行
      this.sequenceNameValue = 'SQL_';  // 修改序列属性的序列名称为 表格中的数据
      this.isSeqReadonly = true;  // 表单是否“只读”
      this.isSelfGrowReadonly = false;
      this.isCacheReadonly = false;
      this.isDescribeReadonly = false;

    }
  }

  // 序列modal，最小值和最大值设置
  compare(sequenceform , input) {
    const minvalue  = sequenceform.get('minValue').value;
    const maxvalue = sequenceform.get('maxValue').value;
    const inputValue = input.value;
    const min = parseInt(minvalue, 10);
    const max = parseInt(maxvalue, 10);
    const inputvalue = parseInt(inputValue, 10);
    if (inputvalue ===  maxvalue) {
      if (inputvalue && min > inputvalue) {
        this.isMaxValueMin = true;
      }else {
        this.isMaxValueMin = false;
      }
    }else if (inputvalue === minvalue) {
      if (inputvalue && max < inputvalue) {
        this.isMinValueMax = true;
      }else {
        this.isMinValueMax = false;
      }
    }
  }
  saveSequence(sequenceform) {
    const sequence = sequenceform.value;
    const object = sequence;
    object.id =  object.sequenceId;

    object.objectName = object.sequenceName;
    object.comments = object.sequencecomments;
    if (object.id) {
      // if(sequenceform.valid){
        this.objectService.update(object, object.id).subscribe(object => {
          for (this.object of this.objects) {
            if (this.object.id === object.id) {
              this.object.objectName = object.objectName;
              this.object.comments = object.comments;
            }
          }
        });
      // }

    }else {
      // if (sequenceform.valid) {
        object.objectType ='序列';
        object.changeType = '新建';
        this.objectService.create(object).subscribe( object => {
          this.objects.push(object);
        } );
      // }
    }
  }


  // 根据不同的序列显示不同的序列名
  selectOption(sequenceValue: string) {
    if (sequenceValue === '创建新序列') {
      this.sequenceName = 'SQL_';   // 修改序列属性的序列名称为'SQL_'+'表名'
      this.isEditButton = false;    // 是否隐藏修改按钮
      this.isHiddenSeqName = false;  // 是否隐藏“序列名”
    }else if ( sequenceValue === '选择已有序列') {
      this.isEditButton = true;
      this.isHiddenSeqName = false;
    }else if (sequenceValue === '不使用序列') {
      this.isHiddenSeqName = true;
    }
  }
  // 根据不同的序列设置是否隐藏序列名
  selectSeq(sequenceValue: string) {
    if (sequenceValue === '创建新序列') {
      this.sequenceName = 'SQL_';   // 修改序列属性的序列名称为'SQL_'+'表名'
      this.isHiddenTopSeqName = true;   // 设置“序列名”是否隐藏
      this.isHiddenForm = false;  // 是否隐藏“序列”表单
    }else if ( sequenceValue === '选择已有序列') {
      this.sequenceName = 'SQL_';   // 修改序列属性的序列名称为'SQL_'+'表名'
      this.isHiddenTopSeqName = false;   // 设置“序列名”是否隐藏
      this.isHiddenForm = false;  // 是否隐藏“序列”表单
    }else if (sequenceValue === '不使用序列') {
      this.isHiddenTopSeqName = true;   // 设置“序列名”是否隐藏
      this.isHiddenForm = true;  // 是否隐藏“序列”表单
    }
  }

  // 已采集表toggle操作
  showSelected() {
    this.selected = !this.selected;

  }

  // 修改现有表和修改现有序列序列modal 设置radio对应不同页面
  choose(para: string) {
    if (para === '已归档表') {
      this.isHiddenTab = false;
    }else if ( para === '已采集表') {
      this.isHiddenTab = true;
    }else if ( para === '已归档序列') {
      this.isHiddenSeq = false;
    }else if (para === '已采集序列') {
      this.isHiddenSeq = true;
    }

  }

}
