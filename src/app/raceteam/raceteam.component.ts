import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../user';
import {UserService} from '../user.service';

@Component({
  selector: 'app-raceteam',
  templateUrl: './raceteam.component.html',
  styleUrls: ['./raceteam.component.css']
})
export class RaceteamComponent implements OnInit {

  users: Object;

  constructor(private http: HttpClient,
              private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => this.users = users);
  }
}
