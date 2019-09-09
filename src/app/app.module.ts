import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { CarouselModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { StarRatingModule } from 'angular-star-rating';
import { NgxSpinnerModule } from "ngx-spinner";
// import { StarRatingModule } from '@angular-star-rating-lib/angular-star-rating';

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
import { ConnectionService } from './services/connection.service';
import { PremiumPhotographerComponent } from './premium-photographer/premium-photographer.component';
import { PremiumPhotographerDetailComponent } from './premium-photographer-detail/premium-photographer-detail.component';
import { VendorprofileComponent } from './vendorprofile/vendorprofile.component';

const appRoutes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'venueRegister', component: VenueRegisterComponent },
  { path: 'Venueprofile/:id', component: VenueprofileComponent },
  { path: 'Vendorprofile/:id', component: VendorprofileComponent },
  { path: 'VenderRegister', component: VenderregisterComponent },
  { path: 'vendors/:id', component: VenderGridComponent },
  { path: 'VenderDetail/:id', component: VenderDetailComponent },
  { path: 'Venues/:id', component: VenueGridComponent },
  { path: 'VenueDetail/:id', component: VenueDetailComponent },
  { path: 'About', component: AboutComponent },
  { path: 'PremiumPhotographer', component: PremiumPhotographerComponent },
  { path: 'PremiumPhotographerDetail', component: PremiumPhotographerDetailComponent },
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
    ContactComponent,
    PremiumPhotographerComponent,
    PremiumPhotographerDetailComponent,
    VendorprofileComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    StarRatingModule.forRoot(),
    CarouselModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    // Ng2CompleterModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    
  
  ],
  providers: [ConnectionService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
