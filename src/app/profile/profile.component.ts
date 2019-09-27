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
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id: String;
  name: String;
  contactno: String;
  email: String;
  cpwd: String;
  confirmpwd: String;
  npwd: String;
  displayname: String;
  pwderror: String;
  pwdsucess: String;
  venueinquiry=[];
  vendorinquiry=[];
  inquirydata: any;

  constructor(private route: ActivatedRoute,
    private spinner: NgxSpinnerService, private router: Router, private conectionservice: ConnectionService) { }

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

    this.customerDetail();
    this.getInquiry();
  }

  customerDetail() {

    let cid = this.id;
    this.conectionservice.getCustomerById(cid)
      .subscribe(res => {
        //console.log(res);

        this.name = res.name;
        this.displayname = res.name;
        this.email = res.email;
        this.contactno = res.contact_no;

      });
  }

  customerUpdate() {
    this.spinner.show();
    let customer = {
      name: this.name,
      email: this.email,
      contact_no: this.contactno
    }

    this.conectionservice.editCustomer(this.id, customer)
      .subscribe(res => {
        this.spinner.hide();
      });

  }


  getInquiry() {
    this.conectionservice.getvenueInquiry()
      .subscribe(res => {
        for (let index = 0; index < res.length; index++) {
          if (res[index].customer_id == this.id) {

            this.conectionservice.getVenueById(res[index].venue_id)
              .subscribe(data => {

                let inquirydata = {
                  venuename: data.companyName,
                  inquirydate: res[index].inquiry_date,
                  bookingdate: res[index].booking_date,
                  purpose: res[index].purpose,
                  No_of_person: res[index].no_of_person
                }

                this.venueinquiry.push(inquirydata);

                // console.log(this.venueinquiry);

              });

          }

          console.log(this.venueinquiry);

        }


      });



    this.conectionservice.getvendorInquiry()
      .subscribe(res => {
        for (let index = 0; index < res.length; index++) {
          if (res[index].customer_id == this.id) {

            this.conectionservice.getVendorById(res[index].vendor_id)
              .subscribe(data => {

                console.log(this.vendorinquiry);
                let inquirydata = {
                  vendorname: data.companyName,
                  inquirydate: res[index].inquiry_date,
                  bookingdate: res[index].booking_date,
                  location: res[index].location,
                  purpose: res[index].purpose,
                  // No_of_person:res[index].no_of_person
                }
                this.vendorinquiry.push({ inquirydata });
              });

          }

          console.log(this.vendorinquiry);

        }


      });

  }
  logout() {
    localStorage.removeItem('customer_id');
    this.router.navigate(["/home"]);

  }


  changePassword() {
    let id = localStorage.customer_id;
    console.log(localStorage.customer_id);

    let validate_pwd = {
      id: localStorage.customer_id,
      password: this.cpwd
    }
    console.log(validate_pwd);

    this.conectionservice.validatecustomerpwd(id, validate_pwd)
      .subscribe((res) => {
        console.log(res);

        if (res.auth == true) {
          // console.log(this.npwd);
          // console.log(this.confirmpwd);
          if (this.npwd == this.confirmpwd) {
            let pwd = {
              password: this.npwd
            }
            this.conectionservice.updatecustomerpwd(id, pwd)
              .subscribe(() => {
                this.pwderror = null;
                this.pwdsucess = "password Update Sucessfully"
                // console.log(this.pwdsucess);

              });
          }
          else {
            this.pwdsucess = null;
            this.pwderror = "New Password & Confirm password not match";
            // console.log(this.pwderror);
          }
        }
      },
        (error) => {

          this.pwdsucess = null;
          this.pwderror = "Current Password is Wrong";
          // console.log(error._body);
        }
      );
  }
}
