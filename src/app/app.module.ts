import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

// Angular Material Design
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';

import 'hammerjs';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomescreenComponent } from './homescreen/homescreen.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BettingComponent } from './betting/betting.component';
import { GroupPageComponent } from './group-page/group-page.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { RaceteamComponent } from './raceteam/raceteam.component';
import { YourteamComponent } from './yourteam/yourteam.component';
import { PredictComponent } from './predict/predict.component';
import { AddPeopleComponent } from './add-people/add-people.component';

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
    YourteamComponent,
    PredictComponent,
    AddPeopleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

// The HttpClientInMemoryWebApiModule module intercepts HTTP requests
// and returns simulated server responses.
// Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
