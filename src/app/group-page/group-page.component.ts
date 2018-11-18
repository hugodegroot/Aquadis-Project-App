import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Group} from '../group';
import {GroupService} from '../group.service';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.css']
})
export class GroupPageComponent implements OnInit {

  private router: Router;

  currentGroupId: number;

  group: object;

  groups: object;

  selectedGroup: Group;

  onSelect(group: Group): void {
    this.selectedGroup = group;
  }

  constructor(private http: HttpClient,
              private groupService: GroupService,
              private route: ActivatedRoute
  ) {this.route.params.subscribe(params => this.currentGroupId = params.id);}

  ngOnInit() {
    if (this.currentGroupId !== undefined) {
      this.groupService.getGroup(this.currentGroupId).subscribe(group => this.group = group);
    }
    this.groupService.getGroups().subscribe(groups => this.groups = groups);
  }
}
