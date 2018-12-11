import {Component, OnInit, Renderer, Renderer2} from '@angular/core';
import {DataService} from '../data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../user';
import {UserService} from '../user.service';
import {Racer} from '../racer';
import {RacersService} from '../racers.service';
import {Team} from '../team';
import {TeamService} from '../team.service';
import {GroupService} from '../group.service';

@Component({
  selector: 'app-betting',
  templateUrl: './betting.component.html',
  styleUrls: ['./betting.component.css']
})
export class BettingComponent implements OnInit {

  users: User[];
  currentUser: User;
  currentUserID: number;
  teams: Team[];
  Racers$: Racer[];
  groupID: number;
  loading: boolean = true;

  maxRacersErrorMessage: boolean = false;
  duplicateRacerErrorMessage: boolean = false;

  myRacers: Racer[] = [];

  constructor(private http: HttpClient,
              private userService: UserService,
              private racersService: RacersService,
              private teamService: TeamService,
              private groupService: GroupService,
              private route: ActivatedRoute,
              private renderer: Renderer2
  ) {
    this.route.params.subscribe(params => {
      this.groupID = params.id,
        this.groupService.getUsers(this.groupID).subscribe(users => {
          this.users = users,
            this.currentUser = this.users.filter(user => user.id === this.userService.getUserId())[0],
            console.log(this.currentUser);
        });
    });
  }

  ngOnInit() {
    this.currentUserID = this.userService.getUserId();

    this.racersService.getRacers().subscribe(racers => {
      this.Racers$ = racers, this.teamService.getTeams().subscribe(teams => {
        this.teams = teams, console.log(teams), this.loading = false;
      });
    });

  }

  addRacerToPrediction(event: any, racer: Racer) {
    console.log(racer);

    if (this.myRacers.length < 5) {
      if (!this.myRacers.find(myRacer => myRacer == racer)) {
        this.myRacers.push(racer);
        this.renderer.addClass(event.target, 'toggled');
        if (this.currentUser.groups !== null) {
          // TODO change budget of correct group
          this.currentUser.groups[0].budget = this.currentUser.groups[0].budget - racer.salary;
        }
        this.duplicateRacerErrorMessage = false;
      } else {
        this.duplicateRacerErrorMessage = true;
      }
    } else {
      this.maxRacersErrorMessage = true;
    }

    console.log(this.myRacers);
  }

  removeRacerFromPrediction($event: any, racer: Racer) {
    console.log(racer);

    if (this.currentUser.groups !== null) {
      // TODO change budget of correct group
      this.currentUser.groups[0].budget = this.currentUser.groups[0].budget + racer.salary;
    }
    this.myRacers.splice(this.myRacers.indexOf(racer), 1);

    this.duplicateRacerErrorMessage = false;
    this.maxRacersErrorMessage = false;
  }
}
