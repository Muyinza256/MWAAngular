import { Component, OnInit,Input} from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-follower-item',
  templateUrl: './follower-item.component.html',
  styleUrls: ['./follower-item.component.css']
})
export class FollowerItemComponent implements OnInit {

  @Input() user:User;
  constructor(private usrSvc:UserService) { }

  ngOnInit(): void {
  }

  follow()
  {
    this.usrSvc.followUser({followerId:this.user._id},data => {
      this.user._isFollowing = true;
    },err => {
      console.log(err);
    });
  }

  unfollow()
  {
    this.usrSvc.unfollowUser({followerId:this.user._id},data => {
      this.user._isFollowing = false;
    },err => {
      console.log(err);
    });
  }

}
