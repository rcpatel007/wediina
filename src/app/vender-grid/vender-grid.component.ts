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

  venueCategory = [];
  venues = [];
  city = [];
  area = [];

  constructor(private router: Router, private conectionservice: ConnectionService) { }

  ngOnInit() {
    this.getvenue();
    this.getCategory();

  }

  getCategory() {
    this.conectionservice.getVendorCategory()
      .subscribe(res => {
        this.venueCategory = res;
      });
  }

  getcategoryId(id) {
    let v_id = id;
    this.conectionservice.getVendorCategoryById(v_id)
      .subscribe(res => {
        for (let index = 0; index < res.length; index++) {
          this.venues.push(res[index]);
        }

      });
  }
  getvenue() {
    this.conectionservice.getVendors()
      .subscribe(res => {
        this.venues = res;

        for (let index = 0; index < res.length; index++) {
          this.city.push(res[index].city);
          this.area.push(res[index].area);

        }
        console.log(res);

      });
  }

}
