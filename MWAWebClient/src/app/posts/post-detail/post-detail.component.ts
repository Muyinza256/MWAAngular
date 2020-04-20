import { Component, OnInit,Input } from '@angular/core';
import { PostService } from '../services/post.service';
import { UserService } from '../../users/services/user.service';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { User} from '../../models/User';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  @Input() post:any;
  isPostDetailImageReady:boolean = false;
  postDetailImageToShow:any;
  userLike:any;
  postDetailComment:string;
  loggedInUser:User;

  constructor(private pstSvc:PostService,private usrSvc:UserService,private authSvc:AuthenticationService) { }

  ngOnInit(): void {
    this.loggedInUser = this.authSvc.loggedInUser;
    if(this.post._images.length > 0)
    {
      this.displayImage(this.post._images[0]);
    }
    this.userLike = this.post._likes.find(like => like.user._id == this.authSvc.loggedInUser._id);
  }

  displayImage(imageId:string)
  {
    this.usrSvc.getUserImage(imageId,(imageBlob) => {
      this.renderImage(imageBlob);
    },
    err => {
      console.log(err);
      alert('Failed to download image');
    })
  }

  renderImage(imageBlob)
  {
    let reader = new FileReader();
      reader.addEventListener("load", () => {
        this.postDetailImageToShow = reader.result;
      },false);

      if(imageBlob)
      {
        reader.readAsDataURL(imageBlob);
        this.isPostDetailImageReady = true;
      }
  }

  likePost()
  {
    this.pstSvc.likePost({"_postId":this.post._id},(data) => {
      this.post = data;
      this.userLike = this.post._likes.find(like => like.user._id == this.authSvc.loggedInUser._id);
    },err => {
      alert('Failed to like post');
    })
  }

  unlikePost()
  {
    var input = {"_postId":this.post._id,"_likeId":this.userLike._id};
    this.pstSvc.unlikePost(input,(data) => {
      this.userLike = null;
      this.post = data;
    },err => {
      alert('Failed to unlike post');
    })
  }

  addComment()
  {
    if(!this.postDetailComment)
    {
      alert('Please input a comment');
      return;
    }
    var comment = {"_postId":this.post._id,"_comment":this.postDetailComment};
    this.pstSvc.addComment(comment,(data) => {
      this.post = data;
      this.postDetailComment = null;
    },err => {
      alert('Failed to add comment');
    })
  }

  uncensurePost()
  {
    this.pstSvc.unCensurePost(this.post._id,data => {
      this.post = data
    },err => {
      alert('Failed to uncensure post');
    })
  }

}
