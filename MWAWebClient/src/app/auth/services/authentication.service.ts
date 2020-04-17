import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { User } from '../../models/User';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  url:string = environment.apiUrl;
  public loggedInUser:User;

  constructor(private http:HttpClient) { }

  loginUser(user,callback,failCallback){
    const url = `${this.url}users/api/login`;
    this.http.post<User>(url,user,this.getDefaultHeaders()).subscribe(usr => {
      this.loggedInUser = usr;
      callback(usr);
    },
    err => {
      failCallback(err);
    });    
  }

  public getDefaultHeaders(){
    return {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    };
  }

  public getAuthorisationHeaders(){
    return{
      headers: new HttpHeaders(
        {'Content-Type':'application/json','Authorisation':this.loggedInUser._tokens[0]}
        )
    };
  }

  public getBlobAuthorisationHeaders(){
    return{
      headers: new HttpHeaders(
        {'Content-Type':'application/octet-stream','Authorisation':this.loggedInUser._tokens[0]}
        )
    };
  }

  public getEmptyAuthorisationHeaders(){
    return{
      headers: new HttpHeaders(
        {'Authorisation':this.loggedInUser._tokens[0]}
        )
    };
  }

  signUpUser(user,callback,failCallback){
    const url = `${this.url}users/api/create`;
    this.http.post<User>(url,user,this.getDefaultHeaders()).subscribe(usr => {
      this.loggedInUser = usr;
      callback(usr);
    },
    err => {
      failCallback(err);
    });    
  }
}
