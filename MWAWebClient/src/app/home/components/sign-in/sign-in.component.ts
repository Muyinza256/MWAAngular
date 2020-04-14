import { Component, OnInit, OnDestroy,Inject, ViewChild, ElementRef } from '@angular/core';
import { AuthenticationService } from '../../../auth/services/authentication.service';
import { Router } from '@angular/router';
import { LoadingOverlayComponent } from '../../../loading-overlay/loading-overlay.component';

import { IgxOverlayService } from "igniteui-angular";
import { Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit,OnDestroy {

  private _overlayShown = false; // Is the component rendered in the Overlay?

    private destroy$ = new Subject<boolean>();
    private _overlayId: string;

    @ViewChild(`signUpBtn`)
    private myAnchorButton: ElementRef;

  username:string;
  password:string;

  alertTitle:string;
  alertMessage:string;

  signUpUsername:string;
  signUpEmail:string;
  signUpFirstname:string;
  signUpLastname:string;
  signUpPassword:string;

  constructor(private authService : AuthenticationService,private router: Router,@Inject(IgxOverlayService) public overlayService: IgxOverlayService) {
    this.overlayService.onClosed.pipe(
                filter((x) => x.id === this._overlayId),
                takeUntil(this.destroy$))
            .subscribe(() => delete this._overlayId);
   }

  ngOnInit(): void {
  }

  validateSignUpForm(openDialog,callback)
  {
    if(!this.signUpUsername)
    {
      this.alertTitle= "Alert !";
      this.alertMessage="Missing Username";
      openDialog();
    }
    if(!this.signUpEmail)
    {
      this.alertTitle= "Alert !";
      this.alertMessage="Missing Email";
      openDialog();
    }
    if(!this.signUpFirstname)
    {
      this.alertTitle= "Alert !";
      this.alertMessage="Missing Firstname";
      openDialog();
    }
    if(!this.signUpLastname)
    {
      this.alertTitle= "Alert !";
      this.alertMessage="Missing Lastname";
      openDialog();
    }
    if(!this.signUpPassword)
    {
      this.alertTitle= "Alert !";
      this.alertMessage="Missing Password";
      openDialog();
    }
    callback();
  }

  signUp(openDialog){
    this.validateSignUpForm(openDialog,() => {
      var usr = {
        _username:this.signUpUsername,
        _email:this.signUpEmail,
        _firstname:this.signUpFirstname,
        _lastname:this.signUpLastname,
        _password:this.signUpPassword,
        _role:"user"
      }
      this.showLoading();
      this.authService.signUpUser(usr,(user) => {
        this.signUpUsername="";
        this.signUpEmail="";
        this.signUpFirstname="";
        this.signUpLastname="";
        this.signUpPassword="";
        this.hideLoading();
        this.alertTitle = "SignUp Successful";
        this.alertMessage = user._username+" account created successfully";
        openDialog();
      },(err) => {
        this.hideLoading();
        this.alertTitle = "SignUp Failed";
        this.alertMessage = err.error.message;
        openDialog();
      });
    })
  }

  validateSignInForm(openDialog,callback){
    if(!this.username)
    {
      this.alertTitle= "Alert !";
      this.alertMessage="Missing Username";
      openDialog();
      return;
    }
    if(!this.password)
    {
      this.alertTitle= "Alert !";
      this.alertMessage="Missing Password";
      openDialog();
      return;
    }
    callback();
  }

  login(openDialog){
    this.validateSignInForm(openDialog,() => {
      var usrCredentials = {
        _username : this.username,
        _password : this.password
      }
      this.authService.loginUser(usrCredentials,(usr) => {
        this.router.navigate(['/dashboard']);
      },err => {
        this.alertTitle = "Login Failed";
        this.alertMessage = err.error.message;
        openDialog();
      });
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public showLoading()
  {
    if (!this._overlayShown) {      
      if (!this._overlayId) {
          this._overlayId = this.overlayService.attach(LoadingOverlayComponent);
      }
      this.overlayService.show(this._overlayId,({
        modal: true,
        closeOnOutsideClick: false
      }));
    }
  }

  hideLoading()
  {
    this.overlayService.hide(this._overlayId);
  }

}
