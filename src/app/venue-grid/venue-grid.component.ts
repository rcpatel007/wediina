// import { Component, OnInit } from '@angular/core';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { environment } from '../../environments/environment';
import { ConnectionService } from '../services/connection.service';
import { } from "angular-star-rating";
import { NgxSpinnerService } from "ngx-spinner";
import { IMyDpOptions } from 'mydatepicker';
import { empty, EMPTY } from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-venue-grid',
  templateUrl: './venue-grid.component.html',
  styleUrls: ['./venue-grid.component.css']
})
export class VenueGridComponent implements OnInit {
  @Input() score = 5;
  @Input() maxScore = 5;
  @Input() forDisplay = false;
  @Input() sforDisplay = false;
  @Output() rateChanged = new EventEmitter();

  range = [];
  marked = 3 - 1;
  smarked = 4 - 1;


  id: String;
  venueCategory = [];
  venues = [];
  city = [];
  area = [];
  venuefilter = [];
  cityget: String;
  booking: String;
  venuephoto: String;
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

    for (var i = 0; i < this.maxScore; i++) {
      this.range.push(i);
    }
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
    this.getprimads();
    // this.getCategory();
  }


  getprimads() {
    this.conectionservice.getads()
      .subscribe(res => {
        this.venuephoto = res[1].image;
        console.log(res);

      });
  }

  fetchcity(cityget) {

    environment.city = cityget;
    this.cityfilter();
  }
  public mark = (index) => {
    this.marked = this.marked == index ? index - 1 : index;
    this.score = this.marked + 1;
    this.rateChanged.next(this.score);

    console.log("scror", this.score);

  }
  public smark = (index) => {
    this.marked = this.smarked == index ? index - 1 : index;
    this.score = this.smarked + 1;
    this.rateChanged.next(this.score);

    console.log("scror", this.score);

  }

  public isMarked = (index) => {
    if (!this.forDisplay) {
      if (index <= this.marked) {
        return 'fa-star';
      }
      else {
        return 'fa-star-o';
      }
    }
    else {
      if (this.score >= index + 1) {
        return 'fa-star';
      }
      else if (this.score > index && this.score < index + 1) {
        return 'fa-star-half-o';
      }
      else {
        return 'fa-star-o';
      }
    }
    console.log("scror", this.score);

  }
  public sisMarked = (index) => {
    if (!this.sforDisplay) {
      if (index <= this.smarked) {
        return 'fa-star';
      }
      else {
        return 'fa-star-o';
      }
    }
    else {
      if (this.score >= index + 1) {
        return 'fa-star';
      }
      else if (this.score > index && this.score < index + 1) {
        return 'fa-star-half-o';
      }
      else {
        return 'fa-star-o';
      }
    }
    console.log("scror", this.score);

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
            if (res[index].status == true) {
              this.venues.push(res[index]);
              this.venuefilter.push(res[index]);
            }
            this.city.push(res[index].city);
          }
        }
        this.city.forEach((item, index) => {
          if (index !== this.city.findIndex(i => i.name === item.name)) {
            this.city.splice(index, 1);
          }
        });
        console.log(this.venuefilter);
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
        //console.log(this.venues);
        this.spinner.hide();
      });
  }


  venueDateFilter(booking) {
    this.venues = [];

    let book = booking;
    console.log(book);

    // location.reload();
    // window.history.replaceState({},'/Venues/'+this.id);
    // this.conectionservice.getvenuescatById(this.id)
    //   .subscribe(res => {
        // this.venues = res;
        // this.router.navigateByUrl('/Venues/'+this.id);

        for (let index = 0; index < this.venuefilter.length; index++) {

          if (this.venuefilter[index].bookingdate.length == []) {
            console.log('datevvcv', this.venuefilter[index].bookingdate);

              this.venues.push(this.venuefilter[index]);
          }
          else {

            for (let secondindex = 0; secondindex < this.venuefilter[index].bookingdate.length; secondindex++) {
              console.log("database date", this.venuefilter[index].bookingdate[secondindex]);
              if (this.venuefilter[index].bookingdate[secondindex] == booking.formatted) {
                break;
              }
              else {

                console.log("database date", this.venuefilter[index].bookingdate[secondindex]);
             
                  this.venues.push(this.venuefilter[index]);
                console.log(this.venues);
              }
            }
          }
          continue;
        }

        this.venues.forEach((item, index) => {
          if (index !== this.venues.findIndex(i => i._id === item._id)) {
            this.venues.splice(index, 1);
            console.log(this.venues);
          }
          this.spinner.hide();

        });

        //console.log(this.vendor);
      // });


  }



  // venueDateFilter(booking) {
  //   // alert(booking.formatted);
  //   console.log(this.venuefilter);
  //   // this.venues = this.venuefilter;
  //   // this.getvenue();
  //   let dt = [];

  //   for (let index = 0; index < this.venuefilter.length; index++) {
  //     if (this.venuefilter[index].bookingdate.length != 0) {
  //       for (let secondindex = 0; secondindex < this.venuefilter[index].bookingdate.length; secondindex++) {
  //         if (this.venuefilter[index].bookingdate[secondindex] == booking.formatted) {
  //           dt.push(this.venuefilter[index]);
  //           for (let index = 0; index < dt.length; index++) {
  //             if (this.venues[index]._id === dt[index]._id) {
  //               this.venues.splice(index, 1);
  //               console.log(this.venues, "venues");
  //             }
  //           }
  //         }
  //         else {
  //           this.venues.push(this.venuefilter[index]);
  //         }
  //       }
  //     }
  //     else {
  //       this.venues.push(this.venuefilter[index]);
  //       console.log(this.venues, "venues");

  //     }
  //     // this.venues.filter((index ,item)=> this.venues.indexOf(item._id)===index);

  //   }
  //   this.venues.forEach((item, index) => {
  //     if (index != this.venues.findIndex(i => i._id === item._id)) {
  //       this.venues.splice(index, 1);
  //       console.log(this.venues);
  //     }
  //     this.spinner.hide();
   
  //   });

  //   console.log(this.venuefilter);

  //   // for (let thirdindex = 0; thirdindex < this.venues.length; thirdindex++) {
  //   //   for (let forthindex = 0; forthindex < dt.length; forthindex++) {
  //   //     if (this.venues[thirdindex]._id == dt[forthindex]._id) {
  //   //       this.venues.splice(thirdindex, 1);
  //   //     }
  //   //   }
  //   // }

  // }




  // datefilter(booking) {
  //   this.venues = [];

  //   let book = booking;
  //   console.log(book);

  //   this.spinner.show();
  //   // location.reload();
  //   // window.history.replaceState({},'/Venues/'+this.id);

  //   // this.venues = res;
  //   // this.router.navigateByUrl('/Venues/'+this.id);
  //   console.log(this.venuefilter);

  //   for (let index = 0; index < this.venuefilter.length; index++) {

  //     // if (this.venuefilter[index].bookingdate == []) {
  //     //   this.venues.push(this.venuefilter[index]);

  //     // }
  //     // else {

  //     for (let secondindex = 0; secondindex < this.venuefilter[index].bookingdate.length; secondindex++) {
  //       console.log("database date", this.venuefilter[index].bookingdate[secondindex]);
  //       if (this.venuefilter[index].bookingdate[secondindex] != book.formatted) {
  //         console.log("database date", this.venuefilter[index].bookingdate[secondindex]);
  //         this.venues.push(this.venuefilter[index]);
  //         //console.log("date", book.formatted);
  //         console.log(this.venues);
  //       }
  //       this.venues.forEach((item, index) => {
  //         if (index !== this.city.findIndex(i => i._id === item._id)) {
  //           this.venues.splice(index, 1);
  //         }
  //       });
  //       // }
  //     }
  //   }

  //   //console.log(this.venues);
  //   this.spinner.hide();


  // }

}
