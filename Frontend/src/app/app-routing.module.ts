import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Constants } from './shared/helper/Constants';
import { CustomCalendarComponent } from './shared/components/custom-calendar/custom-calendar.component';



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

