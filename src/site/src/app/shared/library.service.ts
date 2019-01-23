import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  public apiUrl = environment.apiUrl;
  public versionPaths: {
    versions: any
  }

  constructor(
    private http: HttpClient
  ) { }

  loadAllLibraries() {
    return this.http.get(`${this.apiUrl}/static/libraries.json`);
  }

  loadAllLibraryVersions(library: string) {
    return this.http.get(`${this.apiUrl}/api/docs/${library}/`);
  }
}
