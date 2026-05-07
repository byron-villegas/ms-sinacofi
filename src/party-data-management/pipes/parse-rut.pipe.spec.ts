import { BadRequestException } from '@nestjs/common';
import { ParseRutPipe } from './parse-rut.pipe';

describe('ParseRutPipe', () => {
  let pipe: ParseRutPipe;

  beforeEach(() => {
    pipe = new ParseRutPipe();
  });

  it('should return rut unchanged when format is valid with hyphen', () => {
    expect(pipe.transform('12345678-9')).toBe('12345678-9');
  });

  it('should return rut unchanged when format is valid with k', () => {
    expect(pipe.transform('12345678-K')).toBe('12345678-K');
  });

  it('should return rut unchanged when format is valid without hyphen', () => {
    expect(pipe.transform('123456789')).toBe('123456789');
  });

  it('should throw BadRequestException when rut contains letters', () => {
    expect(() => pipe.transform('abc')).toThrow(BadRequestException);
  });

  it('should throw BadRequestException when rut is too short', () => {
    expect(() => pipe.transform('123-4')).toThrow(BadRequestException);
  });

  it('should throw BadRequestException when rut contains special characters', () => {
    expect(() => pipe.transform('1234@678-9')).toThrow(BadRequestException);
  });
});
