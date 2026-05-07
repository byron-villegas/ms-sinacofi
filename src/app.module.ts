import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { partyAuthenticationConfig } from './config/party-authentication.config';
import { partyDataManagementConfig } from './config/party-data-management.config';
import { PartyAuthenticationModule } from './party-authentication/party-authentication.module';
import { PartyDataManagementModule } from './party-data-management/party-data-management.module';
import { buildPinoHttpOptions } from './config/logger.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [partyAuthenticationConfig, partyDataManagementConfig],
      isGlobal: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: buildPinoHttpOptions(),
    }),
    PartyAuthenticationModule,
    PartyDataManagementModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
