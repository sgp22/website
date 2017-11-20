import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class PagesService {

  public apiUrl: string = DOMAIN;
  public apiVersion: string = DOMAIN_VERSION;

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get(`${this.apiUrl}/api/${this.apiVersion}/pages`);
  }

  getPage(slug, pageType) {
    return this.http.get(`${this.apiUrl}/api/${this.apiVersion}/pages?format=json&type=${pageType}&fields=*&slug=${slug}`);
  }

  getGlobalNav() {
    return this.http.get(`${this.apiUrl}/api/${this.apiVersion}/pages/?format=json&show_in_menus=true`);
  }
}
