import { Component, OnInit } from '@angular/core';
import { LeaveTypeService } from '../../../shared/services/leave-type.service';
import { LeaveType } from '../../../shared/models/leave-type.model';
import { Router } from '@angular/router';
import { Constants } from '../../../shared/helper/Constants';

@Component({
  selector: 'app-leave-type-overview',
  templateUrl: './leave-type-overview.component.html',
  styleUrls: ['./leave-type-overview.component.css']
})
export class LeaveTypeOverviewComponent implements OnInit {

  public leaveTypes: Array<LeaveType>;

  constructor(private _leaveTypeServices: LeaveTypeService, private _router: Router) { }

  ngOnInit() {
    this.leaveTypes = [];
    this.getLeaveTypes();
  }

  private getLeaveTypes() {
    this._leaveTypeServices.getLeaveTypes().subscribe(result => {
      this.leaveTypes = result;
    });
  }

  public redirectToForm(id?: number) {
    console.log({ id })
    if (id != undefined && id != null && id != 0) {
      this._router.navigate([Constants.routes.editLeaveType(id)]);
    }
    else {
      this._router.navigate([Constants.routes.addLeaveType()]);
    }
  }
}
