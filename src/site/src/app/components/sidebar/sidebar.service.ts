import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  apiUrl = environment.apiUrl;
  libraryStore: {
    libraries: any
  }
  siteMapStore: {
    sitemap: any;
  }

  constructor(
    private http: HttpClient,
  ) {
    this.libraryStore = { libraries: [] };
    this.siteMapStore = { sitemap: [] }
  }

  loadAllLibraries() {
    return this.http.get(`${this.apiUrl}/static/libraries.json`)
      .subscribe(res => {
        this.libraryStore.libraries = res;
      })
  }

  loadSitemap(sidebarPath) {
    return this.http.get(`${this.apiUrl}/api/docs/${sidebarPath}/sitemap.json`);
  }
}
