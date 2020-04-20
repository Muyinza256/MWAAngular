import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-manage-words',
  templateUrl: './manage-words.component.html',
  styleUrls: ['./manage-words.component.css']
})
export class ManageWordsComponent implements OnInit {

  specialWord:string;
  words:any[];
  constructor(private authSvc:AuthenticationService,private adminSvc:AdminService) { }

  ngOnInit(): void {
    this.adminSvc.getWords(data => {
      this.words = data;
    },err => {
      console.log(err);
      alert("Failed to load the offensive words");
    })
  }

  addWord(){
    if(!this.specialWord)
    {
      alert('Please input a word');
    }    
    this.adminSvc.addWords({"_text":this.specialWord},(rslt) => {
      this.words.push({"_text":this.specialWord});
      this.specialWord = null;
    },err => {
      console.log(err);
      alert('Failed to submit offensive word');
    })
  }

}
