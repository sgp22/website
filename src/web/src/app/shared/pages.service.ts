import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class PagesService {

  constructor(
    private http: HttpClient
  ) {}

  getAll() {
    return this.http.get(`${DOMAIN}/api/${DOMAIN_VERSION}/pages/`);
  }

  getPage(slug, pageType) {
    return this.http.get(`${DOMAIN}/api/${DOMAIN_VERSION}/pages/?format=json&type=${pageType}&fields=*&slug=${slug}`);
  }

  getPreview(id) {
    return this.http.get(`${DOMAIN}/api/${DOMAIN_VERSION}/pages/${id}`);
  }

  getGlobalNav() {
    return this.http.get(`${DOMAIN}/api/${DOMAIN_VERSION}/pages/?format=json&show_in_menus=true`);
  }
}