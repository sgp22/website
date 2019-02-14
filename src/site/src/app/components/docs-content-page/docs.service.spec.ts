import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { CacheService } from '../../shared/cache.service';
import { DocsService } from './docs.service';


describe('DocsService', () => {

  describe('#loadDocs', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let docsService: DocsService;

    beforeEach(() => {

      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          CacheService,
          DocsService
        ]
      });

      docsService = TestBed.get(DocsService);
      httpClient = TestBed.get(HttpClient);
      httpTestingController = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
      // After every test, assert that there are no more pending requests.
      httpTestingController.verify();
    });

    it('should GET the document data', () => {
      const testParams = `ids-enterprise/latest/docs/index.json`;
      const testData = { title: 'Test' };
      docsService
        .loadDocs(testParams)
        .subscribe(data =>
          expect(data).toEqual(testData)
        );

      const req = httpTestingController.expectOne(`${environment.apiUrl}/api/docs/${testParams}`);
      expect(req.request.method).toEqual('GET');
      req.flush(testData);
    });
  });
});
