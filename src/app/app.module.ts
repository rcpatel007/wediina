import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { VenueRegisterComponent } from './venue-register/venue-register.component';
import { VenueloginComponent } from './venuelogin/venuelogin.component';
import { VenueprofileComponent } from './venueprofile/venueprofile.component';

const appRoutes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'newVenue', component: VenueRegisterComponent },
  { path: 'Venueprofile', component: VenueprofileComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    MainHeaderComponent,
    VenueRegisterComponent,
    VenueloginComponent,
    VenueprofileComponent
  ],
  imports: [
    BrowserModule,
    CarouselModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
