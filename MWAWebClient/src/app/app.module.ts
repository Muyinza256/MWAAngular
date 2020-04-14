import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IgxDialogModule,IgxButtonModule,IgxRippleModule,IgxIconModule,
	IgxOverlayService,
	IgxCardModule } from 'igniteui-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeModule } from './home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoadingOverlayComponent
  ],
  imports: [
    IgxCardModule,
    NgbModule,
    BrowserModule,
    HomeModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [IgxOverlayService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
