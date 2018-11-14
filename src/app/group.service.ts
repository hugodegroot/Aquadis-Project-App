import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Group} from './group';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {MessageService} from './message.service';
import {User} from './user';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private groupsUrl = 'http://localhost:8080/aquadis/rest/groups';

  constructor(private http: HttpClient,
              private messageService: MessageService) {
  }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.groupsUrl)
      .pipe(
        tap(_ => this.log('fetched groups')),
        catchError(this.handleError('getGroups', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user$ consumption
      this.log(`${operation} failed: ${error.message}`);

      alert('An API error has occurred. Please try again later!');

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }
}
