import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Constants } from './shared/helper/Constants';
import { HomeComponent } from './components/home/home.component';
import { LeaveTypeOverviewComponent } from './components/leave-type/leave-type-overview/leave-type-overview.component';
import { LeaveTypeFormComponent } from './components/leave-type/leave-type-form/leave-type-form.component';



const routes: Routes = [
    {
        path: Constants.routes.homePath,
        component: HomeComponent
    },
    {
        path: Constants.routes.leaveTypePath,
        component: LeaveTypeOverviewComponent
    },
    {
        path: Constants.routes.addLeaveTypePath,
        component: LeaveTypeFormComponent
    },
    {
        path: Constants.routes.editLeaveTypePath,
        component: LeaveTypeFormComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class LeaveManagementRoutingModule { }

