import { Component } from '@angular/core';
import {AuthService} from "../auth-service.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.css'
})
export class LoginComponent {
  user: any = {};

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.user).subscribe(
      (response) => {
        // Handle successful login
        console.log('Login successful:', response);
        this.authService.setAuthToken(response.token);
        this.router.navigate(['/']);
      },
      (error) => {
        // Handle login error
        console.error('Login failed:', error);
      }
    );
  }
}
