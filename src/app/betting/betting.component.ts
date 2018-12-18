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
import {Group} from '../group';

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
  group: Group;

  maxRacersErrorMessage: boolean = false;
  duplicateRacerErrorMessage: boolean = false;
  private outOfFundsErrorMessage: boolean = false;

  myRacers: Racer[] = [];

  private newBudget: number;

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
            console.log(this.currentUser),
            groupService.getGroup(this.groupID).subscribe(group => this.group = group);
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

    // @ts-ignore
    this.newBudget = this.currentUser.groups[0].budget - racer.salary;

    if (this.myRacers.length < 5) {
      if (!this.myRacers.find(myRacer => myRacer == racer)) {
        if (this.newBudget >= 0) {
          this.myRacers.push(racer);
          var elements = document.getElementsByClassName('racer_' + racer.id);
          // for (let i = 0; i < elements.length; i++) {
          //   this.renderer.addClass(elements[i], 'toggled');
          // }
          this.renderer.addClass(elements[0], 'toggled');
          this.renderer.setStyle(elements[1], 'visibility', 'hidden');
          this.changeBudget('-', racer.salary);
          this.duplicateRacerErrorMessage = false;
          this.outOfFundsErrorMessage = false;
          this.maxRacersErrorMessage = false;
        } else {
          this.outOfFundsErrorMessage = true;
          this.scrollToErrors();
        }
      } else {
        this.duplicateRacerErrorMessage = true;
        this.scrollToErrors();
      }
    } else {
      this.maxRacersErrorMessage = true;
      this.scrollToErrors();
    }

    if (this.myRacers.length == 5) {
      document.getElementById('myRacers').scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
    }

    console.log(this.myRacers);
  }

  scrollToErrors() {
    document.getElementById('racersList').scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
  }

  removeRacerFromPrediction($event: any, racer: Racer) {
    console.log(racer);

    this.changeBudget('+', racer.salary);

    this.myRacers.splice(this.myRacers.indexOf(racer), 1);

    var elements = document.getElementsByClassName('racer_' + racer.id);
    // for (let i = 0; i < elements.length; i++) {
    //   this.renderer.removeClass(elements[i], 'toggled');
    // }

    this.renderer.removeClass(elements[0], 'toggled');
    this.renderer.setStyle(elements[1], 'visibility', 'visible');

    this.duplicateRacerErrorMessage = false;
    this.maxRacersErrorMessage = false;
    this.outOfFundsErrorMessage = false;
  }

  changeBudget(operation: string, amount: number) {
    // @ts-ignore
    if (this.currentUser.groups[0].budget !== null && this.currentUser.groups[0].budget !== undefined) {
      // TODO change budget of correct group
      if (operation === '+') {
        // @ts-ignore
        this.currentUser.groups[0].budget = this.currentUser.groups[0].budget + amount;

      } else if (operation === '-') {
        // @ts-ignore
        this.currentUser.groups[0].budget = this.currentUser.groups[0].budget - amount;
      }
    }
  }

}
