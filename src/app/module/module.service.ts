/**
 * Created by TP on 2017/8/4.
 */
import { Injectable } from '@angular/core';
import {  Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Module } from './module';
import { Schematable} from './schema-table';

@Injectable()

export class ModuleService {
  private modulesUrl = 'api/modules';
  private schematablesUrl = 'api/schematables'; // URL to web api
  constructor(private http: Http) { }
  getModules(): Promise<Module[]> {
    return this.http.get(this.modulesUrl)
      .toPromise()
      .then(response => response.json().data as Module[])
      .catch(this.handleError);
  }
  getSchematables(): Promise<Schematable[]> {
    return this.http.get(this.schematablesUrl)
      .toPromise()
      .then(response => response.json().data as Schematable[])
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
