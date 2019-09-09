import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { environment } from '../../environments/environment';
import { ConnectionService } from '../services/connection.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-premium-photographer-detail',
  templateUrl: './premium-photographer-detail.component.html',
  styleUrls: ['./premium-photographer-detail.component.css']
})
export class PremiumPhotographerDetailComponent implements OnInit {

customer:boolean;
email:String;
password:String;

  constructor(private route: ActivatedRoute,
    private spinner: NgxSpinnerService, private router: Router, private conectionservice: ConnectionService) { }

  ngOnInit() {
    this.customerfetch();
  }


  customerfetch(){
    if(environment.customer_id !=null)
  {
    this.customer = true;
  }
  else{
    this.customer =false;
  }
  
  console.log(this.customer);
  
  }
  
  
  login(){
  
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
        environment.vendor_id =null; 
        this.spinner.hide();
   this.customer =true;
        console.log(res, 'customerdetail');
  
      });
  
  }
}
