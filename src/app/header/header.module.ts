/**
 * Created by TP on 2017/8/5.
 */
import { NgModule } from '@angular/core';

import {SystemComponent} from '../system/system.component';
import {ModuleComponent} from '../module/module.component';
import {TableComponent} from '../table/table.component';
import {HeaderRoutingModule} from './header-routing';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProjectComponent} from '../project/project.component';

@NgModule({
  imports: [
    HeaderRoutingModule,
    CommonModule,
    FormsModule,
    NgbModule
  ],
  declarations: [
    SystemComponent,
    ModuleComponent,
    TableComponent,
    ProjectComponent
  ]
})
export class HeaderModule { }
