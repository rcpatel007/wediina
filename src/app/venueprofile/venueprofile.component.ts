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
  selector: 'app-venueprofile',
  templateUrl: './venueprofile.component.html',
  styleUrls: ['./venueprofile.component.css']
})
export class VenueprofileComponent implements OnInit {
   id:string;
   venue:String; 
     fname:String;
    lname:String;
     cname:String;
   location:String;
address:String;
   video:[];
   image:String;
   images:[];
   area:String;
   p_area:String;
   capasity:String;
   catring:String;
   theme:String;
   time:String;
   detail:String;
   mno:String;
   parking:String;
   gst:string;
   city:String;
   desp:String;
   p_img:String;
   email:String;
   state:String;
  

  constructor(private route: ActivatedRoute,
    private spinner: NgxSpinnerService, private router: Router, private conectionservice: ConnectionService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
 

    $(document).ready(function(){
      // Add smooth scrolling to all links
      $("a").on('click', function(event) {
    
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
          // Prevent default anchor click behavior
          event.preventDefault();
    
          // Store hash
          var hash = this.hash;
    
          // Using jQuery's animate() method to add smooth page scroll
          // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 800, function(){
       
            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
          });
        } // End if
      });
    });
    this.getvenueDetail();
  }

  getvenueDetail(){
    this.spinner.show();
   
    this.conectionservice.getVenueById(this.id)
    .subscribe(res=>{
      //console.log(res );
      
     this.venue=res;
     this.fname=res.fname;
     this.lname=res.lname;
     this.mno=res.contactno;
    this.gst=res.gstno;
    this.email = res.email;
    this.parking=res.parking;
      this.image =res.image;
     this.cname=res.companyName;
     this.location=res.location;
     this.video=res.video_story;
     this.address =res.address;
     this.images=res.sub_img;
     this.city=res.city;  
     this.area=res.parking;
     this.p_area=res.parking;
     this.capasity=res.capasity_of_person;
     this.catring=res.catring;
     this.theme=res.theme_decoration;
     this.time=res.time_permission;
     this.detail=res.comment;
     this.desp=res.desp;
      //console.log(res);
      this.spinner.hide();
      
    });
    
  } 
  
  logout(){
    environment.venue_id =null;
    this.router.navigate(["/home"]);
   
  }

}
