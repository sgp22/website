import { CacheService } from './cache.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/first';
import 'rxjs/add/observable/throw';

@Injectable()
export class DocService {

  constructor(
    private cacheService: CacheService,
    private http: HttpClient
  ) {}

  getDoc(url: string) {
    return this.cacheService.get(url, this.http
      .get(url)).first()
      .catch((err: Response) => {
        if (err.status === 400) {
          console.error(`${err.status}`);
          return JSON.stringify(0);
        } else {
          return Observable.throw(new Error(`${err.status} ${err.statusText}`));
        }
    });
  }
}
