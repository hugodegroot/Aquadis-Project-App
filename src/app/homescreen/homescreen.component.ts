import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../user';
import {UserService} from '../user.service';
import {Race} from '../race';
import {RaceService} from '../race.service';
import {Group} from '../group';
import {GroupService} from '../group.service';


@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.component.html',
  styleUrls: ['./homescreen.component.css']
})
export class HomescreenComponent implements OnInit {

  private router: Router;

  groups: object;

  users: Object;

  races: Object;

  // users: User[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get('http://localhost:8080/aquadis/users')
      .subscribe(http => this.users = http);
    this.http.get('http://localhost:8080/aquadis/races')
      .subscribe(http => this.races = http);
      this.http.get('http://localhost:8080/aquadis/groups')
        .subscribe(http => this.groups = http);
      // Users moeten nog gesorteerd worden op aantal punten voor de ranking list
      // sortUsers();
  }

  // sortUsers() {
  //   this.users;
  // }
}
