import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { CacheService } from '../../shared/cache.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private cacheService: CacheService
  ) {}

  loadSitemap(sidebarPath) {
    const url = `${this.apiUrl}/api/docs/${sidebarPath}/sitemap.json`;
    return this.cacheService.get(url, this.http.get(url));
  }

}
