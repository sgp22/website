import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/forkJoin';
import { environment } from '../../environments/environment';

@Injectable()
export class PagesService {

  apiUrl = environment.apiUrl;

  constructor(private http: Http) {
    console.log('PagesService initialized...');
  }

  getAll() {
    return this.http.get(`${this.apiUrl}pages/?format=json`)
      .map(res => res.json());
  }

  getPage(slug, pageType) {
    return this.http.get(`${this.apiUrl}pages/?format=json&type=${pageType}&fields=*&slug=${slug}`)
      .map(res => res.json());
  }

  getGlobalNav() {
    return this.http.get(`${this.apiUrl}pages/?format=json&show_in_menus=true`)
      .map(res => res.json());
  }

  getPageWithNav(slug, pageType): Observable<any[]> {
    return this.http.get(`${this.apiUrl}pages/?format=json&type=${pageType}&fields=*&slug=${slug}`)
      .map(res => res.json())
      .flatMap((page) => {
        const parents = page.items;
        if (parents.length > 0) {
          return Observable.forkJoin(
            parents.map((parent) => {
              return this.http.get(`${this.apiUrl}pages/?child_of=${parent.id}`)
                .map((parentRes) => {
                  const children = parentRes.json();
                  parent.children = children;
                  children.items.map((childItem) => {
                    return this.http.get(`${this.apiUrl}pages/?child_of=${childItem.id}`)
                      .map(childrenRes => childrenRes.json())
                      .subscribe((childrenRes) => {
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
    .map(res => res.json())
    .flatMap((pages) => {
      const topLevelPages = pages.items;
      if (topLevelPages) {
        return Observable.forkJoin(
          topLevelPages.map((topLevelPage) => {
            return this.http.get(`${this.apiUrl}pages/?child_of=${topLevelPage.id}`)
              .map((res) => {
                const children = res.json();
                if (children) {
                  topLevelPage.children = children;
                  children.items.map((child) => {
                    return this.http.get(`${this.apiUrl}pages/?child_of=${child.id}`)
                      .map(childrenRes => res.json())
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
