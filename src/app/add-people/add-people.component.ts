import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {User} from "../user";
import {GroupService} from "../group.service";
import {ActivatedRoute} from "@angular/router";
import {UserGroupService} from "../user-group.service";
import {UserGroup} from "../user-group";
import {Group} from "../group";

@Component({
  selector: 'app-add-people',
  templateUrl: './add-people.component.html',
  styleUrls: ['./add-people.component.css']
})
export class AddPeopleComponent implements OnInit {

  users$: User[];
  selectedUser$: User;
  groupID: number;
  group$: Group;
  loading = false;

  constructor(private userService: UserService,
              private groupService: GroupService,
              private userGroupService: UserGroupService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.loading = true;
    // Gets the group you are in
    this.route.params.subscribe(params => this.groupID = params.id);
    this.groupService.getGroup(this.groupID).subscribe(data => this.group$ = data)

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

    this.userGroupService.addUserGroup(new UserGroup(0, "member", this.selectedUser$, this.group$));

    console.log(new UserGroup(0, "member", this.selectedUser$, this.group$));

    this.loading = false;
  }

  search(value: string) {
      this.userService.getUsersByEmailOrName(value).subscribe(users => this.users$ = users);
  }
}
