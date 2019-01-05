import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {User} from "../user";
import {GroupService} from "../group.service";
import {ActivatedRoute} from "@angular/router";
import {UserGroupService} from "../user-group.service";
import {UserGroup} from "../user-group";
import {Group} from "../group";
import {Race} from '../race';
import {RaceService} from '../race.service';

@Component({
  selector: 'app-add-people',
  templateUrl: './add-people.component.html',
  styleUrls: ['./add-people.component.css']
})
export class AddPeopleComponent implements OnInit {

  users$: User[];
  selectedUser$: User;
  userGroup: UserGroup;
  group$: Group;

  groupID: number;
  loading = false;

  constructor(private userService: UserService,
              private groupService: GroupService,
              private userGroupService: UserGroupService,
              private route: ActivatedRoute,
              private raceService: RaceService,
              ) {
  }

  ngOnInit() {
    this.loading = true;

    // Gets the group you are in
    this.route.params.subscribe(params => this.groupID = params.id);
    this.groupService.getGroup(this.groupID).subscribe(group => this.group$ = group);

    // Get all the users from the database
    this.userService.getUsers().subscribe(data => {this.users$ = data
      this.loading = false;});
  }

  selectUser(user: User) {
    this.selectedUser$ = user;
    console.log(this.selectedUser$);
  }

  addUser() {
    this.loading = true;

    this.raceService.getCurrentRace().subscribe(race => {
      this.userGroupService.addUserGroup(new UserGroup(0, "member", this.selectedUser$, this.group$, race)).subscribe(userGroup => {this.userGroup = userGroup,
      console.log(userGroup)})
    });


    this.loading = false;
  }

  search(value: string) {
    if (value.length > 1 || value.length === 0) {
        this.userService.getUsersByEmailOrName(value).subscribe(users => this.users$ = users);
    }
  }
}
