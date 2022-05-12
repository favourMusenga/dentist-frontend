import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentComponent } from './appointment.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { ActiveAppointmentComponent } from './active-appointment/active-appointment.component';
import { AppointmentHistoryComponent } from './appointment-history/appointment-history.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppointmentComponent,
    HeaderComponent,
    FooterComponent,
    CreateAppointmentComponent,
    ActiveAppointmentComponent,
    AppointmentHistoryComponent,
    ProfileComponent,
    DashboardComponent,
  ],
  imports: [CommonModule, AppointmentRoutingModule, ReactiveFormsModule],
})
export class AppointmentModule {}
