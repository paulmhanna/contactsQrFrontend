import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {QrCodeComponent} from "./qr-code/qr-code.component";
import {HttpClientModule} from "@angular/common/http";
import {ContactsService} from "./contacts.service";
import {AuthService} from "./auth-service.service";
import {NavbarComponent} from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, QrCodeComponent, HttpClientModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ ContactsService, AuthService]
})
export class AppComponent {
  title = 'QRGenerator';
}
