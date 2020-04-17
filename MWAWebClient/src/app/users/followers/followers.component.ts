import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { AdminService } from '../../admin/services/admin.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  users:User[];
  displayableUsers:User[];

  constructor(private adminSvc:AdminService,private usrSvc:UserService) { }

  ngOnInit(): void {
    this.usrSvc.getUserProfile(usrProfile =>{
      this.adminSvc.getAllUsers(data => {
        this.users = data;
        for(var i =0;i < this.users.length;i++)
        {
          var found: boolean = false;
          for(var f =0;f < usrProfile._following.length;f++)
          {
            if(this.users[i]._id == usrProfile._following[f].user._id)
            {
              found = true;
              break;
            }
          }
          this.users[i]._isFollowing = found;
        }
        this.displayableUsers = this.users;
      },err => {
        console.log(err);
      })
    },err => {
      console.log(err);
    })
  }

  search(event: any)
  {
    var searchInput = event.target.value;
    this.displayableUsers = searchInput? this.users.filter(usr => 
      usr._firstname.includes(searchInput) || 
      usr._lastname.includes(searchInput) || 
      usr._username.includes(searchInput)) : this.users;
  } 



}
