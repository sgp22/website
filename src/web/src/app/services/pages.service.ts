import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/forkJoin';
import { environment } from '../../environments/environment';

@Injectable()
export class PagesService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    console.log('PagesService initialized...');
  }

  getAll() {
    return this.http.get(`${this.apiUrl}pages`);
  }

  getPage(slug, pageType) {
    return this.http.get(`${this.apiUrl}pages/?format=json&type=${pageType}&fields=*&slug=${slug}`);
  }

  getGlobalNav() {
    return this.http.get(`${this.apiUrl}pages/?format=json&show_in_menus=true`);
  }

  getPageWithNav(slug, pageType): Observable<any[]> {
    return this.http.get(`${this.apiUrl}pages/?format=json&type=${pageType}&fields=*&slug=${slug}`)
      .flatMap((page: any) => {
        const parents = page.items;
        if (parents.length > 0) {
          return Observable.forkJoin(
            parents.map((parent) => {
              return this.http.get(`${this.apiUrl}pages/?child_of=${parent.id}`)
                .map((parentRes: any) => {
                  const children = parentRes.json();
                  parent.children = children;
                  children.items.map((childItem) => {
                    return this.http.get(`${this.apiUrl}pages/?child_of=${childItem.id}`)
                      .map((childrenRes: any) => {})
                      .subscribe((childrenRes: any) => {
                        const grandChildren = childrenRes;
                        if (grandChildren.items.length > 0) {
                          childItem.grandChildren = grandChildren;
                        }
                      });
                  });
                  return parent;
                });
            })
          );
        }
        return of([]);
      });
    }

  getSideBarNav(): Observable<any[]> {
    return this.http.get(`${this.apiUrl}pages/?format=json&show_in_menus=true`)
    .flatMap((pages: any) => {
      const topLevelPages = pages.items;
      if (topLevelPages) {
        return Observable.forkJoin(
          topLevelPages.map((topLevelPage) => {
            return this.http.get(`${this.apiUrl}pages/?child_of=${topLevelPage.id}`)
              .map((res: any) => {
                const children = res;
                if (children) {
                  topLevelPage.children = children;
                  children.items.map((child) => {
                    return this.http.get(`${this.apiUrl}pages/?child_of=${child.id}`)
                      .map(childrenRes => res)
                      .subscribe((childrenRes) => {
                        const grandChildren = childrenRes;
                        if (grandChildren.items.length > 0) {
                          child.grandChildren = grandChildren;
                        }
                      });
                  });
                  return topLevelPage;
                }
              });
          })
        );
      }
      return of([]);
    });
  }

}
