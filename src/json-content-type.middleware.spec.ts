import { JsonContentTypeMiddleware } from './json-content-type.middleware';

describe('JsonContentTypeMiddleware', () => {
  it('should be defined', () => {
    expect(new JsonContentTypeMiddleware()).toBeDefined();
  });
});
