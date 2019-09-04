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
city:String;
  venueCategory = [];
  vendorCategory=[];
  constructor(private router: Router, private conectionservice: ConnectionService) { }

  ngOnInit() {
    $(document).ready(function () {
      $(".menu-icon").on("click", function () {
        $("nav ul").toggleClass("showing");
      });
    });

    // $("script[src='assets/css/style.css']").remove();
    // $("script[src='node_modules/bootstrap/dist/css/bootstrap.min.css']").remove();
    // $("script[src='node_modules/jquery/dist/jquery.min.js']").remove();
    // $("script[src='node_modules/bootstrap/dist/js/bootstrap.min.js']").remove();
    
    // var dynamicScripts = [
    // "assets/css/style.css",
    // "node_modules/bootstrap/dist/css/bootstrap.min.css",
    // "node_modules/jquery/dist/jquery.min.js",
    // "node_modules/bootstrap/dist/js/bootstrap.min.js"
    // ];

    // for (var i = 0; i < dynamicScripts.length; i++) {
    //   let node = document.createElement('script');
    //   node.src = dynamicScripts[i];
    //   node.type = 'text/javascript';
    //   node.async = false;
    //   node.charset = 'utf-8';
    //   document.getElementsByTagName('head')[0].appendChild(node);
    // }

    // Scrolling Effect

    $(window).on("scroll", function () {
      if ($(window).scrollTop()) {  
        $('.menu-icon').css("background","#e2e2e2 !important");
        $('nav').addClass('black').css({"box-shadow":"0px -1px 7px","z-index":"3","background":"#e2e2e2"});
        $('.city-menu').css("display","block");
        $('.logo').addClass('logo-scroll');
        $('nav ul li a').css({"color":"black","transition":"0.5s","text-shadow":"none"});
      }

      else {
        $('.logo').removeClass('logo-scroll');
        $('.menu-icon').removeAttr("style");

        $('nav').removeClass('black').removeAttr("style");
        $("nav ul li a").removeAttr("style");
        $(".city-menu").removeAttr("style");
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
