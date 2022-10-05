import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { dentist } from './types';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private http: HttpClient) {}

  createAppointment(
    client: string,
    dentist: string,
    date: string,
    time: string
  ) {
    return this.http
      .post(
        `${environment.host}/create-appointment`,
        {
          client,
          dentist,
          date,
          time,
        },
        { responseType: 'text' }
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let message = 'something went wrong';

          if (error.status === 400) {
            const errorData = JSON.parse(error.error);
            message = errorData.errorMessage;
          }
          return throwError(() => new Error(message));
        })
      );
  }

  getHistory() {}

  getDentists() {
    return this.http
      .get<{ dentists: dentist[] }>(`${environment.host}/get-dentists`)
      .pipe(
        map((dentists) => {
          const dentistArr: dentist[] = [];

          dentists.dentists.forEach((dentist) =>
            dentistArr.push({ ...dentist })
          );

          return dentistArr;
        })
      );
  }

  getActiveAppointment() {}

  cancelAppointment() {}
}
