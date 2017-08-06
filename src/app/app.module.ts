import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {SystemService} from './system/system.service';
import {ModuleService} from './module/module.service';

import {Ng2PaginationModule} from 'ng2-pagination';
import { DataTablesModule } from 'angular-datatables';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import {HttpModule} from '@angular/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule,
    Ng2PaginationModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  providers: [SystemService, ModuleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
