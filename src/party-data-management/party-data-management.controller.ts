import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { PartyProfileRetrieveResponseDto } from './dto/party-profile-retrieve-response.dto';
import { PartyDataManagementService } from './party-data-management.service';
import { ParseRutPipe } from './pipes/parse-rut.pipe';

const NOT_FOUND_SCHEMA = {
  type: 'object',
  properties: {
    message: { type: 'string', example: 'Party with rut 11111111-1 not found' },
    error: { type: 'string', example: 'Not Found' },
    statusCode: { type: 'number', example: 404 },
  },
};

const BAD_REQUEST_SCHEMA = {
  type: 'object',
  properties: {
    message: { type: 'string', example: 'rut must contain only digits, k, or hyphen' },
    error: { type: 'string', example: 'Bad Request' },
    statusCode: { type: 'number', example: 400 },
  },
};

@ApiTags('Party Data Management')
@Controller('api/party-data-management')
export class PartyDataManagementController {
  constructor(
    private readonly partyDataManagementService: PartyDataManagementService,
  ) {}

  @Get(':rut')
  @ApiOperation({ summary: 'Retrieves the profile of a party by RUT' })
  @ApiParam({
    name: 'rut',
    description: 'Chilean RUT of the party',
    example: '12345678-9',
  })
  @ApiOkResponse({
    description: 'Party profile data',
    type: PartyProfileRetrieveResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid RUT format',
    schema: BAD_REQUEST_SCHEMA,
  })
  @ApiNotFoundResponse({
    description: 'Party not found',
    schema: NOT_FOUND_SCHEMA,
  })
  retrieve(
    @Param('rut', ParseRutPipe) rut: string,
  ): PartyProfileRetrieveResponseDto {
    return this.partyDataManagementService.retrieve(rut);
  }
}
