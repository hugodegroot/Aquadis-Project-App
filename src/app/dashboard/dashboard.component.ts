import { Component, OnInit } from '@angular/core';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {RaceService} from '../race.service';
import {Race} from '../race';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  races: Race[];
  private searchTerms = new Subject<string>();


  constructor(private raceService: RaceService) { }

  ngOnInit() {
    this.raceService.getRaces().subscribe(races => this.races = races);
  }

  deleteRace(race: Race) {
    this.races = this.races.filter(h => h !== race);
    this.raceService.deleteRace(race).subscribe();
  }

}
