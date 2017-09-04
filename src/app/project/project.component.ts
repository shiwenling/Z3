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
  totalItems = 30;
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
  nullchecked = [];
  isNew : boolean;
  sequenceCommentsValue: string;//记录修改序列属性弹框中的序列描述
  columnstart: number;
  columnend : number;
  endtem : number = 4;

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
  sequenceid : number;


  selected: boolean;   // 修改现有表modal设置“采集表”和“归档表”二选一
  isHiddenSeq: boolean;  // 修改现有序列modal设置radio对应显示页面
  isHiddenTab: boolean;  // 修改现有表modal设置radio对应显示页面

  constructor(
    private objectService: ObjectService,
    fb: FormBuilder
  ) {
    this.tableform = fb.group({
      tableId: [''],
      sequenceId: [''],
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

  // 过滤已有序列名选项中的空白项
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
  chooseSequence(option,tableform){
    for (this.object of this.objects){
      if (this.object.objectName == option){
        this.sequenceid = this.object.id;

      }
    }
  }
  getObjects(): void {
    this.objectService.getObjects().subscribe(objects => this.objects = objects);
    this.objectService.getTables().subscribe(tables => this.tables = tables);
    this.objectService.getSequences().subscribe(sequences => this.sequences = sequences);
    this.objectService.getTableInfos().subscribe(tableinfos => this.tableinfos = tableinfos);
    this.objectService.getColumn().subscribe(columns => this.columns = columns);

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
  tableModal(tit: string, object, tableColumn) {
    if (tit === '创建表') {
      // this.objectService.getColumn().subscribe();
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
      this.sequenceid = null;
      this.tableComment = '';
      for (this.tableinfo of this.tableinfos) {
        this.tableinfo.state = '';
      }

      this.isNew = true;
      this.endtem = 4;

    }else if ( tit === '修改操作') {
      this.isNew = false;
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
      this.sequenceid = object.sequenceId;
      if ( this.sequenceid ){
        this.itemValueToSet = '选择已有序列';
      }else {
        this.itemValueToSet = '不使用序列';
      }
      if (this.itemValueToSet == '不使用序列'){
        this.isHiddenSeqName = true;

      }else {
        this.isHiddenSeqName = false;
        this.isEditButton = true;
        if (this.itemValueToSet == '创建新序列'){
          this.tableofSequence = 'SQL_' +  this.tablenameValue;
        }
      }
      for(object of this.objects){
        if ( object.sequenceId == this.sequenceid ){
           for (object of this.objects){
             if(object.id == this.sequenceid){
               this.selectSequence = object.objectName;
             }
           }
        }
      }
      for(object of this.objects){
        if (object.id == this.tableid){
          this.keyValue = object.key;
        }
      }


      this.isHidden = false;  // 隐藏“序列”一行
      this.isReadonly = false;  // 设置“表名”只读
      const inputs = tableColumn.getElementsByClassName('checkbox-key');
      const nullinputs = tableColumn.getElementsByClassName('checkbox-null');
      const columninputs = tableColumn.getElementsByClassName('column-input');
      const columns = this.tableinfos.length;
      const length =  inputs.length;
      const nullLength = this.nullchecked.length;
      let sum = 0;
      for (let i=0; i<length; i++) {
        if( columninputs[i].value == this.keyValue ){
          inputs[i].checked = true;
        }else {
          inputs[i].checked = false;
        }
        for (let j =0 ; j<nullLength; j++){
          if (i == this.nullchecked[j]){
            nullinputs[i].checked = true;
            break;
          }else {
            nullinputs[i].checked = false;
          }
        }

      };
      for (let i=0; i<columns; i++){
        if(this.tableinfos[i].tableId == this.tableid){
          sum = sum + 1;

        };
      }
      if (sum !==0){
        for(let k=0; k<columns; k++){
          if(this.tableinfos[k].tableId  == this.tableid){
            this.columnstart = k;
            this.columnend = k+sum;
            break;
          }
        };
      }else {
        this.columnstart = 0;
        this.columnend = 0;
      }


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

  //  判断创建表中columnname输入合法性
  checkValue(columnnameinput) {
    var value = columnnameinput.value;
    const reg = new RegExp('^[a-zA-Z0-9_#]*$');
    if(!reg.test(value)){
      columnnameinput.value ='';
      alert ('列名只能输入字母，数字和下划线')
    }
  }

  // 判断创建表中表格列输入合法性
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
    const lengthInputs = tableColumn.getElementsByClassName('length-input');
    const commentInputs = tableColumn.getElementsByClassName('comment-input');
    const nullinputs = tableColumn.getElementsByClassName('checkbox-null');
    const selectType = tableColumn.getElementsByClassName('selectType');
    const key = tableColumn.getElementsByClassName('checkbox-key');
    const defaultInputs = tableColumn.getElementsByClassName('default-input');
    const columns: number = this.tableinfos.length;
    const length =  columnInputs.length;
    let sum1 = 0;
    let sum2 = 0;
    this.nullchecked = [];
    for (let i=0; i<length; i++) {
      if( columnInputs[i].value == ''){
        sum1 = sum1 + 1;
      }
      if ( commentInputs[i].value == ''){
        sum2 = sum2 + 1;
      }
      if( nullinputs[i].checked == true ){
        this.nullchecked.push(i);
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
    object.key = object.tablePk;

    if (object.id) {
      if(tableform.valid && sum1 == 0 && sum2 == 0){

        if ( table.select !== '不使用序列'){
          // this.tableselectSequence = '选择已有序列';
          if (table.select == '创建新序列'){
            const sequence = sequenceform.value;
            sequence.sequenceId = Math.round(1000 * Math.random());
            sequence.id =  sequence.sequenceId;
            sequence.objectName = table.tableSequence;
            sequence.sequencecomments =  sequence.sequencecomments ? sequence.sequencecomments : ('Create in Table ' + object.objectName);
            this.sequencecommentsValue = sequence.sequencecomments;
            sequence.comments = sequence.sequencecomments;
              sequence.objectType ='序列';
              sequence.changeType = '新建';
              this.objectService.create(sequence).subscribe( object => {
                this.objects.push(sequence);
              } );
          // }else {
            // this.tablekeyValue =  object.tablePk;
          }
        }else {
          table.sequenceId = null;

        }
        this.objectService.update(object, object.id).subscribe(object => {
          for (this.object of this.objects) {
            if (this.object.id === object.id) {
              this.object.objectName = object.objectName
              this.object.comments = object.comments;
              this.object.dataFunction = object.dataFunction;
              this.object.key = object.key;
              this.object.sequenceId = object.sequenceId;
            }
          }
        });

        $(tablemodal).modal('hide');
        tableform.reset();
      }

    }else {
      if (tableform.valid && sum1 == 0 && sum2 == 0) {
        object.objectType ='表';
        object.changeType = '新建';

        object.tableId = Math.round(1000 * Math.random());
        object.key = table.tablePk;
        object.id = table.tableId;
        const sequence = sequenceform.value;
        const itemValueToSet = table.select;
        sequence.id =  sequence.sequenceId;
        sequence.sequenceName = table.tableSequence;
        sequence.objectName = table.tableSequence;

        for ( let j:number =0; j<length; j++){
          this.tableinfos[columns + j]  ={
            id: columns + j ,
            tableId: table.tableId,
            state: '新增',
            columnName: columnInputs[j].value,
            dataType: selectType[j].value,
            columnLength: lengthInputs[j].value,
            key: key[j].checked == true ? 'checked' : '',
            allowNull: nullinputs[j].checked == true ? 'checked ': '',
            defaultValue: defaultInputs[j].value,
            columnComments:commentInputs[j].value,
          }
        }

        if ( object.select !== '不使用序列'){
          sequence.sequencecomments =  this.sequenceCommentsValue ? this.sequenceCommentsValue : ('Create in Table ' + object.objectName);
          if(object.select == '选择已有序列'){
            table.sequenceId = this.sequenceid;
          }
        }else {
          sequence.sequencecomments =  '';
        }
        this.sequencecommentsValue = sequence.sequencecomments;
        sequence.comments = sequence.sequencecomments;
        if ( itemValueToSet == '创建新序列' ){
            object.sequenceId =  Math.round(1000 * Math.random());
            sequence.objectType ='序列';
            sequence.changeType = '新建';
            sequence.sequenceId = object.sequenceId ;
            sequence.id = sequence.sequenceId;
            this.objectService.create(sequence).subscribe( object => {
              this.objects.push(sequence);
            } );
        }
        this.objectService.create(object).subscribe( object => {
          this.objects.push(object);
        } );

        $(tablemodal).modal('hide');
        tableform.reset();
        this.sequenceCommentsValue = '';
      }
    }
  }
  addColumn() {
    let columnlength = this.tableinfos.length ;
    let lastId =columnlength ;
    let newColumn =  {
      id: lastId,
      tableId: this.tableid,
      state: '',
      columnName: 'NEW',
      dataType: 'VARCHAR2',
      columnLength: null,
      key: '',
      allowNull: 'checked',
      defaultValue: '',
      columnComments: ''};
    this.objectService.createColumn(newColumn).subscribe( tableinfos => {
      this.tableinfos.push(newColumn);
    });
    this.endtem = this.endtem + 1;
    this.columnend = this.columnend + 1;
    this.objectService.createColumnTem(newColumn).subscribe( columns => {
      this.columns.push(newColumn);
    });
  }
  // 创建表中表名大写
  upper(tabelnameValue){
    tabelnameValue.value = tabelnameValue.value.toUpperCase();
    if (this.sequenceName == 'SQL_'){
      this.sequenceName = 'SQL_' +  tabelnameValue.value;
    }

  }
  // 保存创建表中数据类型
  changeDataType(option, tablecolumn){
    let selects = tablecolumn.getElementsByClassName('selectType');
    let ids = tablecolumn.getElementsByClassName('id');
    let length = selects.length;
    for (let i=0; i<length; i++) {
      if(selects[i].value === option){
        this.tableinfo.id = ids[i].innerHTML;
        this.tableinfos[this.tableinfo.id].dataType = option;
      }
    }


  }
  //  保存创建表中表格列中数据
  saveLengthInput(input, tableColumn){
    let inputValue = input.value;
    let inputs = tableColumn.getElementsByClassName('length-input');
    let ids = tableColumn.getElementsByClassName('id');
    let inputLength = inputs.length;
    for (let i=0; i<inputLength; i++) {
      if(inputs[i].value === inputValue){
        this.tableinfo.id = ids[i].innerHTML;
        this.tableinfos[ this.tableinfo.id ].columnLength = input.value;
      }
    }
  }
  saveDefaultInputChange(input, tableColumn){
    let inputValue = input.value;
    let inputs = tableColumn.getElementsByClassName('default-input');
    let ids = tableColumn.getElementsByClassName('id');
    let inputLength = inputs.length;
    for (let i=0; i<inputLength; i++) {
      if(inputs[i].value === inputValue){
        this.tableinfo.id = ids[i].innerHTML;
        this.tableinfos[ this.tableinfo.id ].defaultValue = input.value;

      }
    }
  }
  saveInputChange(input, tableColumn){
    let inputValue = input.value;
    let inputs = tableColumn.getElementsByClassName('comment-input');
    let ids = tableColumn.getElementsByClassName('id');
    let inputLength = inputs.length;
    for (let i=0; i<inputLength; i++) {
      if(inputs[i].value === inputValue){
        this.tableinfo.id = ids[i].innerHTML;
        this.tableinfos[ this.tableinfo.id ].columnComments = input.value;

      }
    }
  }

  // 创建表中表格列名大写
  upperColumnName(columnnameinput, tableColumn) {
    columnnameinput.value = columnnameinput.value.toUpperCase();
    // console.log(this.tableinfos);
    let inputValue = columnnameinput.value;
    let inputs = tableColumn.getElementsByClassName('checkbox-key');
    let columns = tableColumn.getElementsByClassName('column-input');
    let ids = tableColumn.getElementsByClassName('id');
    let inputLength = inputs.length;
    for (let i=0; i<inputLength; i++) {
      let value = columns[i].value;
      // if(value === inputValue){
      //   this.tableinfo.id = ids[i].innerHTML;
      //   this.tableinfos[ this.tableinfo.id ].columnName = columnnameinput.value;
      // }
      if (inputs[i].checked == true ) {
        if (value === inputValue){
          this.keyValue =  columnnameinput.value;
        }
      }
    }
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
  //  主键多选框操作


  chooseOne(tableColumn, input) {
    let inputs = tableColumn.getElementsByClassName('checkbox-key');
    let nullInputs = tableColumn.getElementsByClassName('checkbox-null');
    let columnInputs = tableColumn.getElementsByClassName('column-input');
    let inputLength = inputs.length;
    let j = 0;
    for ( let i=0; i< inputLength; i++) {
      if( input.value == inputs[i].value) {
        // this.tableinfos[i].key = 'checked';
        // this.objectService.createColumn(this.tableinfos[i]).subscribe( tableinfo => {
        //   this.tableinfos.push(this.tableinfos[i]);
        // } );
        j = i;
        // this.keyValue = input.value.toUpperCase();
        this.keyValue = columnInputs[i].value.toUpperCase();
        nullInputs[j].checked = false;
        nullInputs[j].disabled = true;
        for (let k=0; k<inputLength ; k++) {
          if ( k !== j){
            inputs[k].checked = false;
            nullInputs[k].disabled = false;
          }
        }
      }else {
        // this.tableinfos[i].key = '';
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

  //   允许为空列的操作
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

  // 创建表中的序列属性按钮操作
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
      this.sequenceIdValue = null;

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
      // this.sequenceIdValue = tableValue.sequenceId;
      this.sequenceMinValue = 1;
      this.selfGrowValue = 1;
      this.sequenceCacheValue =20;
      for (this.object of this.objects){
        if(this.sequenceNameValue == this.object.objectName){
          this.sequencecommentsValue = this.object.comments;
          this.sequenceIdValue =  this.object.id;
        }

      }


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

  //  保存功能  创建表中序列弹框
  saveTableSequence(sequenceform,editsequencemodal) {
    const sequence = sequenceform.value;
    this.sequenceName = sequence.sequenceName.toUpperCase();
    this.sequenceCommentsValue = sequence.sequencecomments;
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
      tableform.value.tableSequence =  this.sequenceName;
      this.isEditButton = false;    // 是否隐藏修改按钮
      this.isHiddenSeqName = false;  // 是否隐藏“序列名”
      this.sequenceid = null;
    }else if ( sequenceValue === '选择已有序列') {
      this.isEditButton = true;
      this.isHiddenSeqName = false;
      this.objectService.getObjects().subscribe();
      this.selectoption(select);
    }else if (sequenceValue === '不使用序列') {
      this.isHiddenSeqName = true;
      this.sequenceid = null;
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
