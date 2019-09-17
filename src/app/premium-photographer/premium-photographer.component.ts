import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { environment } from '../../environments/environment';
import { ConnectionService } from '../services/connection.service';
import { NgxSpinnerService } from "ngx-spinner";
import {IMyDpOptions} from 'mydatepicker';
declare var $: any;
@Component({
  selector: 'app-premium-photographer',
  templateUrl: './premium-photographer.component.html',
  styleUrls: ['./premium-photographer.component.css']
})
export class PremiumPhotographerComponent implements OnInit {
  venueCategory = [];
  venues = [];
  city = [];
  area = [];
  cityget:String;
  id:String;
  booking:Date;
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
};

  constructor(private route: ActivatedRoute,private router: Router, 
    private conectionservice: ConnectionService,
    private spinner: NgxSpinnerService) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false  }

  ngOnInit() {

    // this.route.params.subscribe(params => {
    //   this.id = params['id'];
    // });
    this.getvendors();
  }


  getvendors() {
    this.spinner.show();
    this.conectionservice.getVendors()
      .subscribe(res => {
        // this.venues = res;

        for (let index = 0; index < res.length; index++) {
 
          if (res[index].prime_user == true) {
            this.venues.push(res[index]);
            
            this.city.push(res[index].city);
         
          }
        }
        
        this.city.forEach((item, index) => {
          if (index !== this.city.findIndex(i => i.name === item.name)) {
              this.city.splice(index, 1);
          }
          
      });
        //console.log(this.venues);
        this.spinner.hide();
      });
  }

  fetchcity(cityget){

    environment.city = cityget;
    this.cityfilter();
  }
  
  // getcitywise() {

  //   this.conectionservice.getVendors()
  //     .subscribe(res => {
  //       // this.venues = res;

  //       for (let index = 0; index < res.length; index++) {
 
  //         if (res[index].vendor_cat_id == this.id) {
  //           this.venues.push(res[index]);
            
  //         }
  //       }
  //       //console.log(this.city);

  //     });
  // }
  
  cityfilter(){
    this.spinner.show();
     this.venues =[];
    // location.reload();
    // window.history.replaceState({},'/Venues/'+this.id);
    this.conectionservice.getVendors()
      .subscribe(res => {
        // this.venues = res;
        // this.router.navigateByUrl('/Venues/'+this.id);
        for (let index = 0; index < res.length; index++) {
      
          if (res[index].vendor_cat_id == this.id) {
  
              if (res[index].city == environment.city) {
                this.venues.push(res[index]);
              }
              
      
          }
        }
        //console.log(this.venues);
        this.spinner.hide();
   
      });
  
  
}


datefilter(booking){
  this.venues = [];
 
  let book =booking;
  //console.log(book);
  
  this.spinner.show();
  // location.reload();
  // window.history.replaceState({},'/Venues/'+this.id);
  this.conectionservice.getVenues()
    .subscribe(res => {
      // this.venues = res;
      // this.router.navigateByUrl('/Venues/'+this.id);
 
      for (let index = 0; index < res.length; index++) {

        if (res[index].venue_cat_id == this.id) {

          for (let secondindex = 0; secondindex < res[index].bookingdate.length; secondindex++) {
            // //console.log("database date",res[index].bookingdate);
            if (res[index].bookingdate[secondindex] != book.formatted) {
              //console.log("database date",res[index].bookingdate[secondindex]);
            
             //console.log("date",book.formatted);
             
              this.venues.push(res[index]);
            } 
          }
        }
      }
      //console.log(this.venues);
      this.spinner.hide();
    });


}

}