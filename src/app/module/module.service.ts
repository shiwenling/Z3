/**
 * Created by TP on 2017/8/4.
 */
import { Injectable } from '@angular/core';
import {  Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Module } from './module';
import { Schema} from './schema';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {CoreTable} from './table';

@Injectable()

export class ModuleService {
  private headers = new Headers ({'Content-Type': 'application/json'});
  private modulesUrl = 'api/modules';
  private schemasUrl = 'api/schemas'; // URL to web api
  private  coretablesUrl ='api/coretables';
  constructor(private http: Http) { }

  search(term: ModuleSearchParams): Observable<Module[]> {
    if(term.sysname =='不限' && term.modulename == ''){
      return this.http.get(this.modulesUrl)
        .map(response => response.json().data as Module[])
        .catch(this.handleError);
    }else if (term.sysname !=='不限' && term.modulename==''){
      return this.http
        .get(`api/modules/?sysname=${term.sysname}`)
        .map(response => response.json().data as Module[]);
    }else if (term.modulename !=='' && term.sysname=='不限'){
      return this.http
        .get(`api/modules/?modulename=${term.modulename}`)
        .map(response => response.json().data as Module[]);
    }else if (term.modulename !=='' && term.sysname !== '不限'){
      return this.http
        .get(`api/modules/?sysname=${term.sysname}&modulename=${term.modulename}`)
        .map(response => response.json().data as Module[]);
    }
  }
  searchSchema(term:SchemaSearchParams): Observable<Schema[]>{
    if(term.dbname =='不限' && term.schema == ''){
      return this.http.get(this.schemasUrl)
        .map(response => response.json().data as Schema[])
        .catch(this.handleError);
    }else if (term.dbname !=='不限' && term.schema==''){
      return this.http
        .get(`api/schemas/?dbname=${term.dbname}`)
        .map(response => response.json().data as Schema[]);
    }else if (term.schema !=='' && term.dbname=='不限'){
      return this.http
        .get(`api/schemas/?schema=${term.schema}`)
        .map(response => response.json().data as Schema[]);
    }else if (term.schema !=='' && term.dbname !== '不限'){
      return this.http
        .get(`api/schemas/?dbname=${term.dbname}&schema=${term.schema}`)
        .map(response => response.json().data as Schema[]);
    }

  }
  getModules(): Observable<Module[]> {
    return this.http.get(this.modulesUrl)
      .map(response => response.json().data as Module[])
      .catch(this.handleError);
  }
  getSchemas(): Observable<Schema[]> {
    return this.http.get(this.schemasUrl)
      .map(response => response.json().data as Schema[])
      .catch(this.handleError);
  }
  getCoreTables(): Observable<CoreTable[]> {
    return this.http.get(this.coretablesUrl)
      .map(response => response.json().data as CoreTable[])
      .catch(this.handleError);
  }
  create(module: any ): Observable<Module> {
    return this.http
      .post(this.modulesUrl, JSON.stringify(module), {headers: this.headers})
      .map(res => res.json().data as Module)
      .catch(this.handleError);
  }
  createCoreTable(coretable: any ): Observable<CoreTable> {
    return this.http
      .post(this.coretablesUrl, JSON.stringify(coretable), {headers: this.headers})
      .map(res => res.json().data as CoreTable)
      .catch(this.handleError);
  }
  update(module: Module, id:number): Observable<Module> {
    const url = `${this.modulesUrl}/${id}`;
    return this.http
      .put(url, JSON.stringify(module), {headers: this.headers})
      .map(() => module)
      .catch(this.handleError);
  }
  updateCoreTable(coretable: CoreTable, id:number): Observable<CoreTable> {
    const url = `${this.coretablesUrl}/${id}`;
    return this.http
      .put(url, JSON.stringify(coretable), {headers: this.headers})
      .map(() => coretable)
      .catch(this.handleError);
  }
  deleteModule(id: number):Observable<void> {
    const url = `${this.modulesUrl}/${id}`;
    return this.http
      .delete(url, {headers: this.headers})
      .map(() => null)
      .catch( this.handleError);
  }
  deleteSchema(dbPk: number):Observable<void> {
    const url = `${this.schemasUrl}/${dbPk}`;
    return this.http
      .delete(url, {headers: this.headers})
      .map(() => null)
      .catch( this.handleError);
  }
  deleteCoreTable(id: number):Observable<void> {
    const url = `${this.coretablesUrl}/${id}`;
    return this.http
      .delete(url, {headers: this.headers})
      .map(() => null)
      .catch( this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}

export class ModuleSearchParams {
  constructor(
    public sysname:string,
    public modulename:string,
  ){}

}

export class SchemaSearchParams {
  constructor(
    public dbname:string,
    public schema:string,
  ){}

}

