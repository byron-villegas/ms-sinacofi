import { ConfigType } from '@nestjs/config';
import { partyAuthenticationConfig } from '../config/party-authentication.config';
import { PartyAuthenticationService } from './party-authentication.service';

const mockConfig: ConfigType<typeof partyAuthenticationConfig> = {
  identityDocuments: [
    {
      rut: '12345678-9',
      serialNumber: 'A123456789',
      expirationDate: '2030-06-15',
    },
  ],
};

describe('PartyAuthenticationService', () => {
  let service: PartyAuthenticationService;

  beforeEach(() => {
    service = new PartyAuthenticationService(mockConfig);
  });

  describe('evaluate', () => {
    it('should return isValid=true with expirationDate when rut and serialNumber match', () => {
      const result = service.evaluate({
        rut: '12345678-9',
        serialNumber: 'A123456789',
      });

      expect(result).toEqual({ isValid: true, expirationDate: '2030-06-15' });
    });

    it('should return isValid=false with empty expirationDate when rut does not match', () => {
      const result = service.evaluate({
        rut: '11111111-1',
        serialNumber: 'A123456789',
      });

      expect(result).toEqual({ isValid: false, expirationDate: '1900-01-01' });
    });

    it('should return isValid=false with empty expirationDate when serialNumber does not match', () => {
      const result = service.evaluate({
        rut: '12345678-9',
        serialNumber: 'Z999999999',
      });

      expect(result).toEqual({ isValid: false, expirationDate: '1900-01-01' });
    });

    it('should match rut case-insensitively', () => {
      const result = service.evaluate({
        rut: '12345678-K',
        serialNumber: 'A123456789',
      });

      expect(result).toEqual({ isValid: false, expirationDate: '1900-01-01' });
    });
  });
});
