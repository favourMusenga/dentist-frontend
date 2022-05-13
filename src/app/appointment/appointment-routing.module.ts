import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { AppointmentHistoryComponent } from './appointment-history/appointment-history.component';
import { ActiveAppointmentComponent } from './active-appointment/active-appointment.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentComponent } from './appointment.component';

const routes: Routes = [
  {
    path: '',
    component: AppointmentComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'active', component: ActiveAppointmentComponent },
      { path: 'history', component: AppointmentHistoryComponent },
      { path: 'create', component: CreateAppointmentComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentRoutingModule {}
