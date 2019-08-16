import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { environment } from '../../environments/environment';
import { ConnectionService } from '../services/connection.service';
import {} from "angular-star-rating";

declare var $: any;
@Component({
  selector: 'app-venue-grid',
  templateUrl: './venue-grid.component.html',
  styleUrls: ['./venue-grid.component.css']
})
export class VenueGridComponent implements OnInit {
id:String;
  venueCategory = [];
  venues = [];
  city = [];
  area = [];
  constructor(private route: ActivatedRoute,private router: Router, private conectionservice: ConnectionService) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  
    var $star_rating = $('.star-rating .fa');

var SetRatingStar = function() {
  return $star_rating.each(function() {
    if (parseInt($star_rating.siblings('input.rating-value').val()) >= parseInt($(this).data('rating'))) {
      return $(this).removeClass('fa-star-o').addClass('fa-star');
    } else {
      return $(this).removeClass('fa-star').addClass('fa-star-o');
    }
  });
};

$star_rating.on('click', function() {
  $star_rating.siblings('input.rating-value').val($(this).data('rating'));
  return SetRatingStar();
});

SetRatingStar();
$(document).ready(function() {

});

    this.getvenue();
    // this.getCategory();
  }

  // getCategory() {
  //   this.conectionservice.getVenueCategory()
  //     .subscribe(res => {
  //       this.venueCategory = res;
  //     });
  // }

  // getcategoryId(id) {
  //   let v_id = id;
  //   this.conectionservice.getVenues()
  //     .subscribe(res => {
  //       for (let index = 0; index < res.length; index++) {
  //         this.venues.push(res[index]);
  //       }

  //     });
  // }
  getvenue() {
    this.conectionservice.getVenues()
      .subscribe(res => {
        // this.venues = res;

        for (let index = 0; index < res.length; index++) {
      
          if (res[index].venue_cat_id == this.id) {
            
            this.venues.push(res[index]);
          }
        }
        console.log(this.venues);

      });
  }


}
