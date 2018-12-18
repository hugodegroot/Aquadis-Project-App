import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {ActivatedRoute} from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {Race} from '../race';
import {Group} from '../group';
import {GroupService} from '../group.service';
import {RaceService} from '../race.service';
import {TeamService} from '../team.service';
import {Team} from '../team';
import {RacersService} from '../racers.service';
import {Racer} from '../racer';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

export interface Position {
  value: string;
  viewValue: string;
}

export interface DialogData {
  racerId: number;
  salary: number;
}

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent implements OnInit {

  userID: number;
  raceID: number;
  groups$: Group[];
  race: Race;
  currentRace: Race;
  teams: Team[];
  racer: Racer;

  loading: boolean = true;

  isCurrentRace: Boolean = false;

  errorMessage: Boolean = false;

  positions: Position[] = [
    {value: '1', viewValue: '1'},
    {value: '2', viewValue: '2'},
    {value: '3', viewValue: '3'},
    {value: '4', viewValue: '4'},
    {value: '5', viewValue: '5'},
    {value: '6', viewValue: '6'},
    {value: '7', viewValue: '7'},
    {value: '8', viewValue: '8'},
    {value: '9', viewValue: '9'},
    {value: '10', viewValue: '10'},
    {value: '11', viewValue: '11'},
    {value: '12', viewValue: '12'},
    {value: '13', viewValue: '13'},
    {value: '14', viewValue: '14'},
    {value: '15', viewValue: '15'},
    {value: '16', viewValue: '16'},
    {value: '17', viewValue: '17'},
    {value: '18', viewValue: '18'},
    {value: '19', viewValue: '19'},
    {value: '20', viewValue: '20'}
  ];

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private raceService: RaceService,
              private teamService: TeamService,
              private racersService: RacersService,
              public dialog: MatDialog
  ) {
    this.route.params.subscribe(params => {
      this.raceID = params.id,
        this.getRace(this.raceID);
    });
  }

  ngOnInit() {
    this.userID = this.userService.getUserId();

    this.userService.getGroups(this.userID).subscribe(
      data => {
        this.groups$ = data, this.teamService.getTeams().subscribe(teams => {
          this.teams = teams, console.log(teams), this.loading = false;
        });
      });

  }

  private getRace(raceID: number) {
    this.raceService.getRace(raceID).subscribe(data => {
      this.race = data,
        this.raceService.getCurrentRace().subscribe(race => {
          this.currentRace = race,
            this.isCurrentRace = this.compareRaces(this.race, this.currentRace), this.loading = false;
        });
    });
  }

  private updateRacerSalary(racerId: number, salary: number) {
    this.racersService.updateRacerSalary(racerId, salary).subscribe(racer => this.racer = racer, () => {
      this.errorMessage = true;
    }, () => {
      this.showDialog(racerId, salary);
    });
  }

  private showDialog(racerId: number, salary: number) {
    const dialogRef = this.dialog.open(matDialogSalaryUpdated, {
      width: '350px',
      data: {racerId: racerId, salary: salary}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  private compareRaces(race: Race, currentRace: Race) {
    return race.id === currentRace.id;
  }

  saveMax(value: string) {
    console.log(value);
  }

  toggleDetails($event: any) {
    // console.log($event);
    // console.log($event.source._elementRef.nativeElement.innerText);
    let elements = document.querySelectorAll('details');
    Array.from(elements).forEach(function(element, index) {
      element.open = $event.checked;
    })
  }
}

@Component({
  selector: 'matDialogSalaryUpdated',
  templateUrl: 'matDialogSalaryUpdated.html',
})
export class matDialogSalaryUpdated {

  constructor(
    public dialogRef: MatDialogRef<matDialogSalaryUpdated>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
