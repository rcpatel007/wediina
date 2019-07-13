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
import { VenderregisterComponent } from './venderregister/venderregister.component';
import { VenderGridComponent } from './vender-grid/vender-grid.component';
import { VenueGridComponent } from './venue-grid/venue-grid.component';
import { VenueDetailComponent } from './venue-detail/venue-detail.component';
import { VenderDetailComponent } from './vender-detail/vender-detail.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

const appRoutes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'venueRegister', component: VenueRegisterComponent },
  { path: 'Venueprofile', component: VenueprofileComponent },
  { path: 'VenderRegister', component: VenderregisterComponent },
  { path: 'venders', component: VenderGridComponent },
  { path: 'VenderDetail', component: VenderDetailComponent },
  { path: 'Venues', component: VenueGridComponent },
  { path: 'VenueDetail', component: VenueDetailComponent },
  { path: 'About', component: AboutComponent },
  { path: 'Contact', component: ContactComponent },
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
    VenueprofileComponent,
    VenderregisterComponent,
    VenderGridComponent,
    VenueGridComponent,
    VenueDetailComponent,
    VenderDetailComponent,
    AboutComponent,
    ContactComponent
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
