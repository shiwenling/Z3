/**
 * Created by TP on 2017/7/26.
 */
import { Injectable } from '@angular/core';
import {System} from './system';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {User} from './user';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {DB} from './db';

@Injectable()
export  class SystemService {

  private headers = new Headers ({'Content-Type': 'application/json'});
  private systemsUrl = 'api/systems';
  private dbsUrl = 'api/dbs';
  private usersUrl = 'api/users'; // URL to web api
  constructor(private http: Http) { }
  search(term: SystemSearchParams): Observable<System[]> {
    if(term.sysname=='' && term.dbname == ''){
      return this.http.get(this.systemsUrl)
        .map(response => response.json().data as System[])
        .catch(this.handleError);
    }else if (term.sysname !=='' && term.dbname==''){
      return this.http
        .get(`api/systems/?sysname=${term.sysname}`)
        .map(response => response.json().data as System[]);
    }else if (term.dbname !=='' && term.sysname==''){
      return this.http
        .get(`api/systems/?dbname=${term.dbname}`)
        .map(response => response.json().data as System[]);
    }else if (term.dbname !=='' && term.sysname !== ''){
      return this.http
        .get(`api/systems/?sysname=${term.sysname}&dbname=${term.dbname}`)
        .map(response => response.json().data as System[]);
    }
  }
  searchUser(term:UsermSearchParams ): Observable<User[]> {
    if(term.username==''){
      return this.http.get(this.usersUrl)
        .map(response => response.json().data as User[])
        .catch(this.handleError);
    }else if (term.username !=='' ){
      return this.http.get(`api/users/?username=${term.username}`)
        .map(response => response.json().data as User[]);
    }
  }
  searchDB(term:DBSearchParams ): Observable<DB[]> {
    if(term.dbname==''){
      return this.http.get(this.dbsUrl)
        .map(response => response.json().data as DB[])
        .catch(this.handleError);
    }else if (term.dbname !=='' ){
      return this.http.get(`api/dbs/?dbname=${term.dbname}`)
        .map(response => response.json().data as DB[]);
    }
  }

  getSystems(): Observable<System[]> {
    return this.http.get(this.systemsUrl)
      .map(response => response.json().data as System[])
      .catch(this.handleError);
  }
  getDBs(): Observable<DB[]> {
    return this.http.get(this.dbsUrl)
      .map(response => response.json().data as DB[])
      .catch(this.handleError);
  }


  getUsers(): Observable<User[]> {
    return this.http.get(this.usersUrl)
      .map(response => response.json().data as User[])
      .catch(this.handleError);
  }

  create(system: any ): Observable<System> {
    return this.http
      .post(this.systemsUrl, JSON.stringify(system), {headers: this.headers})
      .map(res => res.json().data as System)
      .catch(this.handleError);
  }

  update(system: System, id:number): Observable<System> {
    const url = `${this.systemsUrl}/${id}`;
    return this.http
      .put(url, JSON.stringify(system), {headers: this.headers})
      .map(() => system)
      .catch(this.handleError);
  }

  delete(id: number):Observable<void> {
    // var headers = new Headers();
    // headers.append('Content-Type','application/json');
    // headers.append('Accept','application/json');
    // return this.http.delete(this.systemsUrl+"/"+id).subscribe(
    //   data=>{console.log(data)},
    //   err=>{console.log(err)},
    //   ()=> {
    //     console.log("Complete");
    //     if (this.observer !== undefined)
    //       this.observer.next(true);
    //   }
    // );

    const url = `${this.systemsUrl}/${id}`;
    return this.http
      .delete(url, {headers: this.headers})
      .map(() => null)
      .catch( this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  // search(params:SystemSearchParams ): Observable<System[]> {
  //   return this.http.get(this.systemsUrl,{search:this.encodeParams(params)})
  //     .map(response => response.json().data as System[])
  // }
  //
  // encodeParams(params: SystemSearchParams) {
  //   return Object.keys(params)
  //   .filter(key => params[key])
  //   .reduce((sum: URLSearchParams, key:string) => {
  //   sum.append(key, params[key]);
  //   return sum;
  //   }, new URLSearchParams());
  // }


}

export class SystemSearchParams {
  constructor(
    public sysname:string,
    public  dbname:string,
  ){}

}

export class UsermSearchParams {
  constructor(
    public username:string,
  ){}

}
export class DBSearchParams {
  constructor(
    public dbname:string,
  ){}

}

