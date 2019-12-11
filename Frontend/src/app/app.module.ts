import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { CustomCalendarComponent } from './shared/components/custom-calendar/custom-calendar.component';
import { SiteheaderComponent } from './components/static/siteheader/siteheader.component';
import { ContentareaComponent } from './components/static/contentarea/contentarea.component';
import { LeaveManagementRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { LeaveTypeService } from './shared/services/leave-type.service';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { HttpLMInterceptor } from './shared/interceptor/http-lm-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeaveTypeOverviewComponent } from './components/leave-type/leave-type-overview/leave-type-overview.component';
import { LeaveTypeFormComponent } from './components/leave-type/leave-type-form/leave-type-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CustomCalendarComponent,
    SiteheaderComponent,
    ContentareaComponent,
    HomeComponent,
    LeaveTypeOverviewComponent,
    LeaveTypeFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    LeaveManagementRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [LeaveTypeService,
    {
    provide: HTTP_INTERCEPTORS, useClass: HttpLMInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
