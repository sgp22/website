import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { CacheService } from './cache.service';
import { TokenService } from './token.service';
import { Token } from './token';

describe('TokenService', () => {
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
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
    const testUrl = `${testDomain}/api/docs/${testLibrary}/${testVersion}/tokens/web/theme-soho.raw.json`;
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

  describe('#groupTokensByCategory', () => {
    const mockTokenData = {
      'aliases': {
        'ALIAS_A': {},
        'ALIAS_B': {}
      },
      'props': {
        'token-one': {
          'category': 'categoryA',
          'name': 'token-one'
        },
        'token-two': {
          'category': 'categoryB',
          'name': 'token-two'
        },
        'token-three': {
          'category': 'categoryA',
          'name': 'token-three'
        }
      }
    };

    let results: {};

    beforeEach(() => {
      results = tokenService.groupTokensByCategory(mockTokenData);
    });

    it('should group the "props" by their category', () => {
      expect(Array.isArray(results['categoryA'])).toBeTruthy();
      expect(results['categoryA'].length).toBe(2);

      expect(Array.isArray(results['categoryB'])).toBeTruthy();
      expect(results['categoryB'].length).toBe(1);
    });

    it('should derive a "description" property from the "name" property', () => {
      for (const category of Object.keys(results)) {
        for (const token of results[category]) {
          expect(token['description']).toBeDefined();
        }
      }
    });

    it('should Title Case the "description" and remove dashes', () => {
      for (const category of Object.keys(results)) {
        for (const token of results[category]) {
          expect(token['description']).toBeDefined();
          expect(token['description'].indexOf('-')).toBe(-1);

          // Now Check title case
          const theDesc = token['description'];
          const capitalDesc = theDesc.toUpperCase();

          // Compare the first character of each string
          expect(theDesc.substr(0, 1)).toBe(capitalDesc.substr(0, 1));

          // Compare the character after the space for each string
          const theCharAfterTheSpace = (str) => {
            return str.substr(str.indexOf(' ') + 1, 1);
          };
          expect(theCharAfterTheSpace(theDesc)).toBe(theCharAfterTheSpace(capitalDesc));
        }
      }
    });
  });
});
