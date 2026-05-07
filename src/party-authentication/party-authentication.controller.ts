import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { IdentityDocumentEvaluationRequestDto } from './dto/identity-document-evaluation-request.dto';
import { IdentityDocumentEvaluationResponseDto } from './dto/identity-document-evaluation-response.dto';
import { PartyAuthenticationService } from './party-authentication.service';

const VALIDATION_BAD_REQUEST_SCHEMA = {
  type: 'object',
  properties: {
    message: {
      type: 'array',
      items: { type: 'string' },
      example: [
        'rut must contain only digits, k, or hyphen',
        'serialNumber must contain only uppercase letters and digits',
      ],
    },
    error: { type: 'string', example: 'Bad Request' },
    statusCode: { type: 'number', example: 400 },
  },
};

@ApiTags('Party Authentication')
@Controller('party-authentication')
export class PartyAuthenticationController {
  constructor(
    private readonly partyAuthenticationService: PartyAuthenticationService,
  ) {}

  @Post('evaluate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Evaluates whether a Chilean identity document is valid' })
  @ApiBody({
    type: IdentityDocumentEvaluationRequestDto,
    description: 'RUT and serial number of the identity document to evaluate',
  })
  @ApiOkResponse({
    description: 'Identity document evaluation result',
    type: IdentityDocumentEvaluationResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid payload based on validation rules',
    schema: VALIDATION_BAD_REQUEST_SCHEMA,
  })
  evaluate(
    @Body() request: IdentityDocumentEvaluationRequestDto,
  ): IdentityDocumentEvaluationResponseDto {
    return this.partyAuthenticationService.evaluate(request);
  }
}
