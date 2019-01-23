import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DocsService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  loadAllDocs() {
    return this.http.get(`${this.apiUrl}/api/docs/ids-css/latest/docs/index.json`);
  }

  loadDocs(params) {
    return this.http.get(`${this.apiUrl}/api/docs/${params}`);
  }
}
