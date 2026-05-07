import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { partyAuthenticationConfig } from './config/party-authentication.config';
import { PartyAuthenticationModule } from './party-authentication/party-authentication.module';
import { buildPinoHttpOptions } from './config/logger.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [partyAuthenticationConfig],
      isGlobal: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: buildPinoHttpOptions(),
    }),
    PartyAuthenticationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
