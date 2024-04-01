import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn$: Observable<boolean>; // Change type to Observable<boolean>

  constructor(public authService: AuthService) { 
    this.isLoggedIn$ = this.authService.isAuthenticated(); // Assign the Observable from AuthService
  } 

  logout() {
    this.authService.logout();
  }
}
