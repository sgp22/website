import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) {}

  loadSitemap(sidebarPath) {
    return this.http.get(`${this.apiUrl}/api/docs/${sidebarPath}/sitemap.json`);
  }

}
