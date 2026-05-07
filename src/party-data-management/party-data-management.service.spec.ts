import { NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { partyDataManagementConfig } from '../config/party-data-management.config';
import { PartyDataManagementService } from './party-data-management.service';

const mockConfig: ConfigType<typeof partyDataManagementConfig> = {
  parties: [
    {
      rut: '12345678-9',
      names: 'Juan Carlos',
      firstLastName: 'Bodoque',
      secondLastName: 'Triviño',
      sex: 'M',
      nationality: 'CL',
      birthDate: '1990-06-22',
    },
  ],
};

describe('PartyDataManagementService', () => {
  let service: PartyDataManagementService;

  beforeEach(() => {
    service = new PartyDataManagementService(mockConfig);
  });

  describe('retrieve', () => {
    it('should return party profile when rut exists', () => {
      const result = service.retrieve('12345678-9');

      expect(result).toEqual({
        rut: '12345678-9',
        names: 'Juan Carlos',
        firstLastName: 'Bodoque',
        secondLastName: 'Triviño',
        sex: 'M',
        nationality: 'CL',
        birthDate: '1990-06-22',
      });
    });

    it('should match rut case-insensitively', () => {
      const result = service.retrieve('12345678-9');

      expect(result.rut).toBe('12345678-9');
    });

    it('should throw NotFoundException when rut does not exist', () => {
      expect(() => service.retrieve('11111111-1')).toThrow(NotFoundException);
    });

    it('should throw NotFoundException with descriptive message when rut not found', () => {
      expect(() => service.retrieve('11111111-1')).toThrow(
        'Party with rut 11111111-1 not found',
      );
    });
  });
});
