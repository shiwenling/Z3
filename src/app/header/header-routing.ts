/**
 * Created by TP on 2017/8/5.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SystemComponent} from '../system/system.component';
import {ModuleComponent} from '../module/module.component';
import {TableComponent} from '../table/table.component';
import {ProjectComponent} from '../project/project.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'system',
        component: SystemComponent,
      },
      {
        path: 'module',
        component: ModuleComponent,
      },
      {
        path: 'table',
        component: TableComponent,
      },
      {
        path: 'project',
        component: ProjectComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderRoutingModule {}
