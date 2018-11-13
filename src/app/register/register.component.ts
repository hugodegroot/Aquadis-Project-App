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

  user: User;
  users: User[] = [];
  loading = false;

  userJSON: JSON;

  emailValue: string;
  usernameValue: string;
  firstnameValue: string;
  lastnameValue: string;
  passwordValue: string;

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

  onSubmit() {

    this.loading = true;

    this.emailValue = this.registerForm.controls.email.value;
    this.usernameValue = this.registerForm.controls.username.value;
    this.firstnameValue = this.registerForm.controls.firstname.value;
    this.lastnameValue = this.registerForm.controls.lastname.value;
    this.passwordValue = this.registerForm.controls.password.value;

    this.userService.addUser(new User(this.emailValue,
                                      this.usernameValue,
                                      this.firstnameValue,
                                      this.lastnameValue,
                                      this.passwordValue)).subscribe(user => {
      this.user = user;
      this.loading = false;
      this.registerForm.disable();
    });

}

}
