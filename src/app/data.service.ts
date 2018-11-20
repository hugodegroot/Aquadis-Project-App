import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl: String = 'http://145.28.166.44:8080/aquadis/rest';

  constructor() {
  }

  getApiUrl(): String {
    return this.apiUrl;
  }

}
