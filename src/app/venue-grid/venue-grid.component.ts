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
  cityget: String;
  booking: String;
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
    // this.getCategory();
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

            this.venues.push(res[index]);
            this.city.push(res[index].city);
          }
        }
        this.city.forEach((item, index) => {
          if (index !== this.city.findIndex(i => i.name === item.name)) {
            this.city.splice(index, 1);
          }

        });
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
        //console.log(this.venues);
        this.spinner.hide();
      });
  }


  datefilter(booking) {
    this.venues = [];

    let book = booking;
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
            if (res[index].bookingdate.length == []) {
              this.venues.push(res[index]);

            }
            else {
              for (let secondindex = 0; secondindex < res[index].bookingdate.length; secondindex++) {
                console.log("database date", res[index].bookingdate[secondindex]);
                if (res[index].bookingdate[secondindex] != book.formatted) {
                  console.log("database date", res[index].bookingdate[secondindex]);
                  this.venues.push(res[index]);

                  
                  //console.log("date", book.formatted);

                  console.log(this.venues);

                }
              }
            }
          }
        }
        //console.log(this.venues);
        this.spinner.hide();
      });


  }

}
