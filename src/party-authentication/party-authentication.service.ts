import { Inject, Injectable } from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import { partyAuthenticationConfig } from '../config/party-authentication.config';
import { IdentityDocumentEvaluationRequestDto } from './dto/identity-document-evaluation-request.dto';
import { IdentityDocumentEvaluationResponseDto } from './dto/identity-document-evaluation-response.dto';

@Injectable()
export class PartyAuthenticationService {
  constructor(
    @Inject(partyAuthenticationConfig.KEY)
    private readonly config: ConfigType<typeof partyAuthenticationConfig>,
  ) {}

  evaluate(
    request: IdentityDocumentEvaluationRequestDto,
  ): IdentityDocumentEvaluationResponseDto {
    const entry = this.config.identityDocuments.find(
      (doc) =>
        doc.rut.toUpperCase() === request.rut.toUpperCase() &&
        doc.serialNumber.toUpperCase() === request.serialNumber.toUpperCase(),
    );

    if (!entry) {
      return { isValid: false, expirationDate: '1900-01-01' };
    }

    return { isValid: true, expirationDate: entry.expirationDate };
  }
}
