import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AppSettings } from '../app.settings';
import { CacheService } from './cache.service';
import { LibraryService } from './library.service';

describe('LibraryService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let libraryService: LibraryService;
  let appSettingsSpy: AppSettings;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: AppSettings, useValue: { domainDocsApi: 'domainDocsApi' }},
        CacheService,
        LibraryService
      ]
    });

    appSettingsSpy = TestBed.get(AppSettings);
    libraryService = TestBed.get(LibraryService);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('#getAllLibraries', () => {
    const testUrl = `${appSettingsSpy.domainDocsApi}/static/libraries.json`;
    const testData = { title: 'Test' };

    libraryService.getAllLibraries()
      .subscribe(data =>
        expect(data).toEqual(testData)
      );

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });


  it('#getAllLibraryVersionPaths', () => {
    const testLibrary = 'testlib';
    const testUrl = `${appSettingsSpy.domainDocsApi}/api/docs/${testLibrary}/`;
    const testData = { title: 'Test' };

    libraryService.getAllLibraryVersionPaths(testLibrary)
      .subscribe(data =>
        expect(data).toEqual(testData)
      );

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });
});
