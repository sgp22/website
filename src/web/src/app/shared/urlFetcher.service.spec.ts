import { UrlFetcher } from './urlFetcher.service';
import { HttpClient } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';

describe('url Fetcher', () => {
  let urlFetcher: UrlFetcher;
  let http: HttpClient;
  // tslint:disable-next-line
  let handler: HttpHandler;
  let correctPath = '';

  beforeEach(() => {
    http = new HttpClient(handler);
    urlFetcher = new UrlFetcher(http);
    correctPath = 'http://docs-site-staging.us-east-1.elasticbeanstalk.com/api/docs/1.0.0/adaptive.json';
  });

  it('should create observable to subscribe', (() => {
    expect(urlFetcher.getDocs(correctPath)).toBeTruthy();
  }));

});
