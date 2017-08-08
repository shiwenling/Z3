import { Component, OnInit } from '@angular/core';
import {Project} from './project';
import {TableService} from './table.service';
import {Subject} from 'rxjs/Subject';
import {User} from '../system/user';
import {SystemService} from '../system/system.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  projects: Project[];
  users: User[];
  page:number = 1;
  start:number;
  end:number;
  totalItems:number = 23;
  pageSize:number = 10;
  isChecked:boolean;
  title:string;
  project = new Subject<string>();
  newItem = {
    startTime: null,
    endTime: null,
  };


  constructor(
    private tableService: TableService,
    private systemService: SystemService
  ) { }

  ngOnInit():void {
    this.getProjects();
    this.pagination();
  }
  getProjects():void {
    this.tableService.getProjects().then(projects => this.projects = projects);
    this.systemService.getUsers().then(users => this.users = users);
  }
  chooseModal(tit:string){
    if (tit == '新增'){
      this.title='新增项目';
    }else if (tit =='修改'){
      this.title = '修改项目';
    }else if(tit =='查看'){
      this.title = '查看项目';
    }
  }
  pagination() {
    this.start = (this.page-1) * this.pageSize;
    this.end = (this.page)* this.pageSize;
  }

}
