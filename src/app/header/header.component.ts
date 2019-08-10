import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { environment } from '../../environments/environment';
import { ConnectionService } from '../services/connection.service';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  venueCategory = [];
  vendorCategory=[];
  constructor(private router: Router, private conectionservice: ConnectionService) { }

  ngOnInit() {
    $(document).ready(function () {
      $(".menu-icon").on("click", function () {
        $("nav ul").toggleClass("showing");
      });
    });

    // Scrolling Effect

    $(window).on("scroll", function () {
      if ($(window).scrollTop()) {
        $('nav').addClass('black').css({"box-shadow":"0px -1px 7px","z-index":"1"});
        $('.logo').addClass('logo-scroll');
        $('nav ul li a').css({"color":"black","transition":"0.5s","text-shadow":"none"});
      }

      else {
        $('.logo').removeClass('logo-scroll');
        $('nav').removeClass('black').removeAttr("style");
        $("nav ul li a").removeAttr("style")
        // $('').removeClass('text-black');

      }
    })

this.getvendorCategory();
    this.getvenueCategory();
  }

  getvendorCategory() {
    this.conectionservice.getVendorCategory()
      .subscribe(res => {
        this.vendorCategory = res;
        console.log(this.vendorCategory,'vnedor');
        
      });
  }

  
  getvenueCategory() {
    this.conectionservice.getVenueCategory()
      .subscribe(res => {
        this.venueCategory = res;
        console.log(this.venueCategory,'venue');
        
      });
  }
}
