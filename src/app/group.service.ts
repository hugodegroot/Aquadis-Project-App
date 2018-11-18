import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Group} from './group';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {MessageService} from './message.service';
import {DataService} from './data.service';
import {User} from './user';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private groupsUrl = this.dataService.getApiUrl() + '/groups';

  constructor(private dataService: DataService,
              private http: HttpClient,
              private messageService: MessageService) {
  }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.groupsUrl)
      .pipe(
        tap(_ => this.log('fetched groups')),
        catchError(this.handleError('getGroups', []))
      );
  }

  getGroup(id: number): Observable<Group> {
    const url = `${this.groupsUrl}/${id}`;
    return this.http.get<Group>(url).pipe(
      tap(_ => console.log(`fetched group id=${id}` + ' url: ' + url)),
      catchError(this.handleError<Group>(`getGroupById id=${id}` + ' url: ' + url))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user$ consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`GroupService: ${message}`);
  }
}
