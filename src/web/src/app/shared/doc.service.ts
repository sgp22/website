import { CacheService } from './cache.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/first';

@Injectable()
export class DocService {

  constructor(
    private cacheService: CacheService,
    private http: HttpClient
  ) {}

  getDoc(url: string) {
    return this.cacheService.get(url, this.http.get(url).first());
  }
}
