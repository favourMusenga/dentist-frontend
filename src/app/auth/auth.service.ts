import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

interface IClient {
  token: string;
  expireIn: number;
  firstName: string;
  lastName: string;
  email: string;
  date?: number;
}
interface ISignUp {
  firstName: string;
  lastName: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  client = new BehaviorSubject<IClient | null>(null);
  private clearOutTimer: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  signIn(email: string, password: string): Observable<IClient> {
    return this.http
      .post<IClient>(`${environment.host}/login`, {
        password,
        email,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let message = 'Something bad happened; please try again later.';

          if (error.error.error) message = error.error.error;

          return throwError(() => new Error(message));
        }),
        tap((client) => {
          this.handleAuthentication(client);
        })
      );
  }

  signUp(
    firstName: string,
    lastName: string,
    email: string,
    dob: string,
    phoneNumber: string,
    gender: string,
    password: string
  ): Observable<ISignUp> {
    return this.http
      .post<ISignUp>(`${environment.host}/create-account`, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        gender: gender,
        phoneNumber: phoneNumber,
        dateOfBirth: dob,
        password: password,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let message: string;

          if (error.status === 400) {
            message = error.error.errors.email;
          } else {
            message = 'Something bad happened; please try again later.';
          }

          return throwError(() => new Error(message));
        })
      );
  }

  signOut() {
    this.http.get<void>(`${environment.host}/logout`).subscribe({
      next: () => {
        this.clearAccessToken();
      },
      error: () => {
        this.clearAccessToken();
      },
    });
  }

  private handleAuthentication(data: IClient) {
    const now = new Date();

    now.setSeconds(now.getSeconds() + data.expireIn);
    data.date = now.getTime();
    this.client.next(data);
    localStorage.setItem('dentist-client', JSON.stringify(data));
    this.autoRefresh(Number(data.expireIn) * 1000);
  }

  private autoRefresh(expirationTime: number) {
    this.clearOutTimer = setTimeout(() => {
      this.refresh();
    }, expirationTime);
  }

  refresh(): void {
    this.http
      .get<{ token: string; expireIn: number }>(
        `${environment.host}/refresh-token`
      )
      .subscribe({
        next: (tokenData) => {
          const newClient: IClient = {
            email: this.client.value?.email!,
            firstName: this.client.value?.firstName!,
            lastName: this.client.value?.lastName!,
            expireIn: tokenData.expireIn,
            token: tokenData.token,
          };

          this.client.next(newClient);
          localStorage.setItem('dentist-client', JSON.stringify(newClient));
          this.autoRefresh(tokenData.expireIn * 1000);
        },
        error: (_) => {
          this.signOut();
        },
      });
  }

  authLogin() {
    const user: IClient = JSON.parse(localStorage.getItem('dentist-client')!);
    if (!user) {
      return;
    }

    const tokenExpirationDate = new Date(user.date!);

    console.log(tokenExpirationDate);

    if (!tokenExpirationDate || new Date() < tokenExpirationDate) {
      this.client.next(user);
      const expirationDuration =
        new Date(tokenExpirationDate).getTime() - new Date().getTime();
      this.autoRefresh(expirationDuration);
    }
  }

  private clearAccessToken(): void {
    localStorage.removeItem('dentist-client');
    if (this.clearOutTimer) {
      clearTimeout(this.clearOutTimer);
    }
    this.client.next(null);
    this.clearOutTimer = null;
    this.router.navigateByUrl('/auth/sign-in');
  }
}
