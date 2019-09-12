import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { environment } from '../../environments/environment';
import { ConnectionService } from '../services/connection.service';
import { NgxSpinnerService } from "ngx-spinner";
import { StarRatingComponent } from 'ng-starrating';
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
  customer:boolean;
  email:String;
  password:String;
  feedback:String;
  rat:Number;
  cname:String;
  cemail:String;
  mno:string;
  date:Date;
  person:number;
  purpose:String;
  v_email:String;

  constructor(private route: ActivatedRoute,
    private spinner: NgxSpinnerService, private router: Router, private conectionservice: ConnectionService) { }

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

this.customerfetch(); 
this.getvenueDetail();
this.fetchemail();
}

onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
  alert(`Old Value:${$event.oldValue}, 
    New Value: ${$event.newValue}, 
    Checked Color: ${$event.starRating.checkedcolor}, 
    Unchecked Color: ${$event.starRating.uncheckedcolor}`);
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
      environment.vemail =res.email;
      this.spinner.hide();
 this.customer =true;
//  this.addFeedback();
      console.log(res, 'customerdetail');

    });

}

fetchemail(){
  let id = this.id;
  this.conectionservice.getVenueById(id)
  .subscribe(res =>{
    this.v_email =res.email;

    console.log(this.v_email);
    
  });

}
sendInquiry()
{
  this.spinner.show();
  let inquiry ={
    customer_name:this.cname,
		v_email:this.v_email,
        venue_id: this.id,
        date:this.date,
        email: this.cemail,
        mobileNo: this.mno,
        no_of_person: this.person,
        purpose:this.purpose
  }

  this.conectionservice.venueInquiry(inquiry)
  .subscribe(res=>{
    console.log(res);
    this.spinner.hide();
  });
}
addFeedback(){
let review = {
  customer_id:environment.customer_id,
  venue_id: this.id,
  vendor_id: null,
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
