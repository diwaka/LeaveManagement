import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { CustomCalendarComponent } from './shared/components/custom-calendar/custom-calendar.component';
import { SiteheaderComponent } from './static/siteheader/siteheader.component';
import { ContentareaComponent } from './static/contentarea/contentarea.component';
import { LeaveManagementRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { LeaveTypeService } from './shared/services/leave-type.service';
import {HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CustomCalendarComponent,
    SiteheaderComponent,
    ContentareaComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    LeaveManagementRoutingModule,
   HttpClientModule
  ],
  providers: [LeaveTypeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
