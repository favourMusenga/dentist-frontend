import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  errorResponse: string = '';
  isDisabled = false;

  signupForm: FormGroup = new FormGroup({
    firstName: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
    ]),
    lastName: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
    ]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    dob: new FormControl(null, Validators.required),
    phoneNumber: new FormControl(null, [
      Validators.required,
      Validators.minLength(10),
    ]),
    gender: new FormControl('male'),
    password: new FormControl(null, [
      Validators.minLength(6),
      Validators.required,
    ]),
    cPassword: new FormControl(null, [Validators.required]),
  });

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  switchToSignIn() {
    this.router.navigate(['auth', 'sign-in']);
  }
  onSubmit() {
    this.isDisabled = true;
    const data = this.authService.signUp(
      this.signupForm.value.firstName,
      this.signupForm.value.lastName,
      this.signupForm.value.email,
      this.signupForm.value.dob,
      this.signupForm.value.phoneNumber,
      this.signupForm.value.gender,
      this.signupForm.value.password
    );

    data.subscribe({
      next: (client) => {
        console.log(client);
        this.signupForm.reset();
        this.authService.signIn(client.email, this.signupForm.value.password);
        this.isDisabled = false;
      },
      error: (err) => {
        this.isDisabled = false;
        this.errorResponse = err.message;
      },
    });
  }

  isNotConfirmPasswordEqualToPassword(): boolean {
    return (
      this.signupForm.get('cPassword')?.value !==
      this.signupForm.get('password')?.value
    );
  }
}
