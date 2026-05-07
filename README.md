# ms-sinacofi

<p align="center">
  <a href="https://github.com/byron-villegas/ms-sinacofi" target="blank">Sinacofi Microservice — Party Screening API</a>
</p>

<p align="center">
  <a href="https://www.typescriptlang.org/" target="_blank"><img src="https://img.shields.io/badge/typescript-5.7.3-blue.svg" alt="TypeScript" /></a>
  <a href="https://nestjs.com/" target="_blank"><img src="https://img.shields.io/badge/nestjs-11.0.1-red.svg" alt="NestJS" /></a>
  <a href="https://github.com/byron-villegas/ms-sinacofi/blob/main/LICENSE" target="_blank"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" /></a>
  <a href="https://ms-sinacofi.vercel.app" target="_blank"><img src="https://img.shields.io/badge/deploy-Vercel-black.svg" alt="Deploy" /></a>
</p>


## Description

Sinacofi Microservice built with [NestJS](https://github.com/nestjs/nest) following the [BIAN](https://bian.org) standard. It exposes two service domains:

- **Party Authentication** — validates a Chilean identity card (carnet) by RUT and serial number.
- **Party Data Management** — retrieves personal profile data for a party by RUT.

## API documentation (Swagger)

Once the project is running, interactive documentation is available at:

`/api/swagger-ui/index.html`

Local example:

`http://localhost:3000/api/swagger-ui/index.html`

Includes:

- `Party Authentication` endpoints with request/response schemas.
- `Party Data Management` endpoints with request/response schemas.
- DTO validation rules reflected in OpenAPI.

## Main endpoints

- `POST /api/party-authentication/evaluate` — Evaluates whether a Chilean identity document is valid.
- `GET /api/party-data-management/:rut` — Retrieves the profile of a party by RUT.

## Usage examples

### POST /api/party-authentication/evaluate

Request:

```json
{
  "rut": "19889605-5",
  "serialNumber": "A1234567"
}
```

Response 200:

```json
{
  "isValid": true,
  "expirationDate": "2030-06-15"
}
```

Response 200 (not found):

```json
{
  "isValid": false,
  "expirationDate": "1900-01-01"
}
```

### GET /api/party-data-management/:rut

Response 200:

```json
{
  "rut": "18171484-0",
  "names": "Juan Carlos",
  "firstLastName": "Bodoque",
  "secondLastName": "Triviño",
  "sex": "M",
  "nationality": "CL",
  "birthDate": "1990-06-22"
}
```

Response 404:

```json
{
  "message": "Party with rut 11111111-1 not found",
  "error": "Not Found",
  "statusCode": 404
}
```

### Validation 400 error example

```json
{
  "message": "rut must contain only digits, k, or hyphen",
  "error": "Bad Request",
  "statusCode": 400
}
```

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy, the production server is available at:

`https://ms-sinacofi.vercel.app`

For local production build:

```bash
$ npm run build
$ npm run start:prod
```

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [BIAN Standard](https://bian.org)

## Stay in touch

- Author - [Byron Villegas Moya](https://github.com/byron-villegas)
- Repository - [https://github.com/byron-villegas/ms-sinacofi](https://github.com/byron-villegas/ms-sinacofi)

## License

[MIT licensed](LICENSE).
