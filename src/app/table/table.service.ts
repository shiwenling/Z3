/**
 * Created by TP on 2017/8/7.
 */
/**
 * Created by TP on 2017/7/26.
 */
import { Injectable } from '@angular/core';
import {  Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Project} from './project';

@Injectable()
export  class TableService {
  private projectsUrl = 'api/projects';
  // private usersUrl = 'api/users'; // URL to web api
  constructor(private http: Http) { }
  getProjects(): Promise<Project[]> {
    return this.http.get(this.projectsUrl)
      .toPromise()
      .then(response => response.json().data as Project[])
      .catch(this.handleError);
  }
  // getUsers(): Promise<User[]> {
  //   return this.http.get(this.usersUrl)
  //     .toPromise()
  //     .then(response => response.json().data as User[])
  //     .catch(this.handleError);
  // }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
