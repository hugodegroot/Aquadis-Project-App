import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from './user';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {MessageService} from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'api/users';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /** GET user by email. Will 404 if id not found */
  getUserByEmail(email: string): Observable<User> {
    const url = `${this.usersUrl}/?email=${email}`;
    return this.http.get<User>(url).pipe(
      tap(_ => console.log(`fetched user email=${email}` + ' url: ' + url)),
      catchError(this.handleError<User>(`getUserByEmail email=${email}` + ' url: ' + url))
    );
  }

  // getUserByEmail(term: string): Observable<User[]> {
  //   term = term.trim();
  //
  //   // Add safe, URL encoded search parameter if there is a search term
  //   const options = term ?
  //     { params: new HttpParams().set('email', term) } : {};
  //
  //   return this.http.get<User[]>(this.usersUrl, options)
  //     .pipe(
  //       catchError(this.handleError<User[]>('searchUsersByEmail', []))
  //     );
  // }

  getUserById(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => console.log(`fetched user id=${id}` + ' url: ' + url)),
      catchError(this.handleError<User>(`getUserByID id=${id}` + ' url: ' + url))
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        tap(users => this.log('fetched users')),
        catchError(this.handleError('getUsers', []))
      );
  }

  /** DELETE: delete the user from the server */
  deleteUser (id: number): Observable<{}> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteUser', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
