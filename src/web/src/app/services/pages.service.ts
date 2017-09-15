import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

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

  getHomePage() {
    return this.http.get(`${this.apiUrl}pages/?format=json`)
      .map(res => res.json());
  }

}