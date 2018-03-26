import { CacheService } from './cache.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/first';

@Injectable()
export class LibraryService {
  private _dataStore: any;

  constructor(
    private cacheService: CacheService,
    private http: HttpClient
  ) {}

  getAllLibraries() {
    return this.cacheService.get('getAllLibraries', this.http.get(`${DOMAIN_DOCS_API}/static/libraries.json`).first());
  }

  getAllLibraryVersionPaths(library: string) {
    const id = `getAllLibraryVersionPaths-${library}`;
    return this.cacheService.get(id, this.http.get(`${DOMAIN_DOCS_API}/api/docs/${library}/`));
  }
}
