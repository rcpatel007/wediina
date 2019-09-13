import { Component, OnInit } from '@angular/core';
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
  selector: 'app-premium-photographer-detail',
  templateUrl: './premium-photographer-detail.component.html',
  styleUrls: ['./premium-photographer-detail.component.css']
})
export class PremiumPhotographerDetailComponent implements OnInit {

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
    this.getvendor();
this.getfeedback();
    this.customerfetch();
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
        this.v_email=res.email;
        this.video = res.video_story;
        this.sub_images = res.sub_image;
        this.weblink = res.weblink;
        this.datearray = res.bookingdate;
        // this.spinner.hide();

        console.log(res);


      });
  }

  getvideo(v) {
    this.playvideo = v;
    $("#videopopup").attr("src", v);
    console.log(this.playvideo);
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

    console.log(this.customer);

  }


  login() {

    this.spinner.show();

    // this.router.navigate(["/home"]);

    let customer = {
      email: this.email,
      password: this.password
    }

    console.log(customer);

    this.conectionservice.customerLogin(customer)
      .subscribe(res => {
        environment.customer_id = res._id;
        environment.venue_id = null;
        environment.vendor_id = null;
        this.spinner.hide();
        this.customer = true;
        console.log(res, 'customerdetail');

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
      console.log(res);
      this.spinner.hide();
    });
  }
  datefilter(booking) {
    let book = booking;
    console.log(book);
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
// let feed:any;
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


    });
  }
}
console.log("review1",this.review);
 
  });
}
  addFeedback(){
    let review = {
      customer_id:environment.customer_id,
      venue_id: null,
      vendor_id: this.id,
      rating:this.rat,
      comment:this.feedback
    }
    
    console.log("review",review);
    
    this.spinner.show();
      this.conectionservice.addreview(review)
      .subscribe(res=>{
    this.spinner.hide();
      });
    
    }

}
