import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, throwError as _throw, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private http: HttpClient
  ) { }

  getTokenData(domain: string, library: string, version: string) {
    // Note that the following url route is for a dist file
    // and not referring to the ids-identity package in node_modules
    const url = `${domain}/api/docs/${library}/${version}/theme-uplift/tokens/web/theme-uplift.simple.json`;

    return this.http.get(url)
      .pipe(
        catchError((err: Response) => {
          if (err.status === 400) {
            return JSON.stringify([]);
          } else {
            return throwError(new Error(`${err.status} ${err.statusText}`));
          }
        })
      );
  }

  getAllTokenData(domain: string, library: string, version: string) {
    const soho = this.http.get(`${domain}/api/docs/${library}/${version}/theme-uplift/tokens/web/theme-uplift.simple.json`);
    const dark = this.http.get(`${domain}/api/docs/${library}/${version}/theme-uplift/tokens/web/theme-uplift-dark.simple.json`);
    const contrast = this.http.get(`${domain}/api/docs/${library}/${version}/theme-uplift/tokens/web/theme-uplift-contrast.simple.json`);
    return forkJoin([soho, dark, contrast]);
  }

  /**
   * For CMS pages filter by the tokensCategory dot notation string. (theme, theme.font, etc.)
   * @param tokenData response from ${domain}/api/docs/${library}/${version}/tokens/web/theme-soho.simple.json
   * @param cmsInput input from tokensCategory field in the CMS.
   */
  filterCmsTokens(tokenData, cmsInput) {
    const tokens = tokenData.filter(token => {
      return token.name.javascript.startsWith(cmsInput);
    });
    return tokens;
  }

  /**
   * Create custom object to display all tokens/themes in a table (only gets called if tokensCategory === *)
   * @param tokenData response from ${domain}/api/docs/${library}/${version}/tokens/web/theme-soho-{variant}.simple.json
   */
  combineTokenData(tokenData: any) {
    const uplift = tokenData[0];
    const dark = tokenData[1];
    const contrast = tokenData[2];
    const keys = uplift.map(token => {
      return token.name.sass;
    });
    const tokens = keys.reduce((obj, value, index) => {
      if (!obj[value] && !value.startsWith('$theme-color-palette-')) {
        obj[value] = {
          uplift: {
            value: uplift[index].value,
            type: uplift[index].type
          },
          dark: {
            value: dark[index].value,
            type: dark[index].type
          },
          contrast: {
            value: contrast[index].value,
            type: contrast[index].type
          }
        };
      }
      return obj;
    }, {});
    return tokens;
  }
}
