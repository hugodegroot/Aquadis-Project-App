import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {ActivatedRoute} from "@angular/router";
import {MatSelectModule} from '@angular/material/select';
import {Race} from "../race";
import {Group} from "../group";
import {GroupService} from "../group.service";

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent implements OnInit {

  selectedPosition: string = '';

  userID: number;
  groups$: Object;

  selectChangeHandler(event: any) {
    this.selectedPosition = event.target.value;
  }

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.userID = this.userService.getUserId();

    this.userService.getGroups(this.userID).subscribe(
      data => this.groups$ = data);
  }

}
