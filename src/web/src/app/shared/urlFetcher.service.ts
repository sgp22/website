import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UrlFetcher {

  constructor(private http: HttpClient) {}

  getDocs(url: string) {
    return this.http.get(url);
  }
}
