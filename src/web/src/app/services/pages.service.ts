import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/forkJoin';
import { environment } from '../../environments/environment';

@Injectable()
export class PagesService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    console.log('PagesService initialized...');
  }

  getAll() {
    return this.http.get(`${this.apiUrl}pages`);
  }

  getPage(slug, pageType) {
    return this.http.get(`${this.apiUrl}pages/?format=json&type=${pageType}&fields=*&slug=${slug}`);
  }

  getGlobalNav() {
    return this.http.get(`${this.apiUrl}pages/?format=json&show_in_menus=true`);
  }

}
