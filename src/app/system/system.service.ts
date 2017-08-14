/**
 * Created by TP on 2017/7/26.
 */
import { Injectable } from '@angular/core';
import {System} from './system';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {User} from './user';

@Injectable()
export  class SystemService {

  private headers = new Headers ({'Content-Type': 'application/json'});
  private systemsUrl = 'api/systems';
  private usersUrl = 'api/users'; // URL to web api
  constructor(private http: Http) { }
  getSystems(): Promise<System[]> {
    return this.http.get(this.systemsUrl)
      .toPromise()
      .then(response => response.json().data as System[])
      .catch(this.handleError);
  }
  getUsers(): Promise<User[]> {
    return this.http.get(this.usersUrl)
      .toPromise()
      .then(response => response.json().data as User[])
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.systemsUrl}/${id}`;
    return this.http
      .delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch( this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


}
