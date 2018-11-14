import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, AbstractControl} from '@angular/forms';
import {Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../user';
import {UserService} from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Variables declaration
  user: User;
  loading = false;

  // Form field variables declaration
  emailValue: string;
  usernameValue: string;
  firstnameValue: string;
  lastnameValue: string;
  passwordValue: string;

  // Initiating formGroup
  registerForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])),
  });

  constructor(private router: Router,
              private userService: UserService,
  ) {
  }

  ngOnInit() {

  }

  // When register button is clicked
  onSubmit() {

    // Start loader
    this.loading = true;

    // Assign form values
    this.emailValue = this.registerForm.controls.email.value;
    this.usernameValue = this.registerForm.controls.username.value;
    this.firstnameValue = this.registerForm.controls.firstname.value;
    this.lastnameValue = this.registerForm.controls.lastname.value;
    this.passwordValue = this.registerForm.controls.password.value;

    // Add the user via Api
    this.userService.addUser(new User(this.emailValue,
                                      this.usernameValue,
                                      this.firstnameValue,
                                      this.lastnameValue,
                                      this.passwordValue)).subscribe(user => {
      // If successful
      this.user = user;
      this.loading = false;
      this.registerForm.disable();
      });

}

}
