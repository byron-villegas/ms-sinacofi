import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { partyDataManagementConfig } from '../config/party-data-management.config';
import { PartyDataManagementController } from './party-data-management.controller';
import { PartyDataManagementService } from './party-data-management.service';

const mockConfig = {
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

describe('PartyDataManagementController', () => {
  let controller: PartyDataManagementController;
  let service: PartyDataManagementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartyDataManagementController],
      providers: [
        PartyDataManagementService,
        { provide: partyDataManagementConfig.KEY, useValue: mockConfig },
      ],
    }).compile();

    controller = module.get<PartyDataManagementController>(PartyDataManagementController);
    service = module.get<PartyDataManagementService>(PartyDataManagementService);
  });

  it('should call service.retrieve with rut and return result', () => {
    const expected = {
      rut: '12345678-9',
      names: 'Juan Carlos',
      firstLastName: 'Bodoque',
      secondLastName: 'Triviño',
      sex: 'M' as const,
      nationality: 'CL',
      birthDate: '1990-06-22',
    };
    const spy = jest.spyOn(service, 'retrieve').mockReturnValue(expected);

    const result = controller.retrieve('12345678-9');

    expect(spy).toHaveBeenCalledWith('12345678-9');
    expect(result).toEqual(expected);
  });

  it('should propagate NotFoundException from service', () => {
    jest.spyOn(service, 'retrieve').mockImplementation(() => {
      throw new NotFoundException('Party with rut 11111111-1 not found');
    });

    expect(() => controller.retrieve('11111111-1')).toThrow(NotFoundException);
  });

  it('should propagate BadRequestException from ParseRutPipe', () => {
    jest.spyOn(service, 'retrieve').mockImplementation(() => {
      throw new BadRequestException('rut must contain only digits, k, or hyphen');
    });

    expect(() => controller.retrieve('abc')).toThrow(BadRequestException);
  });
});
