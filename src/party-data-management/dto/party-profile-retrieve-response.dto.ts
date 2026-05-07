import { ApiProperty } from '@nestjs/swagger';

export class PartyProfileRetrieveResponseDto {
  @ApiProperty({ description: 'Chilean RUT', example: '12345678-9' })
  rut!: string;

  @ApiProperty({ description: 'Given names', example: 'Juan Carlos' })
  names!: string;

  @ApiProperty({ description: 'First (paternal) last name', example: 'Bodoque' })
  firstLastName!: string;

  @ApiProperty({ description: 'Second (maternal) last name', example: 'Triviño' })
  secondLastName!: string;

  @ApiProperty({ description: 'Sex', enum: ['M', 'F'], example: 'M' })
  sex!: 'M' | 'F';

  @ApiProperty({ description: 'Nationality as ISO 3166-1 alpha-2 country code', example: 'CL' })
  nationality!: string;

  @ApiProperty({
    description: 'Date of birth in yyyy-MM-dd format',
    example: '1990-06-22',
  })
  birthDate!: string;
}
