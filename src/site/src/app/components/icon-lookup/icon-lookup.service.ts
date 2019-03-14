import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IconLookupService {
  baseUrl = `${environment.apiUrl}/api/docs/ids-identity/latest/theme-uplift/icons`;

  constructor(
    private http: HttpClient
  ) { }

  loadIcons(type: string) {
    return this.http.get(`${this.baseUrl}/${type}/metadata.json`);
  }
}
