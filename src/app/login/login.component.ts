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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  email: string;
  password: string;
  errormsg: String;
  rol: number;


  constructor(private route: ActivatedRoute,
    private router: Router, private conectionservice: ConnectionService,
    private spinner: NgxSpinnerService) { }



  ngOnInit() {
  }
  selectRoll(roll) {

    this.rol = roll;
    console.log("selected roll", this.rol);

    if (this.rol == 1) {
      $('#vendor').css({ "background": "#000", "color": "#fff" });
      $('#customer').removeAttr("style");
      $('#venue').removeAttr("style");
    }

    if (this.rol == 2) {
      $('#venue').css({ "background": "#000 ", "color": "#fff" });
      $('#customer').removeAttr("style");
      $('#vendor').removeAttr("style");
    }
    if (this.rol == 3) {
      $('#venue').removeAttr("style");
      $('#vendor').removeAttr("style");
      $('#customer').css({ "background": "#000", "color": "#fff" });

    }
  }


  login() {
// this.errormsg ="";
    // if(this.email == null && this.password ==null){
    //   this.errormsg = "please enter Valid user name and password";

    // }

    if (this.rol == 1) {

        this.vendorLogin();
        console.log("hello");
        
      }
     else if (this.rol == 2) {
        this.venueLogin();
        console.log("hello");

      }
      else if (this.rol == 3) {
        console.log("hello");

        this.customer();
      }
      else{
        this.errormsg = "please select your Roll";

      }
  }


  customer() {

    let customer = {
      email: this.email,
      password: this.password
    }

    console.log(customer);

    this.conectionservice.customerLogin(customer)
      .subscribe(res => {
        environment.customer_id = res._id;
        this.router.navigate(["/profile", res._id]);

        console.log(res, 'customerdetail');

      });
  }



  venueLogin() {

    let venue_login = {
      email: this.email,
      password: this.password
    }

    console.log("venue  login", venue_login);

    this.conectionservice.venueLogin(venue_login)
      .subscribe(res => {
        environment.venue_id = res._id;
        this.router.navigate(["/Venueprofile", res._id]);

        console.log(res, 'venuedetail');

      });
  }


  vendorLogin() {

    let customer = {
      email: this.email,
      password: this.password
    }

    console.log(customer);

    this.conectionservice.vendorLogin(customer)
      .subscribe(res => {
        environment.vendor_id = res._id;
        this.router.navigate(["/VenderDetail", res._id]);

        console.log(res, 'vendor_detail');

      });
  }
}
