import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class UrlFetcher {

  constructor(private http: Http) {}

  getDocs(url: string) {
    this.http.get(url).subscribe(data => {
      console.log(data);
    });
  }
}
