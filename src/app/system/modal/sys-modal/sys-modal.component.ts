import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ng2-bootstrap';
import {User} from '../../user';
import {SystemService} from '../../system.service';

@Component({
  selector: 'app-sys-modal',
  templateUrl: './sys-modal.component.html',
  styleUrls: ['./sys-modal.component.css'],
  // exportAs: 'sys-modal'
})
export class SysModalComponent implements OnInit {
  @ViewChild('sysModal') public sysModal:ModalDirective;
  @Input() title?:string;
  users: User[];

  constructor(
    private systemService: SystemService,
  ) { }

  ngOnInit() {
    this.getUsers();
  }
  show(){
    this.sysModal.show();
  }
  hide(){
    this.sysModal.hide();
  }
  getUsers(): void {
    this.systemService.getUsers().subscribe(users => this.users = users);
  }

}
