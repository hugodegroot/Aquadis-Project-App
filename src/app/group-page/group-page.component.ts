import {Component, OnInit} from '@angular/core';
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

  group$: Object;

  users$: Object;

  groupID: number;

  selectedGroup: Group;

  onSelect(group: Group): void {
    this.selectedGroup = group;
  }

  constructor(private http: HttpClient,
              private groupService: GroupService,
              private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => this.groupID = params.id);
  }

  ngOnInit() {
    this.groupService.getGroup(this.groupID).subscribe(
      data => this.group$ = data);

    this.groupService.getUsers(this.groupID).subscribe(
      data => this.users$ = data
    )
  }
}
