import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageWordsComponent } from './manage-words/manage-words.component';
import { ManageUsersItemComponent } from './manage-users-item/manage-users-item.component';


@NgModule({
  declarations: [ManageUsersComponent, ManageWordsComponent, ManageUsersItemComponent],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
