import { Component, OnInit } from '@angular/core';
import {Project} from './project';
import {TableService} from './table.service';
import {Subject} from 'rxjs/Subject';
import {User} from '../system/user';
import {SystemService} from '../system/system.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {peojectnameValidator} from 'app/validator/validators';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  projects: Project[];
  project: Project;
  users: User[];
  user: User;
  isChecked: string ='' ; //全选/全不选
  title:string;
  canChooseModule:boolean;  //选择模块按钮是否可用
  canChooseMember:boolean;  //选择成员按钮是否可用
  // project = new Subject<string>();
  //分页条参数
  page:number = 1;
  start:number;
  end:number;
  totalItems:number = 23;
  pageSize:number = 10;
  //日历插件参数
  newItem = {
    startTime: null,
    endTime: null,
  };
  //项目搜索参数
  statusSearch: string ='活动';
  status : string[] = ['不限', '活动', '冻结'];
  sysnameSearch: string = '不限';
  systems: string[] = ['Z3', 'DDL','abc'];
  modulenameSearch: string = '不限';
  modules: string[] = ['Z3','ZEN','MZ3','License'];
  today = new Date();
  todayYear = this.today.getFullYear();
  todayMonth = this.today.getMonth()+1;
  todayDate = this.today.getDate();
  startmaxDate = {year: this.todayYear, month: this.todayMonth, day: this.todayDate};
  endmaxDate = {year: this.todayYear, month: this.todayMonth, day: this.todayDate};
  startminDate;
  endminDate;
  projectIdSearch: string;
  projectnameSearch : string;
  tablenameSearch: string;
  membersSearch : Array<string>;
  //项目弹框参数
  projectform: FormGroup;
  projectidValue: number;
  moduleidValue: number;
  projectnameValue: string;
  principalValue: string;
  modulenameValue: string;
  commentsValue: string;
  membersValue: Array<string>;
  isReadonly: boolean;
  isHidden: boolean = false;

  //选择模块弹框
  sysValue: string ;
  moduleValue: string;
  canSelect : boolean = true;
  //应用系统下拉框
  sysSearch: string[] = ['DDL','Z3','站点测试'];
  //模块选择下拉框
  moduleSearch: string[] = ['License','MZ3','Z3','ZONE','ZEN','DDLAUDIT'];

  //选择成员弹框
  username: string;
  role = [];
 members = [];

  constructor(
    private tableService: TableService,
    private systemService: SystemService,
    fb: FormBuilder
  ) {
    this.projectform = fb.group({
      id: [''],
      moduleId: [''],
      projectname: ['', [Validators.required, peojectnameValidator]],
      modulename: ['', Validators.required],
      principal: [''],
      comments:[''],
      members:['', Validators.required]
    });
  }

  ngOnInit():void {
    this.getProjects();
    this.pagination();
  }
  getProjects():void {
    this.tableService.getProjects().subscribe(projects => this.projects = projects);
    this.systemService.getUsers().subscribe(users => this.users = users);
  }
  refresh(searchform){
    this.tableService.getProjects().subscribe(projects => this.projects = projects);
    searchform.reset();
    this.statusSearch = '活动';
    this.sysnameSearch = '不限';
    this.modulenameSearch = '不限';
  }
  //删除搜索条件中为空的搜索参数
  clean(obj) {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '不限') {
        delete obj[propName];
      }
    }
    return obj;
  }
  search(searchform) {
    const form = this.clean(searchform.value);
    let d1 =form.dp1;
    let d2 = form.dp2;
    if (d1){
      d1 =  new Date(d1.year, d1.month, d1.day);
      const year = d1.getFullYear();
      let month = d1.getMonth();
      let day = d1.getDate();
      if (month<10){
        month = '0' + month;
      }
      if( day < 10) {
        day = '0' + day;
      }
      d1 = year + '-' + month + '-' + day;
      form.dp1 = d1;
    }
    if (d2) {
      d2 =  new Date(d2.year, d2.month, d2.day);
      const year = d2.getFullYear();
      let month = d2.getMonth();
      let day = d2.getDate();
      if (month<10){
        month = '0' + month;
      }
      if( day < 10) {
        day = '0' + day;
      }
      d2 = year + '-' + month + '-' + day;
      form.dp2 = d2;
    }
    this.tableService.search(form).subscribe(projects => this.projects = projects);
  }

  //日历控件设置可选范围
  startTime(searchform,d1) {
    d1.toggle();
      const dp2 = searchform.form.value.dp2;
      if (dp2) {
        this.startmaxDate = dp2;
      }
  }
  endTime(searchform,d2) {
    d2.toggle();
    const dp1 = searchform.form.value.dp1;
    if (dp1) {
      this.endminDate = dp1;
    }
  }


  searchUser(selectMemberform){
    this.systemService.searchUser(selectMemberform.value).subscribe(users => this.users = users);
  }
  refreshUser(){
    this.systemService.getUsers().subscribe(users => this.users = users);
    this.username = '';
  }
  saveModule(selectModuleform, projectform, modal) {
    const module = selectModuleform.form.get('modulename').value;
    projectform.controls.modulename.setValue(module);
    selectModuleform.form.value.sysname = '';
    $(modal).modal('hide');
    this.canChooseMember = false;
  }
  saveMember( table, projectform, membermodal) {
    const inputs = table.getElementsByClassName('combo');
    const roles = table.getElementsByClassName('role');
    const length = inputs.length;

    let sum =0;
    let i: number;
    for ( i=1; i<length ; i++ ) {
      const input = inputs[i];
      const isCheck = input.checked;
      const member = input.value;
      const userrole = roles[i].innerHTML;
      if (isCheck == true){
        this.members.push(member);
        this.role.push(userrole);
      }
    }
    for( let j=0; j<this.role.length; j++){
      if(this.role[j] == 'DBA'){
        sum = sum + 1;
      }
    }
    if (sum == 0){
      alert('成员必须有一个DBA');
    }else {
      projectform.controls.members.setValue(this.members);
      $(membermodal).modal('hide');
    }


  }

  //控制不选择应用系统，不能选择模块
  select(option) {
    if (option){
      this.canSelect = false;
    }
  }
  // checkmember(table){
  //   const checkboxs = table.getElementsByClassName('combo');
  //   const combos = checkboxs.length;
  //   for ( let i =0 ;i<combos; i++){
  //     for ( let j=0; j<length; j++){
  //       if (checkboxs[i].value == this.members[j]){
  //         checkboxs[i].checked = true;
  //       }
  //     }
  //
  //   }
  //
  // }
  setTitle(tit:string, project: any, projectform){
    if (tit == '新增'){
      this.title='新增项目';
      this.isReadonly = false;
      this.canChooseModule = false;
      this.canChooseMember = false;
      this.isHidden = false;
      this.projectidValue = null;
      // this.moduleidValue = ;
      this.moduleValue ='';
      this.projectnameValue = '';
      this.principalValue = '';
      this.commentsValue = '';
      this.modulenameValue = '';
      this.membersValue = [];
      this.sysValue = '';
      this.canSelect = true;
      if (projectform.value.modulename == null){
        this.canChooseMember = true;
      }


    }else if (tit =='修改'){
      this.title = '修改项目';
      this.isReadonly = false;
      this.canChooseModule = true;
      this.canChooseMember = false;
      this.isHidden = false;
      this.projectidValue = project.id;
      this.moduleidValue = project.moduleId;
      this.projectnameValue = project.projectname;
      this.principalValue = project.principal;
      this.commentsValue = project.comments;
      this.moduleValue = project.modulename;
      this.membersValue = project.members;

    }else if(tit =='查看'){
      this.title = '查看项目';
      this.isReadonly = true;
      this.canChooseModule = true;
      this.canChooseMember = true;
      this.isHidden = true;
      this.projectidValue = project.id;
      this.moduleidValue = project.moduleId;
      this.projectnameValue = project.projectname;
      this.principalValue = project.principal;
      this.commentsValue = project.comments;
      this.moduleValue = project.modulename;
      this.membersValue = project.members;

    }
  }
  pagination() {
    this.start = (this.page-1) * this.pageSize;
    this.end = (this.page)* this.pageSize;
  }

  deleteProject(project: Project): void{
    this.tableService
      .delete(project.id)
      .subscribe(() => {
        this.projects = this.projects.filter(p => p !== project);
      });
  }

  save(projectform,projectmodal){
    const project = projectform.value;
    if (project.id) {
      if(projectform.valid){
        this.tableService.update(project, project.id).subscribe(project => {
          for(this.project of this.projects) {
            if(this.project.id === project.id) {
              this.project.projectname = project.projectname;
              this.project.modulename = project.modulename;
              this.project.comments = project.comments;
              this.project.members =  project.members;
            }
          }
        });
        projectform.reset();
        $(projectmodal).modal('hide');
      }

    }else {
      if(projectform.valid){
        this.tableService.create(project).subscribe(project => {
          this.projects.push(project);
        } );
        projectform.reset();
        $(projectmodal).modal('hide');
      }
    }
  }
}
