import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService} from '../../../auth/services/authentication.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user:User;
  constructor(private authService:AuthenticationService,private router: Router) { }

  ngOnInit(): void {
    this.user = this.authService.loggedInUser;
  }

  logOut()
  {
    this.authService.loggedInUser = null;
    this.router.navigate(['']);
  }

}
