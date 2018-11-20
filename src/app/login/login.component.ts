import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {Validators} from '@angular/forms';

import {UserService} from '../user.service';
import {User} from '../user';

import {Router} from '@angular/router';
import {DataService} from '../data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  user: User;
  errorMessage = false;
  loading = false;

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  private usernameValue;
  private passwordValue;

  constructor(
    private data: DataService,
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.errorMessage = false;
    if (this.userService.isLogged()) {
      this.router.navigateByUrl('homescreen');
    }
  }

  onSubmit() {
    this.loading = true;

    this.usernameValue = this.loginForm.controls.username.value;
    this.passwordValue = this.loginForm.controls.password.value;

    this.userService.validateLogin(this.usernameValue, this.passwordValue).subscribe(user => {this.validateLogin(user); });

  }

  validateLogin(user: User) {

    this.loading = false;

    if (user) {
      this.userService.login(user);
      this.router.navigateByUrl('homescreen');
    } else {
      console.log('Invalid Login');
      this.errorMessage = true;
    }
  }

}
