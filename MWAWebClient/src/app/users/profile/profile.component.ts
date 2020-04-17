import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:User;
  username:string;
  email:string;
  firstname:string;
  lastname:string;
  dateOfBirth:Date;
  state:string;
  city:string;
  street:string;
  zip:string;

  isProfileImageReady:boolean = false;
  imgToShow: any;

  selectedImage: File;

  constructor(private usrSvc:UserService) { }

  renderImage(imageBlob)
  {
    let reader = new FileReader();
      reader.addEventListener("load", () => {
        this.imgToShow = reader.result;
      },false);

      if(imageBlob)
      {
        reader.readAsDataURL(imageBlob);
        this.isProfileImageReady = true;
      }
  }

  displayImage(imageId:string)
  {
    this.usrSvc.getUserImage(imageId,(imageBlob) => {
      this.renderImage(imageBlob);
    },
    err => {
      console.log(err);
      alert('Failed to download image');
    })
  }

  onImageSelect(event)
  {
    this.selectedImage = event.target.files[0];
    this.renderImage(this.selectedImage);
  }

  uploadImage(callback,failcallback)
  {
    if(!this.selectedImage)
    {
      return ;
    }
    const uploadData = new FormData();
    uploadData.append('image', this.selectedImage);
    this.usrSvc.uploadUserImage(uploadData,(uzr) => {
      this.user = uzr;
      callback();      
    },err => {
      failcallback();
    })
  }

  ngOnInit(): void {
    this.usrSvc.getUserProfile(usr => {
      this.user = usr;
      this.setFields();
    },err => {
      alert('failed to get user details');
    })
  }

  setFields()
  {
    this.username = this.user._username;
    this.firstname = this.user._firstname;
    this.lastname = this.user._lastname;
    this.email = this.user._email;
    if(this.user._dateOfBirth)
    {
      this.dateOfBirth = new Date(this.user._dateOfBirth);
    }
    if(this.user._address)
    {
      if(this.user._address._city)
      {
        this.city = this.user._address._city;
      }
      if(this.user._address._state)
      {
        this.state = this.user._address._state;
      }
      if(this.user._address._street)
      {
        this.street = this.user._address._street;
      }
      if(this.user._address._zip)
      {
        this.zip = this.user._address._zip;
      }
    }
    if(this.user._image)
    {
        this.displayImage(this.user._image);
    }
  }

  cancelChanges()
  {
    this.setFields();
  }

  validateChanges(callback)
  {
    if(!this.username)
    {
      alert('Invalid username');
      return;
    }
    if(!this.email)
    {
      alert('Invalid email');
      return;
    }
    if(!this.firstname)
    {
      alert('Invalid firstname');
      return;
    }
    if(!this.lastname)
    {
      alert('Invalid lastname');
      return;
    }
    if(!this.city)
    {
      alert('Invalid city');
      return;
    }
    if(!this.zip)
    {
      alert('Invalid zip');
      return;
    }
    if(!this.state)
    {
      alert('Invalid state');
      return;
    }
    if(!this.street)
    {
      alert('Invalid street');
      return;
    }
    if(!this.dateOfBirth)
    {
      alert('Invalid date of birth');
      return;
    }
    callback();
  }

  getUserDetails(){
    this.user._username = this.username;
    this.user._firstname = this.firstname;
    this.user._lastname = this.lastname;
    this.user._email = this.email;
    var address = {
      _city: this.city,
        _state : this.state,
        _street : this.street,
        _zip : this.zip
    };
    this.user._address = address;
    this.user._dateOfBirth = this.dateOfBirth;
  }

  saveChanges()
  {
    this.validateChanges(() => {
      this.getUserDetails();      
      this.usrSvc.saveUserChanges(this.user,(uzr) => {
        this.user = uzr;
        this.uploadImage(() => {
          this.setFields();
          alert('User details updated');
        },err => {
          alert('Updated details but couldnt upload image');
        });
      },err => {
        alert('Failed to update details');
      })
    });
  }

}
