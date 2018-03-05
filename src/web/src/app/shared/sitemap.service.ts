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
    if (this._dataStore.hasOwnProperty(sidebarPath)) {
      console.log(`service store '${sidebarPath}'`);
      return Observable.of(this._dataStore[sidebarPath]);

    } else {
      return this.http
        .get(`${DOMAIN_DOCS_API}/api/docs/${sidebarPath}/sitemap.json`)
        .pipe(tap(res => {
          console.log(`http '${sidebarPath}'`);
          this.store(sidebarPath, res);
        }))
        .first();
    }
  }

  private store(key: string, data: any) {
    this._dataStore[key] = data;
  }
}
