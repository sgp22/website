import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../../environments/environment';
import { CacheService } from '../../shared/cache.service';
import { SidebarService } from './sidebar.service';

describe('SidebarService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let sitemapService: SidebarService;
  const mockSettings = environment.apiUrl;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CacheService,
        SidebarService
      ]
    });

    sitemapService = TestBed.get(SidebarService);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('#loadSitemap should GET data', () => {
    const testPath = 'ids-enterprise/latest';
    const testUrl = `${mockSettings}/api/docs/${testPath}/sitemap.json`;
    const testData = { title: 'Test' };

    sitemapService.loadSitemap(testPath)
      .subscribe(data =>
        expect(data).toEqual(testData)
      );

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });
});
