import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { environment } from '../../environments/environment';
import { ConnectionService } from '../services/connection.service';
import { NgxSpinnerService } from "ngx-spinner";
import { IMyDpOptions } from 'mydatepicker';

declare var $: any;

@Component({
  selector: 'app-venueprofile',
  templateUrl: './venueprofile.component.html',
  styleUrls: ['./venueprofile.component.css']
})
export class VenueprofileComponent implements OnInit {
   id:string;
   venue_cat_id:String;
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
   package:boolean;
   videolink:String;
   password:String;
   base64:string;
   bookingdate= [];
   status:boolean;
   prime:boolean;
   weblink:String;
   oimg=[];
   otherbase64:String;
   inquiry= [];
   date:String;
   cpwd:String;
   confirmpwd:String;
   npwd:String;
   pwderror:String;
   pwdsucess:String;
   public myDatePickerOptions: IMyDpOptions = {
    // other options...

    dateFormat: 'dd/mm/yyyy',
};


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
    this.getInquiry();
  
  }

  getvenueDetail(){
    this.spinner.show();
   
    this.conectionservice.getVenueById(this.id)
    .subscribe(res=>{
      //console.log(res );
      this.venue_cat_id=res.venue_cat_id
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
     this.bookingdate = res.bookingdate;
     this.desp=res.desp;
     this.password=res.password;
     this.videolink= res.video;
     this.package = res.package;
      //console.log(res);
      this.spinner.hide();
    
      console.log(res);
      
    });
  } 
  
    /* Image convert base64 */
    imageUpload(evt) {
      this.spinner.show();
      var files = evt.target.files;
      var file = files[0];
      if (files && file) {
        
        var reader = new FileReader();
  
        reader.onload = this.imagetoBase64.bind(this);
        reader.readAsBinaryString(file);
        
      }
    }
  
    imagetoBase64(readerEvt) {
      var binaryString = readerEvt.target.result;
      this.base64 = btoa(binaryString);
        // console.log(this.base64);
        
      // console.log(btoa(binaryString));
      this.conectionservice.imgurImage(this.base64)
        .subscribe((result) => {
          console.log(result);
          this.p_img = result.data.link;
          this.spinner.hide();
  
        });
  
    }
    /*add or remove input tag*/
    otherImageUpload(event) {
      this.spinner.show();

      let files = [].slice.call(event.target.files);
      // console.log(files);
      // input = files.map(f => f.name).join(', ');
      for (let i = 0; i < files.length; i++) {
        if (files) {
          var reader = new FileReader();
          reader.onload = this.otherimagetoBase64.bind(this);
          reader.readAsBinaryString(files[i]);
        }
      }
    }
  
    otherimagetoBase64(readeEvent) {
      var binaryString = readeEvent.target.result;
      this.otherbase64 = btoa(binaryString);
      // console.log(btoa(binaryString));
      this.conectionservice.imgurotherImage(this.otherbase64)
        .subscribe((result) => {
          console.log(result);
          this.oimg.push(result.data.link);
          console.log(this.oimg);
          this.spinner.hide();
  
        });
      // console.log(this.oimg);
    }
  

  editDetail(){

//  let video = this.videolink.split(",");
    // console.log(video);
  //  
    this.spinner.show();
   

    let venue={
      venue_cat_id:this.venue_cat_id,
      package:this.package,
      fname: this.fname,
      lname:this.lname,
      status:this.status,
      companyName: this.cname,
      contactno: this.mno,
      email: this.email,
      gstno: this.gst,
      image:this.p_img,
      sub_images:this.oimg,
      password: this.password,
      address:this.address,
      city: this.city,
      area: null,
      state: null,
      video_story:this.videolink,
      desp:this.desp,
      bookingdate:this.bookingdate,
      weblink:this.weblink, 
      prime_user:this.prime    
    }

        console.log(venue);
        
    this.conectionservice.editVenue(this.id,venue)
    .subscribe(res=>{
      //console.log(res );
      
      //console.log(res);
      this.spinner.hide();
      
    });
    
  }

  logout(){
    localStorage.removeItem('venue_id');
    this.router.navigate(["/home"]);
   
  }

  bookingDate(date){
this.spinner.show();
    this.bookingdate.push(date.formatted);

    let booking ={
      bookingdate:this.bookingdate
    }
    console.log(this.bookingdate);
    
    this.conectionservice.venueBookindDate(this.id, booking)
    .subscribe(res=>{

    console.log(res);
    
    this.getvenueDetail();
    
this.spinner.hide();
});

  }

  deleteDate(i){

this.bookingdate.splice(i,1);

console.log(this.bookingdate);

    // this.bookingdate.push(this.date);

    let booking ={
      bookingdate:this.bookingdate
    }
    console.log(this.bookingdate);
    
    this.conectionservice.venueBookindDate(this.id, booking)
    .subscribe(res=>{

    console.log(res);
    
    this.getvenueDetail();
    });

  }



  getInquiry(){

    this.conectionservice.getVenueInquiryById(this.id)
    .subscribe(res=>{
this.inquiry =res;
      console.log(this.inquiry);
      
    });
 
  }


  changePassword() {
    let id = localStorage.venue_id;
    let validate_pwd = {
      id: localStorage.venue_id,
      password: this.cpwd
    }
    console.log(validate_pwd);

    this.conectionservice.validatevenuepwd(id,validate_pwd)
      .subscribe((res) => {
        console.log(res);
        if (res.auth == true) {
          // console.log(this.npwd);
          // console.log(this.confirmpwd);
          if (this.npwd == this.confirmpwd) {
            let upwd = {
              password: this.npwd
            }
            console.log(upwd);

            this.conectionservice.updatevenuepwd(id, upwd)
              .subscribe((res) => {
                
                this.pwderror = null;
                this.pwdsucess = "password Update Sucessfully"
                console.log(res);

              });
          }
          else {
            this.pwdsucess = null;
            this.pwderror = "New Password & Confirm password not match";
            // console.log(this.pwderror);
          }
        }
      },
        (error) => {

          this.pwdsucess = null;
          this.pwderror = "Current Password is Wrong";
          // console.log(error._body);
        }
      );
  }

}
