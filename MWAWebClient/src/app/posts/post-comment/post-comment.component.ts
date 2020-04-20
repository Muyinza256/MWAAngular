import { Component, OnInit,Input } from '@angular/core';
import { PostService } from '../services/post.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css']
})
export class PostCommentComponent implements OnInit {

  @Input() loggedInUser:User
  @Input() parentPost:any;
  @Input() postComments:any;
  constructor(private pstSvc:PostService) { }

  ngOnInit(): void {
  }

  removeComment(commentId)
  {
    var data = {"_postId": this.parentPost._id,"_commentId":commentId};
    this.pstSvc.removeComment(data,(rslt) => {
      this.postComments = this.postComments.filter(c => c._id != commentId);
    },err => {
      alert("Failed to remove comment");
    })
  }

}
