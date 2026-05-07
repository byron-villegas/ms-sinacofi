import { registerAs } from '@nestjs/config';
import partyDataManagementData from './data/party-data-management.json';

export interface PartyEntry {
  rut: string;
  names: string;
  firstLastName: string;
  secondLastName: string;
  sex: 'M' | 'F';
  nationality: string;
  birthDate: string;
}

export const partyDataManagementConfig = registerAs('partyDataManagement', () => ({
  parties: partyDataManagementData.parties as PartyEntry[],
}));
