import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from './message.service';
import {Observable, of} from 'rxjs';
import {Race} from './race';
import {catchError, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  private racesUrl = 'api/races';  // URL to web api

  constructor(private http: HttpClient,
              private messageService: MessageService) {
  }

  /* GET races whose name contains search term */
  searchRacesByName(term: string): Observable<Race[]> {
    if (!term.trim()) {
      // if not search term, return empty race array.
      return of([]);
    }
    return this.http.get<Race[]>(`${this.racesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found races matching name: "${term}"`)),
      catchError(this.handleError<Race[]>('searchRacesByName', []))
    );
  }

  // get all races
  getRaces(): Observable<Race[]> {
    return this.http.get<Race[]>(this.racesUrl)
      .pipe(
        tap(races => this.log('fetched races')),
        catchError(this.handleError('getRaces', []))
      );
  }

  /** DELETE: delete the hero from the server */
  deleteRace (race: Race | number): Observable<Race> {
    const id = typeof race === 'number' ? race : race.id;
    const url = `${this.racesUrl}/${id}`;
    return this.http.delete<Race>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted race id=${id}`)),
      catchError(this.handleError<Race>('deleteRace'))
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
    this.messageService.add(`RaceService: ${message}`);
  }

}
