import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { partyAuthenticationConfig } from '../config/party-authentication.config';
import { PartyAuthenticationController } from './party-authentication.controller';
import { PartyAuthenticationService } from './party-authentication.service';

@Module({
  imports: [ConfigModule.forFeature(partyAuthenticationConfig)],
  controllers: [PartyAuthenticationController],
  providers: [PartyAuthenticationService],
})
export class PartyAuthenticationModule {}
