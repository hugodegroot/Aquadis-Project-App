import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {LoginComponent} from './login/login.component';
import {AppRoutingModule} from './app-routing.module'; // <-- NgModel lives here
import {HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// Angular Material Design
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatNativeDateModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRippleModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


import 'hammerjs';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HomescreenComponent} from './homescreen/homescreen.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {BettingComponent} from './betting/betting.component';
import {GroupPageComponent} from './group-page/group-page.component';
import {AddGroupComponent} from './add-group/add-group.component';
import {RaceteamComponent} from './raceteam/raceteam.component';
import {PredictComponent} from './predict/predict.component';
import {AddPeopleComponent} from './add-people/add-people.component';
import {MatIconModule} from '@angular/material/icon';
import {RegisterComponent} from './register/register.component';
import {matDialogSalaryUpdated, RaceComponent} from './race/race.component';
import {AddRaceComponent} from './add-race/add-race.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HomescreenComponent,
    HeaderComponent,
    FooterComponent,
    BettingComponent,
    GroupPageComponent,
    AddGroupComponent,
    RaceteamComponent,
    PredictComponent,
    AddPeopleComponent,
    RegisterComponent,
    RaceComponent,
    AddRaceComponent,
    matDialogSalaryUpdated
  ],
  entryComponents: [
    // Custom Dialogs
    matDialogSalaryUpdated
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatDialogModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
