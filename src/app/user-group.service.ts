import { Injectable } from '@angular/core';
import {DataService} from "./data.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";
import {UserGroup} from "./user-group";
import {User} from "./user";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserGroupService {

  private userGroupUrl = this.dataService.getApiUrl() + '/users/1/ug/usergroup';  // URL to web api

  constructor(
    private dataService: DataService,
    private http: HttpClient,
    private messageService: MessageService
  ) {
  }

  addUserGroup(userGroup: UserGroup){
    return this.http.post<UserGroup>(this.userGroupUrl, userGroup, httpOptions).pipe(
      tap((usergroup: UserGroup) => this.log(`added userGroup ${usergroup}`)),
      catchError(this.handleError<UserGroup>('AddUserGroup'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user$ consumption
      this.log(`${operation} failed: ${error.message}`);

      // optional alert for the user
      // alert('An API error has occurred. Please try again later!');

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`UserGroupService: ${message}`);
  }
}
