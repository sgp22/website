import { AppSettings } from '../app.settings';
import { CacheService } from './cache.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { _throw } from "rxjs/observable/throw";


const headers = new HttpHeaders().set("Content-Type", "application/json");

@Injectable()
export class FeedbackService {

  constructor(
    private appSettings: AppSettings,
    private cacheService: CacheService,
    private http: HttpClient,
  ) { }

  getThumbs(url: string) {
    return this.cacheService.get(url,
      this.http
        .get(url)
        .catch((err: Response) => {
          if (err.status === 400) {
            return JSON.stringify(0);
          } else {
            return Observable.throw(new Error(`${err.status} ${err.statusText}`));
          }
        })
      )
  }

  addThumb(page: string, data: any) {
    return this.http
      .post(`${this.appSettings.domain}/api/feedback/thumbs/${page}/2/`, data, {headers})
      .subscribe(
        val => {
          console.log("POST call successful value returned in body", val);
        },
        res => {
          console.log("POST call in error", res);
        },
        () => {
          console.log("The POST observable is now completed.");
        }
      );
  }
}
