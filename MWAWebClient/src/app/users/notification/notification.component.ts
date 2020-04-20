import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  userNotifications:any[];
  allNotifications:any[];
  selectedPost:any;
  constructor(private usrSvc:UserService) { }

  ngOnInit(): void {
    this.usrSvc.getUserProfile(usr => {
      this.allNotifications = usr._notifications;
      this.userNotifications = this.allNotifications.filter(not => !not.seen);
    },err => {
      alert('failed to get user notifications');
    })
  }

  viewNotification(notificationId)
  {
    this.usrSvc.viewNotification(notificationId,(post) => {
      this.selectedPost = post;
    },err => {
      alert("Failed to get notification details, try again");
    });
  }

}
