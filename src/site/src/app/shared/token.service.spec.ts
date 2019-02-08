import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { CacheService } from './cache.service';
import { TokenService } from './token.service';

describe('TokenService', () => {
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CacheService,
        TokenService
      ]
    });
    tokenService = TestBed.get(TokenService);
  });

  describe('#getTokenData', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    const testDomain = 'domain';
    const testLibrary = 'library';
    const testVersion = 'version';
    const testUrl = `${testDomain}/api/docs/${testLibrary}/${testVersion}/tokens/web/theme-soho.simple.json`;
    const testData = { title: 'Test' };

    beforeEach(() => {
      httpClient = TestBed.get(HttpClient);
      httpTestingController = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
      // After every test, assert that there are no more pending requests.
      httpTestingController.verify();
    });

    it('should GET the data', () => {
      tokenService.getTokenData(testDomain, testLibrary, testVersion)
        .subscribe(data =>
          expect(data).toEqual(testData)
        );

      const req = httpTestingController.expectOne(testUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(testData);
    });

    it('should handle 400 statuses and return "[]"', () => {
      const emsg = 'deliberate 404 error';

      tokenService.getTokenData(testDomain, testLibrary, testVersion).subscribe(
        data => {
          expect(typeof data).toBe('string');
        }
      );
      const req = httpTestingController.expectOne(testUrl);
      req.flush(emsg, { status: 400, statusText: '[]' });
    });

    it('should handle non-404 statuses and throw an error', () => {
      const emsg = 'deliberate 404 error';

      tokenService.getTokenData(testDomain, testLibrary, testVersion).subscribe(
        data => fail('should throw Observable Error'),
        (error: HttpErrorResponse) => {
          expect(error.message).toEqual('404 Not Found');
        }
      );

      const req = httpTestingController.expectOne(testUrl);
      req.flush(emsg, { status: 404, statusText: 'Not Found' });
    });
  });

});
