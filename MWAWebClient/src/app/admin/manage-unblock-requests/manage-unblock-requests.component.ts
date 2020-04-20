import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-manage-unblock-requests',
  templateUrl: './manage-unblock-requests.component.html',
  styleUrls: ['./manage-unblock-requests.component.css']
})
export class ManageUnblockRequestsComponent implements OnInit {

  blockRequests:any[];
  constructor(private adminSvc : AdminService) { }

  ngOnInit(): void {
    this.adminSvc.getUnblockRequests((data) => {
      this.blockRequests = data;
    },err => {
      alert("Failed to load unblocking results");
    })
  }

  approveRequest(id)
  {
    this.adminSvc.approveUnblockRequest(id,(rslt) => {
      this.blockRequests = this.blockRequests.filter(req => req._id != id);
    },err => {
      alert('Failed to approve request, please try again');
    })
  }

  rejectRequest(id)
  {
    this.adminSvc.declineUnblockRequest(id,(rslt) => {
      this.blockRequests = this.blockRequests.filter(req => req._id != id);
    },err => {
      alert('Failed to reject request, please try again');
    })
  }

}
