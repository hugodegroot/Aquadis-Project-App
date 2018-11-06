import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public loggedIn;

  constructor(public userService: UserService,
              private router: Router,
              private location: Location) {
  }

  ngOnInit() {
    this.loggedIn = this.userService.isLogged();
    if (!this.loggedIn) {
      this.logout();
    }
  }

  logout() {
    this.router.navigateByUrl('login');
    this.userService.removeToken();
    console.log(this.userService.isLogged());
  }

  goHome() {
    if (this.userService.isLogged()) {
      this.router.navigateByUrl('homescreen');
    }
  }

  goBack() {
    this.location.back();
  }
}
