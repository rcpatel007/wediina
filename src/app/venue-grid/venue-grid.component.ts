import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { environment } from '../../environments/environment';
import { ConnectionService } from '../services/connection.service';
import { } from "angular-star-rating";
import { NgxSpinnerService } from "ngx-spinner";
import {IMyDpOptions} from 'mydatepicker';
declare var $: any;
@Component({
  selector: 'app-venue-grid',
  templateUrl: './venue-grid.component.html',
  styleUrls: ['./venue-grid.component.css']
})
export class VenueGridComponent implements OnInit {
  id: String;
  venueCategory = [];
  venues = [];
  city = [];
  area = [];
  cityget: String;
  booking:Date;
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
};
  constructor(private route: ActivatedRoute, private router: Router,
    private conectionservice: ConnectionService,
    private spinner: NgxSpinnerService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params['id'];
      // this.initialiseState();
    });

    var $star_rating = $('.star-rating .fa');

    var SetRatingStar = function () {
      return $star_rating.each(function () {
        if (parseInt($star_rating.siblings('input.rating-value').val()) >= parseInt($(this).data('rating'))) {
          return $(this).removeClass('fa-star-o').addClass('fa-star');
        } else {
          return $(this).removeClass('fa-star').addClass('fa-star-o');
        }
      });
    };

    $star_rating.on('click', function () {
      $star_rating.siblings('input.rating-value').val($(this).data('rating'));
      return SetRatingStar();
    });

    SetRatingStar();
    $(document).ready(function () {

    });

    this.getvenue();
    // this.getCategory();
  }

  fetchcity(cityget) {

    environment.city = cityget;
    this.cityfilter();
  }

  // getCategory() {
  //   this.conectionservice.getVenueCategory()
  //     .subscribe(res => {
  //       this.venueCategory = res;
  //     });
  // }

  // getcategoryId(id) {
  //   let v_id = id;
  //   this.conectionservice.getVenues()
  //     .subscribe(res => {
  //       for (let index = 0; index < res.length; index++) {
  //         this.venues.push(res[index]);
  //       }

  //     });
  // }
  getvenue() {
    this.spinner.show();

    // location.reload();
    // window.history.replaceState({},'/Venues/'+this.id);
    this.conectionservice.getVenues()
      .subscribe(res => {
        // this.venues = res;
        // this.router.navigateByUrl('/Venues/'+this.id);
        for (let index = 0; index < res.length; index++) {

          if (res[index].venue_cat_id == this.id) {

            this.venues.push(res[index]);
            this.city.push(res[index].city);
          }
        }
        console.log(this.venues);
        this.spinner.hide();

      });
  }

  cityfilter() {
    this.spinner.show();
    this.venues = [];
    // location.reload();
    // window.history.replaceState({},'/Venues/'+this.id);
    this.conectionservice.getVenues()
      .subscribe(res => {
        // this.venues = res;
        // this.router.navigateByUrl('/Venues/'+this.id);
        for (let index = 0; index < res.length; index++) {

          if (res[index].venue_cat_id == this.id) {

            if (res[index].city == environment.city) {
              this.venues.push(res[index]);
            }


          }
        }
        console.log(this.venues);
        this.spinner.hide();
      });
  }


  datefilter(booking){
    this.venues = [];
   
    let book =booking;
    console.log(book);
    
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
              // console.log("database date",res[index].bookingdate);
              if (res[index].bookingdate[secondindex] != book.formatted) {
                console.log("database date",res[index].bookingdate[secondindex]);
              
               console.log("date",book.formatted);
               
                this.venues.push(res[index]);
              } 
            }
          }
        }
        console.log(this.venues);
        this.spinner.hide();
      });


  }

}
