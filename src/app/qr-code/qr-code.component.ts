import {Component, OnInit} from '@angular/core';
import { ContactsService} from "../contacts.service";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import jsPDF from 'jspdf';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-qr-code',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './qr-code.component.html',
  styleUrl: './qr-code.component.css'
})
export class QrCodeComponent implements OnInit{
  contactCard: any = {};
  id: any
  constructor(private contactsService: ContactsService, private route: ActivatedRoute, private location: Location) { }
  ngOnInit() {
    const urlParts = window.location.href.split('/');
    this.id = urlParts[urlParts.length - 1];
    this.getContact(this.id);
  }

  back() : void {
    this.location.back();
  }

  getContact(id: any):void{
    this.contactsService.getContactById(id).subscribe(
      (data) => {
        this.contactCard = data;
      }
    )
  }
  generatePdf() {

    this.contactsService.generateQrCode(this.contactCard).subscribe(
      (qrCodeImage: Blob) => {
        const pdf = new jsPDF();



        const blobUrl = URL.createObjectURL(qrCodeImage);
        const imgWidth = 100;
        const imgHeight = 100;
        const imgXPosition = (pdf.internal.pageSize.width - imgWidth) / 2; // Centered horizontally
        const imgYPosition = 20;
        pdf.setDrawColor(120, 120, 120);
        pdf.rect(10, 10, pdf.internal.pageSize.width-20, imgHeight+50, 'S');


        pdf.addImage(blobUrl, 'PNG', imgXPosition, imgYPosition, imgWidth, imgHeight);
        const text = `${this.contactCard.firstName}`;
        const textXPosition = (pdf.internal.pageSize.width - 20) / 2
        pdf.setFontSize(24);
        pdf.text(text, textXPosition, imgYPosition + imgHeight + 10);

        // Save the PDF or open in a new window
        pdf.save('output.pdf');
      },
      (error) => {
        console.error('Error generating QR code:', error);
      }
    );
  }
}
