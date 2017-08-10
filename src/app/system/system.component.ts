import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { SystemService } from './system.service';
import {System} from './system';
import {Subject} from 'rxjs/Subject';


import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {User} from './user';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css'],
})
export class SystemComponent implements OnInit {
  @Output() searchContent = new EventEmitter<Object>();
  systems: System[];
  users: User[];
  page:number = 1;
  start:number;
  end:number;
  dbItems:number = 14;
  totalItems:number = 14;
  pageSize:number = 10;
  isChecked:boolean;
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
    this.getUsers();
    this. pagination();
    this.getSearchTerm().subscribe((res) => {
      this.searchContent.emit(res);
    })
  }
  getSystems(): void {
     this.systemService.getSystems().then(systems => this.systems = systems);
  }
  getUsers(): void {
    this.systemService.getUsers().then(users => this.users = users);
  }
  search(term: string): void {
    this.system.next(term);
  }
  setTitle(tit:string){
    this.title = tit;
  }
  pagination() {
    this.start = (this.page-1) * this.pageSize;
    this.end = (this.page)* this.pageSize;
  }


}
