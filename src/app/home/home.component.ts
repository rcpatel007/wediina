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
  homeads_venue=[];
  homeads_vendor=[];
  constructor(private router: Router,private conectionservice:ConnectionService) { }

  ngOnInit() {
    this.getHomeAds();
    this.getHomeSlider();

  
  }

  getHomeAds(){
    this.conectionservice.getHomeads()
    .subscribe(res=>{
      for (let index = 0; index < res.length; index++) {

        if (res[index].venue_id!=null) {
          this.homeads_venue.push(res[index]);
          
        }
        if (res[index].vendor_id!=null) {
          this.homeads_vendor.push(res[index]);
          
        }        
      }

console.log('0'+res);
console.log("1", this.homeads_venue);
console.log("1", this.homeads_vendor);

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
