/**
 * Created by TP on 2017/7/24.
 */
import { NgModule} from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { SystemComponent } from './system/system.component';
import {LoginComponent} from './login/login.component';
import {ModuleComponent} from './module/module.component';
import {TableComponent} from './table/table.component';
import {HeaderComponent} from './header/header.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {
    path:'header',
    component: HeaderComponent,
    children: [
      {
        path: '',
        loadChildren: './header/header.module#HeaderModule',
      }
    ]
  }
  // { path: 'system', component: SystemComponent},
  // { path: 'table', component: TableComponent},
  // { path: 'module', component: ModuleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
