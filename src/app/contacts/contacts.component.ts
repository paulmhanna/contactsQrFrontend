import {Component, OnInit} from '@angular/core';
import {ContactsService} from "../contacts.service";
import {Router, RouterLink} from '@angular/router';
import {CommonModule, NgForOf} from "@angular/common";
import {Contact} from "./contact.model";
import jsPDF from "jspdf";
import {forkJoin, map, Observable} from "rxjs";
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    CommonModule,
    NgForOf,
    RouterLink
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent implements OnInit{
  contacts: Contact[] = []
  qrCodeImages: any = []

  constructor(private contactService: ContactsService, private router: Router) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactService.getAllContacts().subscribe(
      (data) => {
        this.contacts = data;

        forkJoin(
          data.map(contact => this.getQrCode(contact).pipe(
            map(blob => URL.createObjectURL(blob)) // Convert Blob to data URL
          ))
        ).subscribe(
          qrCodeImages => {
            this.qrCodeImages = qrCodeImages;
          },
          error => {
            console.error('Error generating QR codes:', error);
          }
        );
      },
      (error) => {
        console.error('Error loading contacts:', error);
      }
    );
  }
  addContact(): void {
      this.router.navigate(['/addContact']);
  }
  editContact(id : any): void {
        this.router.navigate(['/edit', id] );
  }

  deleteContact(id: any) : void {
    this.contactService.deleteContact(id).subscribe(
      () => {
        this.loadContacts()
      }
    );
  }

  getQrCode(contact: Contact): Observable<Blob> {
    return this.contactService.generateQrCode(contact);
  }

  exportCSV() {
    const csvData = this.contacts.map(contact => {
      return [
        contact.firstName,
        contact.lastName,
        contact.emails.join(', '),
        contact.phoneNumbers.map(p => p.number + ' (' + p.type + ')').join(', '),
        contact.socialMediaLinks.join(', '),
      ];
    }).join('\n');

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'contacts.csv');
  }

  exportJSON() {
    const jsonData = JSON.stringify(this.contacts);
    const blob = new Blob([jsonData], { type: 'application/json;charset=utf-8;' });
    saveAs(blob, 'contacts.json');
  }
}
