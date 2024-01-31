import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../auth-service.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
constructor(private authService: AuthService, private router: Router) {
}

isAuthenticated(): boolean {
  return !!this.authService.getAuthToken();

}
logout() : void {
this.authService.clearAuthToken();
  this.router.navigate(['/']);
}
}
