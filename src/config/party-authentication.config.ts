import { registerAs } from '@nestjs/config';
import partyAuthenticationData from './data/party-authentication.json';

export interface IdentityDocumentEntry {
  rut: string;
  serialNumber: string;
  expirationDate: string;
}

export const partyAuthenticationConfig = registerAs('partyAuthentication', () => ({
  identityDocuments: partyAuthenticationData.identityDocuments as IdentityDocumentEntry[],
}));
