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
  users$: Object;
  usersByUsername$: Observable<User[]>;
  usersByPassword$: Observable<User[]>;
  private searchTermsUsername = new Subject<string>();
  private searchTermsPassword = new Subject<string>();
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
    // this.userService.getUsers().subscribe(users => this.users$ = users, error => console.log("error: " + error) , console.log("Complete! " + this.users$));

    // TODO Change homescreen url
    if (this.userService.isLogged()) {
      this.router.navigateByUrl('homescreen/1');
    }
  }

  onSubmit() {
    this.loading = true;

    this.usernameValue = this.loginForm.controls.username.value;
    this.passwordValue = this.loginForm.controls.password.value;

    // TODO: change hard coded validation!
    // if (this.usernameValue === 'test1' && this.passwordValue === 'test') {
    //   this.router.navigateByUrl('homescreen/2');
    //   this.userService.login('logged in');
    // } else if (this.usernameValue === 'test2' && this.passwordValue === 'test') {
    //   this.router.navigateByUrl('homescreen/1');
    //   this.userService.login('logged in');
    // }

    // console.log(this.usernameValue);
    // console.log(this.passwordValue);

    // this.searchTermsUsername.next(this.usernameValue);
    // this.searchTermsPassword.next(this.passwordValue);

    // this.userService.getUserById(this.usernameValue).subscribe(user$ => this.user$ = user$);
    // this.userService.getUserByEmail(this.usernameValue).subscribe(user$ => this.user$ = user$);
    // this.userService.getUserByUsername(this.usernameValue).subscribe(user$ => this.user$ = user$);
        this.userService.validateLogin(this.usernameValue, this.passwordValue).subscribe(user => {this.validateLogin(user); });
    // if (this.usernameValue === 'test' && this.passwordValue === 'test') {
    //   this.router.navigateByUrl('dashboard');
    //   this.userService.login('Logged in');
    //   console.log(this.userService.isLogged());
    // }

    // this.userService.validateLogin(this.usernameValue, this.passwordValue).subscribe(user$ => this.user$ = user$,
    //   (err) => console.error(err),
    //   () => this.validateLogin());

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
    // try {
    //   if (this.user$[0].username === this.usernameValue && this.user$[0].password === this.passwordValue) {
    //     this.router.navigateByUrl('homescreen');
    //     this.userService.login('Logged in');
    //     console.log(this.userService.isLogged());
    //   }
    // } catch (e) {
    //   console.log(e);
    //   this.errorMessage = true;
    // }


    // if (this.user$[0].username === this.emailValue && this.user$[0].password === this.passwordValue) {
    //   this.router.navigateByUrl('homescreen');
    //   this.userService.login('Logged in');
    //   console.log(this.userService.isLogged());
    // } else {
    //   this.errorMessage = true;
    // }
  }

}
