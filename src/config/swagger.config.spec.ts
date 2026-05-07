import { buildSwaggerConfig } from './swagger.config';

describe('swagger config', () => {
  it('should build swagger document metadata with expected values', () => {
    const config = buildSwaggerConfig();

    expect(config.info.title).toBe('MS Sinacofi API');
    expect(config.info.description).toBe(
      'Sinacofi Microservice API for party authentication and party data management.',
    );
    expect(config.info.version).toBe('1.0.0');
    expect(config.info.contact).toEqual(
      expect.objectContaining({
        name: 'Byron Villegas Moya',
        url: 'https://github.com/byron-villegas/ms-sinacofi',
        email: 'byronvillegasm@gmail.com',
      }),
    );
    expect(config.info.license).toEqual(
      expect.objectContaining({
        name: 'MIT',
        url: 'https://github.com/byron-villegas/ms-sinacofi/blob/main/LICENSE',
      }),
    );
  });

  it('should include servers and tags used by swagger ui', () => {
    const config = buildSwaggerConfig();

    expect(config.servers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          url: 'http://localhost:3000',
          description: 'Local Development Server',
        }),
        expect.objectContaining({
          url: 'https://ms-sinacofi.vercel.app',
          description: 'Vercel Production',
        }),
      ]),
    );
    expect(config.tags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Party Authentication',
          description: 'Endpoints for party authentication validations and party data retrieval',
        }),
        expect.objectContaining({
          name: 'Party Data Management',
          description: 'Endpoints for managing and retrieving party data',
        }),
      ]),
    );
  });
});