import { CacheService } from './cache.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Token } from './token';

import 'rxjs/add/observable/throw';

@Injectable()
export class TokenService {

  constructor(
    private cacheService: CacheService,
    private http: HttpClient
  ) { }

  getTokenData(domain: string, library: string, version: string) {
    // Note that the following url route is for a dist file
    // and not referring to the ids-identity package in node_modules
    const url = `${domain}/api/docs/${library}/${version}/tokens/web/theme-soho.simple.json`;

    return this.cacheService.get(url, this.http
      .get(url)
      .catch((err: Response) => {
        if (err.status === 400) {
          return JSON.stringify([]);
        } else {
          return Observable.throw(new Error(`${ err.status } ${ err.statusText }`));
        }
      }));
  }

  groupTokensByCategory(tokenData) {
    const grouped = {};
    const props: Array<Token> = tokenData;

    for (const key in props) {
      if (props.hasOwnProperty(key)) {
        const curCategory = props[key].category;

        if (!grouped.hasOwnProperty(curCategory)) {
          grouped[curCategory] = new Array<Token>();
        }
        grouped[curCategory].push(props[key]);
      }
    }
    return grouped;
  }

  private humanReadable(str: string) {
    return this.toTitleCase(this.dashesToSpaces(str));
  }

  private dashesToSpaces(str: string): string {
    return str.replace(/-/g, ' ');
  }

  private toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
}
