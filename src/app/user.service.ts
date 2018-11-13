import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from './user';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {MessageService} from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const TOKEN = 'TOKEN';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'http://localhost:8080/aquadis/rest/users';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  // /** GET user$ by email. Will 404 if id not found */
  // getUserByEmail(email: string): Observable<User> {
  //   const url = `${this.usersUrl}/?email=${email}`;
  //   return this.http.get<User>(url).pipe(
  //     tap(user$ => console.log(`fetched user$ email=${email}` + ' url: ' + url)),
  //     catchError(this.handleError<User>(`getUserByEmail email=${email}` + ' url: ' + url))
  //   );
  // }
  //
  // /** GET user$ by username. Will 404 if id not found */
  // getUserByUsername(username: string): Observable<User> {
  //   const url = `${this.usersUrl}/?username=${username}`;
  //   return this.http.get<User>(url).pipe(
  //     tap(user$ => console.log(`fetched user$ username=${username}` + ' url: ' + url)),
  //     catchError(this.handleError<User>(`getUserByUsername username=${username}` + ' url: ' + url))
  //   );
  // }

  /** GET user$ by email. Will 404 if id not found */
  validateLogin(username: string, password: string): Observable<User> {
    const url = `${this.usersUrl}/?username=${username}&password=${password}`;
    return this.http.get<User>(url).pipe(
      tap(_ => console.log(`fetched user username=${username} password=${password}` + ' url: ' + url)),
      catchError(this.handleError<User>(`getUserByUsername username=${username} password=${password}` + ' url: ' + url))
    );
  }

  /* GET users whose name contains search term */
  searchUsersByUsername(term: string): Observable<User[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<User[]>(`${this.usersUrl}/?username=${term}`).pipe(
      tap(_ => this.log(`found users matching username: "${term}"`)),
      catchError(this.handleError<User[]>('searchUsersByUsername', []))
    );
  }

  /* GET users whose password contains search term */
  searchUsersByPassword(term: string): Observable<User[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<User[]>(`${this.usersUrl}/?password=${term}`).pipe(
      tap(_ => this.log(`found users matching password: "${term}"`)),
      catchError(this.handleError<User[]>('searchUsersByPassword', []))
    );
  }

  getUserById(id: number): Observable<User> {
    const url = `${this.usersUrl}/?id=${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => console.log(`fetched user id=${id}` + ' url: ' + url)),
      catchError(this.handleError<User>(`getUserByID id=${id}` + ' url: ' + url))
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        tap(_ => this.log('fetched users')),
        catchError(this.handleError('getUsers', []))
      );
  }

  /** POST: add a new user to the server */
  addUser (user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl + '/user', user, httpOptions).pipe(
      tap((user: User) => this.log(`added user w/ id=${user.id}`)),
      catchError(this.handleError<User>('AddUser'))
    );
  }

  /** DELETE: delete the user$ from the server */
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

      // TODO: better job of transforming error for user$ consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

  removeToken(): void {
    localStorage.removeItem(TOKEN);
  }

  isLogged() {
    return localStorage.getItem(TOKEN) != null;
  }
}
