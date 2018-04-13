import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { CacheService } from './cache.service';
import { DocService } from './doc.service';


describe('DocService', () => {

  describe('#getDoc', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let docService: DocService;

    const testUrl = '/doc';
    const testData = { title: 'Doc' };

    beforeEach(() => {

      TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ],
        providers: [
          CacheService,
          DocService
        ]
      });

      docService = TestBed.get(DocService);

      httpClient = TestBed.get(HttpClient);
      httpTestingController = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
      // After every test, assert that there are no more pending requests.
      httpTestingController.verify();
    });

    it('should GET the document data', () => {
      docService
        .getDoc(testUrl)
        .subscribe(data =>
          expect(data).toEqual(testData)
        );

      const req = httpTestingController.expectOne(testUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(testData);
    });

    it('should handle 400 statuses and return "0"', () => {
      const emsg = 'deliberate 404 error';

      docService.getDoc(testUrl).subscribe(
        data => {
          expect(data).toEqual('0');
        }
      );
      const req = httpTestingController.expectOne(testUrl);
      req.flush(emsg, { status: 400, statusText: '0' });
    });

    it('should handle non-404 statuses and throw an error', () => {
      const emsg = 'deliberate 404 error';

      docService.getDoc(testUrl).subscribe(
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
