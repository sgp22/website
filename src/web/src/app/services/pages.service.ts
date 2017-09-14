import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PagesService {

  root = 'http://docs-site-staging.us-east-1.elasticbeanstalk.com/api/v1/pages';
  format = '?format=json'

  constructor(private http: Http) {
    console.log('PagesService initialized...');
  }

  getAll() {
    return this.http.get(`${this.root}/${this.format}`)
      .map(res => res.json());
  }

  getHomePage() {
    return this.http.get(`${this.root}/3/${this.format}`)
      .map(res => res.json());
  }

}