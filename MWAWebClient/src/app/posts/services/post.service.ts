import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/User';
import { AuthenticationService } from '../../auth/services/authentication.service';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  url:string = environment.apiUrl;
  constructor(private authService: AuthenticationService,private http:HttpClient) { }

  uploadPostImage(postId,image,callback,failback)
  {
    const url = `${this.url}posts/api/upload?postId=${postId}`;
    var headers = this.authService.getEmptyAuthorisationHeaders();
    this.http.post<User>(url,image,headers).subscribe(data => {
      callback(data);
    },err => {
      failback(err);
    })
  }

  downloadPostImage(imageId,callback,failback)
  {
    const url = `${this.url}users/api/download?fileName=${imageId}`;
    var headers = this.authService.getBlobAuthorisationHeaders();
    headers['responseType'] = 'blob';
    this.http.get(url,headers).subscribe(blob =>{
      callback(blob);
    },err => {
      failback(err);
    })
  }

  getPosts(offset,limit,search,callback,errCallback)
  {
    const url = `${this.url}posts/api/get?offset=${offset}&limit=${limit}&search=${search}`;
    this.http.get(url,this.authService.getAuthorisationHeaders()).subscribe(posts => {
      callback(posts);
    },err => {
      errCallback(err);
    })
  }

  createPost(post,callback,errCallback)
  {
    const url = `${this.url}posts/api/create`;
    this.http.post(url,post,this.authService.getAuthorisationHeaders()).subscribe(data => {
      callback(data);
    },err => {
      errCallback(err);
    })
  }

  likePost(data,callback,errCallback)
  {
    const url = `${this.url}posts/api/like`;
    this.http.post(url,data,this.authService.getAuthorisationHeaders()).subscribe(data => {
      callback(data);
    },err => {
      errCallback(err);
    })
  }

  unlikePost(data,callback,errCallback)
  {
    const url = `${this.url}posts/api/unlike`;
    this.http.post(url,data,this.authService.getAuthorisationHeaders()).subscribe(data => {
      callback(data);
    },err => {
      errCallback(err);
    })
  }

  addComment(data,callback,errCallback)
  {
    const url = `${this.url}posts/api/comment`;
    this.http.post(url,data,this.authService.getAuthorisationHeaders()).subscribe(data => {
      callback(data);
    },err => {
      errCallback(err);
    })
  }

  removeComment(data,callback,errCallback)
  {
    const url = `${this.url}posts/api/unComment`;
    this.http.post(url,data,this.authService.getAuthorisationHeaders()).subscribe(data => {
      callback(data);
    },err => {
      errCallback(err);
    })
  }

  unCensurePost(postId,callback,errCallback)
  {
    const url = `${this.url}posts/api/unCensure?id=${postId}`;
    this.http.put(url,{},this.authService.getAuthorisationHeaders()).subscribe(data => {
      callback(data);
    },err => {
      errCallback(err);
    })
  }
}
