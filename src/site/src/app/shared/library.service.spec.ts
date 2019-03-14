import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';
import { LibraryService } from './library.service';

describe('LibraryService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let libraryService: LibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
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

  it('#getAllLibraries', () => {
    const testUrl = `${environment.apiUrl}/api/library-versions`;
    const testData = { title: 'Test' };

    libraryService.loadAllLibraries()
      .subscribe(data =>
        expect(data).toEqual(testData)
      );

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });


  it('#getAllLibraryVersionPaths', () => {
    const testLibrary = 'testlib';
    const testUrl = `${environment.apiUrl}/api/library-versions/${testLibrary}/`;
    const testData = { title: 'Test' };

    libraryService.loadAllLibraryVersions(testLibrary)
      .subscribe(data =>
        expect(data).toEqual(testData)
      );

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });
});
