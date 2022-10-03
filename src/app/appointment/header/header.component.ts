import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isOpen: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(val=>{
      if(this.isOpen){
        this.isOpen = false;
      }
    })
  }

  onOpenNav(): void {
    this.isOpen = true;
  }

  onCloseNav(): void {
    this.isOpen = false;
  }

  signOut() {
    this.authService.signOut();
  }
}
