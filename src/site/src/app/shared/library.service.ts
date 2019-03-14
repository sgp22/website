import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  public apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  loadAllLibraries() {
    return this.http.get(`${this.apiUrl}/api/library-versions`);
  }

  loadAllLibraryVersions(library: string) {
    return this.http.get(`${this.apiUrl}/api/library-versions/${library}/`);
  }

  /** ToDo - Refactor to use new routes */
  async getLatestLibraryVersions(libraries: any) {
    const promises = libraries.map(
      library => this.http.get(`${this.apiUrl}/api/docs/${library}/`)
        .toPromise()
        .then(res => res)
    );
    const libs = await Promise.all(promises);
    return libs;
  }
}
