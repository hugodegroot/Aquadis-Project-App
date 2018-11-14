import { Component, OnInit } from '@angular/core';
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

  groups: Group[];



  selectChangeHandler (event: any) {
    this.selectedPosition = event.target.value;
  }

  constructor(private groupService: GroupService) {

  }

  ngOnInit() {
    this.groupService.getGroups().subscribe(
      data => this.groups = data);
  }

}
