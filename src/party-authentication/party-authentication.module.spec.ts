import { Test, TestingModule } from '@nestjs/testing';
import { PartyAuthenticationController } from './party-authentication.controller';
import { PartyAuthenticationModule } from './party-authentication.module';
import { PartyAuthenticationService } from './party-authentication.service';

describe('PartyAuthenticationModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [PartyAuthenticationModule],
    }).compile();
  });

  it('should compile module', () => {
    expect(module).toBeDefined();
  });

  it('should provide PartyAuthenticationService', () => {
    const service = module.get<PartyAuthenticationService>(PartyAuthenticationService);
    expect(service).toBeDefined();
  });

  it('should register PartyAuthenticationController', () => {
    const controller = module.get<PartyAuthenticationController>(PartyAuthenticationController);
    expect(controller).toBeDefined();
  });
});
