import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { environment } from '../../environments/environment';
import { ConnectionService } from '../services/connection.service';

declare var $: any;
@Component({
  selector: 'app-venue-grid',
  templateUrl: './venue-grid.component.html',
  styleUrls: ['./venue-grid.component.css']
})
export class VenueGridComponent implements OnInit {

  venueCategory = [];
  venues = [];
  city = [];
  area = [];
  constructor(private router: Router, private conectionservice: ConnectionService) { }

  ngOnInit() {
    $(function () {
      $('#datetimepicker12').datetimepicker({
        inline: true,
        sideBySide: true
      });
    });

    this.getvenue();
    this.getCategory();
  }

  getCategory() {
    this.conectionservice.getVenueCategory()
      .subscribe(res => {
        this.venueCategory = res;
      });
  }

  getcategoryId(id) {
    let v_id = id;
    this.conectionservice.getVenues()
      .subscribe(res => {
        for (let index = 0; index < res.length; index++) {
          this.venues.push(res[index]);
        }

      });
  }
  getvenue() {
    this.conectionservice.getVenues()
      .subscribe(res => {
        this.venues = res;

        for (let index = 0; index < res.length; index++) {
          this.city.push(res[index].city);
          this.area.push(res[index].area);

        }
        console.log(this.venues);

      });
  }


}
