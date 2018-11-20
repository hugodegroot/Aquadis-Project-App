import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Group} from '../group';
import {GroupService} from '../group.service';
import {UserService} from '../user.service';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.css']
})
export class GroupPageComponent implements OnInit {

  private router: Router;

  group$: Object;

  groups$: object;

  users$: Object;

  groupID: number;

  selectedGroup: Group;

  onSelect(group: Group): void {
    this.selectedGroup = group;
  }

  constructor(private http: HttpClient,
              private groupService: GroupService,
              private userService: UserService,
              private route: ActivatedRoute
  ) {
    this.refreshGroup();
  }

  refreshGroup() {
    this.route.params.subscribe(params => {this.groupID = params.id,
                                                this.showGroups()});
  }

  showGroups() {
    if (this.groupID !== undefined) {
      this.groupService.getGroup(this.groupID).subscribe(group => this.group$ = group);
    }
    this.userService.getGroups(this.userService.getUserId()).subscribe(
      data => this.groups$ = data);

    this.groupService.getUsers(this.groupID).subscribe(
      data => this.users$ = data
    );
  }

  ngOnInit() {
    this.showGroups();
  }
}
