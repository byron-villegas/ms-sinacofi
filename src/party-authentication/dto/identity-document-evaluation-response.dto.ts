import { ApiProperty } from '@nestjs/swagger';

export class IdentityDocumentEvaluationResponseDto {
  @ApiProperty({
    description: 'Indicates whether the identity document is valid',
    example: true,
  })
  isValid!: boolean;

  @ApiProperty({
    description: 'Expiration date of the identity document in yyyy-MM-dd format',
    example: '2030-12-31',
  })
  expirationDate!: string;
}
