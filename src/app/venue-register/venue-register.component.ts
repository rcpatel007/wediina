import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { environment } from '../../environments/environment';
import { ConnectionService } from '../services/connection.service';

@Component({
  selector: 'app-venue-register',
  templateUrl: './venue-register.component.html',
  styleUrls: ['./venue-register.component.css']
})
export class VenueRegisterComponent implements OnInit {
  venue_category = new Array;
  package: String;
  fname: String;
  lname: String;
  cname: String;
  cno: Number;
  email: String;
  password: String;
  catValue: String;
  gstno: String;
  area: String;
  city: String;
  state: String;
  address: String;
  parking: String;
  catringValue: String;
  themepermission: String;
  p_img: String;
  oimg = new Array;
  o_img: any;
  cpwd: String;
  timeper: String;
  areavenue: String;
  cop: String;
  location: String;
  error: String;
  desp: String;
  videolink: any;
  status = true;
  base64: any;
  otherbase64: any;
  cityarray = [];

  constructor(private route: ActivatedRoute,
    private router: Router, private conectionservice: ConnectionService) { }

  ngOnInit() {

    this.getCategory();
    this.getcity();
  }

  getCategory() {
    this.conectionservice.getVenueCategory()
      .subscribe(res => {
        this.venue_category = res;
        // // console.log(this.venue_category);
      });
  }



  /* Image convert base64 */
  imageUpload(evt) {
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
    // // console.log(this.base64);

    // // console.log(btoa(binaryString));
    this.conectionservice.imgurImage(this.base64)
      .subscribe((result) => {
        // console.log(result);
        this.p_img = result.data.link;

      });

  }
  /*add or remove input tag*/
  otherImageUpload(event) {
    let files = [].slice.call(event.target.files);
    // // console.log(files);
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
    // // console.log(btoa(binaryString));
    this.conectionservice.imgurotherImage(this.otherbase64)
      .subscribe((result) => {
        // console.log(result);
        this.oimg.push(result.data.link);
        // console.log(this.oimg);

      });
    // // console.log(this.oimg);
  }

  addVenue() {
    // let video = this.videolink.split(",");
    // // console.log(video);
    if (this.password == this.cpwd) {

      this.error = "";
      // this.existuser = false;



      let venue = {
        venue_cat_id: this.catValue,
        fname: this.fname,
        lname: this.lname,
        package_time: null,
        companyName: this.cname,
        contactno: this.cno,
        email: this.email,
        gstno: null,
        status: false,
        password: this.password,
        address: null,
        city: this.city,
        state: null,
        parking: null,
        catringValue: null,
        themepermission: null,
        p_img: null,
        oimg: null,
        timeper: null,
        areavenue: null,
        cop: null,
        location: null,
        desp: this.desp,
        video_story: null,
      }

      // console.log(venue);

      this.conectionservice.addVenue(venue)
        .subscribe(res => {

          // console.log(res);

          this.router.navigate(["/login"]);
          this.catValue = null;
          this.fname = null;
          this.lname = null;
          this.cname = null;
          this.cno = null;
          this.email = null;
          this.password = null;
          this.city = null;
          this.desp = null;
        });
    }
    else {
      this.error = "Passwrod not match";
    }
  }

  getcity() {
    this.conectionservice.getcity()
      .subscribe(res => {
        this.cityarray = res;
        // console.log(res);

      });
  }



}
