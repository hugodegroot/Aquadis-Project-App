import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Group} from "../group";
import {GroupService} from "../group.service";

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.css']
})
export class GroupPageComponent implements OnInit {

  private router: Router

  group: object;

  selectedGroup: Group;

  onSelect(group: Group): void {
    this.selectedGroup = group;
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:8080/aquadis/groups')
      .subscribe(http => this.groups = http);
  }

}
