import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl: String = 'http://192.168.2.22:8080/aquadis/rest';

  constructor(private http: HttpClient) {
  }

  getApiUrl(): String {
    return this.apiUrl;
  }

}
