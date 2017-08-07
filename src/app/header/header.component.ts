import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private isListPage = true;
  isClick1: boolean = true;
  isClick2: boolean = false;
  isClick3: boolean = false;


  constructor(
    private _location: Location
  ) { }

  ngOnInit() {
    this.isListPage = this._location.path() === '' || this._location.path().indexOf('/system') > -1;
  }

  click1(){
    this.isClick1 = true;
    this.isClick2 = false;
    this.isClick3 = false;
  }
  click2(){
    this.isClick2 = true;
    this.isClick1 = false;
    this.isClick3 = false;
  }
  click3(){
    this.isClick3 = true;
    this.isClick1 = false;
    this.isClick2 = false;
  }
}
