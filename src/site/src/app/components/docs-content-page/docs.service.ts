import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError as _throw } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocsService {
  apiUrl = environment.apiUrl;
  docsStore: {
    docs: any
  }

  constructor(
    private http: HttpClient,
  ) {}

  loadAllDocs() {
    return this.http.get(`${this.apiUrl}/api/docs/ids-css/latest/docs/index.json`);
  }

  loadDocs(params) {
    return this.http.get(`${this.apiUrl}/api/docs/${params}`).pipe(first())
  }
}
