import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { tap } from 'rxjs/operators';

import 'rxjs/add/operator/first';

@Injectable()
export class LibraryService {
  private _dataStore: any;

  constructor(private http: HttpClient) {
    this._dataStore = {};
  }

  getAllLibraries() {
    let key = 'getAllLibraries';

    if (this._dataStore.hasOwnProperty(key)) {
      console.log(`service store ${key}`);
      return Observable.of(this._dataStore[key]);

    } else {
      return this.http
        .get(`${DOMAIN_DOCS_API}/static/libraries.json`)
        .pipe(tap(res => {
          console.log(`http ${key}`);
          this.store(key, res);
        }))
        .first();
    }
  }

  getAllLibraryVersionPaths(library: string) {
    let key = 'getAllLibraryVersionPaths';

    if (this._dataStore.hasOwnProperty(key)) {
      console.log(`service store ${key}`);
      return Observable.of(this._dataStore[key]);

    } else {
      return this.http
      .get(`${DOMAIN_DOCS_API}/api/docs/${library}/`)
      .pipe(tap(res => {
        console.log(`http ${key}`);
        this.store(key, res);
      }))
      .first()
    }
  }

  private store(key: string, data: any) {
    this._dataStore[key] = data;
  }
}
