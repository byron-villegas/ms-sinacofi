import { Test, TestingModule } from '@nestjs/testing';
import { partyAuthenticationConfig } from '../config/party-authentication.config';
import { PartyAuthenticationController } from './party-authentication.controller';
import { PartyAuthenticationService } from './party-authentication.service';

const mockConfig = {
  identityDocuments: [
    { rut: '12345678-9', serialNumber: 'A123456789', expirationDate: '2030-06-15' },
  ],
};

describe('PartyAuthenticationController', () => {
  let controller: PartyAuthenticationController;
  let service: PartyAuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartyAuthenticationController],
      providers: [
        PartyAuthenticationService,
        { provide: partyAuthenticationConfig.KEY, useValue: mockConfig },
      ],
    }).compile();

    controller = module.get<PartyAuthenticationController>(PartyAuthenticationController);
    service = module.get<PartyAuthenticationService>(PartyAuthenticationService);
  });

  it('should call service.evaluate with request and return result', () => {
    const request = { rut: '11111111-1', serialNumber: 'B000000000' };
    const expected = { isValid: false, expirationDate: '' };
    const spy = jest.spyOn(service, 'evaluate').mockReturnValue(expected);

    const result = controller.evaluate(request);

    expect(spy).toHaveBeenCalledWith(request);
    expect(result).toEqual(expected);
  });
});
