import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { IgxDialogModule,IgxButtonModule,IgxRippleModule,IgxIconModule,
	IgxOverlayService,
  IgxCardModule } from 'igniteui-angular';

import { UsersRoutingModule } from './users-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { FollowersComponent } from './followers/followers.component';
import { FollowerItemComponent } from './follower-item/follower-item.component';


@NgModule({
  declarations: [ProfileComponent, FollowersComponent, FollowerItemComponent],
  imports: [
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    IgxButtonModule,
		IgxDialogModule,
    IgxRippleModule,
    IgxIconModule,
		IgxCardModule,
    NgbModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
