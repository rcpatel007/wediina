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
  selector: 'app-vendorprofile',
  templateUrl: './vendorprofile.component.html',
  styleUrls: ['./vendorprofile.component.css']
})
export class VendorprofileComponent implements OnInit {

  id: string;
  venue: String;
  fname: String;
  lname: String;
  cname: String;
  location: String;
  address: String;
  video: [];
  cityarray = [];
  image: String;
  images: [];
  area: String;
  p_area: String;
  capasity: String;
  catring: String;
  theme: String;
  time: String;
  detail: String;
  mno: String;
  parking: String;
  gst: string;
  package: String;
  vendor_cat_id: String;
  city: String;
  desp: String;
  p_img: String;
  email: String;
  state: String;
  password: String;
  videolink: String;
  base64: string;
  bookingdate = [];
  status: boolean;
  prime: boolean;
  weblink: String;
  oimg = [];
  otherbase64: String;
  inquiry = [];
  date:String;
 
  public myDatePickerOptions: IMyDpOptions = {
   // other options...
   dateFormat: 'dd/mm/yyyy',
};

  constructor(private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private router: Router,
    private conectionservice: ConnectionService) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });



    $(document).ready(function () {
      // Add smooth scrolling to all links
      $("a").on('click', function (event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
          // Prevent default anchor click behavior
          event.preventDefault();

          // Store hash
          var hash = this.hash;

          // Using jQuery's animate() method to add smooth page scroll
          // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 800, function () {

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
          });
        } // End if
      });
    });
    this.getvenueDetail();

    this.getcity();
    this.getInquiry();

  }


  getcity() {
    this.conectionservice.getcity()
      .subscribe(res => {
        this.cityarray = res;
        console.log(res);

      });
  }

  getvenueDetail() {
    this.spinner.show();

    this.conectionservice.getVendorById(this.id)
      .subscribe(res => {
        //console.log(res );

        this.vendor_cat_id = res.vendor_cat_id;
        this.package = res.package;

        this.fname = res.fname;
        this.lname = res.lname;
        this.status = res.status;
        this.cname = res.companyName;
        this.mno = res.contactno;
        this.email = res.email;
        this.gst = res.gstno;
        this.p_img = res.image;
        this.oimg = res.sub_images;
        this.password = res.password;
        this.address = res.address;
        this.city = res.city;
        this.area = res.area;
        this.state = res.state;
        this.videolink = res.video_story;
        this.desp = res.desp;
        this.bookingdate = res.bookingdate;
        this.weblink = res.weblink;
        this.prime = res.prime_user;
        //  this.venue=res;
        //  this.fname=res.fname;
        //  this.lname=res.lname;
        //  this.mno=res.contactno;
        // this.gst=res.gstno;
        // this.email = res.email;
        // this.parking=res.parking;
        //   this.image =res.image;
        //  this.cname=res.companyName;
        //  this.location=res.location;
        //  this.video=res.video_story;
        //  this.address =res.address;
        //  this.images=res.sub_img;
        //  this.city=res.city;  
        //  this.area=res.parking;
        //  this.p_area=res.parking;
        //  this.capasity=res.capasity_of_person;
        //  this.catring=res.catring;
        //  this.theme=res.theme_decoration;
        //  this.time=res.time_permission;
        //  this.detail=res.comment;
        //  this.desp=res.desp;
        //console.log(res);
        this.spinner.hide();

        console.log(this.oimg);

      });

  }

  /* Image convert base64 */
  imageUpload(evt) {
    this.spinner.show();
    var files = evt.target.files;
    var file = files[0];
    if (files && file) {

      var reader = new FileReader();

      reader.onload = this.imagetoBase64.bind(this);
      reader.readAsBinaryString(file);

    }
  }

  imagetoBase64(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64 = btoa(binaryString);
    // console.log(this.base64);

    // console.log(btoa(binaryString));
    this.conectionservice.imgurImage(this.base64)
      .subscribe((result) => {
        console.log(result);
        this.p_img = result.data.link;
        this.spinner.hide();

      });

  }
  /*add or remove input tag*/
  otherImageUpload(event) {
    this.spinner.show();

    let files = [].slice.call(event.target.files);
    // console.log(files);
    // input = files.map(f => f.name).join(', ');
    for (let i = 0; i < files.length; i++) {
      if (files) {
        var reader = new FileReader();
        reader.onload = this.otherimagetoBase64.bind(this);
        reader.readAsBinaryString(files[i]);
      }
    }
  }

  otherimagetoBase64(readeEvent) {
    var binaryString = readeEvent.target.result;
    this.otherbase64 = btoa(binaryString);
    // console.log(btoa(binaryString));
    this.conectionservice.imgurotherImage(this.otherbase64)
      .subscribe((result) => {
        console.log(result);
        this.oimg.push(result.data.link);
        console.log(this.oimg);
        this.spinner.hide();

      });
    // console.log(this.oimg);
  }


  editVendor() {

    //  let video = this.videolink.split(",");
    // console.log(video);
    //  
    this.spinner.show();


    let vendor = {
      vendor_cat_id: this.vendor_cat_id,
      package: this.package,
      fname: this.fname,
      lname: this.lname,
      status: this.status,
      companyName: this.cname,
      contactno: this.mno,
      email: this.email,
      gstno: this.gst,
      image: this.p_img,
      sub_images: this.oimg,
      password: this.password,
      address: this.address,
      city: this.city,
      area: null,
      state: null,
      video_story: this.videolink,
      desp: this.desp,
      bookingdate: null,
      weblink: this.weblink,
      prime_user: this.prime
    }

    console.log(vendor);

    this.conectionservice.editVendor(this.id, vendor)
      .subscribe(res => {
        //console.log(res );

        //console.log(res);
        this.spinner.hide();

      });

  }

  logout() {
    environment.vendor_id = null;
    this.router.navigate(["/home"]);

  }

  bookingDate(date) {

    this.bookingdate.push(date.formatted);

    let book = {
      bookingdate: this.bookingdate
    }
    console.log(this.bookingdate);

    this.conectionservice.vendorBookindDate(this.id, book)
      .subscribe(res => {

        console.log(res);

        this.getvenueDetail();
      });

  }

  deleteDate(i) {

    this.bookingdate.splice(i, 1);

    console.log(this.bookingdate);

    // this.bookingdate.push(this.date);

    let book = {
      bookingdate: this.bookingdate
    }
    console.log(this.bookingdate);

    this.conectionservice.vendorBookindDate(this.id, book)
      .subscribe(res => {

        console.log(res);

        this.getvenueDetail();
      });

  }



  getInquiry() {

    this.conectionservice.getVendorInquiryById(this.id)
      .subscribe(res => {
        this.inquiry.push(res);
        console.log(res);

      });
  }
}
