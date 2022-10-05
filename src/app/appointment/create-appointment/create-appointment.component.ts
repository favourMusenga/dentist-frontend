import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from '../appointment.service';
import { dentist } from '../types';
import { AuthService } from './../../auth/auth.service';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css'],
})
export class CreateAppointmentComponent implements OnInit {
  dentistsList: dentist[] = [];
  isDisabled = false;
  hasError = false;
  response: string | null = null;
  createAppointmentForm: FormGroup = new FormGroup({
    dentist: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
  });
  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.appointmentService.getDentists().subscribe((data) => {
      this.dentistsList = data;
    });
  }

  onSubmit() {
    console.log(this.createAppointmentForm.value);
    const client = this.authService.client.value?.email;
    this.isDisabled = true;
    this.appointmentService
      .createAppointment(
        client!,
        this.createAppointmentForm.value.dentist,
        this.createAppointmentForm.value.date,
        this.createAppointmentForm.value.time
      )
      .subscribe({
        next: (_) => {
          this.isDisabled = false;
          this.hasError = false;
          this.response = 'appointment created successfully';
          this.createAppointmentForm.reset();
        },
        error: (err) => {
          console.log(err);
          this.isDisabled = false;
          this.hasError = true;
          this.response = err.message;
        },
      });
  }

  onReset() {
    this.createAppointmentForm.reset();
    this.response = null;
  }
}
