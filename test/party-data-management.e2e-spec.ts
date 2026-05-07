import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Party Data Management API (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/api/party-data-management/:rut (GET) should return 200 with party profile for existing rut', () => {
    return request(app.getHttpServer())
      .get('/api/party-data-management/18171484-0')
      .expect(200)
      .expect({
        rut: '18171484-0',
        names: 'Juan Carlos',
        firstLastName: 'Bodoque',
        secondLastName: 'Triviño',
        sex: 'M',
        nationality: 'CL',
        birthDate: '1990-06-22',
      });
  });

  it('/api/party-data-management/:rut (GET) should return 404 for unknown rut', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/party-data-management/11111111-1')
      .expect(404);

    expect(response.body.statusCode).toBe(404);
    expect(response.body.error).toBe('Not Found');
    expect(response.body.message).toBe('Party with rut 11111111-1 not found');
  });

  it('/api/party-data-management/:rut (GET) should return 400 for invalid rut format', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/party-data-management/abc')
      .expect(400);

    expect(response.body.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
    expect(response.body.message).toBe('rut must contain only digits, k, or hyphen');
  });
});
