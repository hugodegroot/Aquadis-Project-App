import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../user";
import {Group} from "../group";
import {GroupService} from "../group.service";

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  // Variables declaration
  user: User;
  group: Group;
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
              ) {
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

      // Add the user via Api
      this.groupService.addGroup(new Group(this.groupValue
        )).subscribe(group => {
        // If successful
        this.group = group;
        this.loading = false;
        this.errorMessage = false;
        this.groupForm.disable();
      });
    } else {
      this.errorMessage = true;
      //this.groupForm.controls.repeatPassword.setErrors({'incorrect': true});
    }
  }

}
