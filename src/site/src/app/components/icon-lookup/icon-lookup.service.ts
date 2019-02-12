import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IconLookupService {
  baseUrl = `${environment.apiUrl}/api/docs/ids-identity/2.1.0/theme-soho/icons`;

  constructor(
    private http: HttpClient
  ) { }

  loadIcons(type: string) {
    return this.http.get(`${this.baseUrl}/${type}/metadata.json`);
  }
}
