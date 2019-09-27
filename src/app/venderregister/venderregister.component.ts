import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkWithHref, RouterEvent } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { environment } from '../../environments/environment';
import { ConnectionService } from '../services/connection.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-venderregister',
  templateUrl: './venderregister.component.html',
  styleUrls: ['./venderregister.component.css']
})
export class VenderregisterComponent implements OnInit {

  vendorCategory=[];
  mno:String;
  cname:String;
  // name:String;
  email:String;
  city:String;
  password:String;
  cmt:String;
  catvalue:String;
  vendor_category =new Array;
  fname:String;
  lname:String;
  // cname:String;
  cno:Number;
  // email:String;
  pwd:String;
  cpwd:String;
  catValue:String;
  // cpwd:String;
  error:string;
  // package:String;
  // gstno:String;
  // area:String;
  // city:String;
  state:String;
  address:String;
  p_img:String;
  oimg= new Array;
  o_img:any;
  // location:String;
  desp:String;
  // videolink:any;
  status = true;
  base64: any;
  otherbase64: any;
  

  
  cityarray=[];
  constructor(private route: ActivatedRoute,
    private spinner: NgxSpinnerService,private router: Router, private conectionservice: ConnectionService) { }

  ngOnInit() {
    this.getvendorCategory(); 
  this.getcity();
  }

  getvendorCategory() {
    this.conectionservice.getVendorCategory()
      .subscribe(res => {
        this.vendorCategory = res;
        //console.log(this.vendorCategory,'vnedor');
        
      });
  }

  getcity() {
    this.conectionservice.getcity()
      .subscribe(res => {
        this.cityarray = res;
        //console.log(res);

      });
  }

  
  /* Image convert base64 */
  imageUpload(evt) {
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

      });

  }
  /*add or remove input tag*/
  otherImageUpload(event) {
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

      });
    // console.log(this.oimg);
  }



  Venderadd(){
    // let video = this.videolink.split(",");
    // console.log(video);
    // let name = this.name.split(" ");
    if (this.password == this.cpwd) {
      
      this.spinner.show();
      this.error = "";
      // this.existuser = false;

  this.spinner.show();
  
  
    let vendor={
      vendor_cat_id:this.catvalue,
      fname: this.fname,
      lname:this.lname,
      package:null,
      status:false,
      companyName: this.cname,
      contactno: this.mno,
      email: this.email,
      gstno: null,
      image:null,
      sub_images:[],
      password: this.password,
      address:null,
      city: this.city,
      area: null,
      state: null,
      video_story:[],
      desp:this.desp,
      bookingdate:[],
      weblink:null,
      prime_user:false 
        }

        console.log(vendor);
        
          this.conectionservice.addVendor(vendor)
          .subscribe(res=>{
            console.log(vendor);
        this.spinner.hide();
        
            this.router.navigate(["/login"]);
              vendor_cat_id:this.catvalue,
      this.fname =null;
      this.lname =null;
       this.cname =null;
       this.mno =null;
       this.email =null;
       this.password =null;
       this.city =null;
      this.desp =null;

          });
        }
        else{
          this.error =" password not match"
        }
        

    }
  
  

}
