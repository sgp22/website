import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

@Injectable()
export class PagesService {

  apiUrl = environment.apiUrl;

  constructor(private http: Http) {
    console.log('PagesService initialized...');  
  }

  getAll() {
    return this.http.get(`${this.apiUrl}pages/?format=json`)
      .map(res => res.json());
  }

  getPage(id) {
    return this.http.get(`${this.apiUrl}pages/${id}/?format=json`)
      .map(res => res.json());
  }

  getHomePage() {
    return this.http.get(`${this.apiUrl}pages/3/?format=json`)
      .map(res => res.json());
  }

}