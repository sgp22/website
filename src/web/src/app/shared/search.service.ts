import { AppSettings } from '../app.settings';
import { CacheService } from './cache.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SearchService {
  public docsResults;
  public imagesResults;
  public pagesResults;

  constructor(
    private appSettings: AppSettings,
    private cacheService: CacheService,
    private http: HttpClient,
  ) { }

  getSearch(query: string) {
    const url = `${this.appSettings.domain}/search/es/?search_query=${query}&libraries=ids-enterprise:4.10.0,ids-css:1.3.0,ids-pendo:1.0.0`;
    return this.cacheService.get(url, this.http.get(url).first());
  }
}
