import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/User';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  url:string = environment.apiUrl;
  constructor(private authService: AuthenticationService,private http:HttpClient) { }

  getAllUsers(callback,failCallback)
  {
    const url = `${this.url}users/api/all`;
    this.http.get<User[]>(url,this.authService.getAuthorisationHeaders()).subscribe(users => {
      callback(users);
    },err =>{
      failCallback(err);
    })
  }

  activateUser(user,callback,failCallback)
  {
    const url = `${this.url}users/api/activateUser`;
    this.http.post<User>(url,user,this.authService.getAuthorisationHeaders()).subscribe(user => {
      callback(user);
    },err => {
      failCallback(err);
    })
  }

  deactivateUser(user,callback,failCallback)
  {
    const url = `${this.url}users/api/deactivateUser`;
    this.http.post<User>(url,user,this.authService.getAuthorisationHeaders()).subscribe(user => {
      callback(user);
    },err => {
      failCallback(err);
    })
  }
}
