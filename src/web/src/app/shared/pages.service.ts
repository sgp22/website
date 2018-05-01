import { AppSettings } from '../app.settings';
import { CacheService } from './cache.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { switchMap } from 'rxjs/operators';

interface CacheContent {
  value: any;
}

@Injectable()
export class PagesService {
  public page;

  constructor(
    private appSettings: AppSettings,
    private cacheService: CacheService,
    private http: HttpClient,
  ) {}

  getAll() {
    const url = `${this.appSettings.domain}/api/${this.appSettings.domainVersion}/pages/?&limit=200`;
    return this.cacheService.get(url, this.http.get(url).first());
  }

  getPage(id) {
    return this.http.get(`${this.appSettings.domain}/api/${this.appSettings.domainVersion}/pages/${id}/`).first();
  }

  getGlobalNav() {
    return this.http.get(`${this.appSettings.domain}/api/${this.appSettings.domainVersion}/pages/?format=json&show_in_menus=true`).first();
  }

  getCurrentPage(slug) {
    return this.getAll()
      .map(
        res => {
          this.page = res.items.filter(res => res.meta.slug === slug);
        })
        .switchMap(res => this.getPage(this.page[0].id))
        .first();
  }

  public createPage(route) {

    const url = route;
    const urlSegments = url.split('/');
    const slug = urlSegments.slice(-1)[0];

    return this.getCurrentPage(slug).first();

  }
}
