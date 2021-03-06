import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { environment } from '../../environments/environment';
import { ConnectionService } from '../services/connection.service';
import { NgxSpinnerService } from "ngx-spinner";

declare var $: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  successmsg: String;
  homeslider: any;
  venue_category = [];
  vendor_category = [];

  name: String;
  email: String;
  contact_no: String;
  subject: String;
  msg: String;
  primeadsphoto: String;
  constructor(private router: Router,
    private conectionservice: ConnectionService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {

    // $("script[src='assets/css/style.css']").remove();
    // $("script[src='node_modules/bootstrap/dist/css/bootstrap.min.css']").remove();
    // $("script[src='node_modules/jquery/dist/jquery.min.js']").remove();
    // $("script[src='node_modules/bootstrap/dist/js/bootstrap.min.js']").remove();

    // var dynamicScripts = [
    // "assets/css/style.css",
    // "node_modules/bootstrap/dist/css/bootstrap.min.css",
    // "node_modules/jquery/dist/jquery.min.js",
    // "node_modules/bootstrap/dist/js/bootstrap.min.js"
    // ];

    // for (var i = 0; i < dynamicScripts.length; i++) {
    //   let node = document.createElement('script');
    //   node.src = dynamicScripts[i];
    //   node.type = 'text/javascript';
    //   node.async = false;
    //   node.charset = 'utf-8';
    //   document.getElementsByTagName('head')[0].appendChild(node);
    // }


    this.getprimads();
    this.getcategory();
    this.getHomeSlider();


  }


  getprimads() {
    this.conectionservice.getads()
      .subscribe(res => {
        this.primeadsphoto = res[0].image;
     console.log(res);
     
      });
  }



  getcategory() {
    this.spinner.show();
    this.conectionservice.getVenueCategory()
      .subscribe(res => {
        this.venue_category = res;
        //console.log(res);

      });

    this.conectionservice.getVendorCategory()
      .subscribe(res => {
        this.vendor_category = res;
        //console.log(this.vendor_category);
        this.spinner.hide();

      });

  }

  getHomeSlider() {
    this.conectionservice.gethomeslider()
      .subscribe(res => {
        this.homeslider = res;
        //console.log(res);

      });
  }


  contactSubmit() {


    this.spinner.show();
    let contact = {
      name: this.name,
      email: this.email,
      mobileNo: this.contact_no,
      subject: this.subject,
      message: this.msg,
    }

    this.conectionservice.addcontact(contact)
      .subscribe(res => {

        console.log(res);

        this.spinner.hide();
        this.successmsg = "your  Request accepted  We are  Contact you Soon....."

      });
  }
}
