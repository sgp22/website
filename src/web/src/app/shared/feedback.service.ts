import { AppSettings } from '../app.settings';
import { CacheService } from './cache.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable()
export class FeedbackService {
  public baseUrl = `${this.appSettings.domain}/api/stats/thumbs/`;

  constructor(
    private appSettings: AppSettings,
    private cacheService: CacheService,
    private http: HttpClient,
  ) { }

  getThumbsByPage(relative_url: string) {
    return this.http
      .get(`${this.baseUrl}?relative_url=${relative_url}`)
      .catch((err: Response) => {
        if (err.status === 400) {
          return JSON.stringify(0);
        } else {
          return Observable.throw(new Error(`${err.status} ${err.statusText}`));
        }
      });
  }

  addThumb(data: any) {
    return this.http.post(this.baseUrl, data, {headers});
  }
}
