import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
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
  constructor(private router: Router) {}

  ngOnInit(): void {}

  switchToSignIn() {
    this.router.navigate(['auth', 'sign-in']);
  }
  onSubmit() {
    console.log(this.signupForm.value);
  }
}
