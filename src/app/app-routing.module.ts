import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HomescreenComponent} from "./homescreen/homescreen.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'homescreen/:id', component: HomescreenComponent}];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
