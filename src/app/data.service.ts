import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  getUsers() {
    return this.http.get('http://localhost:8080/aquadis/rest/users');
  }

  authenticateUser(user: User) {
    return this.http.post("http://localhost:8080/aquadis/rest/users/authenticate", user)
  }

  getUser(userId) {
    return this.http.get('http://localhost:8080/aquadis/rest/users/' + userId);
  }

}
