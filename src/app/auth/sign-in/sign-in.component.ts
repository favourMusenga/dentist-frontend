import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  @ViewChild('loginForm', { static: true }) loginFormEl!: NgForm;
  errorResponse: string = '';
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  switchToSignUp() {
    this.router.navigate(['auth', 'sign-up']);
  }

  onSubmit() {
    this.authService
      .signIn(this.loginFormEl.value.email, this.loginFormEl.value.password)
      .subscribe({
        next: (_) => {
          this.loginFormEl.resetForm();
          this.router.navigateByUrl('/appointment/dashboard');
        },
        error: (err) => (this.errorResponse = err.message),
      });
  }
}
