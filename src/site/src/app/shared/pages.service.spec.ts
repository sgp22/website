import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';
import { PagesService } from './pages.service';

describe('PagesService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let pagesService: PagesService;

  beforeEach(() => {
    const mockSettings = {
      domain: 'domain',
      domainVersion: 'domainVersion'
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CacheService,
        PagesService
      ]
    });

    pagesService = TestBed.get(PagesService);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);

  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('#getAll should GET the data', () => {
    const testUrl = `${environment.apiUrl}/api/${environment.domainVersion}/pages/?&limit=200`;
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
    const testUrl = `${environment.apiUrl}/api/${environment.domainVersion}/pages/${testId}/`;
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
    const testUrl = `${environment.apiUrl}/api/${environment.domainVersion}/pages/?format=json&type=home.LandingPage&show_in_menus=true`;
    const testData = { title: 'Test' };

    pagesService.getGlobalNav()
      .subscribe(data =>
        expect(data).toEqual(testData)
      );

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });

  it('#getCMSSidebarParent should GET the data', () => {
    const section = 'testSection';
    const testUrl = `${environment.apiUrl}/api/${environment.domainVersion}/pages/?format=json&limit=200&slug=${section}`;
    const testData = { title: 'Test' };

    pagesService.getCMSSidebarParent(section)
      .subscribe(data =>
        expect(data).toEqual(testData)
      );

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });

  it('#getCMSSidebarNav should GET the data', () => {
    const id = 1;
    const testUrl = `${environment.apiUrl}/api/${environment.domainVersion}/pages/?format=json&limit=200&child_of=${id}&show_in_menus=true`;
    const testData = { title: 'Test' };

    pagesService.getCMSSidebarNav(id)
      .subscribe(data =>
        expect(data).toEqual(testData)
      );

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });
});
