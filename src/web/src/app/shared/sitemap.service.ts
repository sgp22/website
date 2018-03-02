import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';

import { tap } from 'rxjs/operators';

import 'rxjs/add/operator/first';

@Injectable()
export class SitemapService {
  private _dataStore: any = {};

  constructor(private http: HttpClient) {}

  getSitemap(sidebarPath: string) {
    const key = 'sitemap';

    if (this._dataStore.hasOwnProperty(key)) {
      console.log(`service store ${key}`);
      return Observable.of(this._dataStore[key]);

    } else {
      return this.http
        .get(`${DOMAIN_DOCS_API}/api/docs/${sidebarPath}/sitemap.json`)
        .pipe(tap(res => {
          console.log(`http ${key}`);
          this.store(key, res);
        }))
        .first();
    }
  }

  private store(key: string, data: any) {
    this._dataStore[key] = data;
  }
}
