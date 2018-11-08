import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {User} from '../user';
import {UserService} from '../user.service';

@Component({
  selector: 'app-yourteam',
  templateUrl: './yourteam.component.html',
  styleUrls: ['./yourteam.component.css']
})
export class YourteamComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
