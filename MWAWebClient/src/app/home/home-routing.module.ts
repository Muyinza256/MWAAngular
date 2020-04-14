import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from '../auth/auth.guard';


const routes: Routes = [
  {path: '',component:SignInComponent},
  {path: 'dashboard',canActivate:[AuthGuard],component:DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
