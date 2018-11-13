import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HomescreenComponent} from './homescreen/homescreen.component';
import {BettingComponent} from './betting/betting.component';
import {GroupPageComponent} from './group-page/group-page.component';
import {AddGroupComponent} from './add-group/add-group.component';
import {RaceteamComponent} from './raceteam/raceteam.component';
import {YourteamComponent} from './yourteam/yourteam.component';
import {PredictComponent} from './predict/predict.component';
import {AddPeopleComponent} from './add-people/add-people.component';
import {RegisterComponent} from './register/register.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'homescreen/:id', component: HomescreenComponent},
  {path: 'betting', component: BettingComponent},
  {path: 'group', component: GroupPageComponent},
  {path: 'add-group', component: AddGroupComponent},
  {path: 'raceteam', component: RaceteamComponent},
  {path: 'yourteam', component: YourteamComponent},
  {path: 'predict', component: PredictComponent},
  {path: 'add-people', component: AddPeopleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
