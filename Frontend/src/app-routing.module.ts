import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Constants } from './app/shared/helper/constants';
import { CustomCalendarComponent } from './app/shared/components/custom-calendar/custom-calendar.component';

const routes: Routes = [
    {
        path: Constants.routes.homePath,
        component: CustomCalendarComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class LeaveManagementRoutingModule { }

