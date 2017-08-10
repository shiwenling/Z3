/**
 * Created by TP on 2017/8/8.
 */
import { Injectable } from '@angular/core';
import {  Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Object} from './object';
import {Table} from './table';
import {Sequence} from './sequence';

@Injectable()
export  class ObjectService {
  private objectsUrl = 'api/objects';
  private tablesUrl = 'api/tables';
  private sequenceUrl = 'api/sequences';
  constructor(private http: Http) { }
  getObjects(): Promise<Object[]> {
    return this.http.get(this.objectsUrl)
      .toPromise()
      .then(response => response.json().data as Object[])
      .catch(this.handleError);
  }
  getTables(): Promise<Table[]> {
    return this.http.get(this.tablesUrl)
      .toPromise()
      .then(response => response.json().data as Table[])
      .catch(this.handleError);
  }
  getSequences(): Promise<Sequence[]> {
    return this.http.get(this.sequenceUrl)
      .toPromise()
      .then(response => response.json().data as Sequence[])
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
