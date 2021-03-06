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

  vendorfilter = [];
  id: string;
  venueCategory = [];
  vendor = [];
  city = [];
  area = [];
  cityget: String;
  booking: String;
  vendorphoto: String;

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
    this.getprimads();
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
  //         this.vendor.push(res[index]);
  //       }

  //     });
  // }
  getvendors() {
    this.spinner.show();
    this.conectionservice.getVendors()
      .subscribe(res => {
        // this.vendor = res;

        for (let index = 0; index < res.length; index++) {

          if (res[index].vendor_cat_id == this.id) {
            if (res[index].prime_user == false && res[index].status == true) {
              this.vendor.push(res[index]);
              this.vendorfilter.push(res[index]);
            }
            this.city.push(res[index].city);
          }
        }

        this.city.forEach((item, index) => {
          if (index !== this.city.findIndex(i => i.name === item.name)) {
            this.city.splice(index, 1);
          }

        });
        console.log(this.vendor);
        this.spinner.hide();
      });
  }


  getprimads() {
    this.conectionservice.getads()
      .subscribe(res => {
        this.vendorphoto = res[2].image;
        console.log(res);

      });
  }

  fetchcity(cityget) {

    environment.city = cityget;
    this.cityfilter();
  }

  // getcitywise() {

  //   this.conectionservice.getVendors()
  //     .subscribe(res => {
  //       // this.vendor = res;

  //       for (let index = 0; index < res.length; index++) {

  //         if (res[index].vendor_cat_id == this.id) {
  //           this.vendor.push(res[index]);

  //         }
  //       }
  //       //console.log(this.city);

  //     });
  // }

  cityfilter() {
    this.spinner.show();
    this.vendor = [];
    // location.reload();
    // window.history.replaceState({},'/Venues/'+this.id);
    this.conectionservice.getVendors()
      .subscribe(res => {
        // this.vendor = res;
        // this.router.navigateByUrl('/Venues/'+this.id);
        for (let index = 0; index < res.length; index++) {

          if (res[index].vendor_cat_id == this.id) {

            if (res[index].city == environment.city) {


              if (res[index].prime_user == false && res[index].status == true) {
                this.vendor.push(res[index]);
              }
            }


          }
        }
        //console.log(this.vendor);
        this.spinner.hide();

      });



  }

  datefilter(booking) {
    this.vendor = [];

    let book = booking;
    console.log(book);

    // location.reload();
    // window.history.replaceState({},'/Venues/'+this.id);
    // this.conectionservice.getVendorcatById(this.id)
    //   .subscribe(res => {
        // this.vendor = res;
        // this.router.navigateByUrl('/Venues/'+this.id);

        for (let index = 0; index < this.vendorfilter.length; index++) {

          if (this.vendorfilter[index].bookingdate.length == []) {
            console.log('datevvcv', this.vendorfilter[index].bookingdate);

            if (this.vendorfilter[index].prime_user == false && this.vendorfilter[index].status == true) {
              this.vendor.push(this.vendorfilter[index]);
            }
          }
          else {

            for (let secondindex = 0; secondindex < this.vendorfilter[index].bookingdate.length; secondindex++) {
              console.log("database date", this.vendorfilter[index].bookingdate[secondindex]);
              if (this.vendorfilter[index].bookingdate[secondindex] == booking.formatted) {
                break;
              }
              else {

                console.log("database date", this.vendorfilter[index].bookingdate[secondindex]);
             
                  this.vendor.push(this.vendorfilter[index]);
                console.log(this.vendor);
              }
            }
          }
          continue;
        }

        // this.vendor.forEach((item, index) => {
        //   if (index !== this.city.findIndex(i => i._id === item._id)) {
        //     this.vendor.splice(index, 1);
        //     console.log(this.vendor);
        //   }
        //   this.spinner.hide();

        // });

        //console.log(this.vendor);
      // });


  }
  // datefilter(booking){

  //   let book =booking;
  //   console.log(book);

  //   this.spinner.show();
  //   // location.reload();
  //   // window.history.replaceState({},'/Venues/'+this.id);
  //   this.vendor = [];

  //   this.conectionservice.getVendorcatById(this.id)
  //     .subscribe(this.vendorfilter => {
  //       // this.vendor = res;
  //       // this.router.navigateByUrl('/Venues/'+this.id);

  //       // for (let index = 0; index < res.length; index++) {

  //       //   if (res[index].vendor_cat_id == this.id) {
  //       //     if(res[index].bookingdate.length == []){
  //       //       this.vendor.push(res[index]);

  //       //     }
  //       //     else{
  //       //     for (let secondindex = 0; secondindex < res[index].bookingdate.length; secondindex++) {
  //       //       // //console.log("database date",res[index].bookingdate);
  //       //       if (res[index].bookingdate[secondindex] != book.formatted) {
  //       //         //console.log("database date",res[index].bookingdate[secondindex]);

  //       //        //console.log("date",book.formatted);

  //       //         this.vendor.push(res[index]);
  //       //       } 
  //       //     }
  //       //   }
  //       //   }
  //       // }



  //       for (let index = 0; index < res.length; index++) {

  //         if (res[index].bookingdate.length == []) {
  //           this.vendor.push(res[index]);
  //         }
  //         else {

  //           for (let secondindex = 0; secondindex < res[index].bookingdate.length; secondindex++) {
  //             console.log("database date", res[index].bookingdate[secondindex]);
  //             if (res[index].bookingdate[secondindex] != book.formatted) {
  //               console.log("database date", res[index].bookingdate[secondindex]);
  //               this.vendor.push(res[index]);    
  //               //console.log("date", book.formatted);
  //               console.log(this.vendor);

  //             }
  //           }
  //         }


  //     }
  //     this.vendor.forEach((item, index) => {
  //       if (index !== this.vendor.findIndex(i => i._id === item._id)) {
  //         this.vendor.splice(index, 1);
  //     console.log(this.vendor);

  //       }

  //     });
  //     //console.log(this.vendor);
  //     this.spinner.hide();
  //   });


  // }

}
