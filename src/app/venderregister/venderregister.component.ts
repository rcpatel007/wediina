import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
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

  constructor(private route: ActivatedRoute,
    private spinner: NgxSpinnerService,private router: Router, private conectionservice: ConnectionService) { }

  ngOnInit() {
  
  
  }

}
