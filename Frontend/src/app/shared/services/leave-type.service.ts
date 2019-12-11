import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LeaveType } from '../models/leave-type.model';
import { Observable } from 'rxjs';
import { map, filter, catchError, mergeMap, share } from 'rxjs/operators';
import { ServerResponse } from '../models/server-response.model';


@Injectable({
  providedIn: 'root'
})
export class LeaveTypeService {

  private leaveTypeEndPoint = environment.LeaveTypeService;
  constructor(private http: HttpClient) { }

  public getLeaveTypes(){
    return this.http
      .get(this.leaveTypeEndPoint + "GetLeaveTypes")
      .pipe(map((res: any) => <LeaveType[]>res));
  }

  public getLeaveType(id: number) {
    return this.http
      .get(this.leaveTypeEndPoint + "GetLeaveType/" + id)
      .pipe(map((res: any) => <LeaveType>res));
  }

  public storeLeavesType(leaveTypes: Array<LeaveType>) {
    return this.http
      .post(this.leaveTypeEndPoint + "Store", leaveTypes)
      .pipe(map((res: any) => <ServerResponse>res));
  }
  public updateLeaveType(id: number, leaveType: LeaveType) {
    return this.http
      .put(this.leaveTypeEndPoint + "Update/" + id, leaveType)
      .pipe(map((res: any) => <ServerResponse>res));

  }
}
