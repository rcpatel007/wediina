import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { environment } from '../../environments/environment';
import { ConnectionService } from '../services/connection.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-vender-detail',
  templateUrl: './vender-detail.component.html',
  styleUrls: ['./vender-detail.component.css']
})
export class VenderDetailComponent implements OnInit {

  id:String;
  address:String;
  area:String;
  companyName:String;
  contactno:String;
  detail:String;
  video=[];
  sub_images =[];
  email:String;
  password:String;
  customer:boolean;
  feedback:String;
  rat:Number;
  cname:String;
  cemail:String;
  mno:string;
  date:Date;
  location:String;
  purpose:String;
  v_email:String;

  constructor(private route: ActivatedRoute,
    private router: Router, private conectionservice: ConnectionService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.customerfetch();
  this.getvendor();
  }


  getvendor(){
    // this.spinner.show();
  
    this.conectionservice.getVendorById(this.id)
    .subscribe(res =>{
      this.address= res.address;
      this.area=this.area;
      this.companyName= res.companyName;
      this.contactno= res.contactno;
      this.detail= res.desp;
      this.video=res.video_story;
      this.sub_images =res.sub_images;
    
      // this.spinner.hide();
  
      console.log(res);
        
      
    });
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
