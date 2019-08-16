import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { environment } from '../../environments/environment';
import { ConnectionService } from '../services/connection.service';

@Component({
  selector: 'app-vender-grid',
  templateUrl: './vender-grid.component.html',
  styleUrls: ['./vender-grid.component.css']
})
export class VenderGridComponent implements OnInit {
  id:string;
  venueCategory = [];
  venues = [];
  city = [];
  area = [];

  constructor(private route: ActivatedRoute,private router: Router, 
    private conectionservice: ConnectionService) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
     }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getvendors();
    // this.getCategory();

  }

  // getCategory() {
  //   this.conectionservice.getVendorCategory()
  //     .subscribe(res => {
  //       this.venueCategory = res;
  //     });
  // }

  // getcategoryId(id) {
  //   let v_id = id;
  //   this.conectionservice.getVendorCategoryById(v_id)
  //     .subscribe(res => {
  //       for (let index = 0; index < res.length; index++) {
  //         this.venues.push(res[index]);
  //       }

  //     });
  // }
  getvendors() {
    this.conectionservice.getVendors()
      .subscribe(res => {
        // this.venues = res;

        for (let index = 0; index < res.length; index++) {
 
          if (res[index].vendor_cat_id == this.id) {
            this.venues.push(res[index]);
            
            this.city.push(res[index].city);
         
          }
        }
        console.log(this.venues);

      });
  }

  getcitywise() {

    this.conectionservice.getVendors()
      .subscribe(res => {
        // this.venues = res;

        for (let index = 0; index < res.length; index++) {
 
          if (res[index].vendor_cat_id == this.id) {
            this.venues.push(res[index]);
            
          }
        }
        console.log(this.city);

      });
  }

}
