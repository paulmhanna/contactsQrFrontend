import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ContactsService} from "../contacts.service";
import {Router} from "@angular/router";
import {Contact} from "../contacts/contact.model";
import {CommonModule} from "@angular/common";
import {ContactDTO} from "../contacts/contactDTO.model";
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-contact',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.css'
})
export class AddContactComponent {
  contact: ContactDTO = { firstName: '', lastName: '', emails: [''], phoneNumbers: [], qrCode: '', socialMediaLinks: [''] };
  constructor(private contactService: ContactsService, private router: Router, private location: Location) {}

  back() : void {
    this.location.back();
  }
  saveContact(contact: ContactDTO): void {
    console.log(contact);
    this.contactService.generateQrCode(contact).subscribe(
      (qrCodeBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(qrCodeBlob);
        reader.onloadend = () => {
          this.contact.qrCode = reader.result as string;
          this.contactService.saveContact(contact).subscribe(
            () => {
              this.router.navigate(['/contacts']);
            }
          );
        };
      }
    );
  }

  addEmail(event: Event) {
    event.preventDefault();
    this.contact.emails.push('');
  }

  removeEmail(index: number, event: Event) {
    event.preventDefault();
    this.contact.emails.splice(index, 1);
  }

  addPhoneNumber(event: Event) {
    event.preventDefault();
    this.contact.phoneNumbers.push({ type: 'CELL', number: '' });
  }

  removePhoneNumber(index: number, event: Event) {
    event.preventDefault();
    this.contact.phoneNumbers.splice(index, 1);
  }

  addSocialLink(event: Event) {
    event.preventDefault();
    this.contact.socialMediaLinks.push('');
  }

  removeSocialLink(index: number, event: Event) {
    event.preventDefault();
    this.contact.socialMediaLinks.splice(index, 1);
  }

  trackById(index: number): number {
    return index;
  }
}
