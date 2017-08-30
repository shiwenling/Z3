import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {ObjectService} from './object.service';
import {Object} from './object';
import {Table} from './table';
import {Sequence} from './sequence';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {valueValidator} from '../validator/validators';
import {TableInfo} from './tableInfo';
import {Column} from './columns';

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
  tableinfos : TableInfo[];
  tableinfo: TableInfo;
  columns : Column[];
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
  isKeyNull: boolean = false;
  keyValue: string;   //主键值
  isEdit: string = 'true'; //创建表里面的列名是否可编辑
  tablenameValue: string;
  dataTypes: string[] = ['VARCHAR2', 'NUMBER', 'DATE', 'CHAR', 'TIMESTAMP', 'BLOB', 'CLOB']; //创建表的数据类型
  datafunction : string ;
  tableComment : string; //表的描述
  tableid: number;
  selectSequence : string;
  tableofSequence: string ;    // 创建表的序列名
  tableselectSequence: string;   // 记录表中的序列选项
  tablekeyValue : string;
  isSeeButton: boolean;

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
      tableDateFunction: ['业务数据'],
      select: [''],
      tableSequence: ['SQL_'],
      tablecomments: ['', Validators.required],
    });
    this.sequenceform = fb.group({
      sequenceId: [''],
      sequenceName: ['SQL_' , [Validators.required, Validators.pattern('^[a-zA-Z0-9_]*$')]],
      maxValue: [ , valueValidator],
      minValue: [ 1 , [Validators.required, valueValidator]],
      selfGrowValue: [1],
      cacheValue: [20],
      cycle: [false],
      order: [false],
      sequencecomments: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getObjects();
    this.pagination();
    this.getPage();

  }
  selectoption(select){
    const options = select.getElementsByTagName('option');
    let length = options.length;
    for (let i = 0; i<length;) {
      if (options[i].value == ''){
        options[i].remove();
        i = i;
      }else{
        i++;
      }
    }
  }
  getObjects(): void {
    this.objectService.getObjects().subscribe(objects => this.objects = objects);
    this.objectService.getTables().subscribe(tables => this.tables = tables);
    this.objectService.getSequences().subscribe(sequences => this.sequences = sequences);
    this.objectService.getTableInfos().subscribe(tableinfos => this.tableinfos = tableinfos);

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
  deleteColumn(tableinfo: TableInfo):void {
    this.objectService
      .deleteColumn(tableinfo.id)
      .subscribe(() => {
        this.tableinfos = this.tableinfos.filter(t => t !== tableinfo);
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
  tableModal(tit: string, object) {
    if (tit === '创建表') {
      this.tableTitle = '创建表';
      this.isReadonly = false;   // 设置"表名"一行是否可编辑
      this.isHiddenSeqName = false;
      this.isHidden = false;  // 不隐藏“序列”一行
      this.itemValueToSet = '创建新序列';
      this.isEditButton = false;
      this.tablenameValue = ''; // 设置表名的值
      this.sequenceName = 'SQL_';
      this.keyValue = 'ID'; // 设置主键值
      this.tablenameValue = ''; // 设置表名的值
      this.isEdit = 'true';
      this.datafunction = '业务数据';
      this.tableid = null;
      this.tableComment = '';
      for (this.tableinfo of this.tableinfos) {
        this.tableinfo.state = '';
      }



    }else if ( tit === '修改操作') {
      this.tableTitle = '修改表信息';
      // this.isHidden = true;  // 隐藏“序列”一行
      // this.isReadonly = true;  // 设置“表名”只读
      // this.isEditButton = false; // 设置序列名  设置序列名  (分两种情况：或者为查看序列属性， 或者为修改序列属性。。。未完待续)
      // this.isHiddenSeqName = false;
      // this.sequenceName = '';
      this.tablenameValue = object.objectName;
      this.datafunction = object.dataFunction;
      this.tableComment = object.comments;
      this.tableid = object.id;
      this.itemValueToSet = this.tableselectSequence;
      if (this.itemValueToSet == '不使用序列'){
        this.isHiddenSeqName = true;

      }else {
        this.isHiddenSeqName = false;
        this.isEditButton = true;
        if (this.itemValueToSet == '创建新序列'){
          this.tableofSequence = 'SQL_' +  this.tablenameValue;
        }
      }
      this. selectSequence= this.tableofSequence;
      this.keyValue =this.tablekeyValue;

      for (this.tableinfo of this.tableinfos) {
        this.tableinfo.state = '新增';
      }

      this.isHidden = false;  // 隐藏“序列”一行
      this.isReadonly = false;  // 设置“表名”只读


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
  checkValue(columnnameinput) {
    var value = columnnameinput.value;
    const reg = new RegExp('^[a-zA-Z][a-zA-Z0-9_#]*$');
    if(!reg.test(value)){
      columnnameinput.value ='';
      alert ('列名只能输入字母，数字和下划线')
    }
  }
  checkLengthValue(lengthinput) {
    var value = lengthinput.value;
    const reg = new RegExp('^[1-9][0-9]*(,(0|[1-9][0-9]*))?$');
    if(!reg.test(value)){
      lengthinput.value ='';
      alert ('只能输入数字')
    }
  }

  saveTable(tableform,tableColumn,tablemodal,sequenceform) {
    const table = tableform.value;
    const columnInputs = tableColumn.getElementsByClassName('column-input');
    const commentInputs = tableColumn.getElementsByClassName('comment-input');
    const length =  columnInputs.length;
    let sum1 = 0;
    let sum2 = 0;
    for (let i=0; i<length; i++) {
      if( columnInputs[i].value == ''){
        sum1 = sum1 + 1;
      }
      if ( commentInputs[i].value == ''){
        sum2 = sum2 + 1;
      }
    }
    if(sum1 !== 0 || sum2 !==0){
      if (sum1 > 0) {
        alert('列名不能为空');
      }
      if (sum2 >0) {
        alert('列的描述不能为空');
      }
    }else if (sum1 == 0 && sum2 == 0) {
    }
    const object = table;
    object.id =  object.tableId;
    object.objectName = object.tableName.toUpperCase();
    object.comments = object.tablecomments;
    object.dataFunction = object.tableDateFunction;
    if (object.id) {
      if(tableform.valid && sum1 == 0 && sum2 == 0){
        this.objectService.update(object, object.id).subscribe(object => {
          for (this.object of this.objects) {
            if (this.object.id === object.id) {
              this.object.objectName = object.objectName
              this.object.comments = object.comments;
              this.object.dataFunction = object.dataFunction;

            }
          }
        });
        if ( table.select !== '不使用序列'){
          this.tableselectSequence = '选择已有序列';
          this.tableofSequence =  table.tableSequence;
          if (table.select == '创建新序列'){
            const sequence = sequenceform.value;
            const itemValueToSet = table.select;
            sequence.id =  sequence.sequenceId;
            // sequence.sequenceName = 'SQL'+ table.tableName;
            sequence.objectName = table.tableSequence;
            this.tableofSequence = table.tableSequence;
            this.tablekeyValue =  object.tablePk;
            sequence.sequencecomments =  sequence.sequencecomments ? sequence.sequencecomments : ('Create in Table ' + object.objectName);
            this.sequencecommentsValue = sequence.sequencecomments;
            sequence.comments = sequence.sequencecomments;
            // if(sequence.sequenceName == '' || sequence.minValue == null || sequence.sequencecomments == ''){
            //   return;
            // }else {
              sequence.objectType ='序列';
              sequence.changeType = '新建';
              this.objectService.create(sequence).subscribe( object => {
                this.objects.push(sequence);
              } );
            // }


          }
        }else {
          this.tableselectSequence = table.select;
        }



        $(tablemodal).modal('hide');
        this.objectService.getTableInfos().subscribe(tableinfos => this.tableinfos = tableinfos);
        tableform.reset();
      }

    }else {
      if (tableform.valid && sum1 == 0 && sum2 == 0) {
        object.objectType ='表';
        object.changeType = '新建';
        for (this.tableinfo of this.tableinfos) {
          this.tableinfo.state = '新增';
        }
        this.objectService.create(this.tableinfo).subscribe( tableinfo => {
          this.tableinfos.push(this.tableinfo);
        } );

        this.objectService.create(object).subscribe( object => {
          this.objects.push(object);
        } );

        const sequence = sequenceform.value;
        const itemValueToSet = table.select;
        sequence.id =  sequence.sequenceId;
        sequence.sequenceName = table.tableSequence;
        sequence.objectName = table.tableSequence;
        this.tableofSequence = sequence.sequenceName;
        this.tablekeyValue =  object.tablePk;
        if ( object.select !== '不使用序列'){
          this.tableselectSequence = '选择已有序列';

          sequence.sequencecomments =  sequence.sequencecomments ? sequence.sequencecomments : ('Create in Table ' + object.objectName);
        }else {
          this.tableselectSequence = object.select;
          sequence.sequencecomments =  '';
        }
        // sequence.sequencecomments =  sequence.sequencecomments ? sequence.sequencecomments : ('Create in Table ' + object.objectName);
        this.sequencecommentsValue = sequence.sequencecomments;
        sequence.comments = sequence.sequencecomments;
        if (!sequence.id && itemValueToSet == '创建新序列' ){
          // if(sequence.sequenceName == '' || sequence.minValue == null || sequence.sequencecomments == ''){
          //   return;
          // }else {
            sequence.objectType ='序列';
            sequence.changeType = '新建';
            this.objectService.create(sequence).subscribe( object => {
              this.objects.push(sequence);
            } );
          // }
        }

        $(tablemodal).modal('hide');
        this.objectService.getTableInfos().subscribe(tableinfos => this.tableinfos = tableinfos);
        tableform.reset();
      }
    }

    // let trs = tableColumn.getElementsByTagName('tr');
    // let trlength = trs.length;
    // for (let i=5; i<trlength; i++) {
    //   tableColumn.deleteRow(i);
    // }
  }
  addColumn(tableColumn) {
    let columnlength = tableColumn.getElementsByClassName('checkbox-key').length +1 ;
    let lastId =columnlength -1;
    let newColumn =  {
      id: lastId,
      state: '',
      columnName: 'NEW'+ (lastId-3),
      dataType: 'VARCHAR2',
      columnLength: null,
      key: '',
      allowNull: 'checked',
      defaultValue: '',
      columnComments: ''};
    this.objectService.createColumn(newColumn).subscribe( tableinfos => {
      this.tableinfos.push(newColumn);
    });
  }

  upper(tabelnameValue){
    tabelnameValue.value = tabelnameValue.value.toUpperCase();
    if (this.sequenceName == 'SQL_'){
      this.sequenceName = 'SQL_' +  tabelnameValue.value;
    }

  }
  saveInputChange(input, tableColumn){
    let inputValue = input.value;
    let inputs = tableColumn.getElementsByClassName('length-input');
    let inputLength = inputs.length;
    for (let i=0; i<inputLength; i++) {
      if(inputs[i].value === inputValue){
        this.tableinfos[i].columnLength = input.value;
        this.objectService.createColumn(this.tableinfos[i]).subscribe( tableinfo => {
          this.tableinfos.push(this.tableinfos[i]);
        } );
      }
    }
  }
  upperColumnName(columnnameinput, tableColumn) {
    columnnameinput.value = columnnameinput.value.toUpperCase();
    // console.log(this.tableinfos);
    let inputValue = columnnameinput.value;
    let inputs = tableColumn.getElementsByClassName('checkbox-key');
    let columns = tableColumn.getElementsByClassName('column-input');
    let inputLength = inputs.length;
    for (let i=0; i<inputLength; i++) {
      let value = columns[i].value;
      if(value === inputValue){
        this.tableinfos[i].columnName = columnnameinput.value;
        this.objectService.createColumn(this.tableinfos[i]).subscribe( tableinfo => {
          this.tableinfos.push(this.tableinfos[i]);
        } );
      }
      if (inputs[i].checked == true ) {
        if (value === inputValue){
          this.keyValue =  columnnameinput.value;
        }
      }
    }
    // for (this.tableinfo of this.tableinfos){
    //
    // }
  }
  changeDataType(option, select){
  }
  //表内的序列modal
  upperSequence(sequenceNameInput) {
    sequenceNameInput.value = sequenceNameInput.value.toUpperCase();
    console.log(sequenceNameInput.value);
  }
  //创建、修改序列modal
  upperSequenceName(sequencenameinput){
    sequencenameinput.value = sequencenameinput.value.toUpperCase();
  }
  chooseOne(tableColumn, input) {
    let inputs = tableColumn.getElementsByClassName('checkbox-key');
    let nullInputs = tableColumn.getElementsByClassName('checkbox-null');
    let inputLength = inputs.length;
    let j = 0;
    for ( let i=0; i< inputLength; i++) {
      if( input.value == inputs[i].value) {
        j = i;
        this.keyValue = input.value.toUpperCase();
        nullInputs[j].checked = false;
        nullInputs[j].disabled = true;
        for (let k=0; k<inputLength ; k++) {
          if ( k !== j){
            inputs[k].checked = false;
            nullInputs[k].disabled = false;
          }
        }
      }
      if (input.checked == false) {
        nullInputs[j].disabled = false;
        this.isKeyNull = true;
        this.keyValue = '';
      }else {
        this.isKeyNull = false;
      }
    }
  }
  clickNull(tableColumn){
    let inputs = tableColumn.getElementsByClassName('checkbox-key');
    let nullInputs = tableColumn.getElementsByClassName('checkbox-null');
    if (inputs[0].checked == true){
      nullInputs[0].disabled = true;
      nullInputs[0].checked = false;
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
  editSequenceModal (tit: string, tableform){
    const tableValue = tableform.value;
    if (tit === '修改序列属性') {
      this.sequenceTitle = '修改序列属性';
      this.sequenceNameValue =  this.sequenceName;  // 修改序列属性的序列名称为'SQL_'+'表名'
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

      this.sequenceMinValue = 1;
      this.selfGrowValue = 1;
      this.sequenceCacheValue =20;
      this.sequenceNameValue = tableValue.tableSequence;
      // this.sequenceMinValue = null;
      this.sequencecommentsValue = '';
      this.isSeeButton = false;

    }else if (tit === '查看序列属性') {
      this.sequenceTitle = '查看序列属性';
      this.isHiddenTopSeq = true;   // 是否隐藏最上面“序列”一行
      this.isHiddenTopSeqName = true; // 是否隐藏最上面“序列名”一行
      this.sequenceNameValue = tableValue.tableSequence;  // 修改序列属性的序列名称为'SQL_'+'表名'
      this.isSeqReadonly = true;  // 表单是否“只读”
      this.isSelfGrowReadonly = true;
      this.isCacheReadonly = true;
      this.isDescribeReadonly = true;
      this.isSeeButton = true;

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
      this.sequenceMinValue = 1;
      this.selfGrowValue =1;
      this.sequenceCacheValue =20;
      this.sequencecommentsValue = '';


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
      this.sequenceMinValue = 1;
      this.selfGrowValue =1;
      this.sequenceCacheValue =20;

    // } else if (tit === '修改序列属性') {
    //   this.sequenceTitle = '修改序列属性';
    //   this.sequenceNameValue = 'SQL_';  // 修改序列属性的序列名称为'SQL_'+'表名'
    //   this.isSeqReadonly = false;  // 表单是否“只读”
    //   this.isSelfGrowReadonly = false;
    //   this.isCacheReadonly = false;
    //   this.isDescribeReadonly = false;
    //   if ( this.isHidden === true ) {
    //     this.isHiddenTopSeq = false;   // 是否隐藏最上面“序列”一行
    //     this.isHiddenTopSeqName = true;  // 是否隐藏“序列名”一行
    //
    //   }else if ( this.isHidden === false ) {
    //     this.isHiddenTopSeq = true;   // 是否隐藏最上面“序列”一行
    //     this.isHiddenTopSeqName = true;  // 是否隐藏“序列名”一行
    //   }
    //
    // }else if (tit === '查看序列属性') {
    //   this.sequenceTitle = '查看序列属性';
    //   this.isHiddenTopSeq = true;   // 是否隐藏最上面“序列”一行
    //   this.isHiddenTopSeqName = true; // 是否隐藏最上面“序列名”一行
    //   this.sequenceNameValue = 'SQL_';  // 修改序列属性的序列名称为'SQL_'+'表名'
    //   this.isSeqReadonly = true;  // 表单是否“只读”
    //   this.isSelfGrowReadonly = true;
    //   this.isCacheReadonly = true;
    //   this.isDescribeReadonly = true;

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
    if (inputvalue ===  max) {
      if (inputvalue && min > inputvalue) {
        this.isMaxValueMin = true;
      }else {
        this.isMaxValueMin = false;
      }
    }else if (inputvalue === min) {
      if (inputvalue && max < inputvalue) {
        this.isMinValueMax = true;
      }else {
        this.isMinValueMax = false;
      }
    }
  }
  saveTableSequence(sequenceform,editsequencemodal) {
    const sequence = sequenceform.value;
    this.sequenceName = sequence.sequenceName.toUpperCase();
    if(sequence.sequenceName == '' || sequence.minValue == null || sequence.sequencecomments ==''){
      return;
    }else {
      sequenceform.reset();
      $(editsequencemodal).modal('hide');
    }
  }
  saveSequence(sequenceform,sequencemodal) {
    const sequence = sequenceform.value;
    const object = sequence;
    object.id =  object.sequenceId;

    object.objectName = object.sequenceName.toUpperCase();
    object.comments = object.sequencecomments;
    if (object.id) {
      if(sequence.sequenceName == '' || sequence.minValue == null || sequence.sequencecomments == ''){
        return;
      }else {
        this.objectService.update(object, object.id).subscribe(object => {
          for (this.object of this.objects) {
            if (this.object.id === object.id) {
              this.object.objectName = object.objectName;
              this.object.comments = object.comments;
            }
          }
        });
        sequenceform.reset();
        $(sequencemodal).modal('hide');
      }


    }else {
      if(sequence.sequenceName == '' || sequence.minValue == null || sequence.sequencecomments == ''){
        return;
      }else {
        object.objectType ='序列';
        object.changeType = '新建';
        this.objectService.create(object).subscribe( object => {
          this.objects.push(object);
        } );
      sequenceform.reset();
      $(sequencemodal).modal('hide');
      }
    }
  }


  // 根据不同的序列显示不同的序列名
  selectOption(sequenceValue: string, tableform, select) {
    if (sequenceValue === '创建新序列') {
      this.sequenceName = 'SQL_' + tableform.value.tableName.toUpperCase();   // 修改序列属性的序列名称为'SQL_'+'表名'
      this.isEditButton = false;    // 是否隐藏修改按钮
      this.isHiddenSeqName = false;  // 是否隐藏“序列名”
    }else if ( sequenceValue === '选择已有序列') {
      this.isEditButton = true;
      this.isHiddenSeqName = false;
      this.objectService.getObjects().subscribe();
      this.selectoption(select);

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
