import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // change localhost/ip to the local ip. cmd -> ipconfig
  apiUrl: String = 'http://192.168.2.25:8080/aquadis/rest';

  constructor() {
  }

  getApiUrl(): String {
    return this.apiUrl;
  }

}
