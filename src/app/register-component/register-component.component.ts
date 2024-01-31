import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../auth-service.service";
import {FormsModule} from "@angular/forms";
@Component({
  selector: 'app-register-component',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './register-component.component.html',
  styleUrl: './register-component.component.css'
})
export class RegisterComponent {
  user: any = {};

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    this.authService.register(this.user).subscribe(
      (response) => {
        // Handle successful registration
        console.log('Registration successful:', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        // Handle registration error
        console.error('Registration failed:', error);
      }
    );
  }
}
