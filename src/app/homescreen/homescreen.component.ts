import {Component, OnInit} from '@angular/core';
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

  user$: Object;
  userID: number;

  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.userID = params.id);
  }

  ngOnInit() {
    this.userService.getUser(this.userID).subscribe(
      data => this.user$ = data);
  }
}