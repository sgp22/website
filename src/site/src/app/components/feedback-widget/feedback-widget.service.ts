import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';

const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class FeedbackWidgetService {
  public apiUrl = `${environment.apiUrl}/api/stats/thumbs/`;

  constructor(
    private http: HttpClient
  ) { }

  getThumbsByPage(relative_url: string) {
    return this.http
      .get(`${this.apiUrl}?relative_url=${relative_url}`)
      .pipe(
        catchError((err: Response) => {
          if (err.status === 400) {
            return JSON.stringify(0);
          } else {
            return Observable.throw(new Error(`${err.status} ${err.statusText}`));
          }
        })
      );
  }

  addThumb(data: any) {
    return this.http.post(this.apiUrl, data, { headers });
  }

}
