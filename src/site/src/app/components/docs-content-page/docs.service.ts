import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { throwError as _throw } from 'rxjs';
import { first } from 'rxjs/operators';
import { CacheService } from '../../shared/cache.service';

@Injectable({
  providedIn: 'root'
})
export class DocsService {
  apiUrl = environment.apiUrl;
  docsStore: {
    docs: any
  }

  constructor(
    private http: HttpClient,
    private cacheService: CacheService
  ) {}

  loadAllDocs() {
    return this.http.get(`${this.apiUrl}/api/docs/ids-css/latest/docs/index.json`).pipe(first());
  }

  loadDocs(params) {
    const url = `${this.apiUrl}/api/docs/${params}`;
    return this.cacheService.get(url, this.http.get(url).pipe(first()))
  }
}
