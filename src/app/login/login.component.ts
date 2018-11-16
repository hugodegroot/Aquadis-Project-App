import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormControl, AbstractControl} from '@angular/forms';
import {Validators} from '@angular/forms';

import {UserService} from '../user.service';
import {User} from '../user';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

import {Router} from '@angular/router';
import {DataService} from '../data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  user: User;
  errorMessage: boolean;
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
    // TODO Change homescreen url
    if (this.userService.isLogged()) {
      this.router.navigateByUrl('homescreen/1');
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
      this.userService.login();
      this.router.navigateByUrl('/homescreen/' + user.id);
    } else {
      console.log('Invalid Login');
      this.errorMessage = true;
    }
  }

}
