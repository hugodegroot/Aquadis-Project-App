import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import {DataService} from './data.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './user';
import {catchError, tap} from 'rxjs/operators';
import {Team} from './team';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private teamsUrl = this.dataService.getApiUrl() + '/teams';  // URL to web api


  constructor(private dataService: DataService,
              private http: HttpClient,
              private messageService: MessageService
              ) { }

  getTeam(id: number): Observable<Team> {
    const url = `${this.teamsUrl}/${id}`;
    return this.http.get<Team>(url).pipe(
      tap(_ => console.log(`fetched Team id=${id}` + ' url: ' + url)),
      catchError(this.handleError<Team>(`getTeamById id=${id}` + ' url: ' + url))
    );
  }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.teamsUrl)
      .pipe(
        tap(_ => this.log('fetched teams')),
        catchError(this.handleError('getTeams', []))
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
    this.messageService.add(`UserService: ${message}`);
  }

}
