import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseRutPipe implements PipeTransform<string, string> {
  private static readonly RUT_PATTERN = /^[0-9]{7,9}[kK0-9]$|^[0-9]{7,9}-[kK0-9]$/;

  transform(value: string): string {
    if (!ParseRutPipe.RUT_PATTERN.test(value)) {
      throw new BadRequestException(
        'rut must contain only digits, k, or hyphen',
      );
    }
    return value;
  }
}
