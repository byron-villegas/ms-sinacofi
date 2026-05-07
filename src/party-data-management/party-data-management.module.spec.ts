import { Test, TestingModule } from '@nestjs/testing';
import { PartyDataManagementController } from './party-data-management.controller';
import { PartyDataManagementModule } from './party-data-management.module';
import { PartyDataManagementService } from './party-data-management.service';

describe('PartyDataManagementModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [PartyDataManagementModule],
    }).compile();
  });

  it('should compile module', () => {
    expect(module).toBeDefined();
  });

  it('should provide PartyDataManagementService', () => {
    const service = module.get<PartyDataManagementService>(PartyDataManagementService);
    expect(service).toBeDefined();
  });

  it('should register PartyDataManagementController', () => {
    const controller = module.get<PartyDataManagementController>(PartyDataManagementController);
    expect(controller).toBeDefined();
  });
});
