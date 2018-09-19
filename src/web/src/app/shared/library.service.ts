import { AppSettings } from '../app.settings';
import { CacheService } from './cache.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/first';

@Injectable()
export class LibraryService {
  constructor(
    private appSettings: AppSettings,
    private cacheService: CacheService,
    private http: HttpClient
  ) {}

  getAllLibraries() {
    return this.cacheService.get('getAllLibraries', this.http.get(`${this.appSettings.domainDocsApi}/static/libraries.json`).first());
  }

  getAllLibraryVersionPaths(library: string) {
    const id = `getAllLibraryVersionPaths-${library}`;
    return this.cacheService.get(id, this.http.get(`${this.appSettings.domainDocsApi}/api/docs/${library}/`));
  }

  async getLatestLibraryVersions(libraries: any) {
    const promises = libraries.map(
      library => this.http.get(`${this.appSettings.domainDocsApi}/api/docs/${library}/`)
        .toPromise()
        .then(res => res)
    );
    const libs = await Promise.all(promises);
    return libs;
  }
}
