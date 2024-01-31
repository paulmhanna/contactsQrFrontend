import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Contact} from "./contacts/contact.model";
import {ContactDTO} from "./contacts/contactDTO.model";

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private apiUrl = 'http://localhost:5044/api/contacts';
  token = localStorage.getItem('authToken');

  constructor(private http: HttpClient) { }

  getAllContacts(): Observable<Contact[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<Contact[]>(this.apiUrl, {headers});
  }

  saveContact(contact: ContactDTO): Observable<ContactDTO> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post<ContactDTO>(`${this.apiUrl}`, contact, {headers});
  }

  getContactById(id: any): Observable<Contact>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<Contact>(`${this.apiUrl}/${id}`, {headers});
  }

  updateContact(id:any, contact: ContactDTO) : Observable<ContactDTO> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.put<ContactDTO>(`${this.apiUrl}/${id}`, contact, {headers});
  }

  deleteContact(id:any) : Observable<ContactDTO> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.delete<ContactDTO>(`${this.apiUrl}/${id}`, {headers});
  }

  generateQrCode(contactCard: any): Observable<Blob> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.post(`${this.apiUrl}/generateQrCode`, contactCard, {
        headers,
        responseType: 'blob'
    });
  }
}
