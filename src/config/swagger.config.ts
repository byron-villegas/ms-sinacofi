import { DocumentBuilder } from '@nestjs/swagger';

export function buildSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('MS Sinacofi API')
    .setDescription(
      'Sinacofi Microservice API for party authentication and health checks',
    )
    .setVersion('1.0.0')
    .setContact(
      'Byron Villegas Moya',
      'https://github.com/byron-villegas/ms-sinacofi',
      'byronvillegasm@gmail.com',
    )
    .setLicense(
      'MIT',
      'https://github.com/byron-villegas/ms-sinacofi/blob/main/LICENSE',
    )
    .addServer('http://localhost:3000', 'Local Development Server')
    .addServer('https://ms-sinacofi.vercel.app', 'Vercel Production')
    .addTag('Party Authentication', 'Endpoints for party authentication validations and party data retrieval')
    .build();
}