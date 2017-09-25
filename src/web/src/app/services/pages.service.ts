import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

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

  getPage(slug) {
    return this.http.get(`${this.apiUrl}pages/?format=json&type=home.HomePage&fields=*&slug=${slug}`)
      .map(res => res.json());
  }

  getHomePage() {
    return this.http.get(`${this.apiUrl}pages/3/?format=json`)
      .map(res => res.json());
  }

  getNav(id) {
    return this.http.get(`${this.apiUrl}pages/?descendant_of=${id}`)
      .map(res => res.json());
  }

  getPageWithNav(slug): Observable<any[]> {
    return this.http.get(`${this.apiUrl}pages/?format=json&type=home.HomePage&fields=*&slug=${slug}`)
      .map(res => res.json())
      .flatMap((page) => {
        const parents = page.items;
        if (parents.length > 0) {
          return Observable.forkJoin(
            parents.map((parent) => {
              return this.http.get(`${this.apiUrl}pages/?child_of=${parent.id}`)
                .map((res) => {
                  let children = res.json();
                  parent.children = children;
                  children.items.map((childItem) => {
                    return this.http.get(`${this.apiUrl}pages/?child_of=${childItem.id}`)
                      .map(res => res.json())
                      .subscribe((res) => {
                        let grandChildren = res;
                        childItem.grandChildren = grandChildren;
                      })
                  }) 
                  return parent;
                })
            })
          )
        }
        return Observable.of([]);
      })
  }

}