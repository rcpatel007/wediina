import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { environment } from '../../environments/environment';
import { ConnectionService } from '../services/connection.service';

declare var $: any;
@Component({
  selector: 'app-venue-detail',
  templateUrl: './venue-detail.component.html',
  styleUrls: ['./venue-detail.component.css']
})
export class VenueDetailComponent implements OnInit {
  id:String;
  venue=[];
  name:String;
  location:String;
  video=[];
  images:any;
  area:String;
  p_area:String;
  capasity:String;
  catring:String;
  theme:String;
  time:String;
  detail:String;
  playvideo:String;
  constructor(private route: ActivatedRoute,
    private router: Router, private conectionservice: ConnectionService) { }

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

  $('#mainvideomodel').click(function() {
  //  alert('hey'); 
    $("#videopopup").attr("src","");
  });
  
});  //   $('#myModal').on('hidden.bs.modal', function () {
  //     callPlayer('yt-player', 'stopVideo');
  // });
 
this.getvenueDetail();
}




getvenueDetail(){
  this.conectionservice.getVenueById(this.id)
  .subscribe(res=>{
   this.venue=res;
   this.name=res.companyName;
   this.location=res.location;
   this.video=res.video_story;
   this.images=res.sub_img;
   this.area=res.parking;
   this.p_area=res.parking;
   this.capasity=res.capasity_of_person;
   this.catring=res.catring;
   this.theme=res.theme_decoration;
   this.time=res.time_permission;
   this.detail=res.comment;
   
    console.log(res);
    
  });
  
} 

  
getvideo(v){
  this.playvideo = v;
  $("#videopopup").attr("src",v);
  console.log(this.playvideo);
}
}
