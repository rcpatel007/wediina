import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { environment } from '../../environments/environment';
import { ConnectionService } from '../services/connection.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  email:string;
  password:string;



  constructor(private route: ActivatedRoute,
    private router: Router, private conectionservice: ConnectionService,
    private spinner: NgxSpinnerService) { }



  ngOnInit() {
  }

customer(){

  let customer ={
    email:this.email,
    password:this.password
  }

  console.log(customer);
  
  this.conectionservice.customerLogin(customer)
    .subscribe(res=>{
      console.log(res,'customerdetail');
      
    });




}


}
