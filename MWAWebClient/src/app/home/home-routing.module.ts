import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostsComponent } from '../posts/posts/posts.component';
import { ProfileComponent } from '../users/profile/profile.component';
import { NotificationComponent } from '../users/notification/notification.component';
import { FollowersComponent } from '../users/followers/followers.component';
import { ManageUsersComponent } from '../admin/manage-users/manage-users.component';
import { ManageWordsComponent } from '../admin/manage-words/manage-words.component';
import { AuthGuard } from '../auth/auth.guard';
import { AuthorisationGuard } from '../auth/authorisation.guard';
import { ManageUnblockRequestsComponent } from '../admin/manage-unblock-requests/manage-unblock-requests.component';
import { UserBlockedComponent } from '../users/user-blocked/user-blocked.component';


const routes: Routes = [
  {path: '',component:SignInComponent},
  {path: 'blockedUser',component:UserBlockedComponent},
  {
    path: 'dashboard',
    canActivate:[AuthGuard],
    component:DashboardComponent,
    children: [
      {
        path:'',
      children:[  
        {
          path:'home',
          component:PostsComponent
        },    
        {
          path:'profile',
          component:ProfileComponent
        },
        {
          path:'followers',
          component:FollowersComponent
        },
        {
          path:'notification',
          component:NotificationComponent
        },
        {
          path:'unblock-requests',
          component:ManageUnblockRequestsComponent
        },
        {
          path:'manage-users',
          canActivate:[AuthorisationGuard],
          component:ManageUsersComponent
        },
        {
          path:'manage-words',
          canActivate:[AuthorisationGuard],
          component:ManageWordsComponent
        }
      ]
    }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
