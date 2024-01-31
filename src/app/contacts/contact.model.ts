export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  emails: string[];
  phoneNumbers: { type: string; number: string }[];
  qrCode: string;
  socialMediaLinks: string[]
}
