import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
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
  errorMessage = false;

  // Form field variables declaration
  emailValue: string;
  firstnameValue: string;
  lastnameValue: string;
  passwordValue: string;
  repeatPasswordValue: string;

  // Initiating formGroup
  registerForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])),
    repeatPassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])),
  });

  constructor(private router: Router,
              private userService: UserService,
  ) {
  }

  ngOnInit() {

  }

  // When register button is clicked
  onSubmit() {

    // Assign form values
    this.emailValue = this.registerForm.controls.email.value;
    this.firstnameValue = this.registerForm.controls.firstname.value;
    this.lastnameValue = this.registerForm.controls.lastname.value;
    this.passwordValue = this.registerForm.controls.password.value;
    this.repeatPasswordValue = this.registerForm.controls.repeatPassword.value;

    if (this.passwordValue === this.repeatPasswordValue) {
      // Start the loader
      this.loading = true;

    // Add the user via Api
      this.userService.addUser(new User(this.emailValue,
                                        this.firstnameValue,
                                        this.lastnameValue,
                                        this.passwordValue)).subscribe(user => {
        // If successful
        this.user = user;
        this.loading = false;
        this.errorMessage = false;
        this.registerForm.disable();
      });
    } else {
      this.errorMessage = true;
      // this.registerForm.controls.password.setErrors({'incorrect': true});
      this.registerForm.controls.repeatPassword.setErrors({'incorrect': true});
    }
}

}
