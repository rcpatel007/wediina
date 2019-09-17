import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { environment } from '../../environments/environment';
import { ConnectionService } from '../services/connection.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  password:String;
  name:String;
  email:String;
  contact_no:String;
  errormsg:String;
  existuser:boolean;
  constructor(private route: ActivatedRoute,
    private spinner: NgxSpinnerService,private router: Router, private conectionservice: ConnectionService) { }

  ngOnInit() {
  }
  

  customerRegister(){
    this.spinner.show();
    this.errormsg = "";
    this.existuser = false;
      this.conectionservice.getCustomer()
        .subscribe(res=>{
          
          for (let index = 0; index < res.length; index++) {
          
            if(res[index].email == this.email){
              this.spinner.hide();
              this.existuser =true;
              alert("this Email is already exist  Please try Another....")
            }
          }
        
          if (!this.existuser) {

                  let customer ={
              name: this.name,
              contact_no:this.contact_no,
              email: this.email,
              password: this.password
            }
          this.conectionservice.addcustomer(customer)
          .subscribe(res=>{
      // console.log(res);
      this.spinner.hide();
         
      this.router.navigate(["/login"]);
      
      
      
          });            
          }
        });

  }

}
