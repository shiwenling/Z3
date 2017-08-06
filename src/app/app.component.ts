import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    const name = this.getQueryString('account');
    const password = this.getQueryString('pwd');
  };
  getQueryString = function(data) {
    const reg = new RegExp('(^|&)' + data + '=([^&]*)(&|$)');
    const r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return r[2];
    }else {
      return null;
    }
  }
}
