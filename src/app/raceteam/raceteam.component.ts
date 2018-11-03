import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "../user";
import {UserService} from "../user.service";

@Component({
  selector: 'app-raceteam',
  templateUrl: './raceteam.component.html',
  styleUrls: ['./raceteam.component.css']
})
export class RaceteamComponent implements OnInit {

  users: Object;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:8080/aquadis/users')
      .subscribe(http => this.users = http);
  }

}
