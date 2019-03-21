import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CacheService } from './cache.service';
import { environment } from '../../environments/environment';
import { share, first, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  apiUrl = environment.apiUrl;
  domainVersion = environment.domainVersion;
  page;

  constructor(
    private http: HttpClient,
    private cacheService: CacheService
  ) { }

  getGlobalNav() {
    return this.http.get(`${this.apiUrl}/api/${this.domainVersion}/pages/?format=json&type=home.LandingPage&show_in_menus=true`).pipe(first());
  }

  getCMSSidebarParent(section: string) {
    const url = `${this.apiUrl}/api/${this.domainVersion}/pages/?format=json&limit=200&slug=${section}`;
    return this.cacheService.get(url, this.http.get(url).pipe(first()));
  }

  getCMSSidebarNav(id: number) {
    const url = `${this.apiUrl}/api/${this.domainVersion}/pages/?format=json&limit=200&child_of=${id}&show_in_menus=true`;
    return this.cacheService.get(url, this.http.get(url).pipe(first()));
  }

  getAll() {
    const url = `${this.apiUrl}/api/${this.domainVersion}/pages/?&limit=200`;
    return this.cacheService.get(url, this.http.get(url).pipe(share(), first()));
  }

  getPage(id) {
    const url = `${this.apiUrl}/api/${this.domainVersion}/pages/${id}/`;
    return this.cacheService.get(url, this.http.get(url)
      .pipe(
        share(),
        first()
      ));
  }

  getCurrentPage(slug, preview = false) {
    return this.getAll()
      .pipe(
        map(res => {
          this.page = res.items.filter(pages => pages.meta.slug === slug);
        }),
        switchMap(page => preview ? this.getPage(`${this.page[0].id}/?preview=true`) : this.getPage(`${this.page[0].id}`))
      );
  }

  createPage(route) {
    const url = route;
    const urlSegments = url.split('/');
    const slugSegment = urlSegments.slice(-1)[0].replace(/#.*$/, '');
    const slug = slugSegment !== '' ? slugSegment : 'homepage';
    const preview = url.match(/id=\d{1,10}/g);
    const previewSlug = slug.split('?');

    if (preview) {
      return this.getCurrentPage(previewSlug[0], true);
    } else {
      return this.getCurrentPage(slug);
    }
  }
}
