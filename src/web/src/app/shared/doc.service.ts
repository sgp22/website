import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { tap } from 'rxjs/operators';

import 'rxjs/add/operator/first';

@Injectable()
export class DocService {
  private _dataStore: any = {};

  constructor(private http: HttpClient) {}

  getDoc(url: string) {
    if (this._dataStore.hasOwnProperty(url)) {
      console.log(`service store doc`);
      return Observable.of(this._dataStore[url]);

    } else {
      return this.http
        .get(url)
        .pipe(tap(res => {
          console.log('http doc');
          this.store(url, res);
        }))
        .first();
    }
  }

  private store(key: string, data: any) {
    this._dataStore[key] = data;
  }
}
