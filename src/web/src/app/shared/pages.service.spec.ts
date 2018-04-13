import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AppSettings } from '../app.settings';
import { CacheService } from './cache.service';
import { PagesService } from './pages.service';

describe('PagesService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let pagesService: PagesService;
  let appSettingsSpy: AppSettings;

  beforeEach(() => {
    const mockSettings = {
      domain: 'domain',
      domainVersion: 'domainVersion'
    };

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: AppSettings, useValue: mockSettings },
        CacheService,
        PagesService
      ]
    });

    appSettingsSpy = TestBed.get(AppSettings);
    pagesService = TestBed.get(PagesService);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);

  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('#getAll should GET the data', () => {
    const testUrl = `${appSettingsSpy.domain}/api/${appSettingsSpy.domainVersion}/pages/?&limit=200`;
    const testData = { title: 'Test' };

    pagesService.getAll()
      .subscribe(data =>
        expect(data).toEqual(testData)
      );

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });


  it('#getPage should GET the data', () => {
    const testId = 1;
    const testUrl = `${appSettingsSpy.domain}/api/${appSettingsSpy.domainVersion}/pages/${testId}/`;
    const testData = { title: 'Test' };

    pagesService.getPage(testId)
      .subscribe(data =>
        expect(data).toEqual(testData)
      );

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });

  it('#getGlobalNav should GET the data', () => {
    const testUrl = `${appSettingsSpy.domain}/api/${appSettingsSpy.domainVersion}/pages/?format=json&show_in_menus=true`;
    const testData = { title: 'Test' };

    pagesService.getGlobalNav()
      .subscribe(data =>
        expect(data).toEqual(testData)
      );

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });
});
