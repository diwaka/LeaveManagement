import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LeaveTypeService } from '../../../shared/services/leave-type.service';
import { LeaveTypeForm } from '../../../shared/forms/leave-type.form';
import { LeaveType } from '../../../shared/models/leave-type.model';

@Component({
  selector: 'app-leave-type-form',
  templateUrl: './leave-type-form.component.html',
  styleUrls: ['./leave-type-form.component.css']
})
export class LeaveTypeFormComponent implements OnInit {
  public leaveType: LeaveType;
  public form: LeaveTypeForm;
  public leaveTypeId: number;
  constructor(private _leaveTypeServices: LeaveTypeService, private _router: Router, private _activateRouter: ActivatedRoute) { }

  ngOnInit() {
    this._activateRouter.params.subscribe(param => {
      this.form = new LeaveTypeForm();
      this.leaveTypeId = param['id'];
      if (this.leaveTypeId != undefined) {
        this.getLeaveType();
      }
    });

  }
  getLeaveType() {
    this._leaveTypeServices.getLeaveType(this.leaveTypeId).subscribe(result => {
      this.leaveType = result;
      console.log(this.leaveType);
    });
  }

}
