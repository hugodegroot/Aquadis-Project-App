import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Group} from './group';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {MessageService} from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private groupsUrl = 'api/groups';

  constructor() {
    private http: HttpClient,
    private messageService: MessageService
  }

  getGroupById(id: number): Observable<Group> {
    const url = `${this.groupsUrl}/?id=${id}`;
    return this.http.get<Group>(url).pipe(
      tap(_ => console.log(`fetched group id=${id}` + ' url: ' + url)),
      catchError(this.handleError<Group>(`getGroupByID id=${id}` + ' url: ' + url))
    );
  }
}
