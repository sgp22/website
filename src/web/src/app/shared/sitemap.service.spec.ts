import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AppSettings } from '../app.settings';
import { CacheService } from './cache.service';
import { SitemapService } from './sitemap.service';

describe('SitemapService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let sitemapService: SitemapService;
  let appSettingsSpy: AppSettings;

  beforeEach(() => {
    const mockSettings = { domainDocsApi: 'domainDocsApi' };

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: AppSettings, useValue: mockSettings },
        CacheService,
        SitemapService
      ]
    });

    appSettingsSpy = TestBed.get(AppSettings);
    sitemapService = TestBed.get(SitemapService);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('#getSitemap should get data', () => {
    const testPath = 'sidebar';
    const testUrl = `${appSettingsSpy.domainDocsApi}/api/docs/${testPath}/sitemap.json`;
    const testData = { title: 'Test' };

    sitemapService.getSitemap(testPath)
      .subscribe(data =>
        expect(data).toEqual(testData)
      );

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });
});
