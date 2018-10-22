import {Component, OnInit} from '@angular/core';
import 'hammerjs';
import {UserService} from './user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Aquadis';
  loggedIn;

  constructor(
    public userService: UserService,
    private router: Router,
  ) {
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
}
