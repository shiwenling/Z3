import {Component, OnInit, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';
import { SystemService } from './system.service';
import {System} from './system';
import {Subject} from 'rxjs/Subject';

import {FormControl} from '@angular/forms';

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
  erroramaessage:string;
  selectedSystem: System;
  public  titleFilter: FormControl = new FormControl();
  public  keyword: string;

  constructor(
    private systemService: SystemService,
    private changeDetectorRef: ChangeDetectorRef

  ) {
    this.titleFilter.valueChanges
      .debounceTime(500)
      .subscribe(
        value => this.keyword = value
      );
  }

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

  delete(system: System): void {
    this.systemService
      .delete(system.id)
      .then(() => {
        this.systems = this.systems.filter(s => s !== system);
        if (this.selectedSystem === system) { this.selectedSystem = null; }
      });
  }

  // delete (rowNumber:number) {
  //   this.systems.splice(rowNumber, 1);
  //   this.changeDetectorRef.detectChanges();
  // }

  // delete(system:System, rowNumber: number): void {
  //   this.systemService.delete(system.id)
  //     .subscribe(
  //       response => {
  //         this.systems.splice(rowNumber, 1);
  //       },
  //       error => {
  //         this.erroramaessage = < any > error;
  //       }
  //     );
  //   // this.systems.splice(rowNumber, 1);
  //   // this.changeDetectorRef.detectChanges();
  // }



}
