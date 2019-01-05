import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../user';
import {Group} from '../group';
import {GroupService} from '../group.service';
import {UserGroup} from '../user-group';
import {UserService} from '../user.service';
import {RaceService} from '../race.service';
import {Race} from '../race';
import {UserGroupService} from '../user-group.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  // Variables declaration
  user: User;
  group: Group;
  userGroup: UserGroup;
  race: Race;
  loading = false;
  errorMessage = false;

  // Form field variables declaration
  groupValue: string;

  // Initiating formGroup
  groupForm = new FormGroup({
    groupName: new FormControl('', Validators.required)
  });

  constructor(private router: Router,
              private groupService: GroupService,
              private userService: UserService,
              private raceService: RaceService,
              private userGroupService: UserGroupService,
  ) {
    this.userService.getUser(this.userService.getUserId()).subscribe(user => this.user = user);
    this.raceService.getCurrentRace().subscribe(race => this.race = race);
  }

  ngOnInit() {

  }

  // When register button is clicked
  onSubmit() {

    // Assign form values
    this.groupValue = this.groupForm.controls.groupName.value;

    if (this.groupValue) {
      // Start the loader
      this.loading = true;

      // Add the group via Api
      this.groupService.addGroup(new Group(this.groupValue
      )).subscribe(group => {
        // If successful
        this.group = group;
        this.errorMessage = false;
        this.groupForm.disable();
      });

      this.userGroup = new UserGroup(0, 'admin', this.user, this.group, this.race);

      // Add creator to group
      this.userGroupService.addUserGroup(this.userGroup).subscribe(userGroup => {
          this.userGroup = userGroup,
          this.loading = false;
      });

    } else {
      this.errorMessage = true;
      //this.groupForm.controls.repeatPassword.setErrors({'incorrect': true});
    }
  }

}
