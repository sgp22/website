import { AppSettings } from '../app.settings';
import { CacheService } from './cache.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/first';

@Injectable()
export class SitemapService {

  constructor(
    private appSettings: AppSettings,
    private cacheService: CacheService,
    private http: HttpClient
  ) {}

  getSitemap(sidebarPath: string) {
    const url = `${this.appSettings.domainDocsApi}/api/docs/${sidebarPath}/sitemap.json`;
    return this.cacheService.get(url, this.http.get(url).first());
  }
}
