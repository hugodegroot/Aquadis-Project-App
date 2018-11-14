import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class RacersService {

  private racersUrl = 'http://localhost:8080/aquadis/rest/racers';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

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
