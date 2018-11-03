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

  constructor() {
  }

  ngOnInit() {

  }
}
