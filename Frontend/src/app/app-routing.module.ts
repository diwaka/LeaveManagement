import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Constants } from './shared/helper/Constants';
import { HomeComponent } from './components/home/home.component';



const routes: Routes = [
    {
        path: Constants.routes.homePath,
        component: HomeComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class LeaveManagementRoutingModule { }

