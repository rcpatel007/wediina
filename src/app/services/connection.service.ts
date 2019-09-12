import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import {map} from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private http: Http) { }


//  imgur API

imgurImage(base64){
  let headers = new Headers({'Authorization': 'Client-ID e22c18840a29adc'});
  headers.append('Accept', 'application/json');
  return this.http.post('https://api.imgur.com/3/image',base64, {headers: headers})
  .pipe(map( res => res.json()));
   

}

imgurotherImage(otherbase64){
  let headers = new Headers({'Authorization': 'Client-ID e22c18840a29adc'});
  headers.append('Accept', 'application/json');
  // headers.append('authorization', 'e22c18840a29adc');
  return this.http.post('https://api.imgur.com/3/image',otherbase64, {headers: headers})
  .pipe(map( res => res.json()));

}

// home ads

  getHomeads() {
    //  headers = new Headers();    
      return this.http.get(environment.api_url + '/home_ads')
      .pipe(map( res => res.json()));
  
  }

  // home slider image

  gethomeslider() {
    //  headers = new Headers();    
      return this.http.get(environment.api_url + '/home_slider')
      .pipe(map( res => res.json()));
  
  }
  
/******************************** */
// venue


venueLogin(venue_login){
  // let headers = new Headers();
  return this.http.post(environment.api_url + '/venueLogin/',venue_login)
   .pipe(map( res => res.json()));

}

getVenueCategory() {
  //  headers = new Headers();    
    return this.http.get(environment.api_url + '/venue_cat')
    .pipe(map( res => res.json()));

}

// get Product by id

getVenueCategoryById(id) {
  //  headers = new Headers();    
    return this.http.get(environment.api_url + '/venue_cat/' +id)
    .pipe(map( res => res.json()));

}

getVenues() {
  //  headers = new Headers();    
    return this.http.get(environment.api_url + '/venue')
    .pipe(map( res => res.json()));

}

// get Product by id

getVenueById(id) {
  //  headers = new Headers();    
    return this.http.get(environment.api_url + '/venue_by_id/' +id)
    .pipe(map( res => res.json()));

}

// add product

addVenue(venue) {    
   return this.http.post(environment.api_url + '/newvenue/',venue)
    .pipe(map( res => res.json()));

}

// edit product

editVenue(id,updateVenue) {
return this.http.put(environment.api_url + '/venue_update/'+id, updateVenue)
.pipe(map( res => res.json()));

}


venueBookindDate(id, updatedate) {
  return this.http.put(environment.api_url + '/venue_bookdate/'+id, updatedate)
    .pipe(map( res => res.json()));
  
  }
  
  
venueInquiry(vinquiry) {    
  return this.http.post(environment.api_url + '/venue_inquiry',vinquiry)
   .pipe(map( res => res.json()));

}
/******************************************************* */

// vendor


vendorLogin(vendor){
  return this.http.post(environment.api_url + '/vendorLogin',vendor)
   .pipe(map( res => res.json()));

}
getVendorCategory() {
  //  headers = new Headers();    
    return this.http.get(environment.api_url + '/vendor_cat')
    .pipe(map( res => res.json()));

}

// get Product by id

getVendorCategoryById(id) {
  //  headers = new Headers();    
    return this.http.get(environment.api_url + '/vendor_cat/' +id)
    .pipe(map( res => res.json()));

}


getVendors() {
  //  headers = new Headers();    
    return this.http.get(environment.api_url + '/vendor')
    .pipe(map( res => res.json()));

}

// get Product by id

getVendorById(id) {
  //  headers = new Headers();    
    return this.http.get(environment.api_url + '/vendor_by_id/' +id)
    .pipe(map( res => res.json()));

}

// add product

addVendor(vendor) {    
   return this.http.post(environment.api_url + '/newVendor/',vendor)
    .pipe(map( res => res.json()));

}

vendorInquiry(vinquiry) {    
  return this.http.post(environment.api_url + '/venue_inquiry/',vinquiry)
   .pipe(map( res => res.json()));

}

  editVendor(id, updateVendor) {
return this.http.put(environment.api_url + '/vendor_update/'+id, updateVendor)
  .pipe(map( res => res.json()));

}
vendorBookindDate(id, updatedate) {
  return this.http.put(environment.api_url + '/vendor_bookdate/'+id, updatedate)
    .pipe(map( res => res.json()));
  
  }
  

// ***********************************************************
// Customer
// **************************************************************


addcustomer(customer) {    
  return this.http.post(environment.api_url + '/new_customer/',customer)
   .pipe(map( res => res.json()));

}



customerLogin(customer){
  // let headers = new Headers;
  //  headers.append('Access-Control-Allow-Origin',' *');
  // headers.append('Access-Control-Allow-Methods',' GET, POST, PATCH, PUT, DELETE, OPTIONS');
  // headers.append('Access-Control-Allow-Headers','Origin, Content-Type, X-Auth-Token');
  return this.http.post(environment.api_url + '/customerLogin/',customer)
   .pipe(map( res => res.json()));

}


getCustomerById(id) {
  //  headers = new Headers();    
    return this.http.get(environment.api_url + '/customer/' +id)
    .pipe(map( res => res.json()));

}

getCustomer() {
  //  headers = new Headers();    
    return this.http.get(environment.api_url + '/customer')
    .pipe(map( res => res.json()));

}

// add product

// edit product

editCustomer(id,updateVenue) {
return this.http.put(environment.api_url + '/customer/'+id, updateVenue)
.pipe(map( res => res.json()));

}
/*********************************************************************** */
// review
/********************************************************** */


getreviewById(id) {
  //  headers = new Headers();    
    return this.http.get(environment.api_url + '/review/' +id)
    .pipe(map( res => res.json()));

}


getreview() {
  //  headers = new Headers();    
    return this.http.get(environment.api_url + '/review')
    .pipe(map( res => res.json()));

}

// get Product by id

getreviewId(id) {
  //  headers = new Headers();    
    return this.http.get(environment.api_url + '/review/' +id)
    .pipe(map( res => res.json()));

}

// add product

addreview(review) {   
  let headers = new Headers;
   headers.append('Access-Control-Allow-Origin',' *');
  headers.append('Access-Control-Allow-Methods',' GET, POST, PATCH, PUT, DELETE, OPTIONS');
  headers.append('Access-Control-Allow-Headers','Origin, Content-Type, X-Auth-Token'); 
   return this.http.post(environment.api_url + '/review',review,{headers :headers})
    .pipe(map( res => res.json()));

}


getcity() {
  
  //  headers = new Headers();    
    return this.http.get(environment.api_url + '/city')
    .pipe(map( res => res.json()));
}
}
