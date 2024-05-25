import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent  implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {}

  get isLoggedIn() {
    return this.authService.isAuthenticated && this.authService.user() !== null;
   // return true;
  }

  get user() {
    return this.authService.user();
  }

}
