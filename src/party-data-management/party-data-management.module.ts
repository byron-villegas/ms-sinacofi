import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { partyDataManagementConfig } from '../config/party-data-management.config';
import { PartyDataManagementController } from './party-data-management.controller';
import { PartyDataManagementService } from './party-data-management.service';

@Module({
  imports: [ConfigModule.forFeature(partyDataManagementConfig)],
  controllers: [PartyDataManagementController],
  providers: [PartyDataManagementService],
})
export class PartyDataManagementModule {}
