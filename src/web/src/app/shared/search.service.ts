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

  getSearch(query) {
    const url = `${this.appSettings.domain}/search/es/?search_query=${query}&search_in=pages,docs&docs_search_fields=path,content&wt_search_fields=title`;
    return this.cacheService.get(url, this.http.get(url).first());
  }
}
