import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/User';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url:string = environment.apiUrl;
  
  constructor(private authService: AuthenticationService,private http:HttpClient) { }

  getUserProfile(callback,failCallback){
    const url = `${this.url}users/api/profile`;
    this.http.get<User>(url,this.authService.getAuthorisationHeaders()).subscribe(usr => {
      callback(usr);
    },err =>{
      failCallback(err);
    })
  }

  getUserImage(imageId,callback,failback){
    const url = `${this.url}users/api/download?fileName=${imageId}`;
    var headers = this.authService.getBlobAuthorisationHeaders();
    headers['responseType'] = 'blob';
    this.http.get(url,headers).subscribe(blob =>{
      callback(blob);
    },err => {
      failback(err);
    })
  }

  uploadUserImage(image,callback,failback)
  {
    const url = `${this.url}users/api/upload`;
    var headers = this.authService.getEmptyAuthorisationHeaders();
    this.http.post<User>(url,image,headers).subscribe(data => {
      callback(data);
    },err => {
      failback(err);
    })
  }

  followUser(follower,callback,failCallback)
  {
    const url = `${this.url}users/api/followUser`;
    this.http.post<User>(url,follower,this.authService.getAuthorisationHeaders()).subscribe(user => {
      callback(user);
    },err => {
      failCallback(err);
    })
  }

  saveUserChanges(user,callback,failCallback)
  {
    const url = `${this.url}users/api/edit`;
    this.http.put<User>(url,user,this.authService.getAuthorisationHeaders()).subscribe(data => {
      callback(data);
    },err => {
      failCallback(err);
    })
  }

  unfollowUser(follower,callback,failCallback)
  {
    const url = `${this.url}users/api/unFollowUser`;
    this.http.post<User>(url,follower,this.authService.getAuthorisationHeaders()).subscribe(user => {
      callback(user);
    },err => {
      failCallback(err);
    })
  }

  viewNotification(id,callback,failback)
  {
    const url = `${this.url}users/api/viewNotification?notificationId=${id}`;
    this.http.get(url,this.authService.getAuthorisationHeaders()).subscribe(post => {
      callback(post);
    },err =>{
      failback(err);
    })
  }

  submitUnblockingRequest(req,callback,failCallback)
  {
    const url = `${this.url}users/api/requestUnblock`
    this.http.post(url,req,this.authService.getAuthorisationHeaders()).subscribe(post => {
      callback(post);
    },err =>{
      failCallback(err);
    })
  }
}
