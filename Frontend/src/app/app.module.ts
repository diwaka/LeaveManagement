import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LeaveManagementRoutingModule } from 'src/app-routing.module';
import { CustomCalendarComponent } from './shared/components/custom-calendar/custom-calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomCalendarComponent
  ],
  imports: [
    BrowserModule,
    LeaveManagementRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
