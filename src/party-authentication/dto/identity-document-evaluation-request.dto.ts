import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IdentityDocumentEvaluationRequestDto {
  @ApiProperty({
    description: 'Person Chilean RUT',
    example: '11111111-1',
    minLength: 7,
    maxLength: 10,
    pattern: '^[0-9kK-]+$',
  })
  @IsString()
  @IsNotEmpty()
  @Length(7, 10)
  @Matches(/^[0-9kK-]+$/, {
    message: 'rut must contain only digits, k, or hyphen',
  })
  rut!: string;

  @ApiProperty({
    description: 'Serial number printed on the identity card',
    example: 'A123456789',
    minLength: 7,
    maxLength: 12,
    pattern: '^[A-Z0-9]+$',
  })
  @IsString()
  @IsNotEmpty()
  @Length(7, 12)
  @Matches(/^[A-Z0-9]+$/, {
    message: 'serialNumber must contain only uppercase letters and digits',
  })
  serialNumber!: string;
}
