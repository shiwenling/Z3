import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { SystemService } from './system.service';
import {System} from './system';
import { PaginationService} from 'ng2-pagination';
import {Subject} from 'rxjs/Subject';


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {User} from './user';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css'],
  providers: [ SystemService, PaginationService ],
})
export class SystemComponent implements OnInit {
  @Output() searchContent = new EventEmitter<Object>();
  systems: System[];
  users: User[];
  page = 1;
  title:string ;
  total: number;
  system = new Subject<string>();
  constructor(
    private systemService: SystemService,

  ) { }

  getSearchTerm() {
    return this.system
      .debounceTime(300)
      .distinctUntilChanged();
  }

  ngOnInit(): void {
    this.getSystems();
    this.getPage(1);
    this.getSearchTerm().subscribe((res) => {
      this.searchContent.emit(res);
    })
  }
  getSystems(): void {
     this.systemService.getSystems().then(systems => this.systems = systems);
    this.systemService.getUsers().then(users => this.users = users);
  }
  getPage(page: number) {
    this.page = page;
    this.total = 14;
  }
  search(term: string): void {
    this.system.next(term);
  }
  chooseModal(tit:string){
    if (tit == '新增'){
      this.title='新增';
    }else if (tit =='修改'){
      this.title = '修改模块';
    }
  }


}
