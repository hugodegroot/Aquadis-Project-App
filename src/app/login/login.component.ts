import {Component, Inject, OnInit} from '@angular/core';

import {UserService} from '../user.service';
import {User} from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;

  constructor(
    private userService: UserService,
  ) {
  }

  ngOnInit() {
  }

  // login(): void {
  //   this.userService.getUser()
  //     .subscribe(user => this.user = user);
  // }

}
