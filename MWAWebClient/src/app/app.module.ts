import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IgxDialogModule,IgxButtonModule,IgxRippleModule,IgxIconModule,
	IgxOverlayService,
  IgxCardModule } from 'igniteui-angular';
  import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeModule } from './home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoadingOverlayComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    IgxCardModule,
    NgbModule,
    BrowserModule,
    HomeModule,
    UsersModule,
    PostsModule,
    AdminModule,
    FormsModule,        
    AppRoutingModule
  ],
  providers: [IgxOverlayService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
