import { Component, OnInit,Input } from '@angular/core';
import { User } from '../../models/User';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-manage-users-item',
  templateUrl: './manage-users-item.component.html',
  styleUrls: ['./manage-users-item.component.css']
})
export class ManageUsersItemComponent implements OnInit {

  @Input() user:User;
  constructor(private adminSvc: AdminService) { }

  ngOnInit(): void {
    
  }

  deactivate(){
    this.adminSvc.deactivateUser({userId:this.user._id},data => {
      this.user = data;
    },err => {
      console.log(err);
    });
  }

  activate(){
    this.adminSvc.activateUser({userId:this.user._id},data => {
      this.user = data;
    },err => {
      console.log(err);
    });
  }

}
