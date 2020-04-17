import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  users:User[];
  displayableUsers:User[];  

  constructor(private adminSvc: AdminService) { }

  ngOnInit(): void {
    this.adminSvc.getAllUsers(data => {
      this.users = data;
      this.displayableUsers = data;
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
