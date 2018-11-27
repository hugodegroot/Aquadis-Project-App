import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-race',
  templateUrl: './add-race.component.html',
  styleUrls: ['./add-race.component.css']
})
export class AddRaceComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router,) { }

  ngOnInit() {
    if (!this.userService.isAdmin()) {
      this.router.navigateByUrl("/homescreen)");
    }
  }

}
