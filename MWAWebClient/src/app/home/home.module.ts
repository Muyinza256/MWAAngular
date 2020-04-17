import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { IgxDialogModule,IgxButtonModule,IgxRippleModule,IgxIconModule,
	IgxOverlayService,
  IgxCardModule } from 'igniteui-angular';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeRoutingModule } from './home-routing.module';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  declarations: [SignInComponent, SignUpComponent, DashboardComponent],
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
    HomeRoutingModule
  ],
  providers: [IgxOverlayService]
})
export class HomeModule { }
