import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { environment } from '../../environments/environment';
import { ConnectionService } from '../services/connection.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  homeslider:any;
  venue_category=[];
  vendor_category=[];
  constructor(private router: Router,private conectionservice:ConnectionService) { }

  ngOnInit() {
    this.getcategory();
    this.getHomeSlider();

  
  }

  getcategory(){
    this.conectionservice.getVenueCategory()
    .subscribe(res=>{
      this.venue_category =res;
      console.log(res);
      
    });
   
    this.conectionservice.getVendorCategory()
    .subscribe(res=>{
      this.vendor_category =res;
      console.log(this.vendor_category);
      
    });
  
  }

  getHomeSlider(){
    this.conectionservice.gethomeslider()
    .subscribe(res=>{
      this.homeslider =res;
      console.log(res);

    });
  }

}
