/**
 * Created by TP on 2017/8/8.
 */
import { Injectable } from '@angular/core';
import {  Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Object} from './object';
import {Table} from './table';
import {Sequence} from './sequence';
import {Observable} from 'rxjs/Observable';
import {TableInfo} from './tableInfo';

@Injectable()
export  class ObjectService {
  private headers = new Headers ({'Content-Type': 'application/json'});
  private objectsUrl = 'api/objects';
  private tablesUrl = 'api/tables';
  private sequenceUrl = 'api/sequences';
  private  tableinfosUrl =  'api/tableinfos';
  constructor(private http: Http) { }

  create(object: any ): Observable<Object> {
    return this.http
      .post(this.objectsUrl, JSON.stringify(object), {headers: this.headers})
      .map(res => res.json().data as Object)
      .catch(this.handleError);
  }
  createColumn(tableinfo: any ): Observable<TableInfo> {
    return this.http
      .post(this.tableinfosUrl, JSON.stringify(tableinfo), {headers: this.headers})
      .map(res => res.json().data as TableInfo)
      .catch(this.handleError);
  }

  update(object: Object, id:number): Observable<Object> {
    const url = `${this.objectsUrl}/${id}`;
    return this.http
      .put(url, JSON.stringify(object), {headers: this.headers})
      .map(() => object)
      .catch(this.handleError);
  }

  delete(id: number):Observable<void> {
    const url = `${this.objectsUrl}/${id}`;
    return this.http
      .delete(url, {headers: this.headers})
      .map(() => null)
      .catch( this.handleError);
  }
  deleteColumn(id: number):Observable<void> {
    const url = `${this.tableinfosUrl}/${id}`;
    return this.http
      .delete(url, {headers: this.headers})
      .map(() => null)
      .catch( this.handleError);
  }

  getObjects(): Observable<Object[]> {
    return this.http.get(this.objectsUrl)
      .map(response => response.json().data as Object[])
      .catch(this.handleError);
  }
  getTables(): Observable<Table[]> {
    return this.http.get(this.tablesUrl)
      .map(response => response.json().data as Table[])
      .catch(this.handleError);
  }
  getSequences(): Observable<Sequence[]> {
    return this.http.get(this.sequenceUrl)
      .map(response => response.json().data as Sequence[])
      .catch(this.handleError);
  }
  getTableInfos(): Observable<TableInfo[]> {
    return this.http.get(this.tableinfosUrl)
      .map(response => response.json().data as TableInfo[])
      .catch(this.handleError);
  }


  search(term: ObjectSearchParams): Observable<Object[]> {
    if(term.objectType =='不限' && term.objectName == ''){
      return this.http.get(this.objectsUrl)
        .map(response => response.json().data as Object[])
        .catch(this.handleError);
    }else if (term.objectType !=='不限' && term.objectName==''){
      return this.http
        .get(`api/objects/?objectType=${term.objectType}`)
        .map(response => response.json().data as Object[]);
    }else if (term.objectName !=='' && term.objectType=='不限'){
      return this.http
        .get(`api/objects/?objectName=${term.objectName}`)
        .map(response => response.json().data as Object[]);
    }else if (term.objectName !=='' && term.objectType !== '不限'){
      return this.http
        .get(`api/objects/?objectType=${term.objectType}&objectName=${term.objectName}`)
        .map(response => response.json().data as Object[]);
    }
  }









  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}

export class ObjectSearchParams {
  constructor(
    public objectType:string,
    public objectName:string,
  ){}

}

