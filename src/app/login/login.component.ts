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
  rol: number;
  errormsg: String;

  constructor(private route: ActivatedRoute,
    private router: Router, private conectionservice: ConnectionService,
    private spinner: NgxSpinnerService) { }



  ngOnInit() {
  }
  selectRoll(roll) {

    this.rol = roll;
    //console.log("selected roll", this.rol);

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
    // this.errorerrormsg ="";
    // if(this.email == null && this.password ==null){
    //   this.errorerrormsg = "please enter Valid user name and password";

    // }

    if (this.rol == 1) {

      this.vendorLogin();
      //console.log("hello");

    }
    else if (this.rol == 2) {
      this.venueLogin();
      //console.log("hello");

    }
    else if (this.rol == 3) {
      //console.log("hello");

      this.customer();
    }
    else {
      this.errormsg = "please select your Roll";

    }
  }

  forget() {
    // this.errorerrormsg ="";
    // if(this.email == null && this.password ==null){
    //   this.errorerrormsg = "please enter Valid user name and password";

    // }

    if (this.rol == 1) {
      this.Confirmvendoremail();

      // this.vendorLogin();
      //console.log("hello");

    }
    else if (this.rol == 2) {
      this.Confirmvnenueemail();
      //console.log("hello");

    }
    else if (this.rol == 3) {
      //console.log("hello");

      this.Confirmcustomeremail();
    }
    else {
      this.errormsg = "please select your Roll";

    }
  }


  customer() {
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
            this.email =null;
            this.password =null;
            environment.customer_id = res._id;
            environment.venue_id = null;
            environment.vendor_id = null;
            // environment.vemail = res.email;
            this.router.navigate(["/home"]);
          
    
          //console.log(res, 'customerdetail');
          this.spinner.hide();

        },
          (error)=>{
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

  forgetCustomer() {
    let mail = {
      email: this.email
    }
    console.log(mail);


    this.conectionservice.forgetCustomer(mail)
      .subscribe(res => {
        console.log(res);


      });
  }


  forgetVenue() {
    let mail = {
      email: this.email
    }
    console.log(mail);


    this.conectionservice.forgetVenue(mail)
      .subscribe(res => {
        console.log(res);


      });
  }
  forgetVendor() {

    let mail = {
      email: this.email
    }
    console.log(mail);


    this.conectionservice.forgetVendor(mail)
      .subscribe(res => {
        console.log(res);


      });
  }

  venueLogin() {
    this.spinner.show();
    if (this.email == null || this.password == null) {
      this.errormsg = null;
      this.errormsg = "please enter email or password";
      this.spinner.hide();

    }
    else {
  
    let venue_login = {
      email: this.email,
      password: this.password
    }

    //console.log("venue  login", venue_login);

    this.conectionservice.venueLogin(venue_login)
      .subscribe(res => {
        localStorage.removeItem('customer_id');
        localStorage.setItem('venue_id', res._id);
        localStorage.removeItem('vendor_id');


        environment.venue_id = res._id;
        environment.customer_id = null;
        environment.vendor_id = null;
        environment.vemail = res.email;
        this.spinner.hide();

        this.router.navigate(["/Venueprofile", res._id]);

        //console.log(res, 'venuedetail');
      },

      (error)=>{
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
  }


  vendorLogin() {
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

    this.conectionservice.vendorLogin(customer)
      .subscribe(res => {
        localStorage.removeItem('customer_id');
        localStorage.removeItem('venue_id');
        localStorage.setItem('vendor_id', res._id);

        environment.vendor_id = res._id;
        environment.customer_id = null;
        environment.venue_id = null;
        environment.vemail = res.email;
        this.spinner.hide();

        this.router.navigate(["/Vendorprofile", res._id]);

        //console.log(res, 'vendor_detail');

      },
      (error)=>{
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
}

Confirmcustomeremail() {
  var x = confirm("New password has been sent in your mail please check your Email");
  if (x) {
    // console.log(this.auth);

    return this.forgetCustomer();
  }

  else
    return false;
}


Confirmvendoremail() {
  var x = confirm("New password has been sent in your mail please check your Email");
  if (x) {
    // console.log(this.auth);

    return this.forgetVendor();
  }

  else
    return false;
}

Confirmvnenueemail() {
  var x = confirm("New password has been sent in your mail please check your Email");
  if (x) {
    // console.log(this.auth);

    return this.forgetVenue();
  }

  else
    return false;
}
}
