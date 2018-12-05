import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from './message.service';
import {catchError, tap} from 'rxjs/operators';
import {Racer} from './racer';
import {DataService} from './data.service';
import {UserService} from './user.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RacersService {

  private racersUrl = this.dataService.getApiUrl() + '/racers';  // URL to web api

  constructor(private dataService: DataService,
              private http: HttpClient,
              private messageService: MessageService,
              private userService: UserService) {
  }

  getRacers(): Observable<Racer[]> {
    return this.http.get<Racer[]>(this.racersUrl)
      .pipe(
        tap(_ => this.log('fetched racers')),
        catchError(this.handleError('getRacers', []))
      );
  }

  /** PUT: update the hero on the server */
  updateRacerSalary(racerId: number, salary: number) {
    return this.http.put(this.racersUrl + `/racer?id=${racerId}&salary=${salary}`,httpOptions).pipe(
      tap(_ => this.log(`updated racer id=${racerId}`)),
      catchError(this.handleError<any>('updateRacer'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user$ consumption
      this.log(`${operation} failed: ${error.message}`);

      // Optional alert to the user
      // alert('An API error has occurred. Please try again later!');

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`UserService: ${message}`);
  }
}
