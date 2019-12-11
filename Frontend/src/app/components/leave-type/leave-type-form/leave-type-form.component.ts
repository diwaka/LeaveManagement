import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LeaveTypeService } from '../../../shared/services/leave-type.service';
import { LeaveTypeForm } from '../../../shared/forms/leave-type.form';
import { LeaveType } from '../../../shared/models/leave-type.model';
import { ComponentBase } from '../../../shared/components/component-base';
import { error } from 'util';

@Component({
  selector: 'app-leave-type-form',
  templateUrl: './leave-type-form.component.html',
  styleUrls: ['./leave-type-form.component.css']
})
export class LeaveTypeFormComponent extends ComponentBase implements OnInit {
  public leaveType: LeaveType;
  public forms: Array<LeaveTypeForm>;
  public leaveTypeId: number;

  constructor(private _leaveTypeServices: LeaveTypeService, private _router: Router, private _activateRouter: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.forms = [];
    this.SetLoading(true);
    this._activateRouter.params.subscribe(param => {
      this.leaveTypeId = param['id'];
      if (this.leaveTypeId != undefined) {
        this.getLeaveType();
        this.SetLoading(false);
      }
      else {
        let form = new LeaveTypeForm();
        this.forms.push(form);
        this.SetLoading(false);
      }
    });

  }
  private getLeaveType() {
    this.SetLoading(true);
    this._leaveTypeServices.getLeaveType(this.leaveTypeId).subscribe(result => {
      this.leaveType = result;
      let form = new LeaveTypeForm(this.leaveType);
      this.forms.push(form);
      console.log(this.forms);
      this.SetLoading(false);
    });
  }

  public addItem() {
    let form = new LeaveTypeForm();
    this.forms.push(form);
    console.log('Add -', this.forms);
  }
  public removeItem(index: number) {
    this.forms.splice(index, 1);
    console.log('Remove -', this.forms);
  }

  public operation() {
    let leaveTypes = new Array<LeaveType>();
    this.forms.forEach(form => {
      leaveTypes.push(form.save());
    })
    if (this.leaveTypeId != undefined) {
      let leaveType: LeaveType = leaveTypes.pop();
      this.update(this.leaveTypeId, leaveType);
    }
    else {
      this.save(leaveTypes);
    }
  }

  private update(leaveTypeId: number, leaveType: LeaveType) {
    this.SetLoading(true);
    this._leaveTypeServices.updateLeaveType(leaveTypeId, leaveType).subscribe(result => {
      this.SetLoading(false);
    }, error => {
      this.SetLoading(false);
    });
  }

  private save(leaveTypes: Array<LeaveType>) {
    this._leaveTypeServices.storeLeavesType(leaveTypes).subscribe(result => {
      this.SetLoading(false);
    }, error => {
      this.SetLoading(false);
    });
  }

}
