import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {ContactsService} from "../contacts.service";
import {ContactDTO} from "../contacts/contactDTO.model";
import {Location, NgForOf, NgIf} from "@angular/common";
@Component({
  selector: 'app-edit-contact',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.css'
})
export class EditContactComponent implements OnInit{
  contact: ContactDTO = { firstName: '', lastName: '', emails: [], phoneNumbers: [], qrCode: '', socialMediaLinks: [''] };
  id: any
  constructor(private activatedRoute: ActivatedRoute, private contactService: ContactsService, private router: Router, private location: Location) {}
  ngOnInit() {
    const urlParts = window.location.href.split('/');
    this.id = urlParts[urlParts.length - 1];
    this.getContact(this.id);
  }

  back() : void {
    this.location.back();
  }

  getContact(id: any):void{
    this.contactService.getContactById(id).subscribe(
      (data) => {
        this.contact = data;
      }
    )
  }
  updateContact(): void {
    this.contactService.generateQrCode(this.contact).subscribe(
      (qrCodeBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(qrCodeBlob);
        reader.onloadend = () => {
          this.contact.qrCode = reader.result as string;
          this.contactService.updateContact(this.id, this.contact).subscribe(
            () => {
              this.router.navigate(['/contacts']);
            })
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
    console.log(this.contact)
  }

  addSocialLink(event: Event) {
    event.preventDefault();
    this.contact.socialMediaLinks.push('');
  }

  removeSocialLink(index: number, event: Event) {
    event.preventDefault();
    this.contact.socialMediaLinks.splice(index, 1);
  }

}
