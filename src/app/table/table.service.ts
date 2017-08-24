/**
 * Created by TP on 2017/8/7.
 */
/**
 * Created by TP on 2017/7/26.
 */
import { Injectable} from '@angular/core';
import {  Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Project} from './project';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export  class TableService {
  private headers = new Headers ({'Content-Type': 'application/json'});
  private projectsUrl = 'api/projects';
  // private usersUrl = 'api/users'; // URL to web api
  constructor(private http: Http) { }

  // searchEvent:EventEmitter<ProjectSearchParams> = new EventEmitter();
  search(term: ProjectSearchParams): Observable<Project[]> {
    const termArray = Object.getOwnPropertyNames(term);
    const length = termArray.length;

    if( length == 1){
      for (var propName in term) {
        var url =  'api/projects/?'+ propName + '=' + term[propName];
      }
      return this.http.get(url)
        .map(response => response.json().data as Project[])
    }else {
      var url = 'api/projects/?'+ termArray[0] + '=' + term[termArray[0]];
      for( var i=1; i<length; i++){
        url = url + '&'+ termArray[i] + '=' + term[termArray[i]];
      }
      // for (var propName in term){
      //   url = url + '$'+ propName + '=' + term[propName];
      // }
      return this.http.get(url)
        .map(response => response.json().data as Project[])

    }
  }

  create(project: any ): Observable<Project> {
    return this.http
      .post(this.projectsUrl, JSON.stringify(project), {headers: this.headers})
      .map(res => res.json().data as Project)
      .catch(this.handleError);
  }

  update(project: Project, id:number): Observable<Project> {
    const url = `${this.projectsUrl}/${id}`;
    return this.http
      .put(url, JSON.stringify(project), {headers: this.headers})
      .map(() => project)
      .catch(this.handleError);
  }

  getProjects(): Observable<Project[]> {
    return this.http.get(this.projectsUrl)
      .map(response => response.json().data as Project[])
      .catch(this.handleError);
  }
  delete(id: number):Observable<void> {
    const url = `${this.projectsUrl}/${id}`;
    return this.http
      .delete(url, {headers: this.headers})
      .map(() => null)
      .catch( this.handleError);
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

export class ProjectSearchParams {
  constructor(
    public state:string,
    public dp1: any,
    public dp2: any,
    public sysname: string,
    public modulename:string,
    public tablename: string,
    public members: Array<string>,
    public projectId: number,
    public projectname: string,
){}

}
