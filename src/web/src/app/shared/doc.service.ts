import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';

import { tap } from 'rxjs/operators';

import 'rxjs/add/operator/first';

@Injectable()
export class DocService {
  private _dataStore: any = {};

  constructor(private http: HttpClient) {}

  getDoc(docName: string, url: string) {
    if (this._dataStore.hasOwnProperty(docName)) {
      console.log(`service store doc`);
      return Observable.of(this._dataStore[docName]);

    } else {
      return this.http
        .get(url)
        .pipe(tap(res => {
          console.log('http doc');
          this.store(docName, res);
        }))
        .first();
    }
  }

  private store(key: string, data: any) {
    this._dataStore[key] = data;
  }
}
