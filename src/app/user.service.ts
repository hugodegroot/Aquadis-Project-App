import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from './user';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {MessageService} from './message.service';
import {DataService} from './data.service';
import {Group} from './group';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const loginToken = 'loginToken';
const userIdToken = 'userIdToken';
const adminToken = 'isAdmin';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = this.dataService.getApiUrl() + '/users';  // URL to web api

  constructor(
    private dataService: DataService,
    private http: HttpClient,
    private messageService: MessageService
  ) {
  }

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
  validateLogin(email: string, password: string): Observable<User> {
    const url = `${this.usersUrl}/user?email=${email}&password=${password}`;
    return this.http.get<User>(url).pipe(
      tap(_ => console.log(`fetched user username=${email} password=${password}` + ' url: ' + url)),
      catchError(this.handleError<User>(`getUserByUsername username=${email} password=${password}` + ' url: ' + url))
    );
  }

  getUsersByEmailOrName(terms: string): Observable<User[]> {
    const url = `${this.usersUrl}/search?email=${terms}&firstname=${terms}&lastname=${terms}`;
    return this.http.get<User[]>(url).pipe(
      tap(_ => console.log(`fetched users by email or name ${terms}` + ' url: ' + url)),
      catchError(this.handleError<User[]>(`getUsersByEmailOrName terms ${terms}` + ' url: ' + url))
    );
  }

  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
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

  getUsersFromGroup(userID: number, groupID: number): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl + "/" + userID + "/ug/groups/" + groupID + "/users")
      .pipe(
        tap(_ => this.log('fetched users')),
        catchError(this.handleError('getUsers', []))
      );
  }

  // getBudgets(userID: number): Observable<User[]> {
  //   return this.http.get<User[]>(this.usersUrl + "/" + userID + "/ug/" + userID)
  //     .pipe(
  //       tap(_ => this.log('fetched users')),
  //       catchError(this.handleError('getUsers', []))
  //     );
  // }

  /** POST: add a new user to the server */
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl + '/user', user, httpOptions).pipe(
      tap((user: User) => this.log(`added user w/ id=${user.id}`)),
      catchError(this.handleError<User>('AddUser'))
    );
  }

  getGroups(userID: number): Observable<Group[]> {
    return this.http.get<Group[]>(this.usersUrl + '/' + userID + '/ug/groups')
      .pipe(
        tap(_ => this.log('fetched groups')),
        catchError(this.handleError('getGroups', []))
      );
  }

  /** DELETE: delete the user$ from the server */
  deleteUser(id: number): Observable<{}> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteUser', []))
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

  // Session logic
  login(user: User): void {
    sessionStorage.setItem(loginToken, 'set');
    this.setUserId(user.id);
    if (user.isAdmin) {
      this.setAdmin();
    }
  }

  logout(): void {
    sessionStorage.clear();
  }

  isLogged() {
    return sessionStorage.getItem(loginToken) != null;
  }

  setUserId(userId: number): void {
    sessionStorage.setItem(userIdToken, userId.toString());
  }

  getUserId(): number {
    return Number(sessionStorage.getItem(userIdToken));
  }

  setAdmin(): void {
    sessionStorage.setItem(adminToken, '1');
  }

  isAdmin(): boolean {
    return sessionStorage.getItem(adminToken) != null;
  }

}
