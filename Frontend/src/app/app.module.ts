import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { CustomCalendarComponent } from './shared/components/custom-calendar/custom-calendar.component';
import { SiteheaderComponent } from './static/siteheader/siteheader.component';
import { ContentareaComponent } from './static/contentarea/contentarea.component';
import { LeaveManagementRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    CustomCalendarComponent,
    SiteheaderComponent,
    ContentareaComponent
  ],
  imports: [
    BrowserModule,
    LeaveManagementRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
