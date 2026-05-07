import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import { partyDataManagementConfig } from '../config/party-data-management.config';
import { PartyProfileRetrieveResponseDto } from './dto/party-profile-retrieve-response.dto';

@Injectable()
export class PartyDataManagementService {
  constructor(
    @Inject(partyDataManagementConfig.KEY)
    private readonly config: ConfigType<typeof partyDataManagementConfig>,
  ) {}

  retrieve(rut: string): PartyProfileRetrieveResponseDto {
    const entry = this.config.parties.find(
      (party) => party.rut.toUpperCase() === rut.toUpperCase(),
    );

    if (!entry) {
      throw new NotFoundException(`Party with rut ${rut} not found`);
    }

    return {
      rut: entry.rut,
      names: entry.names,
      firstLastName: entry.firstLastName,
      secondLastName: entry.secondLastName,
      sex: entry.sex,
      nationality: entry.nationality,
      birthDate: entry.birthDate,
    };
  }
}
