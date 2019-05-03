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
    const url = `${this.apiUrl}/api/${this.domainVersion}/pages/?format=json&type=home.LandingPage&show_in_menus=true`;
    return this.http.get(url).pipe(first());
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

  getPage(id: string) {
    const url = `${this.apiUrl}/api/${this.domainVersion}/pages/${id}/`;
    return this.cacheService.get(url, this.http.get(url)
      .pipe(
        share(),
        first()
      ));
  }

  getCurrentPage(slug: string, preview = false) {
    return this.getAll()
      .pipe(
        map(res => {
          this.page = res.items.filter(pages => pages.meta.slug === slug);
        }),
        switchMap(page => preview ? this.getPage(`${this.page[0].id}/?preview=true`) : this.getPage(`${this.page[0].id}`))
      );
  }

  createPage(route: string) {
    const url = route;
    const params = {};
    const urlSegments = url.split('/');
    const slugSegment = urlSegments.slice(-1)[0].replace(/#.*$/, '');
    const slug = slugSegment !== '' ? slugSegment : 'homepage';
    const query = slug.match(/[?]/g);
    const preview = url.match(/id=\d{1,10}/g);
    params['slug'] = query ? slugSegment.split('?')[0] : slugSegment;

    if (query) {
      const queryParams = slugSegment.split('?')[1].split('&');
      queryParams.forEach(param => {
        const paramArr = param.split('=');
        if (paramArr) {
          params[paramArr[0]] = paramArr[1];
        }
      });
    }

    if (preview) {
      return this.getCurrentPage(params['slug'], true);
    } else {
      return this.getCurrentPage(params['slug'], false);
    }
  }

  getAllBlogPosts() {
    const url = `${this.apiUrl}/api/${this.domainVersion}/pages/?format=json&type=home.BlogPostPage`;
    return this.cacheService.get(url, this.http.get(url).pipe(first()));
  }

  getMediumFeed() {
    const url = `https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40hookandloopnyc`;
    return this.cacheService.get(url, this.http.get(url));
  }
}
