import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {GroupService} from '../group.service';
import {RaceService} from '../race.service';
import {Race} from '../race';
import {Group} from '../group';
import {User} from '../user';


@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.component.html',
  styleUrls: ['./homescreen.component.css']
})
export class HomescreenComponent implements OnInit {

  user$: User;
  groups$: Group[];
  races: Race[];
  currentRace: Race;

  // userGroups$; Object;
  userID: number;

  constructor(private userService: UserService,
              private raceService: RaceService) {
  }

  ngOnInit() {
    this.userID = this.userService.getUserId();

    this.userService.getUser(this.userID).subscribe(
      data => this.user$ = data);

    this.userService.getGroups(this.userID).subscribe(
      data => this.groups$ = data);

    this.raceService.getRaces().subscribe(races => this.races = races);

    this.raceService.getCurrentRace().subscribe(race => this.currentRace = race);

    // this.userService.getBudgets(this.userID).subscribe(
    //   data => this.userGroups$ = data);

    console.log('SessionStorage UserId: ' + this.userService.getUserId());
    console.log('SessionStorage adminStatus: ' + this.userService.isAdmin());

  }

}
