import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { environment } from '../../environments/environment';
import { ConnectionService } from '../services/connection.service';

@Component({
  selector: 'app-vender-detail',
  templateUrl: './vender-detail.component.html',
  styleUrls: ['./vender-detail.component.css']
})
export class VenderDetailComponent implements OnInit {

  id:String;
  address:String;
  area:String;
  companyName:String;
  contactno:String;
  detail:String;
  video=[];
  sub_images =[];


  constructor(private route: ActivatedRoute,
    private router: Router, private conectionservice: ConnectionService) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  this.getvendor();
  }


  getvendor(){

    this.conectionservice.getVendorById(this.id)
    .subscribe(res =>{
      this.address= res.address;
      this.area=this.area;
      this.companyName= res.companyName;
      this.contactno= res.contactno;
      this.detail= res.desp;
      this.video=res.video_story;
      this.sub_images =res.sub_images;
    
  
      console.log(res);
        
      
    });
  }


}
