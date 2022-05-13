import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  @ViewChild('loginForm', { static: true }) loginFormEl!: NgForm;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  switchToSignUp() {
    this.router.navigate(['auth', 'sign-up']);
  }

  onSubmit() {
    console.log(this.loginFormEl.controls);
  }
}
