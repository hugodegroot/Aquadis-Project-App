import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {GroupService} from '../group.service';


@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.component.html',
  styleUrls: ['./homescreen.component.css']
})
export class HomescreenComponent implements OnInit {

  user$: Object;
  groups$: Object;
  // userGroups$; Object;
  userID: number;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userID = this.userService.getUserId();

    this.userService.getUser(this.userID).subscribe(
      data => this.user$ = data);

    this.userService.getGroups(this.userID).subscribe(
      data => this.groups$ = data);

    // this.userService.getBudgets(this.userID).subscribe(
    //   data => this.userGroups$ = data);

    console.log('SessionStorage UserId: ' + this.userService.getUserId());

  }

}
