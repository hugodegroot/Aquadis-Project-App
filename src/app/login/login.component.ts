import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormControl, AbstractControl} from '@angular/forms';
import { Validators } from '@angular/forms';

import {UserService} from '../user.service';
import {User} from '../user';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  users$: Observable<User[]>;
  private searchTerms = new Subject<string>();

  loginForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.email, Validators.required])),
    password: new FormControl('', Validators.required),
  });

  private emailValue;
  private passwordValue;

  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit() {

  }

  // login(): void {
  //   this.userService.getUser()
  //     .subscribe(user => this.user = user);
  // }

  onSubmit() {
    this.emailValue = this.loginForm.controls.email.value;
    this.passwordValue = this.loginForm.controls.password.value;
    console.log(this.emailValue);
    console.log(this.passwordValue);
    this.userService.getUsers()
      .subscribe();
    this.userService.getUserById(1).subscribe(user => this.user = user);
    this.userService.getUserByEmail(this.emailValue).subscribe(user => this.user = user);
  }
}
