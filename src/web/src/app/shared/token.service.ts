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

  /**
   * For CMS pages filter by the tokensCategory dot notation string. (theme, theme.font, etc.)
   * @param tokenData response from ${domain}/api/docs/${library}/${version}/tokens/web/theme-soho.simple.json
   * @param cmsInput input from tokensCategory field in the CMS.
   */
  filterCmsTokens(tokenData, cmsInput) {
    const tokens = tokenData.filter(token => {
      return token.name.javascript.includes(cmsInput);
    });
    return tokens;
  }
}
