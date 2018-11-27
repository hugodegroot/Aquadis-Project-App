import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RaceService} from '../race.service';
import {Race} from '../race';

@Component({
  selector: 'app-add-race',
  templateUrl: './add-race.component.html',
  styleUrls: ['./add-race.component.css']
})
export class AddRaceComponent implements OnInit {

  startDate = new Date();

  race: Race;

  loading: boolean = false;

  nameValue: string;
  locationValue: string;
  startDateValue: string;
  endDateValue: string;

  addRaceForm = new FormGroup({
    name: new FormControl('', Validators.required),
    location: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[a-z A-Z]*')])),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
  });

  constructor(private userService: UserService,
              private router: Router,
              private raceService: RaceService) {
  }

  ngOnInit() {
    if (!this.userService.isAdmin()) {
      this.router.navigateByUrl('/homescreen)');
    }
  }

  // When register button is clicked
  onSubmit() {

    this.loading = true;

    // Assign form values
    this.nameValue = this.addRaceForm.controls.name.value;
    this.locationValue = this.addRaceForm.controls.location.value;
    this.startDateValue = this.addRaceForm.controls.startDate.value;
    this.endDateValue = this.addRaceForm.controls.endDate.value;

    // Add the user via Api
    this.raceService.addRace(new Race(this.nameValue,
                                      this.startDateValue,
                                      this.endDateValue,
                                      this.locationValue)).subscribe(race => {
      // If successful
      this.race = race;
      this.loading = false;
      this.addRaceForm.disable();
    });
  }

}
