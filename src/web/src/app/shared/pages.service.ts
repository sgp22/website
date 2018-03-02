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
    return this.http.get(`${DOMAIN}/api/${DOMAIN_VERSION}/pages/?&limit=200`).first();
  }

  getPage(id) {
    return this.http.get(`${DOMAIN}/api/${DOMAIN_VERSION}/pages/${id}/`).first();
  }

  getGlobalNav() {
    return this.http.get(`${DOMAIN}/api/${DOMAIN_VERSION}/pages/?format=json&show_in_menus=true`).first();
  }
}
