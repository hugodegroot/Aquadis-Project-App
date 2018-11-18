import {Component, OnInit} from '@angular/core';
import 'hammerjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Aquadis';

  constructor(
    private location: Location
  ) {
  }

  ngOnInit() {

  }

  goBack() {
    this.location.back();
  }

}
