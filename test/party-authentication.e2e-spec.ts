import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Party Authentication API (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/api/party-authentication/evaluate (POST) should return 200 with isValid=false for unknown document', () => {
    return request(app.getHttpServer())
      .post('/api/party-authentication/evaluate')
      .send({
        rut: '11111111-1',
        serialNumber: 'Z000000000',
      })
      .expect(200)
      .expect({ isValid: false, expirationDate: '1900-01-01' });
  });

  it('/api/party-authentication/evaluate (POST) should return 200 with isValid=true for registered document', () => {
    return request(app.getHttpServer())
      .post('/api/party-authentication/evaluate')
      .send({
        rut: '19889605-5',
        serialNumber: 'A1234567',
      })
      .expect(200)
      .expect({ isValid: true, expirationDate: '2030-06-15' });
  });

  it('/api/party-authentication/evaluate (POST) should return 400 for invalid payload', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/party-authentication/evaluate')
      .send({
        rut: 'abc',
        serialNumber: '!!!',
      })
      .expect(400);

    expect(response.body.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
    expect(response.body.message).toEqual(
      expect.arrayContaining([
        'rut must contain only digits, k, or hyphen',
        'serialNumber must contain only uppercase letters and digits',
      ]),
    );
  });
});
