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
    // and not referring to the ids-identity packing in node_modules
    let url = `${domain}/api/docs/${library}/${version}/ids-identity/theme-default.raw.json`;

   return this.cacheService.get(url, this.http
    .get(url)
    .catch((err: Response) => {
      if (err.status === 400) {
        console.log('Err: No tokens found for this version.');
        return JSON.stringify([]);
      } else {
        return Observable.throw(new Error(`${ err.status } ${ err.statusText }`));
      }
    }));
  }

  groupTokensByCategory(tokenData) {
    let grouped = {};
    let props: Array<Token> = tokenData.props;

    for (let key in props) {
      let curCategory = props[key].category;

      props[key].description = this.humanReadable(props[key].name);

      if (!grouped.hasOwnProperty(curCategory)) {
        grouped[curCategory] = new Array<Token>();
      }
      grouped[curCategory].push(props[key]);
    }
    return grouped;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  private humanReadable(str: string) {
    return this.toTitleCase(this.dashesToSpaces(str));
  }

  private dashesToSpaces(str: string): string {
    return str.replace(/-/g, ' ')
  }

  private toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
}
