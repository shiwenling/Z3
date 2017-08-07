/**
 * Created by TP on 2017/8/5.
 */
import { NgModule } from '@angular/core';

import {SystemComponent} from '../system/system.component';
import {ModuleComponent} from '../module/module.component';
import {TableComponent} from '../table/table.component';
import {HeaderRoutingModule} from './header-routing';
import {Ng2PaginationModule} from 'ng2-pagination';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
// import { DataTablesModule } from 'angular-datatables';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbdDatepickerPopup} from '../datepicker-popup';
@NgModule({
  imports: [
    HeaderRoutingModule,
    Ng2PaginationModule,
    CommonModule,
    FormsModule,
    // DataTablesModule,
    NgbModule
  ],
  declarations: [
    SystemComponent,
    ModuleComponent,
    TableComponent,
    NgbdDatepickerPopup
  ]
})
export class HeaderModule { }
