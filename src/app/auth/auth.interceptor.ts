import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, exhaustMap, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.authService.client.pipe(
      take(1),
      exhaustMap((client) => {
        const modifiedRequestWithCredentials = request.clone({
          withCredentials: true,
        });

        if (!client) {
          return next.handle(modifiedRequestWithCredentials);
        }
        const modifiedRequest = modifiedRequestWithCredentials.clone({
          headers: new HttpHeaders({ Authorization: client.token }),
        });
        return next.handle(modifiedRequest);
      })
    );
  }
}
