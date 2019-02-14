import { Injectable } from '@angular/core';
import { CacheService } from '../../shared/cache.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public apiUrl = environment.apiUrl;

  constructor(
    private cacheService: CacheService,
    private http: HttpClient,
  ) { }

  getSearch(query: string, latestEp: string, latestCSS: string, latestPendo: string) {
    let url = `${this.apiUrl}/site-search/es/`;
    url += `?search_query=${query}`;
    url += `&libraries=ids-enterprise:${latestEp},ids-css:${latestCSS},ids-pendo:${latestPendo}`;
    return this.cacheService.get(url, this.http.get(url).pipe(first()));
  }
}
