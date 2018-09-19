import { AppSettings } from '../app.settings';
import { CacheService } from './cache.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class SearchService {
  public docsResults;
  public imagesResults;
  public pagesResults;
  public allVersions;
  public latestEp;
  public latestCSS;
  public latestPendo;

  constructor(
    private appSettings: AppSettings,
    private cacheService: CacheService,
    private http: HttpClient,
  ) { }

  getSearch(query: string, latestEp: string, latestCSS: string, latestPendo: string) {
    let url = `${this.appSettings.domain}/site-search/es/`;
    url += `?search_query=${query}`;
    url += `&libraries=ids-enterprise:${latestEp},ids-css:${latestCSS},ids-pendo:${latestPendo}`;
    return this.cacheService.get(url, this.http.get(url).first());
  }
}
