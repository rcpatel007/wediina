import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { environment } from '../../environments/environment';
import { ConnectionService } from '../services/connection.service';

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

  constructor(private route: ActivatedRoute,
    private router: Router, private conectionservice: ConnectionService) { }

  ngOnInit() {
  }
  

  customerRegister(){
      let customer ={
        name: this.name,
        contact_no:this.contact_no,
        email: this.email,
        password: this.password
      }
    this.conectionservice.addcustomer(customer)
    .subscribe(res=>{
console.log(res);

    this.router.navigate['/login']

 


    });
  }

}
