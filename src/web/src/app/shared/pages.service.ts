import { CacheService } from './cache.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

interface CacheContent {
  value: any;
}

@Injectable()
export class PagesService {

  constructor(
    private cacheService: CacheService,
    private http: HttpClient
  ) {}

  getAll() {
    const url = `${DOMAIN}/api/${DOMAIN_VERSION}/pages/?&limit=200`;
    return this.cacheService.get(url, this.http.get(url).first());
  }

  getPage(id) {
    return this.http.get(`${DOMAIN}/api/${DOMAIN_VERSION}/pages/${id}/`).first();
  }

  getGlobalNav() {
    return this.http.get(`${DOMAIN}/api/${DOMAIN_VERSION}/pages/?format=json&show_in_menus=true`).first();
  }
}
