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
  page:number;
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
    this.loadPage(1);
  }
  getProjects():void {
    this.tableService.getProjects().then(projects => this.projects = projects);
    this.systemService.getUsers().then(users => this.users = users);
  }
  loadPage(page:number){
    this.page=page;
  }
  // loadData() {
  //   this.dataService.query({
  //     page: this.page - 1,
  //     size: this.itemsPerPage,
  //   }).subscribe(
  //     (res: Response) => this.onSuccess(res.json(), res.headers),
  //     (res: Response) => this.onError(res.json())
  //   )
  // }
  chooseModal(tit:string){
    if (tit == '新增'){
      this.title='新增项目';
    }else if (tit =='修改'){
      this.title = '修改项目';
    }else if(tit =='查看'){
      this.title = '查看项目';
    }
  }

}
