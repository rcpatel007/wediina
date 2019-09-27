import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { environment } from '../../environments/environment';
import { ConnectionService } from '../services/connection.service';
import { NgxSpinnerService } from "ngx-spinner";
import { IMyDpOptions } from 'mydatepicker';
declare var $: any;
@Component({
  selector: 'app-premium-photographer',
  templateUrl: './premium-photographer.component.html',
  styleUrls: ['./premium-photographer.component.css']
})
export class PremiumPhotographerComponent implements OnInit {
  @Input() score = 5;
  @Input() maxScore = 5;
  @Input() forDisplay = false;
  @Input() sforDisplay = false;
  @Output() rateChanged = new EventEmitter();

  range = [];
  marked = 3 - 1;
  smarked = 4 - 1;


  venueCategory = [];
  venues = [];
  city = [];
  area = [];
  cityget: String;
  id: String;
  primevendor =[];
  booking: Date;
  
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
  };

  constructor(private route: ActivatedRoute, private router: Router,
    private conectionservice: ConnectionService,
    private spinner: NgxSpinnerService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
  }

  ngOnInit() {
    for (var i = 0; i < this.maxScore; i++) {
      this.range.push(i);
    }
    // this.route.params.subscribe(params => {
    //   this.id = params['id'];
    // });
    this.getvendors();
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
  getvendors() {
    this.spinner.show();
    this.conectionservice.getVendors()
      .subscribe(res => {
        // this.venues = res;

        for (let index = 0; index < res.length; index++) {

          if (res[index].prime_user == true) {
            this.venues.push(res[index]);
            this.primevendor.push(res[index]);
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

  fetchcity(cityget) {
this.spinner.show();
    environment.city = cityget;
    this.cityget = cityget;
    this.cityfilter();
 console.log(cityget,environment.city);
 this.spinner.hide();

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





  cityfilter() {
    this.spinner.show();
    this.venues = [];
    // location.reload();
    // window.history.replaceState({},'/Venues/'+this.id);
    
        // this.venues = res;
         // this.router.navigateByUrl('/Venues/'+this.id);
   
        for (let index = 0; index < this.primevendor.length; index++) {
        
            console.log(this.cityget);
            console.log(this.venues);
            
            if (this.primevendor[index].city == this.cityget) {
                  this.venues.push(this.primevendor[index]);

              console.log(this.venues);
              
                }
                }

        //console.log(this.venues);
     this.spinner.hide();



  }

  datefilter(booking) {
    this.venues = [];

    let book = booking;
    console.log(book);

    this.spinner.show();
    // location.reload();
    // window.history.replaceState({},'/Venues/'+this.id);
        // this.venues = res;
        // this.router.navigateByUrl('/Venues/'+this.id);

        for (let index = 0; index < this.primevendor.length; index++) {

          if (this.primevendor[index].bookingdate.length == []) {
            console.log('datevvcv', this.primevendor[index].bookingdate);

            this.venues.push(this.primevendor[index]);
          }
          else {

            for (let secondindex = 0; secondindex < this.primevendor[index].bookingdate.length; secondindex++) {
              console.log("database date", this.primevendor[index].bookingdate[secondindex]);
              if (this.primevendor[index].bookingdate[secondindex] == book.formatted) {
                break;
              }
              else {

                console.log("database date", this.primevendor[index].bookingdate[secondindex]);
                    this.venues.push(this.primevendor[index]);

                //console.log("date", book.formatted);
                console.log(this.venues);
              }
            }
          }
          continue;
        }

        this.venues.forEach((item, index) => {
          if (index !== this.city.findIndex(i => i._id === item._id)) {
            this.venues.splice(index, 1);
            console.log(this.venues);
          }
        });

        //console.log(this.venues);
        this.spinner.hide();
    

  }

}