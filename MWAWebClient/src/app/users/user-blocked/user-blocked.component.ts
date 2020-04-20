import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { User } from '../../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-blocked',
  templateUrl: './user-blocked.component.html',
  styleUrls: ['./user-blocked.component.css']
})
export class UserBlockedComponent implements OnInit {

  user:User;
  blockingReason:string;
  constructor(private usrSvc: UserService,private authSvc:AuthenticationService,private router: Router) { }

  ngOnInit(): void {
    this.user = this.authSvc.loggedInUser;
  }

  submitRequest()
  {
    if(!this.blockingReason)
    {
      alert('Please put a reason');
    }
    var req = {"_unblockText":this.blockingReason};
    this.usrSvc.submitUnblockingRequest(req,(data) => {
      alert('Request submitted successfully');
    },err => {
      alert(err.error.message);
    })
  }

  logOut()
  {
    this.authSvc.loggedInUser = null;
    this.router.navigate(['']);
  }

}
