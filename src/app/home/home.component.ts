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

  homeslider:any;
  venue_category=[];
  vendor_category=[];
  constructor(private router: Router,
    private conectionservice:ConnectionService,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit() {

    $("script[src='assets/css/style.css']").remove();
    
    var dynamicScripts = [
    "assets/css/style.css"
    ];

    for (var i = 0; i < dynamicScripts.length; i++) {
      let node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }



    this.getcategory();
    this.getHomeSlider();

  
  }

  getcategory(){
    this.spinner.show();
    this.conectionservice.getVenueCategory()
    .subscribe(res=>{
      this.venue_category =res;
      console.log(res);
      
    });
   
    this.conectionservice.getVendorCategory()
    .subscribe(res=>{
      this.vendor_category =res;
      console.log(this.vendor_category);
      this.spinner.hide();  
      
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
