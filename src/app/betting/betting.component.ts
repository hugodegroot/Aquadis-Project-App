import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../user';
import {UserService} from '../user.service';

@Component({
  selector: 'app-betting',
  templateUrl: './betting.component.html',
  styleUrls: ['./betting.component.css']
})
export class BettingComponent implements OnInit {

  private router: Router;

  users: Object;

  constructor(private http: HttpClient,
              private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => this.users = users);
  }
}