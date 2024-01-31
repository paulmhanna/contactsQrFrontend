import { Routes } from '@angular/router';
import {LoginComponent} from "./login-component/login-component.component";
import {QrCodeComponent} from "./qr-code/qr-code.component";
import {authGuard} from "./auth.guard";
import {RegisterComponent} from "./register-component/register-component.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ContactsComponent} from "./contacts/contacts.component";
import {EditContactComponent} from "./edit-contact/edit-contact.component";
import {AddContactComponent} from "./add-contact/add-contact.component";

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'contacts', component: ContactsComponent, canActivate: [authGuard] },
  { path: 'addContact', component: AddContactComponent, canActivate: [authGuard] },
  { path: 'edit/:id', component: EditContactComponent, canActivate: [authGuard] },
  { path: 'qrcode/:id', component: QrCodeComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
