import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { environment } from '../../environments/environment';
import { ConnectionService } from '../services/connection.service';
import { NgxSpinnerService } from "ngx-spinner";
import { IMyDpOptions } from 'mydatepicker';

@Component({
  selector: 'app-vender-grid',
  templateUrl: './vender-grid.component.html',
  styleUrls: ['./vender-grid.component.css']
})
export class VenderGridComponent implements OnInit {
  @Input() score = 5;
  @Input() maxScore = 5;
  @Input() forDisplay = false;
  @Input() sforDisplay = false;
  @Output() rateChanged = new EventEmitter();

  range = [];
  marked = 3 - 1;
  smarked = 4 - 1;


  id: string;
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
    });
    this.getvendors();
    // this.getCategory();

    for (var i = 0; i < this.maxScore; i++) {
      this.range.push(i);
    }
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
  //   this.conectionservice.getVendorCategory()
  //     .subscribe(res => {
  //       this.venueCategory = res;
  //     });
  // }

  // getcategoryId(id) {
  //   let v_id = id;
  //   this.conectionservice.getVendorCategoryById(v_id)
  //     .subscribe(res => {
  //       for (let index = 0; index < res.length; index++) {
  //         this.venues.push(res[index]);
  //       }

  //     });
  // }
  getvendors() {
    this.spinner.show();
    this.conectionservice.getVendors()
      .subscribe(res => {
        // this.venues = res;

        for (let index = 0; index < res.length; index++) {

          if (res[index].vendor_cat_id == this.id) {
            if(res[index].prime_user == false && res[index].status == true){
              this.venues.push(res[index]);
            }
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

  fetchcity(cityget) {

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

  cityfilter() {
    this.spinner.show();
    this.venues = [];
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

  datefilter(booking) {
    this.venues = [];

    let book = booking;
    console.log(book);

    this.spinner.show();
    // location.reload();
    // window.history.replaceState({},'/Venues/'+this.id);
    this.conectionservice.getVendorcatById(this.id)
      .subscribe(res => {
        // this.venues = res;
        // this.router.navigateByUrl('/Venues/'+this.id);

        for (let index = 0; index < res.length; index++) {

          if (res[index].bookingdate.length == []) {
            console.log('datevvcv', res[index].bookingdate);

            this.venues.push(res[index]);
          }
          else {

            for (let secondindex = 0; secondindex < res[index].bookingdate.length; secondindex++) {
              console.log("database date", res[index].bookingdate[secondindex]);
              if (res[index].bookingdate[secondindex] == book.formatted) {
                break;
              }
              else {

                console.log("database date", res[index].bookingdate[secondindex]);
                this.venues.push(res[index]);
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
      });


  }
  // datefilter(booking){

  //   let book =booking;
  //   console.log(book);

  //   this.spinner.show();
  //   // location.reload();
  //   // window.history.replaceState({},'/Venues/'+this.id);
  //   this.venues = [];

  //   this.conectionservice.getVendorcatById(this.id)
  //     .subscribe(res => {
  //       // this.venues = res;
  //       // this.router.navigateByUrl('/Venues/'+this.id);

  //       // for (let index = 0; index < res.length; index++) {

  //       //   if (res[index].vendor_cat_id == this.id) {
  //       //     if(res[index].bookingdate.length == []){
  //       //       this.venues.push(res[index]);

  //       //     }
  //       //     else{
  //       //     for (let secondindex = 0; secondindex < res[index].bookingdate.length; secondindex++) {
  //       //       // //console.log("database date",res[index].bookingdate);
  //       //       if (res[index].bookingdate[secondindex] != book.formatted) {
  //       //         //console.log("database date",res[index].bookingdate[secondindex]);

  //       //        //console.log("date",book.formatted);

  //       //         this.venues.push(res[index]);
  //       //       } 
  //       //     }
  //       //   }
  //       //   }
  //       // }



  //       for (let index = 0; index < res.length; index++) {

  //         if (res[index].bookingdate.length == []) {
  //           this.venues.push(res[index]);
  //         }
  //         else {

  //           for (let secondindex = 0; secondindex < res[index].bookingdate.length; secondindex++) {
  //             console.log("database date", res[index].bookingdate[secondindex]);
  //             if (res[index].bookingdate[secondindex] != book.formatted) {
  //               console.log("database date", res[index].bookingdate[secondindex]);
  //               this.venues.push(res[index]);    
  //               //console.log("date", book.formatted);
  //               console.log(this.venues);

  //             }
  //           }
  //         }


  //     }
  //     this.venues.forEach((item, index) => {
  //       if (index !== this.venues.findIndex(i => i._id === item._id)) {
  //         this.venues.splice(index, 1);
  //     console.log(this.venues);

  //       }

  //     });
  //     //console.log(this.venues);
  //     this.spinner.hide();
  //   });


  // }

}
