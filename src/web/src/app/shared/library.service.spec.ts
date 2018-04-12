import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { CacheService } from './cache.service';
import { LibraryService } from './library.service';


fdescribe('LibraryService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let libraryService: LibraryService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        CacheService,
        LibraryService
      ]
    });

    libraryService = TestBed.get(LibraryService);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  describe('#getAllLibraries', () => {
    const testUrl = `${process.env.DOMAIN_DOCS_API}/static/libraries.json`;
    const testData = { title: 'Test' };

    it('can GET all libraries', () => {
      // Make an HTTP GET request
      libraryService.getAllLibraries()
        .subscribe(data =>
          expect(data).toEqual(testData)
        );

      const req = httpTestingController.expectOne(testUrl);
      console.log(req);
      expect(req.request.method).toEqual('GET');
      req.flush(testData);
    });
  });
})
