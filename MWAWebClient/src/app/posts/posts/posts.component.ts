import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { User} from '../../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  offset:number = 0;
  limit:number = 5;
  postSearchName:string;
  isPostImageReady:boolean = false;
  
  postImageToShow:any;
  postImageSelected:File;

  _posts:any[];
  postText:string;
  loggedInUser:User;

  postTargetAge:string;
  postTargetZip:string;
  postTargetStreet:string;
  postTargetState:string;
   
  constructor(private pstSvc:PostService,private authSvc:AuthenticationService,private router: Router) { 
  }

  onImageSelect(event)
  {
    this.postImageSelected = event.target.files[0];
    this.renderImage(this.postImageSelected);
  }

  renderImage(imageBlob)
  {
    let reader = new FileReader();
      reader.addEventListener("load", () => {
        this.postImageToShow = reader.result;
      },false);

      if(imageBlob)
      {
        reader.readAsDataURL(imageBlob);
        this.isPostImageReady = true;
      }
  }

  getPostSubmissionFormData()
  {
    var data:any = {};
    data._text = this.postText;
    data._isTargeted = false;
    var targettedAudience:any = {};
    if(this.postTargetAge)
    {
      data._isTargeted = true;
      targettedAudience.age = this.postTargetAge;
    }
    if(this.postTargetState)
    {
      data._isTargeted = true;
      targettedAudience.state = this.postTargetState;
    }
    if(this.postTargetStreet)
    {
      data._isTargeted = true;
      targettedAudience.street = this.postTargetStreet;
    }
    if(this.postTargetZip)
    {
      data._isTargeted = true;
      targettedAudience.zip = this.postTargetZip;
    }
    data._targetedAudience = targettedAudience;
    return data;
  }

  submitPost()
  {
    if(!this.postText)
    {
      alert('Please insert text');
      return;
    }
    this.pstSvc.createPost(      
      this.getPostSubmissionFormData(),
      (data) => {
        if(this.postImageToShow)
        {
          this.uploadPostImage(data._id,(data) => {
            this.clearInputs();
            this.loadPosts();
          },err => {
            alert('Failed to upload image');
            this.loadPosts();
          })
        }
        else
        {
          this.clearInputs();
            this.loadPosts();
        }
      },err => {
        alert('Failed to create post');
      });
  }

  clearInputs(){
    this.isPostImageReady = false;
    this.postImageToShow = null;
    this.postText = null;
    this.postTargetAge = null;
    this.postTargetState = null;
    this.postTargetZip = null;
    this.postTargetStreet = null;
  }

  uploadPostImage(postId,callback,failcallback)
  {
    const uploadData = new FormData();
    uploadData.append('image', this.postImageSelected);
    this.pstSvc.uploadPostImage(postId,uploadData,(data) => {      
      callback(data);
    },err => {
      failcallback(err);
    })
  }

  ngOnInit(): void {
    this.loggedInUser = this.authSvc.loggedInUser;
    this.loadPosts();
  }

  loadPosts()
  {
    this.pstSvc.getPosts(this.offset,this.limit,"",(data) => {
      this._posts = data;
    },err => {
      console.log(err);
      alert("Failed to load posts, please try again");
    })
  }

  searchPosts()
  {
    if(this.postSearchName)
    {
      this.pstSvc.getPosts(this.offset,this.limit,this.postSearchName,(data) => {
        this._posts = data;
      },err => {
        console.log(err);
        alert("Failed to load posts, please try again");
      })
    }
    else
    {
      alert('Please insert something to search');
    }
  }

  showAllPosts()
  {
    this.pstSvc.getPosts(this.offset,this.limit,"",(data) => {
      this.postSearchName = null;
      this._posts = data;
    },err => {
      alert("Failed to load posts, please try again");
    })
  }

  showMore()
  {
    this.limit += 5;
    this.pstSvc.getPosts(this.offset,this.limit,"",(data) => {
      this._posts = data;
    },err => {
      console.log(err);
      alert("Failed to load posts, please try again");
    })
  }

}
