import { Component,EventEmitter, Input,Output, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { environment } from '../../environments/environment';
import { ConnectionService } from '../services/connection.service';
import { NgxSpinnerService } from "ngx-spinner";
import { IMyDpOptions } from 'mydatepicker';
declare var $: any;

// const {NgModule, Component, EventEmitter, OnInit, Input, Output } = ng.core;
// const {bootstrap} = ng.platform.browser; 

@Component({
  selector: 'app-premium-photographer-detail',
  templateUrl: './premium-photographer-detail.component.html',
  styleUrls: ['./premium-photographer-detail.component.css']
})
export class PremiumPhotographerDetailComponent implements OnInit {
  @Input() score = 5;
	@Input() maxScore = 5;
	@Input() forDisplay = false;
	@Input() sforDisplay = false;
	@Output() rateChanged = new EventEmitter();
  

  customer: boolean;
  email: String;
  password: String;
  id: String;
  address: String;
  area: String;
  companyName: String;
  contactno: String;
  detail: String;
  video = [];
  booking:String;
  playvideo: String;
  sub_images = [];
  feedback: String;
  rat: Number;
  cname: String;
  cemail: String;
  mno: string;
  date: Date;
  location: String;
  purpose: String;
  v_email: String;
  weblink: String;
  photo_img: String;
  datearray = [];
  review= [];
 placeholder: string = 'Select a date';
 range = [];
 marked = -1;
 smarked:Number = -1;
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
    editableDateField: false
  };
  constructor(private route: ActivatedRoute,
    private spinner: NgxSpinnerService, private router: Router, private conectionservice: ConnectionService) { }
  changePlaceholder() {
    this.placeholder = 'Start date';
  }
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
    this.getvendor();
this.getfeedback();
    this.customerfetch();
  }

   
  public mark = (index) => {
    this.marked = this.marked == index ? index - 1 : index;
    this.score = this.marked + 1;
    this.rateChanged.next(this.score);
  
  console.log("scror",this.score);
  
  }
  public smark = (index) => {
    this.marked = this.smarked == index ? index - 1 : index;
    this.score = Number(this.smarked);
    this.rateChanged.next(this.score);
  
  console.log("scror",this.score);
  
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
  console.log("scror",this.score);

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
  console.log("scror",this.score);

  }

  getvendor() {
    // this.spinner.show();
this.spinner.show();
    this.conectionservice.getVendorById(this.id)
      .subscribe(res => {
        this.address = res.address;
        this.area = this.area;
        this.companyName = res.companyName;
        this.contactno = res.contactno;
        this.detail = res.desp;
        this.v_email=res.email;
        this.video = res.video_story;
        this.sub_images = res.sub_image;
        this.weblink = res.weblink;
        this.datearray = res.bookingdate;
        // this.spinner.hide();

        //console.log(res);
        this.spinner.hide();


      });
  }

  getvideo(v) {
    this.playvideo = v;
    $("#videopopup").attr("src", v);
    //console.log(this.playvideo);
  }


  getimg(photo) {
    this.photo_img = photo;
  }


  customerfetch() {
    if (environment.customer_id != null) {
      this.customer = true;
    }
    else {
      this.customer = false;
    }

    //console.log(this.customer);

  }


  login() {

    this.spinner.show();

    // this.router.navigate(["/home"]);

    let customer = {
      email: this.email,
      password: this.password
    }

    //console.log(customer);

    this.conectionservice.customerLogin(customer)
      .subscribe(res => {
        environment.customer_id = res._id;
        environment.venue_id = null;
        environment.vendor_id = null;
        this.customer = true;
        //console.log(res, 'customerdetail');
        this.spinner.hide();
       
      });

  }

  sendInquiry()
  {
    this.spinner.show();
    let inquiry ={
          customer_name:this.cname,
          v_email:this.v_email,
          vendor_id: this.id,
          venue_id:null,
          date:this.date,
          email: this.cemail,
          mobileNo: this.mno,
          location: this.location,
          purpose:this.purpose
    }
  
    this.conectionservice.vendorInquiry(inquiry)
    .subscribe(res=>{
      //console.log(res);
      this.spinner.hide();
    });
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

  
getfeedback(){
  this.spinner.show();
       this.review=[];
  // let feed:any;
  let count = 0;
  let c_id:String;
  // let c_name:String;
  // let comment:String;
  // let rating:String;
    this.conectionservice.getreview()
    .subscribe(res =>{
  
  console.log(res);
  for (let index = 0; index < res.length; index++) {
  
    if (res[index].vendor_id == this.id) {
      
      c_id = res[index].customer_id;
  
      this.conectionservice.getCustomerById(c_id)
      .subscribe(result =>{
        let feed ={
          c_name:result.name,
          commnet:res[index].comment,
          rating:res[index].rating
        }
  
        this.review.push(feed);
  

          console.log(this.review);
          
    count = res[index].rating+ Number(count);
    this.smarked  = Number(count)/Number( this.review.length);

    this.spinner.hide();
       


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
  addFeedback(){
    this.spinner.show();
   
    let review = {
      customer_id:environment.customer_id,
      venue_id: null,
      vendor_id: this.id,
      rating:this.marked +1 ,
      comment:this.feedback
    }
    
    //console.log("review",review);
    
      this.conectionservice.addreview(review)
      .subscribe(res=>{
    this.spinner.hide();
    this.getfeedback();

    console.log(review);
    
      });
      $(".modal").modal("hide");
    }

}
