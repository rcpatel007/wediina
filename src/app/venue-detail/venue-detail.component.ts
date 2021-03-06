import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { environment } from '../../environments/environment';
import { ConnectionService } from '../services/connection.service';
import { NgxSpinnerService } from "ngx-spinner";
import { StarRatingComponent } from 'ng-starrating';
import { IMyDpOptions } from 'mydatepicker';

declare var $: any;
@Component({
  selector: 'app-venue-detail',
  templateUrl: './venue-detail.component.html',
  styleUrls: ['./venue-detail.component.css']
})
export class VenueDetailComponent implements OnInit {
  @Input() score = 5;
  @Input() maxScore = 5;
  @Input() forDisplay = false;
  @Input() sforDisplay = false;
  @Output() rateChanged = new EventEmitter();



  range = [];
  marked = -1;
  smarked: Number = -1;
  mainimg:String;
  id: String;
  venue = [];
  name: String;
  location: String;
  video = [];
  images: any;
  area: String;
  p_area: String;
  capasity: String;
  catring: String;
  theme: String;
  time: String;
  detail: String;
  playvideo: String;
  customer: boolean;
  email: String;
  errormsg: string;
  datearray = [];
  password: String;
  feedback: String;
  rat: Number;
  cname: String;
  cemail: String;
  mno: string;
  date: Date;
  person: number;
  purpose: String;
  v_email: String;
  videoArray =[];

  review = [];
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
    editableDateField: false
  };

  constructor(private route: ActivatedRoute,
    private spinner: NgxSpinnerService, private router: Router, private conectionservice: ConnectionService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
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

      $('#mainvideomodel').click(function () {
        //  alert('hey'); 
        $("#videopopup").attr("src", "");
      });

    });  //   $('#myModal').on('hidden.bs.modal', function () {
    //     callPlayer('yt-player', 'stopVideo');
    // });

    for (var i = 0; i < this.maxScore; i++) {
      this.range.push(i);
    }
    this.customerfetch();
    this.getvenueDetail();
    this.fetchemail();
    this.getfeedback();
    this.videoimg();
  }

  onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
    alert(`Old Value:${$event.oldValue}, 
    New Value: ${$event.newValue}, 
    Checked Color: ${$event.starRating.checkedcolor}, 
    Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }

  getvenueDetail() {
    this.conectionservice.getVenueById(this.id)
      .subscribe(res => {
        this.venue = res;
        this.name = res.companyName;
        this.location = res.location;
        this.video = res.video_story;
        this.images = res.sub_img;
        this.mainimg=res.image;
        this.area = res.areavenue;
        this.p_area = res.parking;
        this.capasity = res.cop;
        this.catring = res.catringValue;
        this.theme = res.themepermission;
        this.time = res.timeper;
        this.detail = res.desp;
        this.datearray = res.bookingdate;

        console.log(res);
        console.log(this.video);
        this.videoimg();
      });

  }

  videoimg() {

    let url: String;

    for (let index = 0; index < this.video.length; index++) {

      let urlarray = this.video[index].split("embed/")[1];
     
      console.log(urlarray);

      let array={
        image:urlarray,
        link:this.video[index]
      }
      this.videoArray.push(array);

    }
  }

  datefilter(booking) {
    let book = booking;
    //console.log(book);
    let status = false;
    for (let index = 0; index < this.datearray.length; index++) {

      if (this.datearray[index] == book.formatted) {
        status = true;
        break;
      }

    }

    if (status == true) {
      alert("Opps....!! This Date is alreay Booked form other person ");

    } else {
      alert("We Are Happy to Serve This Day Please Send Inquiry further Detail  ");

    }
  }
  getvideo(v) {
    this.playvideo = v;
    $("#videopopup").attr("src", v);
    //console.log(this.playvideo);
  }


  customerfetch() {
    if (localStorage.customer_id != null) {
      this.customer = true;
    }
    else {
      this.customer = false;
    }

    //console.log(this.customer);

  }

  // login() {

  //   this.spinner.show();

  //   // this.router.navigate(["/home"]);

  //   let customer = {
  //     email: this.email,
  //     password: this.password
  //   }

  //   //console.log(customer);

  //   this.conectionservice.customerLogin(customer)
  //     .subscribe(res => {
  //       localStorage.setItem('customer_id', res._id);
  //       localStorage.removeItem('vendor_id');
  //       localStorage.removeItem('venue_id');
  //       // localStorage.setItem('customer_id',res._id)
  //       localStorage.setItem('vemail', res.email);

  //       // environment.customer_id = res._id;
  //       // environment.venue_id = null;
  //       // environment.vendor_id =null; 
  //       environment.vemail = res.email;
  //       this.spinner.hide();
  //       this.customer = true;
  //       //  this.addFeedback();
  //       //console.log(res, 'customerdetail');

  //     });

  // }


  login() {
    this.spinner.show();
    if (this.email == null || this.password == null) {
      this.errormsg = null;
      this.errormsg = "please enter email or password";
      this.spinner.hide();

    }
    else {
      let customer = {
        email: this.email,
        password: this.password
      }

      //console.log(customer);

      this.conectionservice.customerLogin(customer)
        .subscribe(res => {

          console.log("result", res);

          localStorage.setItem('customer_id', res.result._id);
          localStorage.removeItem('venue_id');
          localStorage.removeItem('vendor_id');

          environment.customer_id = res.result._id;
          environment.venue_id = null;
          environment.vendor_id = null;
          environment.vemail = res.email;
          // this.router.navigate(["/home"]);
          this.customer = true;
          $(".modal").modal("hide");

          //console.log(res, 'customerdetail');
          this.spinner.hide();

        },
          (error) => {
            this.errormsg = null;
            if (error._body === '{"message":"No user found."}') {
              this.errormsg = "No User Found";
            }
            else {
              this.errormsg = error._body;
              console.log(error);
            }
            this.spinner.hide();

          }

        );

    }
    // this.router.navigate(["/home"]);

  }

  fetchemail() {
    let id = this.id;
    this.conectionservice.getVenueById(id)
      .subscribe(res => {
        this.v_email = res.email;

        //console.log(this.v_email);

      });

  }

  getfeedback() {
    // let feed:any;
    // this.spinner.show();
    let count: Number = 0;
    let c_id: String;
    let cnumber = 0;
    this.review = [];
    this.feedback = null;
    this.marked = 0;
    // let c_name:String;
    // let comment:String;
    // let rating:String;
    this.conectionservice.getreview()
      .subscribe(res => {

        //console.log(res);
        for (let index = 0; index < res.length; index++) {
          cnumber = cnumber + 1;
          if (res[index].venue_id == this.id) {

            c_id = res[index].customer_id;

            this.conectionservice.getCustomerById(c_id)
              .subscribe(result => {

                let feed = {
                  No: cnumber,
                  c_name: result.name,
                  commnet: res[index].comment,
                  rating: res[index].rating
                }

                this.review.push(feed);

                console.log(this.review);

                count = res[index].rating + Number(count);
                this.smarked = (Number(count) / Number(this.review.length)) - 1;
                // this.spinner.hide();
                console.log(count);
                console.log(this.smarked);

              });
          }

        }

        //console.log("review1",this.review);

      });
  }
  sendInquiry(date) {
    this.spinner.show();
    let inquiry = {
      customer_name: this.cname,
      v_email: this.v_email,
      venue_id: this.id,
      date: date.formatted,
      email: this.cemail,
      mobileNo: this.mno,
      no_of_person: this.person,
      purpose: this.purpose
    }

    this.conectionservice.venueInquiry(inquiry)
      .subscribe(res => {
        //console.log(res);
        this.spinner.hide();

        this.cname = null;
        this.date = null;
        this.v_email = null;
        this.id = null;
        this.cemail = null;
        this.mno = null;
        this.purpose = null;
        this.person = null;
        $(".modal").modal("hide");

      });
  }
  addFeedback() {
    let review = {
      customer_id: localStorage.customer_id,
      venue_id: this.id,
      vendor_id: null,
      rating: this.marked + 1,
      comment: this.feedback
    }


    //console.log("review",review);

    this.spinner.show();
    this.conectionservice.addreview(review)
      .subscribe(res => {
        this.getfeedback();
        this.spinner.hide();


        this.marked = 1,
          this.feedback = null;
      });

  }



  public mark = (index) => {
    this.marked = this.marked == index ? index - 1 : index;
    this.score = this.marked + 1;
    this.rateChanged.next(this.score);

    console.log("scror", this.score);

  }
  public smark = (index) => {
    this.marked = this.smarked == index ? index - 1 : index;
    this.score = Number(this.smarked);
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
}
