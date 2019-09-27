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
  selector: 'app-vender-detail',
  templateUrl: './vender-detail.component.html',
  styleUrls: ['./vender-detail.component.css']
})
export class VenderDetailComponent implements OnInit {
  @Input() score = 5;
  @Input() maxScore = 5;
  @Input() forDisplay = false;
  @Input() sforDisplay = false;
  @Output() rateChanged = new EventEmitter();

  range = [];
  marked = -1;
  smarked: Number = -1;
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
    editableDateField: false
  };

  id: String;
  address: String;
  area: String;
  companyName: String;
  contactno: String;
  detail: String;
  video = [];
  playvideo: String;
  sub_images = [];
  email: String;
  password: String;
  customer: boolean;
  feedback: String;
  errormsg: String;
  datearray: [];
  rat: Number;
  cname: String;
  cemail: String;
  mno: string;
  date: Date;
  location: String;
  loc: String;
  purpose: String;
  v_email: String;
  review = [];
  videoArray = [];
  mainimg:String;
  constructor(private route: ActivatedRoute,
    private router: Router, private conectionservice: ConnectionService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    $(document).ready(function () {


      $('#mainvideomodel').click(function () {
        //  alert('hey'); 
        $("#videopopup").attr("src", "");
      });

    });


    for (var i = 0; i < this.maxScore; i++) {
      this.range.push(i);
    }
    this.customerfetch();
    this.getvendor();
    this.videoimg();
    this.getfeedback();
  }


  getvendor() {
    // this.spinner.show();

    this.conectionservice.getVendorById(this.id)
      .subscribe(res => {
        this.address = res.address;
        this.area = this.area;
        this.companyName = res.companyName;
        this.contactno = res.contactno;
        this.detail = res.desp;
        this.v_email = res.email;
        this.loc = res.location;
        this.mainimg =res.image;
        this.video = res.video_story;
        this.sub_images = res.sub_images;
        this.datearray = res.bookingdate;
        // this.spinner.hide();

        //console.log(res);

this.videoimg();
      });
  }

  // videoimg() {

  //   let url: String;

  //   for (let index = 0; index < this.video.length; index++) {

  //     let urlarray = this.video[index].split("embed/")[1];

  //     console.log(urlarray);

  //     let array = {
  //       image: urlarray,
  //       link: this.video[index]
  //     }
  //     this.videoArray.push(array);

  //   }
  // }
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
    console.log(this.videoArray);
    
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


  // login(){

  //   this.spinner.show();

  //   // this.router.navigate(["/home"]);

  //   let customer = {
  //     email: this.email,
  //     password: this.password
  //   }

  //   //console.log(customer);

  //   this.conectionservice.customerLogin(customer)
  //     .subscribe(res => {
  //       localStorage.setItem('customer_id',res._id);
  //       localStorage.removeItem('venue_id');
  //       localStorage.removeItem('vendor_id');

  //       environment.customer_id = res._id;
  //       environment.venue_id = null;
  //       environment.vendor_id =null; 
  //       this.spinner.hide();
  //  this.customer =true;
  //       //console.log(res, 'customerdetail');

  //     });

  // }
  sendInquiry(date) {
    this.spinner.show();
    let inquiry = {
      customer_name: this.cname,
      v_email: this.v_email,
      vendor_id: this.id,
      date: date.formatted,
      email: this.cemail,
      mobileNo: this.mno,
      location: this.location,
      purpose: this.purpose
    }
    console.log(inquiry);


    this.conectionservice.vendorInquiry(inquiry)
      .subscribe(res => {
        this.cname = null;
        this.v_email = null;
        this.id = null;
        this.date = null;
        this.cemail = null;
        this.mno = null;
        this.location = null;
        this.purpose = null;
        //console.log(res);
        this.spinner.hide();
        $(".modal").modal("hide");


      });
  }

  getfeedback() {
    // let feed:any;
    let count = 0;
    let c_id: String;
    this.review = [];
    // let c_name:String;
    // let comment:String;
    // let rating:String;
    this.conectionservice.getreview()
      .subscribe(res => {

        console.log(res);
        for (let index = 0; index < res.length; index++) {

          if (res[index].vendor_id == this.id) {

            c_id = res[index].customer_id;

            this.conectionservice.getCustomerById(c_id)
              .subscribe(result => {
                let feed = {
                  c_name: result.name,
                  commnet: res[index].comment,
                  rating: res[index].rating
                }

                this.review.push(feed);



                count = res[index].rating + Number(count);
                this.smarked = Number(count) / Number(this.review.length);




                console.log(this.smarked);

              });

          }
        }
        //console.log("review1",this.review);


        // console.log(this.review.length);
        // console.log(count);
        // console.log(this.smarked);

      });
  }
  addFeedback() {
    let review = {
      customer_id: localStorage.customer_id,
      venue_id: null,
      vendor_id: this.id,
      rating: this.marked + 1,
      comment: this.feedback
    }

    console.log("review", review);

    this.spinner.show();
    this.conectionservice.addreview(review)
      .subscribe(res => {
        this.spinner.hide();
        this.getfeedback();
        $(".modal").modal("hide");

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
    this.score = Number(this.smarked) + 1;
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
