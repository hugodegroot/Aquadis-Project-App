import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl: String = 'http://192.168.2.22:8080/aquadis/rest';

  constructor() {
  }

  getApiUrl(): String {
    return this.apiUrl;
  }

}
