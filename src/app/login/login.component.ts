import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormControl, AbstractControl} from '@angular/forms';
import {Validators} from '@angular/forms';

import {UserService} from '../user.service';
import {User} from '../user';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  user: User;
  errorMessage: boolean;
  users$: Object;
  usersByUsername$: Observable<User[]>;
  usersByPassword$: Observable<User[]>;
  private searchTermsUsername = new Subject<string>();
  private searchTermsPassword = new Subject<string>();

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  private usernameValue;
  private passwordValue;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.errorMessage = false;
    if (this.userService.isLogged()) {
      this.router.navigateByUrl('homescreen');
    }

    // this.usersByUsername$ =  this.searchTermsUsername.pipe(
    //   // wait 300ms after each keystroke before considering the term
    //   debounceTime(500),
    //
    //   // ignore new term if same as previous term
    //   distinctUntilChanged(),
    //
    //   // switch to new search observable each time the term changes
    //   switchMap((term: string) => this.userService.searchUsersByUsername(term)));
    //
    // this.usersByPassword$ =  this.searchTermsPassword.pipe(
    //   // wait 300ms after each keystroke before considering the term
    //   debounceTime(500),
    //
    //   // ignore new term if same as previous term
    //   distinctUntilChanged(),
    //
    //   // switch to new search observable each time the term changes
    //   switchMap((term: string) => this.userService.searchUsersByPassword(term)));
  }

  onSubmit() {
    this.usernameValue = this.loginForm.controls.username.value;
    this.passwordValue = this.loginForm.controls.password.value;

    // console.log(this.usernameValue);
    // console.log(this.passwordValue);

    // this.searchTermsUsername.next(this.usernameValue);
    // this.searchTermsPassword.next(this.passwordValue);

    // this.userService.getUsers().subscribe();

    // this.userService.getUserById(this.usernameValue).subscribe(user => this.user = user);
    // this.userService.getUserByEmail(this.usernameValue).subscribe(user => this.user = user);
    // this.userService.getUserByUsername(this.usernameValue).subscribe(user => this.user = user);

    // if (this.usernameValue === 'test' && this.passwordValue === 'test') {
    //   this.router.navigateByUrl('dashboard');
    //   this.userService.setToken('Logged in');
    //   console.log(this.userService.isLogged());
    // }

    this.userService.validateLogin(this.usernameValue, this.passwordValue).subscribe(user => this.user = user,
      (err) => console.error(err),
      () => this.validateLogin());
  }

  validateLogin() {
    try {
      if (this.user[0].username === this.usernameValue && this.user[0].password === this.passwordValue) {
        this.router.navigateByUrl('homescreen');
        this.userService.setToken('Logged in');
        console.log(this.userService.isLogged());
      }
    } catch (e) {
      console.log(e);
      this.errorMessage = true;
    }
    // if (this.user[0].username === this.usernameValue && this.user[0].password === this.passwordValue) {
    //   this.router.navigateByUrl('homescreen');
    //   this.userService.setToken('Logged in');
    //   console.log(this.userService.isLogged());
    // } else {
    //   this.errorMessage = true;
    // }
  }

}
